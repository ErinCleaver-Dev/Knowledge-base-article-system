import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { styled } from '@mui/material/styles';

import { Box } from '@mui/material'


const Main = styled(Box) ({
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'spaceBetween',
    marginTop: 40,
    ['@media (max-width:1024px)']: { 
        marginTop: 0,
    }
})
const BodyContainer = styled(Box)(({loggedIn})=>({
    margin: "0 40px",
    display: "flex",
    flex: 1.5,
    flexDirection: 'column',
    height: '100vh'
}))
const Body = (props) => {
    return (
        <div>
        <Navbar loggedIn={props.loggedIn}/>
            <Main>
                {props.loggedIn ? (<Sidebar/>) : (null)} 
                <BodyContainer>
                    {props.children}
                </BodyContainer>
            </Main>
        </div>
    )
}

export default Body
