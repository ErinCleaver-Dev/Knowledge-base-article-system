import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Button} from '@mui/material'

const SidebarNav =  styled(Box) ({
    display: 'flex',
    justifyContent: 'spacebetween',
    backgroundColor: '#28666E',
    height: '800px',
    width: '200px',
})

const Sidebar = () => {
    return (
        <SidebarNav>   
        </SidebarNav>
    )
}

export default Sidebar
