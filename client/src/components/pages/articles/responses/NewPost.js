import React, {useState, useContext} from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { styled } from '@mui/material/styles';
import { ValidateComment } from './postValidator'
import './posts.css'
import { Editor } from "react-draft-wysiwyg";
import {RadioGroup, Radio, Button, FormControlLabel, Box, inputLabelClasses} from '@mui/material'
import axios from 'axios';
import Config from '../../../../config/index'
import { UserContext } from '../../../../App';


const NewPost = (props) => {
    const [editorState, setEditorState ] = useState(EditorState.createEmpty())
    const [error, setError] = useState('')
    const [user, setUser] = useContext(UserContext);


    const [newPost, setNewPost ] = useState(
        {
            userResponse_type: '',
            post_content: '',
            article_id: props.article_id,
            user_id: '',
        }
    )

    const handleNewPost = event => {
        console.log('clicked new post')
        console.log('set type', newPost.post_content)
        if(!editorState.getCurrentContent().hasText()) {
            console.log('test for text')
            setError('Plase enter a post.')
            console.log(error)
        } else if(ValidateComment(newPost.userResponse_type)) {
            console.log(newPost.userResponse_type)
            setError('Pleae select comment or issue')
            console.log(error)
        } else {
            setError('')
            console.log("uid", props.uid)
            axios.post(`${Config.URL}api/getUserByUid`, {
            uid: user.uid
            }).then((response) => { 
                console.log("getting user id: ", response.data._id)
                setNewPost({...newPost, user_id: response.data._id})

                console.log("checking on new post", newPost);
                
                axios.post(`${Config.URL}api/creatPost`, {
                    post: newPost
                })


            }, []);


        }

    }


    const handleEditorChange = (editorState) =>{
        const postedContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        setNewPost({...newPost, post_content: postedContent})
        setEditorState(editorState);
    }

    const StyledEditor = styled(Editor) ({
        border: '2px solid #033F63'
    })

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
    const ErrorMeassage = styled(Box) ({
        color: "red",
        textSize: '1.7em'
    })
    
    const handleToggle = (event) => {
        setNewPost({...newPost, userResponse_type: event.target.value})
        console.log('set type', event.target.value)
    }

    return (
        <>
 
        <FormatedGroup row aria-label="type" value>
            <FormatedRadio value="comment" onClick={handleToggle} name="Comment">Comment</FormatedRadio>
            <FormatedRadio value="issue" onClick={handleToggle} label="Issue">Issue</FormatedRadio>
        </FormatedGroup>
            <Editor 
            toolbar = {{             
                options:['inline'],
                inline: {
                    options:['bold', 'italic', 'underline'] 
                }
            }}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"

            onEditorStateChange={handleEditorChange}
            editorState={editorState}
            />
            <FormatedButton onClick={handleNewPost}
            >New Post
            </FormatedButton>
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

export default NewPost
