import React, {useEffect, useState} from 'react';
import CommentArticleCard from '../../layout/ArticleCard/CommentArticleCard';
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
const CommentHistory = (props) => {

    const [comments, setComments] = useState([]);
    const [sort, setSort] = useState('publish')
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);


    useEffect(() => {
        axios.post(`${Config.URL}api/getCommentsByUserId`, {user_id:localStorage.getItem('userSecret')}).then((response) => {
            //console.log(response.data)
             setLoadingError(false)
             setLoading(false)
             let articleResults;
             if(sort === 'response'){
                 articleResults = response.data.reverse();
             }else{
                 let responseSort = response.data;
                
                 responseSort.sort((a, b)=>{
                     return new Date(b.article_id.published_date).getTime() - new Date(a.article_id.published_date).getTime();
                 })

                 articleResults = responseSort;
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
             setComments(shownArticles)
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
            <h1 style={{fontSize:'1.8em', margin:'auto'}}>Comment History</h1>
            <p style={{margin:'auto'}}>Latest to Oldest</p> 
            <Span1> 
            <SortButton type='button' onClick={()=>{setSort('publish')}}>Date Published</SortButton>
            <SortButton type='button' onClick={()=>{setSort('response')}}>Date responded</SortButton>
            </Span1>    
             
            {loading? (<h4>loading...</h4>):(
            <UserArticlesContainer>
            {comments.length === 0 ? (<h1 style={{textAlign:'center', paddingTop:'20px', fontSize:'1.8em'}}>...You have not viewed any articles yet...</h1>):(
                comments.map(comment=>{
                    return( 
                        <CommentArticleCard
                            userName = {comment.article_id.user_id.firstName ? comment.article_id.user_id.firstName + ' ' + comment.article_id.user_id.lastName: comment.article_id.user_id.displayName}
                            article_id = {comment.article_id._id}
                            comment_id={comment._id}
                            key = {comment._id}
                            title={comment.article_id.title} 
                            likes={comment.article_id.likes} 
                            response_date={comment.post_date}
                            response_type={comment.userResponse_type}
                            response_content={comment.post_content}
                            published_date = {comment.article_id.published_date}
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

export default CommentHistory;