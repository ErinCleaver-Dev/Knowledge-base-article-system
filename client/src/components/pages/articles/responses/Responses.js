import React, {useState, useEffect} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';


const FormatedButton = styled(Button) ({
    background: '#033F63',
    color: '#FFFFFF',
    maxWidth: '150px',
    padding: '10px',
    img: {
        height: '30px'
    },
    span: {
        paddingLeft: '10px',
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    '&:hover': {
        backgroundColor: '#213946'
    }
})

const ResponsesBox = styled(Box) ({
    marginTop: '40px',
})


const Responses = ({article_id}) => {
    

    return (
        <ResponsesBox>
            {localStorage.getItem('isLoggedIn') ? (<FormatedButton>New Post</FormatedButton>) : (null)}
            
        </ResponsesBox>
    )
}

export default Responses
