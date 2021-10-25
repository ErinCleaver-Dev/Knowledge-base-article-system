import React from 'react'
import { Container } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom'



const ArticleCard = (props) => {

    const ArticleContainer = styled(Container) ({
        border: '2px solid #033F63',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        color: '#033F63',
        margin: '10px',
        padding: '5px',
        textDecoration: 'none',
        'h2': {
            fontSize: '1.8em',
            paddingTop: '5px',
            paddingBottom: '5px'
        },
        'p': {
            fontSize: '1.2em',
            fontWeight: 'bold',
            paddingBottom: '5px'
        },
        ['@media (max-width:1024px)']: { 
            flex: 'none',
            width: '100%',
            margin: '5px',
        }

    })

    return (
        <ArticleContainer component={Link} to={`id:${props.id}`}>
            <div>
                <h2>
                    {props.title}
                </h2>
                <p>
                    Likes: {props.likes}
                </p>
            </div>
            <div>
                <p>Date published: {props.date}</p>
                <p>Author : {props.author}</p>
            </div>
        </ArticleContainer>
    )
}

export default ArticleCard
