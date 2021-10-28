import React, {useContext} from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styled } from '@mui/material/styles';
import Gravatar from 'react-gravatar';
import {UserContext} from '../../../App';



const ProfileContainer = styled('span') ({
    color: '#FEDC97',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '250px',
})


const ProfileCard = (props) => {

    const [user, setUser] = useContext(UserContext);

    return (
        <ProfileContainer>
            <EmojiEmotionsIcon/> {props.name} <Gravatar
                className='profileImage'
	            email={user.email}
	            size={300}
	            rating="pg"
	            default="wavatar"
	            style={{margin: '20px auto', borderRadius:'50%', display:'block', border:'4px solid #033F63'}}
            />
        </ProfileContainer>
    )
}

export default ProfileCard
