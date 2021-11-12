import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom';


const Container2 = styled('div')({
    '.sidebarActive':{
        transform: 'translateX(200px)',
    }
})




const SidebarNav =  styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spacebetween',
    backgroundColor: '#28666E',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
  
    // ['@media (max-width:1024px)']: {
    //     width: '100%',
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     borderTopRightRadius: '0',
    //     alignItems:'center',
    //     borderBottomRightRadius: '0',
    //     minHeight:'unset'
    // },
    position:'fixed',
    zIndex:'999',
    left:'-200px',
    transition: '0.8s ease transform',
    ['@media (max-width:1024px)']: {
        top:'140px'
    },['@media (max-width:550px)']: {
        top:'105px',
       
    }
})


// const SidebarNavForCreateArticleAndEditArticle =  styled(Box)({
//     display: 'flex',
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     borderTopRightRadius: '0',
//     alignItems:'center',
//     borderBottomRightRadius: '0',
//     minHeight:'unset',
//     marginTop:'-50px',
//     backgroundColor: '#28666E',
//     marginBottom: '20px',
//     ['@media (max-width:1025px)']: {
//         marginTop:'-10px'
//     },
// })


const StyledButton = styled(Button) ({
    backgroundColor: '#033F63',
    minWidth: '170px',
    fontFamily: 'Acme, sans-serif',
    color: 'white',
    margin: '10px',
    padding: '10px',
    '&:hover' : {
        backgroundColor: '#06283C',
    },['@media (max-width:550px)']: {
        minWidth:'100px'
    }
     
})

const Sidebar = ({show, setShow}) => {

    // const location = useLocation();
    // console.log(location)
    // let display = false;
    // if (location.pathname.startsWith('/EjKBA/create_article') || location.pathname.startsWith('/EjKBA/edit_article')){
    //     display=true
    // }else{
    //     display=false
    // }

    return (
        <React.Fragment>
            
            <Container2>
                <SidebarNav className={show? ('sidebarActive'):('')}>   
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/profile">
                    Profile
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/create_article">
                    Create Article
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/user_articles">
                    User's Articles
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/saved_articles">
                    Saved Articles
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/comment_history">
                    Comment History
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/view_history">
                    View History
                </StyledButton>
                <StyledButton component={Link} onClick={()=>{setShow(false)}} to="/EjKBA/feedback_support">
                    Feedback/Support 
                </StyledButton>
            </SidebarNav>
            </Container2>
        </React.Fragment> 
    )
}

export default Sidebar
