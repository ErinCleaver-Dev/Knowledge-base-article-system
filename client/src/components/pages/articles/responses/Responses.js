import React, {useState, useEffect, useContext,createContext} from 'react'
import {Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import NewPost from "./NewPost"
import _ from 'lodash';
import styles from "styled-components"
import axios from 'axios';
import Comment from './Comment'
import Config from '../../../../config/index'
import { ArticleInfoContext } from '../ViewArticle'
import { UserContext } from '../../../../App';

export const AllCommentsContext = createContext()

const RootCommentContainer = styled('div')({
    borderRadius:'5px',
    boxShadow:'1px 1px 4px black',
    padding:'10px 10px 10px 10px',
    margin:'10px 0',
    ['@media (max-width:400px)']: {
        width: "335px",
        overflowX:'auto',
        boxShadow:'2px 2px 10px black',
    },
    ['@media (max-width:760px)']: {
        maxWidth: "650px",
        overflowX:'auto',
    }, 
})

const CommentContainer = styled('div')({
    marginLeft:'30px',
    borderLeft:'3px solid lightgray',
    ['@media (max-width:760px)']: {
        marginLeft:'20px',
    },
    ['@media (max-width:600px)']: {
        marginLeft:'10px',
    }
    
})


const ResponsesBox = styled(Box) ({
    marginTop: '10px',
})

const CommentList = styles.ul`
    
    minHeight: 200px;
`

const MapComments = ({article_id}) => {

    const [comments, setComments] = useState('');

    useEffect(() => {
        
        axios.post(`${Config.URL}api/getComments`, {
            article_id: article_id
        }).then((response) => {
            let commentArray = response.data.filter((comment)=>comment.userResponse_type !== 'issue');
            _(commentArray).forEach(f=>
                {f.replys=_(commentArray).filter(g=>g.parentId==f._id).value();});
     
            var newComments=_(commentArray).filter(f=>f.parentId==null).value();        
            setComments(newComments)
        })
       
    }, [])
       
    if(comments != '' && article_id) {
        const CommentTree = (comments) => {

            let items = comments.map((comment) => {
              return (
                  <>
                  <AllCommentsContext.Provider value={[comments, setComments]} >
                {comment.parentId ? (
                    <CommentContainer key={comment._id}>
                    <CommentList>
                    <Comment  comment={comment}/>
                    {comment.replys && CommentTree(comment.replys)}
                  </CommentList>
                  </CommentContainer>
                ):(
                    <RootCommentContainer key={comment._id} >
                <CommentList >
                  <Comment comment={comment}/>
                  {comment.replys && CommentTree(comment.replys)}
                </CommentList>
                </RootCommentContainer>
                )}
                </AllCommentsContext.Provider>
                </>
              )
            })
          
            return items
          }
      
        return (
            <>
                {CommentTree(comments)}
            </>
        )
    }
    return(<></>)

}
  

const Responses = ({article_id}) => {    
    const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext)    
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useContext(UserContext);

    
    const getUseruID = () => {
        if(localStorage.getItem('isLoggedIn')) {
            axios.post(`${Config.URL}api/getUserByUid`, {
                uid: user.uid
                }).then((response) => { 
                    if(response.data._id) {
                        setArticleInfo({...articleInfo, user_id: response.data._id})
                        setIsLoading(false);
                    } 
            }, [])
        }
    }

  


    return (
        
        <ResponsesBox>
            {isloading ? (getUseruID()) : (null)}
            {localStorage.getItem('isLoggedIn') ? (<>
                <NewPost article_id={article_id}/>
                </>
            ) : 
            (null)
            }
            {article_id ? (<MapComments article_id={article_id}/>) : (null)} 
            
        </ResponsesBox>
    )
}

export default Responses;
