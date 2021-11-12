import React, {useEffect, useState} from 'react';
import UserArticlesCard from '../../layout/ArticleCard/UserArticlesCard';
import Config from '../../../config/index';
import axios from 'axios';
import {Container, Button, Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useLocation, Redirect, useHistory} from 'react-router-dom';

const UserArticlesContainer = styled(Container) ({
    border: '#28666E solid 3px',
    minHeight:'552px',
    alignSelf:'center',
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

const MessageContainer = styled(Container)({
    width:'80%',
    maxWidth:'400px !important',
    backgroundColor:'#28666E',
    marginTop:'20px',
    paddingBottom:'20px',
    borderRadius:'5px',
    'h1':{
        color:'white',
        fontSize:'1.2em',
        margin:'auto',
        textAlign: 'center',
        marginTop:'30px',
        letterSpacing:'1px'
    }
})

const DecisionButton = styled(Button)({
    marginTop:'20px',
    display:'block',
    width:'100%',
    backgroundColor:'#FEDC97',
    color:'black',
    fontSize:'1.2em',
    fontWeight:'bold',
    '&:hover':{
        backgroundColor:'#df5e09',
    }
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
const UserArticles = (props) => {

    const [articles, setArticles] = useState([]);
    const [sort, setSort] = useState('publish')
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const location = useLocation();
    let deleteMessage = location.search;
    let history = useHistory();

    useEffect(() => {
        axios.post(`${Config.URL}api/getUsersArticles`, {user_id: localStorage.getItem('userSecret')}).then((response) => {
            //console.log(response.data)
            setLoadingError(false);
            setLoading(false)
            let articleResults;
            if(sort === 'publish'){
                articleResults = response.data.reverse();
            }else{
                let articlesWithReviseDate =[];
                let articlesWithoutReviseDate =[];
                response.data.map(article=>{
                    if(article.last_revised_date){
                        articlesWithReviseDate.push(article);
                    }else{
                        articlesWithoutReviseDate.push(article);
                    }
                })
                articlesWithoutReviseDate = articlesWithoutReviseDate.reverse();
                articlesWithReviseDate.sort((a, b)=>{
                    return new Date(b.last_revised_date).getTime() - new Date(a.last_revised_date).getTime();
                })

                articleResults = [...articlesWithReviseDate,...articlesWithoutReviseDate]
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
            //console.log(error);
            setLoadingError('Server down - pleas bear with us and try later. Sorry for your inconvenience.')
        })
    },[currentPage, sort])

    const handleChange= (e, value)=>{
        setCurrentPage(value);
    }

    const deleteHandler = (e) =>{
        //console.log((deleteMessage.replace('?delete=','')));
        axios.post(`${Config.URL}api/deleteArticle`, {_id: deleteMessage.replace('?delete=','')}).then(result=>{
            //console.log(result.data, 'was deleted');
            let filterArticle = articles.filter(article=> article._id != result.data._id);
            //console.log(filterArticle);
            setArticles(filterArticle);
            //Whenever the article delete, it would go back to first page
            setCurrentPage(1);
            history.push('/EjKBA/user_articles/?message=delete_successfully');
        }).catch(e=>{
            setLoadingError('Server down - pleas bear with us and try later. Sorry for your inconvenience.')
        });
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
            <h1 style={{fontSize:'1.8em', margin:'auto'}}>Created Articles</h1>
            <p style={{margin:'auto'}}>Latest to Oldest</p>
            <Span1> 
            <SortButton type='button' onClick={()=>{setSort('publish')}}>Date Published</SortButton>
            <SortButton type='button' onClick={()=>{setSort('revise')}}>Date Revised</SortButton>
            </Span1>    
            {deleteMessage.startsWith('?delete=')?(
                <MessageContainer>
                    <h1>Would you like to delete this article?</h1>
                    <DecisionButton type='button' onClick={deleteHandler}>Yes</DecisionButton>
                    <DecisionButton type='button' onClick={()=>{history.goBack()}}>Cancel</DecisionButton>
                </MessageContainer>
            ):
            (
            <>
            {loading? (<h4>loading...</h4>):(
            <UserArticlesContainer>
            {articles.length === 0 ? (<h1 style={{textAlign:'center', paddingTop:'20px', fontSize:'1.8em'}}>...You have not created any articles yet...</h1>):(
                articles.map(article=>{
                    return( 
                        <UserArticlesCard
                            user_id = {localStorage.getItem('userSecret')}
                            article_id = {article._id}
                            key = {article._id}
                            title={article.title} 
                            likes={article.likes} 
                            published_date={article.published_date}
                            last_revised_date = {article.last_revised_date}
                        />
                    )
                })
            )}
            <PaginationArticles count={pages} defaultPage={1} page={currentPage} onChange={handleChange} siblingCount={1} />
            </UserArticlesContainer>
              )}
              </>)}
        </React.Fragment>
        ):(
            <Redirect to='/'/>
        )}
       </>
    )
}

export default UserArticles;