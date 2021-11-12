import React, {useContext} from 'react';
//import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styled } from '@mui/material/styles';
import Gravatar from 'react-gravatar';
import {UserContext} from '../../../App';



const ProfileContainer = styled('span') ({
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ['@media (max-width:650px)']: {
        position:'absolute',
        fontSize:'16px',
        right:'10px',
        top:'55px',
        'img':{
            width:'25px',
            height:'25px',
            margin:'2px !important',
            display:'block'
        },
        
    },
    
})


const ProfileCard = (props) => {

    const [user, setUser] = useContext(UserContext);
    
    return (
        <ProfileContainer>
           😄Hello, {props.name}<Gravatar
                className='profileImage'
	            email={user.email}
	            size={300}
	            rating="pg"
	            default="mp"
	            style={{margin: '20px auto', borderRadius:'50%', display:'block', border:'4px solid #033F63'}}
            />
        </ProfileContainer>
    )
}

export default ProfileCard
