import React from 'react';
import { Container, Grid } from '@mui/material/';
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const ViewedArticlesCard = (props) => {

    const ArticleContainer = styled(Container) ({
        border: '2px solid #033F63',
        borderRadius: '5px',
        backgroundColor:'#8fc0a98f',
        color: '#033F63',
        margin: '10px',
        padding: '5px',
        marginBottom: '0px',
        textDecoration: 'none',
        'h2': {
            fontSize: '1.8em',
            paddingTop: '5px',
            paddingBottom: '5px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis',
            ['@media (max-width:1089px)']: { 
                width:'500px',
              },
            ['@media (max-width:660px)']: { 
                fontSize:'22px',
                width:'200px'
            },
            '&:hover':{
                wordBreak: 'break-word',
                width:'100%',
                whiteSpace:'normal'
            }, 
        },
        'p': {
            fontSize: '1.3em',
            fontWeight: 'bold',
            paddingBottom: '5px',
            color:'#28666e'
        },
        '.pp':{
            fontSize: '1.2em',
            fontWeight: 'normal',
            ['@media (max-width:883px)']: { 
                marginLeft: '20px',
            }
        },
        ['@media (max-width:1280px)']: { 
            flex: 'none',
            width: '100%',
        },'.icon':{
            display:'inline-block',
            position:'relative',
            top:'4px'
        },'&:hover':{
            transform: 'scale(1.02)',
            transition: 'transform .2s ease-in-out',
            background:'#28666E',
            color:'white',
            'p':{
                color:'white'
            }
        },
        boxShadow:'1px 1px 5px black'

    })

    /*-------------------------------------------------------*/
   
    let viewed_date = new Date(props.viewed_date).toLocaleString();
   
    let published_date = new Date(props.published_date).toLocaleDateString();

    return (
        <ArticleContainer component={Link} to={`/EjKBA/view_article/${props.article_id}`}>
            <Grid container >
                <Grid item container xs={12} md={12}>
                    <Grid item xs={12}>
                        <h2>{props.title}</h2>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6} md={3}>
                            <p><FavoriteIcon style={{color:'#ff00a5'}} className='icon' fontSize="small"/>Likes:</p>
                            <p className='pp'>{props.likes}</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <p><ContactPageIcon style={{color:'black'}} className='icon' fontSize="small"/>Author:</p>
                            <p className='pp'> {props.userName}</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <p>Date published:</p>
                            <p className='pp'>{published_date}</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <p>Date viewed:</p>
                            <p className='pp'> {viewed_date}</p> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </ArticleContainer>
    )
}

export default ViewedArticlesCard;