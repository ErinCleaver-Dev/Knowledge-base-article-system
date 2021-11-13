import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { Editor, EditorState, convertFromRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

const ListItem = styled.li`
    border: 2px solid black;
    list-style-type: none;
`


const Comment = ({comment}) => {
    
        
    return (
        <>
       
        {comment ? (
                <ListItem>
                <>
                {comment.post_content}
                </>
                </ListItem> 

            ) : (null)}
        </>
    )
}

export default Comment
