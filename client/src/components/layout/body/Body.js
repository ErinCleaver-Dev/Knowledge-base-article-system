import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { styled } from '@mui/material/styles';

import { Box } from '@mui/material'


const Main = styled(Box) ({
    display: 'flex',
    justifyContent: 'spaceBetween',
    marginTop: 40,
})

const Container = styled(Box) ({
    margin: "0 40px",
})
const Body = (props) => {
    return (
        <div>
        <Navbar loggedIn={props.loggedIn}/>
            <Main>
                {props.loggedIn ? (<Sidebar/>) : (null)} 
                <Container>
                    {props.children}
                </Container>
            </Main>
        </div>
    )
}

export default Body
