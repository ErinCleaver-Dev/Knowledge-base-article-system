import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'
import logo from '../../../images/logo.svg'
import {NavLink} from 'react-router-dom'
import ProfileCard from './ProfileCard'

const NavagationBar = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#28666E',
    padding: '20px 40px',
})

const StyledNavLink = styled(NavLink) ({
    color: 'white',
    textDecoration: 'None',
    fontSize: '1.4em',
    fontWeight: 'bold',
    paddingLeft: '60px'
})

const Navbar = (props) => {
    return (
        <NavagationBar>
            <img className="logoImage" src={logo} />
            <div className="nav">
                {props.loggedIn ? (
                    <StyledNavLink to="/profile" >
                        <ProfileCard name={'Hello,  Jimmy Lo'}/> 
                    </StyledNavLink>
                    ) : 
                    (null)
                }
                <StyledNavLink to="/" >Home</StyledNavLink>
                {props.loggedIn ? (
                    <StyledNavLink to="/logout" >Logout</StyledNavLink>
                ) : (
                    <>
                    <StyledNavLink to="/login" >Login</StyledNavLink>
                    <StyledNavLink to="/Singup" >Logout</StyledNavLink>
                    </>
                )}
            </div>
        </NavagationBar>
    )
}

export default Navbar
