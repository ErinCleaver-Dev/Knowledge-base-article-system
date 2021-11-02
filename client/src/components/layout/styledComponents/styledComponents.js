import {Button, Box} from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import backbutton from '../../../images/back.svg'
import {useHistory} from "react-router-dom";

const FormatedBackButton = styled(Button) ({
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
export const BackButton = () => {
    const history = useHistory();  

    return (
        <FormatedBackButton onClick={() => {
            history.goBack();
        }}>
            <img src={backbutton}/> <span>Go Back</span>
        </FormatedBackButton>
    )
}
