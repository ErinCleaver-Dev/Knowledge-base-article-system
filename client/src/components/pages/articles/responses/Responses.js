import React, {useState, useEffect, useContext} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {useHistory} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import NewPost from "./NewPost"
import { AiOutlineConsoleSql } from 'react-icons/ai';
import _ from 'lodash';
import styles from "styled-components"
import axios from 'axios';
import Comment from './Comment'
import Config from '../../../../config/index'
import { UserIdContext } from '../ViewArticle'
import { UserContext } from '../../../../App';




const FormatedButton = styled(Button) ({
    background: '#033F63',
    color: '#FFFFFF',
    maxWidth: '150px',
    padding: '10px',
    img: {
        height: '30px'
    },
    span: {
        paddingLeft: '10px',
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    '&:hover': {
        backgroundColor: '#213946'
    }
})

const ResponsesBox = styled(Box) ({
    marginTop: '40px',
})

const CommentList = styles.ul`
    margin-left: 40px;
`

const MapComments = ({article_id}) => {

    const [comments, setComments] = useState('')



    useEffect(() => {
        
        axios.post(`${Config.URL}api/getComments`, {
            article_id: article_id
        }).then((response) => {
            _(response.data).forEach(f=>
                {f.replys=_(response.data).filter(g=>g.parentId==f._id).value();});
     
            var newComments=_(response.data).filter(f=>f.parentId==null).value();        
            setComments(newComments)
        })
    }, [])
       
    if(comments != '' && article_id) {
        const CommentTree = (comments) => {

            let items = comments.map((comment) => {
              return (
                <CommentList>
                  <Comment key={comment._id} comment={comment}/>
                  {comment.replys && CommentTree(comment.replys)}
                </CommentList>
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
    const [user_id, setUser_id] = useContext(UserIdContext)    
    const [user, setUser] = useContext(UserContext);
    
    const getUseruID = () => {
        if(localStorage.getItem('isLoggedIn')) {
            axios.post(`${Config.URL}api/getUserByUid`, {
                uid: user.uid
                }).then((response) => { 
                    if(response.data._id) {
                        setUser_id(response.data._id)
                    } 
            }, [])
        }
    }

    return (
        
        <ResponsesBox>
            {getUseruID()}
            {localStorage.getItem('isLoggedIn') ? (<>
                <NewPost user_id={user_id} article_id={article_id}/>
                </>
            ) : 
            (null)
            }
            {article_id ? (<MapComments article_id={article_id}/>) : (null)} 
            
        </ResponsesBox>
    )
}

export default Responses
