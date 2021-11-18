import React, {useState, useContext, createRef, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import styles from 'styled-components';
import { ValidateCommentType, ValidatePost } from './postValidator'
import {RadioGroup, Radio, Button, FormControlLabel, Box, inputLabelClasses} from '@mui/material'
import axios from 'axios';
import Config from '../../../../config/index'
import { UserContext } from '../../../../App';
import { TextArea } from 'semantic-ui-react'
import { ArticleInfoContext } from '../ViewArticle'


const Reply = (props) => {
    const [post, setPost] = useState()
    const [error, setError] = useState('')
    const [user, setUser] = useContext(UserContext);
    const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext)    
    const [displayReply, setDisplayReply] = useState('none')

    const [newPost, setNewPost ] = useState(
        {
            userResponse_type: 'reply',
            post_content: '',
            article_id: '',
            parentId: '',
            user_id: '',
        }
    )

   
    const handleNewPost = event => {
        
        if(displayReply == 'none') {
            setDisplayReply('inline-block')
        } else if(ValidatePost(newPost.post_content)) {
            setError('Plase enter a post.')
            console.log(error)
        } else if(ValidateCommentType(newPost.userResponse_type)) {
            setError('Pleae select comment or issue')
            console.log(error)
        } else {            

            if(newPost.user_id != '') {
                axios.post(`${Config.URL}api/creatPost`, {
                    post: newPost
                })
                window.location.reload();
            }
        }

    }

    const handlePostChange = (event) =>{
        setNewPost({...newPost, post_content: event.target.value, article_id: articleInfo.article_id, user_id: articleInfo.user_id, parentId: props.parentId})
        console.log(newPost)
    }

    const FormatedGroup = styled("div") ({
        display: 'flex',
        justifyContent: 'flex-end'
    })
    const FormatedRadio = styled(Button) ({
        
         
        background: '#033F63',
        color: '#FFFFFF',
        width: '150px',
        textAlign: 'center',
        marginLeft: '10px',
        marginBottom: '5px',
        fontSize: '1.2em',
        padding: '0px 5px',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#213946'
        },
        '&:focus': {
            backgroundColor: '#213946'
        },
        
    })

    const FormatedButton = styled(Button) ({
        background: '#033F63',
        color: '#FFFFFF',
        maxWidth: '150px',
        padding: '5px',
        span: {
            paddingLeft: '10px',
            fontSize: '1.2em',
            fontWeight: 'bold'
        },
        '&:hover': {
            backgroundColor: '#213946'
        }
    })
    const StyledTextArea = styles(TextArea)`
        width: 95%;
        height: 50px;
        resize: none;
        padding: 10px;
        border: 2px solid #033F63;
        border-radius: 10px;
        display: ${displayReply};
    `

    const ErrorMeassage = styled(Box) ({
        color: "red",
        textSize: '1.7em'
    })
    
    const handleToggle = (event) => {
        event.preventDefault();
        setNewPost({...newPost, userResponse_type: event.target.value})
        console.log(newPost)
    }

    return (
        <>
          <FormatedGroup row aria-label="type" value>
            </FormatedGroup>
            <StyledTextArea 
                defaultValue={newPost.post_content}
                name="post_content" 
                onBlur={handlePostChange}
            />
             {localStorage.getItem('isLoggedIn') ? (
            <FormatedButton onClick={handleNewPost}
            >Reply
            </FormatedButton>) : (null)}
            {error != '' ? 
            (
                <ErrorMeassage>
                {error}
                </ErrorMeassage>
            ) 
                : (console.log(error))
            }
        </>
    
      
    )
}

export default Reply
