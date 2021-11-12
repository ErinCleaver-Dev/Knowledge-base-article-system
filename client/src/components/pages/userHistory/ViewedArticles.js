import React, {useEffect, useState} from 'react';
import ViewedArticlesCard from '../../layout/ArticleCard/ViewedArticlesCard';
import Config from '../../../config/index';
import axios from 'axios';
import {Container, Button, Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import {Redirect} from 'react-router-dom';


const UserArticlesContainer = styled(Container) ({
    border: '#28666E solid 3px',
    alignSelf:'center',
    minHeight:'552px',
    margin: '0',
    marginTop: '10px',
    padding:'12px !important',
    boxSizing:'border-box',
    paddingRight:'30px !important',
    display:'flex',
    flexDirection:'column',
    position:'relative',
    paddingBottom:'55px !important',
    fontFamily: 'Acme, sans-serif',
    
})

const PaginationArticles = styled(Pagination) ({
    alignSelf: 'center',
    position: 'absolute',
    bottom:'10px',
    marginTop:'10px',
    button: {
        color: '#033F63',
        fontSize: '1.8em',
        fontWeight: 'bold',
        border: 'none',
        background: 'none',    
    },
})



const SortButton = styled(Button)({
    color:'white',
    backgroundColor:'#033F63',
    fontSize:'0.8em',
    marginLeft:'10px',
    fontWeight:'bold',
    textTransform: 'capitalize',
    '&:hover':{
        backgroundColor:'#06283C'
    },
    fontFamily: 'Acme, sans-serif',
})

const Span1 = styled('span')({
    margin:'auto',
    ['@media (max-width:430px)']: { 
        display:'block',
     }
})


// Component
const ViewedArticles = (props) => {

    const [articles, setArticles] = useState([]);
    const [sort, setSort] = useState('publish')
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);


    useEffect(() => {
        axios.get(`${Config.URL}api/getViewedArticles?userId=${localStorage.getItem('userSecret')}`).then((response) => {
            //console.log(response.data.getViewedArticles)
             setLoadingError(false)
             setLoading(false)
             let articleResults;
             if(sort === 'view'){
                 articleResults = response.data.getViewedArticles.reverse();
             }else{
                 let viewSort = response.data.getViewedArticles;
                
                 viewSort.sort((a, b)=>{
                     return new Date(b.article.published_date).getTime() - new Date(a.article.published_date).getTime();
                 })

                 articleResults = viewSort;
                 //console.log(articleResults)
             }
             setPages(Math.ceil(articleResults.length/5));
             //removing docs depending what is the current page
             articleResults = articleResults.slice(((currentPage - 1) * 5));
             //console.log(articleResults);
             let shownArticles = [];
             for (let i = 0; i< 5; i++){
                  if(articleResults[i] == null || articleResults[i] == undefined){
                      break;
                  }else{
                  shownArticles.push(articleResults[i]);
                 }
              }
             //console.log(shownArticles)
             setArticles(shownArticles)
        }).catch(error => {
             //console.log(error)
            setLoadingError('Server down - pleas bear with us and try later. Sorry for your inconvenience.');
        })
    },[currentPage, sort])

    const handleChange= (e, value)=>{
        setCurrentPage(value);
    }

    return(
        <>
        {localStorage.getItem('isLoggedIn')?(
            <React.Fragment>
                {loadingError?(
                <Alert variant="filled" severity='error'>
                {loadingError}
              </Alert>
            ):(null)}
            <h1 style={{fontSize:'1.8em', margin:'auto'}}>Viewed Articles</h1>
            <p style={{margin:'auto'}}>Latest to Oldest</p> 
            <Span1> 
            <SortButton type='button' onClick={()=>{setSort('publish')}}>Date Published</SortButton>
            <SortButton type='button' onClick={()=>{setSort('view')}}>Date viewed</SortButton>
            </Span1>    
             
            {loading? (<h4>loading...</h4>):(
            <UserArticlesContainer>
            {articles.length === 0 ? (<h1 style={{textAlign:'center', paddingTop:'20px', fontSize:'1.8em'}}>...You have not viewed any articles yet...</h1>):(
                articles.map(article=>{
                    return( 
                        <ViewedArticlesCard
                            userName = {article.article.user_id.firstName ? article.article.user_id.firstName + ' ' + article.article.user_id.lastName: article.article.user_id.displayName}
                            article_id = {article.article._id}
                            key = {article.article._id}
                            title={article.article.title} 
                            likes={article.article.likes} 
                            viewed_date={article.date}
                            published_date = {article.article.published_date}
                        />
                    )
                })
            )}
            <PaginationArticles count={pages} defaultPage={1} page={currentPage} onChange={handleChange} siblingCount={1} />
            </UserArticlesContainer>
            )}
        </React.Fragment>
        ):(
            <Redirect to='/'/>
        )}
       </>
    )
}

export default ViewedArticles;