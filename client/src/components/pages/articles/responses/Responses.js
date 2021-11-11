import React, {useState, useEffect} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {useHistory} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import NewPost from "./NewPost"
import { AiOutlineConsoleSql } from 'react-icons/ai';
import _ from 'lodash';
import styles from "styled-components"

import Comment from './Comment'

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

const MapComments = () => {

   const [comments, setComments] = useState([{
            _id: 1,
            userResponse_type: 'issue',
            post_content: 'test 1',
            post_date: 10/21/2021,
            user_id: 1
        },
        {
            _id: 2,
            userResponse_type: 'reply',
            post_content: 'Reply test layer 1',
            post_date: 10/21/2021,
            parentId: 1,
            user_id: 2
        },
        {
            _id: 3,
            userResponse_type: 'reply',
            post_content: 'Reply test layer 2',
            post_date: 10/21/2021,
            parentId: 2,
            user_id: 3
        }, 
        {
            _id: 4,
            userResponse_type: 'issue',
            post_content: 'test 2',
            post_date: 10/21/2021,
            user_id: 2
        },
        {
            _id: 5,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 1',
            post_date: 10/21/2021,
            parentId: 4,
            user_id: 1
        },
        {
            _id: 6,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 2',
            post_date: 10/21/2021,
            parentId: 5,
            user_id: 3
        },
        {
            _id: 5,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 1',
            post_date: 10/21/2021,
            parentId: 4,
            user_id: 1
        }
        ])

      
        const CommentTree = (comments) => {

            let items = comments.map((comment) => {
              return (
                <CommentList>
                  <Comment comment={comment}/>
                  {comment.replys && CommentTree(comment.replys)}
                </CommentList>
              )
            })
          
            return items
          }

        _(comments).forEach(f=>
            {f.replys=_(comments).filter(g=>g.parentId==f._id).value();});
 
        var newComments=_(comments).filter(f=>f.parentId==null).value();
        console.log("test", newComments);

let comment_id = "";

return (
    <>
        {CommentTree(newComments)}
    </>
)}
  

const Responses = ({article_id}) => {    

    return (
        
        <ResponsesBox>
            {localStorage.getItem('isLoggedIn') ? (<>
                <NewPost article_id={article_id}/>
                </>
            ) : 
            (null)
            }
            <MapComments/>
        </ResponsesBox>
    )
}

export default Responses
