import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'

const SidebarNav =  styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spacebetween',
    backgroundColor: '#28666E',

    width: '200px',
    ['@media (max-width:1024px)']: {
        width: '100%',
        height: '0',
        flexDirection: 'row',
    }
})

const Sidebar = () => {
    return (
        <SidebarNav>   
        </SidebarNav>
    )
}

export default Sidebar
