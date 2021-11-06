import React, {useState} from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { styled } from '@mui/material/styles';
import './posts.css'
import { Editor } from "react-draft-wysiwyg";


const Reply = () => {
    const [editor, setEditorState ] = useState(EditorState.createEmpty())

    const handleEditorChange = (editorState) =>{
        const tempPostStorage = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        localStorage.setItem('tempPost', tempPostStorage);
        setEditorState(editorState);
    }

    const StyledEditor = styled(Editor) ({
        border: '2px solid #033F63'
    })


    return (
        <div>
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
            
        </div>
    )
}

export default Reply
