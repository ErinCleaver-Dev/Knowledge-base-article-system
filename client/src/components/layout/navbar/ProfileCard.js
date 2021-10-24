import React from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styled } from '@mui/material/styles';
import {Box } from '@mui/material/'
const ProfileContainer = styled('span') ({
    color: '#FEDC97',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '250px',
})


const ProfileCard = (props) => {
    return (
        <ProfileContainer>
            <EmojiEmotionsIcon/> {props.name} <img className="profileImage" />
        </ProfileContainer>
    )
}

export default ProfileCard
