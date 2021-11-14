import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { daysSincePosted } from '../../tools/dateCalucators'
import Reply from './Reply'

const ListItem = styled.li`
    margin: 10px 0px;
    list-style-type: none;
`

const ImageContainer = styled.div`
    width: 25px;
    height: 25px;
    background-color: lightgray;
    border-radius: 50%;
    margin-right: 10px;
`
const UserInfo = styled.div`
    display: flex;
    text-transform: lowercase;
    align-items: center;
    span {
        padding-right: 10px;
    }
    
`
const FormatedComment = styled.div`
    border: 2px solid #033F63;
    padding: 5px;
    border-radius: 5px;
    margin: 10px 0;

`

const Comment = ({comment}) => {
        
    let post_date = "";
    
    if(comment.post_date) {
        post_date = new Date(comment.post_date)
    }

    console.log("Testing comment", comment)
    return (
        <>
       
        {comment ? (
                <ListItem id={comment._id}>
                <UserInfo>
                    <ImageContainer/>
                    <span>
                    {comment.user_id.firstName[0]}
                    {comment.user_id.lastName}
                    </span>
                    <span>
                        {
                        comment.post_date ? (<>
                        {daysSincePosted(post_date)}
                        </>) : 
                        (null)
                        }
                    </span>
                </UserInfo>
                <FormatedComment>
                {comment.post_content}
                </FormatedComment>
                <Reply article_id={comment.article_id} parentId={comment._id} />
                </ListItem> 

            ) : (null)}
        </>
    )
}

export default Comment
