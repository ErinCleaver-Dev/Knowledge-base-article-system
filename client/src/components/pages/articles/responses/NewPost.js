import React, {useState} from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { styled } from '@mui/material/styles';
import './posts.css'
import { Editor } from "react-draft-wysiwyg";
import {RadioGroup, Radio, Button, FormControlLabel, Box, inputLabelClasses} from '@mui/material'


const NewPost = () => {
    const [editor, setEditorState ] = useState(EditorState.createEmpty())

    const handleEditorChange = (editorState) =>{
        const tempPostStorage = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        localStorage.setItem('tempPost', tempPostStorage);
        setEditorState(editorState);
    }

    const StyledEditor = styled(Editor) ({
        border: '2px solid #033F63'
    })

    const FormatedGroup = styled("Div") ({
        display: 'flex',
        justifyContent: 'flex-end'
    })
    const FormatedRadio = styled(Button) ({
        
         
        background: '#033F63',
        color: '#FFFFFF',
        width: '80px',
        textAlign: 'center',
        marginLeft: '10px',
        marginBottom: '5px',
        fontSize: '0.7em',
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


    return (
        <>
 
        <FormatedGroup row aria-label="type" onChange={(event) => {

            console.log(event.target.value)
            
          
        }} name="row-radio-buttons-group" defaultValue="comment">
            <FormatedRadio value="comment" name="Comment">Comment</FormatedRadio>
            <FormatedRadio value="issue" label="Issue">Issue</FormatedRadio>
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
            editorState={editor}
            />
            <FormatedButton
            >New Post
            </FormatedButton>
        </>
    )
}

export default NewPost
