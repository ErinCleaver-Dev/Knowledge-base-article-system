import React, {useState, useContext, createRef, useEffect} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Config from '../../../../config/index'
import { UserContext } from '../../../../App';
import { UserIdContext } from '../ViewArticle'

const LikesIcon = styled(FavoriteIcon) ({
    color: '#033F63',
    fontSize: '1.8em',
    paddingLeft: '10px',
    cursor:'pointer',
})



const Likes = ({likes, articleId}) => {

    return (
        <>
            <LikesIcon disabled={localStorage.getItem('isLoggedIn')} /> Likes: {likes ? (likes) : (0)}
        </>
    )
}

export default Likes

