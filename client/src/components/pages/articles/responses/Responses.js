import React, {useState, useEffect} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {useHistory} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import NewPost from "./NewPost"

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

const Form = styled("form") ({

})

const Responses = ({article_id}) => {
    
    

    
    return (
        <ResponsesBox>
            {localStorage.getItem('isLoggedIn') ? (<>
                <NewPost article_id={article_id}/>
                </>
            ) : 
            (null)
            }
            
        </ResponsesBox>
    )
}

export default Responses
