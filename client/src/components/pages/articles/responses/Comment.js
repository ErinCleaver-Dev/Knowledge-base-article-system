import React from 'react'
import styled from "styled-components"

const ListItem = styled.li`
    border: 2px solid black;
    list-style-type: none;
`


const Comment = ({comment}) => {
    console.log('testing comment commpont: ', comment)

    return (
        <ListItem>
            {comment.post_content}
        </ListItem>
    )
}

export default Comment
