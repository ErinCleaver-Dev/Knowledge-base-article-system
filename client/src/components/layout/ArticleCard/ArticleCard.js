import React, {useState, useEffect} from 'react'
import { Container, Grid } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Config from '../../../config/index';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { keyframes } from '@mui/system';

const ArticleCard = (props) => {


    const bigger = keyframes`
    from {
        transform: scale(0.6);
      }
      to {
        transform: scale(1.2);
      }
    `

    const ArticleContainer = styled(Container) ({
        border: '2px solid #033F63',
        borderRadius: '5px',
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: props.width,
        transition:'width 0.3s ease',
        color: '#033F63',
        margin: '10px',
        padding: '5px',
        boxSizing:'border-box',
        textDecoration: 'none',
        boxShadow:'3px 3px 5px black',
        'h2': {
            fontSize: '1.8em',
            paddingTop: '5px',
            paddingBottom: '5px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis',
            ['@media (max-width:1300px)']: { 
                width:'400px',
              },
            ['@media (max-width:660px)']: { 
                fontSize:'22px',
                width:'200px'
            },
            '&:hover':{
                wordBreak: 'break-word',
                width:'100%',
                whiteSpace:'normal',
                textShadow:'4px 4px 10px black'
            }     
        },
        'p': {
            fontSize: '1.2em',
            fontWeight: 'bold',
            paddingBottom: '5px',
        },
        '&:hover':{
            transform: 'scale(1.02)',
            transition: 'transform .2s ease-in-out',
            backgroundColor: '#28666E',
            color:'white'
        },
        '.icon1':{
            display:'inline-block',
            position:'relative',
            top:'2px',
            animation:`${bigger} 1.5s ease infinite`
        },
        '.icon2':{
            display:'inline-block',
            position:'relative',
            top:'2px',
        },
        '.pp':{
            fontSize: '1.2em',
            fontWeight: 'normal',
            ['@media (max-width:883px)']: { 
                marginLeft: '20px',
            }
        },
        ['@media (max-width:1100px)']: { 
            width:'100%'
          },
    })

    //console.log(props.user_id)
    const [userData, setUserData] = useState({});
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
            <Grid item container xs={12} md={10}>
                    <Grid item xs={12}>
                        <h2>{props.index ===0?(<span> 🥇 </span>):null}
                        {props.index ===1?(<span> 🥈 </span>):null}
                        {props.index ===2?(<span> 🥉 </span>):null}
                        {props.title}
                        </h2> 
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={3} md={4}>
                        <p><FavoriteIcon style={{color:'#ff00a5'}} className='icon1' fontSize="small"/>Likes:</p>
                            <p className='pp'>{props.likes}</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <p><ContactPageIcon style={{color:'black'}} className='icon2' fontSize="small"/>Author:</p>
                            <p className='pp'>{userData.displayName? userData.displayName:`${userData.firstName} ${userData.lastName}`}</p>
                        </Grid>
                        <Grid item xs={5} md={4}>
                            <p>Date published:</p>
                            <p className='pp'>{date}</p>
                        </Grid>
                    </Grid>
                </Grid>
        </ArticleContainer>
    )
}

export default ArticleCard
