import React, {useState, useContext, useRef, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import styles from 'styled-components';
import {ValidatePost } from './postValidator'
import {Button, Box} from '@mui/material'
import axios from 'axios';
import Config from '../../../../config/index'
import { UserContext } from '../../../../App';
import { ArticleInfoContext } from '../ViewArticle'
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import {AllCommentsContext} from './Responses';
import { daysSincePosted } from '../../tools/dateCalucators'

const Reply = (props) => {
    const [post, setPost] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useContext(UserContext);
    const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext)    
    const [displayReply, setDisplayReply] = useState('none')
    const [comments, setComments] =useContext(AllCommentsContext);

    const [newPost, setNewPost ] = useState(
        {
            userResponse_type: 'reply',
            post_content: '',
            article_id: '',
            parentId: '',
            user_id: '',
        }
    )

    const textAreaRef = useRef();

    useEffect(()=>{
        textAreaRef.current.value = post;
        textAreaRef.current.focus();
    })
   
    const handleNewPost = event => {
        console.log(textAreaRef.current.value)
        
        if(ValidatePost(textAreaRef.current.value)) {
            setError('Please enter a post.')
            console.log(error)
        } 
        else {            
            let data = {...newPost, post_content: textAreaRef.current.value, article_id: articleInfo.article_id, user_id: articleInfo.user_id, parentId: props.parentId}
            if(data.user_id != '') {
                axios.post(`${Config.URL}api/creatPost`, {
                    post: data
                }).then(()=>{
                    console.log("Path")
                    window.location.reload(false)
                });

            }
        }
    }

    const handleReplyIcon = (e) =>  {
        setError('')
        displayReply=== 'none'? setDisplayReply('inline-block'):setDisplayReply('none')
    }

    const getAllNestedCommentsRecursion = (object, array)=>{
        if(object.replys.length > 0){
            object.replys.map(reply=>{
                return getAllNestedCommentsRecursion(reply, array);
            })
        }
        array.push(object._id);
        return array;
    }

    const handleDeleteComments = async(e) =>{
        let deletedComment = comments.filter(comment=>{
            if(comment._id === props.parentId){
                return comment;
            }
        })
        console.log(deletedComment)
        deletedComment = deletedComment[0];
        //console.log(deleteComment)
        let result = getAllNestedCommentsRecursion(deletedComment,[]);
        //console.log(result);
        axios.post(`${Config.URL}api/deleteComments`, {
            deletedComments: result
        })
        window.location.reload();

    }

    const StyledTextArea = styles('textarea')`
        width: 95%;
        height:200px;
        resize: none;
        padding: 10px;
        border:none;
        border-radius: 10px;
        display: ${displayReply};
        font-size: 1.2em;
        font-weight:bold;
        outline:none;
        box-shadow: 1px 1px 10px #033F63;
    `

    const FormattedButton = styled(Button) ({
        background: '#033F63',
        color: '#FFFFFF',
        maxWidth: '150px',
        padding: '5px',
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
        },
        fontFamily:'Acme, sans-serif'
    })

    const ReplyIcon = styled(CommentIcon)({
        fontSize:'20px',
        cursor:'pointer',
        transition: '0.5s ease all',
        '&:hover':{
            transform:'scale(1.2)'
        }
    })

    const DeleteIcon = styled(DeleteForeverIcon)({
        fontSize:'20px',
        cursor:'pointer',
        transition: '0.5s ease all',
        '&:hover':{
            transform:'scale(1.2)'
        },
        position:'relative',
        top:'-1px'
    })

    const ErrorMessage = styled(Box) ({
        color: "red",
        textSize: '1.7em'
    })
    

    return (
        <>  
        {localStorage.getItem('isLoggedIn') ? (
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                 <ReplyIcon onClick={handleReplyIcon}/>
                 {articleInfo.user_id === localStorage.getItem('userSecret')?<>{daysSincePosted(props.post_date)?null:<DeleteIcon onClick={handleDeleteComments}/>}</>:null}
                 </div>
            ) : (null)}
            <StyledTextArea 
                name="post_content" 
                ref = {textAreaRef}
                onChange={(e)=>{setPost(e.target.value)}}
            />
             {displayReply === 'inline-block' ?<FormattedButton onClick={handleNewPost}>Send<SendIcon/></FormattedButton>:null}
            {error != '' ? 
            (
                <ErrorMessage>
                {error}
                </ErrorMessage>
            ) 
                : (null)
            }
        </>
    
      
    )
}

export default Reply
