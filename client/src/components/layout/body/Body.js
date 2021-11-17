import React, {useState} from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { styled } from '@mui/material/styles';

import { Box, } from '@mui/material'


const Main = styled(Box) ({
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'spaceBetween',
    marginTop: 40,
    ['@media (max-width:1024px)']: { 
        marginTop: 0,
    },
    '.buttonActive':{
        transform: 'translateX(141px) scale(1.1)',
        boxShadow:'black 2px 2px 15px ',
        ['@media (max-width:550px)']: { 
            transform: 'translateX(121px) scale(1.1)',
          },
    }
})
const BodyContainer = styled(Box)({
    margin: "0 40px",
    display: "flex",
    flex: 1.5,
    flexDirection: 'column',
    paddingBottom: '50px',
    ['@media (max-width:1024px)']: {
        margin: "10px 10px",
    },
})

const SideBarButton = styled('button')({
    fontFamily: 'Acme, sans-serif',
    color:'White',
    position:'fixed',
    backgroundColor:'#033F63',
    zIndex:'1000',
    top:'113px',
    padding:'5px',
    width:'200px',
    border:'none',
    textAlign:'right',
    borderTopRightRadius:'50px',
    borderBottomRightRadius:'50px',
    left:'-140px',
    cursor:'pointer',
    boxShadow:'black 2px 2px 1px ',
    '&:hover':{
        fontSize:'1em'
    },
    transition: '.8s ease all',
    ['@media (max-width:550px)']: { 
      top:'80px',
      width:'220px',
      left:'-160px',
    },
})

const Body = (props) => {

    const [show, setShow] = useState(false)
    return (
        <div>
        
        <Navbar loggedIn={props.loggedIn}/>
            <Main>
                {props.loggedIn ?(<SideBarButton className={show?('buttonActive'):('')} onClick={()=>{setShow(!show)}}>Side Bar
                </SideBarButton>):(null)}
                {props.loggedIn ? (<Sidebar show={show} setShow={setShow}/>) : (null)} 
                <BodyContainer onClick={()=>{setShow(false)}}>
                    {props.children}
                </BodyContainer>
            </Main>
        
        </div>
    )
}

export default Body
