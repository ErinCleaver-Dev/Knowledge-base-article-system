import React, {useState, useEffect} from 'react'
import { Container } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Config from '../../../config/index'

const ArticleCard = (props) => {

    const ArticleContainer = styled(Container) ({
        border: '2px solid #033F63',
        borderRadius: '5px',
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: props.width,
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
        ['@media (max-width:1280px)']: { 
            flex: 'none',
            width: '100%',
            margin: '5px',
        }

    })

    //console.log(props.user_id)
    const [userData, setUserData] = useState();
    useEffect (() => {
    axios.post(`${Config.URL}api/getUser`, {
        userId : props.user_id
    }).then((response) => {
        setUserData(response.data)
    })
    }, []);


    

    let date = new Date(props.date).toLocaleDateString()

    //console.log(userData)

    return (
        <ArticleContainer component={Link} to={`/EjKBA/view_article/${props.id}`}>
            <div>
                <h2>
                    {props.title}
                </h2>
                <p>
                    Likes: {props.likes}
                </p>
            </div>
            <div>
                <p>Date published: {date}</p>
                {userData ? (<p>Author : {userData.firstName} {userData.lastName}</p>) : (<p>loading...</p>)}                
            </div>
        </ArticleContainer>
    )
}

export default ArticleCard
