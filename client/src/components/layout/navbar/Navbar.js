import React, {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'
import logo from '../../../images/logo.svg'
import {NavLink} from 'react-router-dom'
import ProfileCard from './ProfileCard'
import MenuIcon from '@mui/icons-material/Menu';
import {useContext} from 'react';
import { UserContext } from '../../../App';
import axios from 'axios';
import config from '../../../config';

// added state for hammburder button.

const Navbar = (props) => {
    const [displayed, setDisplayed] = useState('none')
    const [user, setUser]= useContext(UserContext);
    const [name, setName] = useState(false);


    useEffect(()=>{
        if(user){
            if(user.displayName){
                setName(user.displayName);
                return
            }
            axios.post(`${config.URL}api/getUserByUid`, {uid:user.uid}).then(result=>{
                    if(result.data.displayName){
                        setName(result.data.displayName);
                        return
                    }
                    let firstName = result.data.firstName;
                    let lastName =  result.data.lastName;
                    setName(firstName + " " + lastName);
                }).catch(e=>{
                    console.log(e)
                }) 
        }
    },[user])



    const clickedHamburger = () => {
        if(displayed == 'none') {
            setDisplayed('flex')
        } else {
            setDisplayed('none')
        }
    }
    
    const NavagationBar = styled(Box) ({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#28666E',
        padding: '20px 40px',
        ['@media (max-width:1024px)']: {
            padding: '20px 20px',
            justifyContent: 'none',
            alignItems: 'none',
        }
    })


    const HamburgerButton = styled(MenuIcon) ({
        color: 'white',
        display: 'none',
        paddingLeft: '40px',
        ['@media (max-width:1024px)']: {
            display: 'block'
        },
        cursor:'pointer'
    })

    const StyledNavLink = styled(NavLink) ({
        color: 'white',
        textDecoration: 'None',
        fontSize: '1.4em',
        fontWeight: 'bold',
        height: '60px',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#213946'
        },
        ['@media (max-width:1024px)']: {
            paddingLeft: '0',
            height: '0',
            padding: '20px 20px',
        }
        

    })

    const Hamburger = styled('div') ({
        display: 'flex',
        alignItems: 'center',

        ['@media (max-width:1024px)']: {
            display: displayed,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '70px',
            position: 'absolute',
            right: 0,
            width: '100%',
            zIndex: '1',
            backgroundColor: '#28666E',
            
        }
    })

    return (
        <NavagationBar>
            <img className="logoImage" src={logo} />
            <div className="nav">
                {props.loggedIn ? (
                    <StyledNavLink to="/EjKBA/profile" >
                        <ProfileCard name={'Hello, ' + name}/> 
                    </StyledNavLink>
                    ) : 
                    (null)
                }
                <HamburgerButton onClick={clickedHamburger}/>

                <Hamburger>
                    <StyledNavLink to="/" onClick={()=>{setDisplayed('none')}} >Home</StyledNavLink>
                    {props.loggedIn ? (
                        <>
                        <StyledNavLink to="/EjKBA/logOut" onClick={()=>{setDisplayed('none')}}>Logout</StyledNavLink>
                        </>
                        
                    ) : (
                        <>
                        <StyledNavLink to="/EjKBA/logIn" onClick={()=>{setDisplayed('none')}}>Login</StyledNavLink>
                        <StyledNavLink to="/EjKBA/signUp" onClick={()=>{setDisplayed('none')}}>Sign up</StyledNavLink>
                        </>
                    )}
                </Hamburger>
            </div>
        </NavagationBar>
    )
}

export default Navbar
