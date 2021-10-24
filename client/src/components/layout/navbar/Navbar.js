import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'
import logo from '../../../images/logo.svg'

const NavagationBar = styled(Box) ({
    display: 'flex',
    justifyContent: 'spaceBetween',
    backgroundColor: '#28666E',
    padding: '20px',
})

const Navbar = () => {
    return (
        <NavagationBar>
            <img className="logoImage" src={logo} />
        </NavagationBar>
    )
}

export default Navbar
