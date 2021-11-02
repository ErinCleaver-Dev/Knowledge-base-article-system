import React, {useState, useEffect} from 'react'
import { Container } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Config from '../../../config/index';
import {Button} from '@mui/material'


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

    
const FormattedBotton = styled(Button) ({
    background: '#033F63',
    color: '#FFFFFF',
    maxWidth: '150px',
    padding: '10px',
    marginLeft: '10px',
    minWidth: '100px',
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
                <FormattedBotton component={Link} to={`/EjKBA/edit_article/${props.user_id}/${props.article_id}#editArticle`}>Edit</FormattedBotton>
                <FormattedBotton type='button'>delete</FormattedBotton>
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
