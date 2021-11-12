import React, {useEffect, useState} from 'react';
import SavedArticlesCard from '../../layout/ArticleCard/SavedArticlesCard';
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
    },
    fontFamily: 'Acme, sans-serif',
})

const SortButton = styled(Button)({
    color:'white',
    backgroundColor:'#033F63',
    fontSize:'0.8em',
    textTransform: 'capitalize',
    marginLeft:'10px',
    fontWeight:'bold',
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
const SavedArticles = (props) => {

    const [articles, setArticles] = useState([]);
    const [sort, setSort] = useState('publish')
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const location = useLocation();
    let unSaveMessage = location.search;
    let history = useHistory();

    useEffect(() => {
        axios.get(`${Config.URL}api/getSavedArticles?userId=${localStorage.getItem('userSecret')}`).then((response) => {
            //console.log(response.data.getSavedArticles)
            setLoadingError(false)
            setLoading(false)
            let articleResults;
            if(sort === 'save'){
                articleResults = response.data.getSavedArticles.reverse();
            }else{
                let publishSort = response.data.getSavedArticles;
                
                publishSort.sort((a, b)=>{
                    return new Date(b.article.published_date).getTime() - new Date(a.article.published_date).getTime();
                })

                articleResults = publishSort;
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

    const unSaveHandler = (e) =>{
        //console.log((unSaveMessage.replace('?unSave=','')));
        axios.post(`${Config.URL}api/deleteSavedArticle`, {userId:localStorage.getItem('userSecret'), articleId: unSaveMessage.replace('?unSave=','')}).then(async(result)=>{
            
            //Whenever the article delete, it would go back to first page and it would also reFetch the data from server
            setCurrentPage(1);// if currently the page is also 1, the page won't render!

            let filterArticle = articles.filter(article=> article.article._id !=  unSaveMessage.replace('?unSave=',''));
            //console.log(filterArticle);
            setArticles(filterArticle);
            history.push('/EjKBA/saved_articles/?message=unSaved_article_successfully');
        }).catch(e=>{
            //console.log(e);
            setLoadingError('Server down - pleas bear with us and try later. Sorry for your inconvenience.');
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
            <h1 style={{fontSize:'1.8em', margin:'auto'}}>Saved Articles</h1>
            <p style={{margin:'auto'}}>Latest to Oldest</p>  
            <Span1> 
            <SortButton type='button' onClick={()=>{setSort('publish')}}>Date Published</SortButton>
            <SortButton type='button' onClick={()=>{setSort('save')}}>Date Saved</SortButton>
            </Span1>    
            
            {unSaveMessage.startsWith('?unSave=')?(
                <MessageContainer>
                    <h1>Would you like to unSave this article?</h1>
                    <DecisionButton type='button' onClick={unSaveHandler}>Yes</DecisionButton>
                    <DecisionButton type='button' onClick={()=>{history.goBack()}}>Cancel</DecisionButton>
                </MessageContainer>
            ):
            (
            <>
            {loading? (<h4>loading...</h4>):(
            <UserArticlesContainer>
            {articles.length === 0 ? (<h1 style={{textAlign:'center', paddingTop:'20px', fontSize:'1.8em'}}>...You have not saved any articles yet...</h1>):(
                articles.map(article=>{
                    return( 
                        <SavedArticlesCard
                            userName = {article.article.user_id.firstName ? article.article.user_id.firstName + ' ' + article.article.user_id.lastName: article.article.user_id.displayName}
                            article_id = {article.article._id}
                            key = {article.article._id}
                            title={article.article.title} 
                            likes={article.article.likes} 
                            saved_date={article.date}
                            published_date = {article.article.published_date}
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

export default SavedArticles;