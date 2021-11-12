import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { Editor, EditorState, convertFromRaw } from "draft-js";
import htmlToDraft from 'html-to-draftjs';

const ListItem = styled.li`
    border: 2px solid black;
    list-style-type: none;
`


const Comment = ({comment}) => {
    let content = ''
    let initialEditorState = EditorState.createWithContent( convertFromRaw(JSON.parse(comment.post_content)));
    
    const [editorState, setEditorState] = useState(initialEditorState);
    
    return (
        <>
       
        {comment ? (
                <ListItem>
                <>
                {comment.post_content}
                </>
                
                <Editor
                        editorState={editorState}
                        readOnly={true}
                        />

                </ListItem> 

            ) : (null)}
        </>
    )
}

export default Comment
