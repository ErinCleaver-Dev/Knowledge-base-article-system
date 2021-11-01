import React, {useState, useEffect} from 'react'
import { Container } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Config from '../../../config/index';

const UserArticlesCard = (props) => {

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

    /*-------------------------------------------------------*/
    const [userData, setUserData] = useState({});
    useEffect (() => {
    axios.post(`${Config.URL}api/getUser`, {
        userId : props.user_id
    }).then((response) => {
        setUserData(response.data)
    })
    }, []);


    let last_revised_date = 'none';
    if (props.last_revised_date){
        last_revised_date = new Date(props.last_revised_date).toLocaleDateString();
    }
    let published_date = new Date(props.published_date).toLocaleDateString();

    //console.log(userData)
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
                <Link to={`/EjKBA/edit_article/${props.user_id}/${props.article_id}#editArticle`}>Edit</Link>
                <button type='button'>delete</button>
            </div>
            <div>
                <p>Date published: {published_date}</p>
                <p>Author: Yourself</p>
                <p>Latest revise_date : {last_revised_date}</p>               
            </div>
        </ArticleContainer>
    )
}

export default UserArticlesCard
