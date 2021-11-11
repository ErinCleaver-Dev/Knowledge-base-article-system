import React, {useState, useEffect} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import styles from "styled-components"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {useHistory} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import NewPost from "./NewPost"

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

const Form = styled("form") ({

})

const List = styles('ul')`
    
`


const mapReplys = (reply, user_id, count = 3) => {
    

    console.log(reply)
}

const mapComments = () => {

    setComments([
        {
            id: 1,
            userResponse_type: 'issue',
            post_content: 'test 1',
            post_date: 10/21/2021,
            user_id: 1
        },
        {
            id: 2,
            userResponse_type: 'reply',
            post_content: 'Reply test layer 1',
            post_date: 10/21/2021,
            parentId: 1,
            user_id: 2
        },
        {
            id: 3,
            userResponse_type: 'reply',
            post_content: 'Reply test layer 2',
            post_date: 10/21/2021,
            parentId: 2,
            user_id: 3
        }, 
        {
            id: 4,
            userResponse_type: 'issue',
            post_content: 'test 2',
            post_date: 10/21/2021,
            user_id: 2
        },
        {
            id: 5,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 1',
            post_date: 10/21/2021,
            parentId: 2,
            user_id: 1
        },
        {
            id: 6,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 2',
            post_date: 10/21/2021,
            parentId: 1,
            user_id: 3
        },
        {
            id: 5,
            userResponse_type: 'reply',
            post_content: 'Reply test 2 layer 1',
            post_date: 10/21/2021,
            parentId: 2,
            user_id: 1
        }
    ])

    let user_id = "", 

    return(
        <List>
            {comment.map}
           
        </List>
    )
}

const Responses = ({article_id}) => {    
    return (
        <ResponsesBox>
            {localStorage.getItem('isLoggedIn') ? (<>
                <NewPost article_id={article_id}/>
                </>
            ) : 
            (null)
            }
            {mapComments()}

        </ResponsesBox>
    )
}

export default Responses
