import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'
import {Link} from 'react-router-dom'


const SidebarNav =  styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spacebetween',
    backgroundColor: '#28666E',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    width: '200px',
    ['@media (max-width:1024px)']: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderTopRightRadius: '0',
        alignItems:'center',
        borderBottomRightRadius: '0',
        minHeight:'unset'
    },
    minHeight:'662px',
})

const StyledButton = styled(Button) ({
    backgroundColor: '#033F63',
    minWidth: '170px',
    color: 'white',
    margin: '10px',
    padding: '10px',
    '&:hover' : {
        backgroundColor: '#06283C',
    }
     
})

const Sidebar = () => {
    return (
        <SidebarNav>   
            <StyledButton component={Link} to="/EjKBA/profile">
                Profile
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/create_article">
                Create Article
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/user_articles">
                User's Articles
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/saved_articles">
                Saved Articles
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/comment_history">
                Comment History
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/view_history">
                View History
            </StyledButton>
            <StyledButton component={Link} to="/EjKBA/feedback_support">
                Feedback/Support 
            </StyledButton>
        </SidebarNav>
    )
}

export default Sidebar
