import React, {useState, useEffect, useContext, createContext} from 'react';
import { UserContext } from '../../../App';
import Responses from './responses/Responses'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import {Button, Box} from '@mui/material'
import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components'
import {useLocation, Link} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import Config from '../../../config/index'
import Likes from './likes/Likes'
import _ from 'lodash';
import { keyframes } from '@mui/system';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ReactPlayer from 'react-player'


export const ArticleInfoContext = React.createContext();


const Title = styles(Box) ({
    fontSize: "2.8em",
    textAlign: "center",
    width: '100%',
    color: '#033F63',
    borderBottom: '1px solid #033F63',
    paddingBottom: '20px',
    marginBottom: '20px',
    maxWidth:'1440px',
})

const ContentBox1 = styled(Box) ({
    maxWidth:'1440px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    marginBottom: '30px',
    borderBottom: '1px solid #033F63',
})

const CategoryLists = styles(Box) ({
    display: 'flex',
    paddingTop: "10px",
    justifyContent:'space-between',
    color:'black',
    'a':{
        transition: '0.5s all ease',
        '&:hover':{
            backgroundColor:'#28666E',
            padding:'5px',
            borderRadius:'3px',
            color:'white'
        },
        '&:active':{
            color:'black'
        },
        '&:visited':{
            color:'black',
            '&:hover':{
                color:'white'
            }
        }  
    },
    button:{
        display:'flex',
        color:'white',
        alignItems:'center',
        cursor:'pointer',
        border:'none',
        backgroundColor:'#033F63',
        borderRadius:'5px',
        '&:hover':{
            backgroundColor:'#03022d'
        },
        '.saveIcon':{
            fontSize:'2em'
        },
        span:{
            padding:'5px',
            fontWeight:'bold',
            fontSize:'1.2em',
            letterSpacing:'1px',
            fontFamily: 'Acme, sans-serif'
        }
    }
})

const KeywordLists = styled(Box) ({
    maxWidth:'1440px',
    display: 'flex',
    paddingTop: "10px",
    h3: {
        paddingRight: "10px",
    },
    ul: {
        listStyle: 'none',
        flex:1,
        display: 'flex',
        gap: '10px',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    }
})

const breatheAnimation = keyframes`
 0% { top: 0px;}
 50% {top: 3px}
 100% {top: 0px}
`
const KeyWordLink = styles(Link)({
    textDecoration:'none',
    fontWeight:'bold',
    color:'black',
    display:'block',
    padding:'4px',
    border:'black 2px solid',
    borderRadius:'5px',
    position: 'relative',
    boxShadow:'1px 1px 5px black',
    animationName: `${breatheAnimation}`,
    animationDuration: '1.2s',
    animationTimingFunction: 'ease',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    '&:hover':{
        transform:'scale(1.2)',
        backgroundColor:'#033F63',
        color:'white'
    }
})


const ButtonBox = styled(Box) ({
    maxWidth:'1440px',
    display: 'flex',
    paddingTop: "10px",
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottom: "1px solid black",
    paddingBottom: "20px",
    height:'80px',
})

const HR = styled('div') ({
    maxWidth:'1440px',
    margin:'auto',
    padding: 0,
    borderTop: '1px solid #033F63'
})
        
const FormattedButton = styles(Button) ({
    background: '#033F63',
    color: '#FFFFFF',
    maxWidth: '150px',
    padding: '10px',
    marginLeft: '10px',
    minWidth: '100px',
    fontFamily: 'Acme, sans-serif',
    '&:hover': {
        backgroundColor: '#213946'
    },
    fontWeight:'bold',
    fontSize: '1em',
    ['@media (max-width:500px)']: {
        maxWidth:'100px',
        fontSize: '0.8em',
    }
})

const Display = styled('div') ({
    marginTop:'10px',
    maxWidth:'1440px',
    'pre':{
        background: '#808080a1',
        fontWeight: 'bolder',
        padding: '20px',
        marginTop: '10px',
        marginBottom: '10px',
        ['@media (max-width:500px)']: {
            overflowX: 'scroll',
            width: '316px',
        }
    } 
})


const ViewArticle = (props) => {
    const [render, setRender] = useState(false);
    console.log(render)
    const _id = props.match.params.id
    console.log(props.history)
    const [postContent,setPostContent] = useState({});
    const [article, setArticle] = useState([]);
    const [articleInfo, setArticleInfo] = useState({
        user_id: '',
        article_id: _id
    })
    const [saved, setSaved] = useState(false);

    const location = useLocation()
    console.log(location)

    const [user, setUser] = useContext(UserContext);
     useEffect(async() => {
        await axios.post(`${Config.URL}api/getArticle`, {
            _id: _id
        }).then((response) => {
            setArticle(response.data)
            setPostContent(draftToHtml(JSON.parse(response.data.post_content)));
        })

        if(localStorage.getItem('userSecret')){
           await axios.post(`${Config.URL}api/createViewedArticles`, {userId:localStorage.getItem('userSecret'), articleId:_id}).catch(e=> console.log(e));
        }

        //save article functionality
        await axios.get(`${Config.URL}api/getSavedArticles?userId=${localStorage.getItem('userSecret')}`).then((response) => {
            
            let articleResults = response.data.getSavedArticles;
            //console.log(articleResults)
            let saved = false;
            articleResults.map(article=>{
               if(article.article._id === _id){
                   saved = true;
               }
            })
            if(saved){
                setSaved(saved)
            }
        }).catch(e=>{
            //console.log(e)
        })
        
        //scroll to certain comment
        if (location.hash){
            let item = document.getElementById(location.hash.replace('#',''));
            let yPosition = item.getBoundingClientRect().top + window.pageYOffset 
            window.scroll({ top: yPosition-200, behavior:'smooth'})
        }
    }, [render]);

    //function for Save and unSave
    const saveAndUnSaveArticle = (e) =>{
        if(!saved){
            axios.post(`${Config.URL}api/createSavedArticles`, {userId:localStorage.getItem('userSecret'), articleId:_id}).then((result)=>{
                setSaved(true);
            }).catch(e=>{
                //console.log(e);
            });
        }else{
            axios.post(`${Config.URL}api/deleteSavedArticle`, {userId:localStorage.getItem('userSecret'), articleId: _id}).then((result)=>{
                setSaved(false);
            }).catch(e=>{
                //console.log(e);
            });
        }
    }


    const date = new Date(article.published_date)

    let video = article.video
    
    return (
        
        <ArticleInfoContext.Provider value={[articleInfo, setArticleInfo]}>  
            {article ? (
                <>
                        <Title>{article.title}</Title> 
                        <ContentBox1>
                        <BackButton/>
                        <p>Date published: {date.toDateString()}</p>
                        </ContentBox1>
                        {video ? (
                        <div className={video ? ('player-wrapper') : ('player-wrapper player-wrapper-not-found')}  >
                        <ReactPlayer
                            
                            className="react-player"
                            width='100%'
                            height='100%'
                            
                        url={video}>
                        </ReactPlayer>
                        </div>) : (null)}
                        
                        <Display dangerouslySetInnerHTML={{ __html: postContent }}></Display>
                        <HR/>
                <CategoryLists><h3>Categories: &nbsp; <Link to={`/EjKBA/category?q=${article.category}`} style={{fontSize:'1.4em', fontWeight:'normal'}}>{_.capitalize(article.category)}</Link></h3>{localStorage.getItem('userSecret')?<button onClick={saveAndUnSaveArticle}>{!saved?<><BookmarkBorderRoundedIcon className='saveIcon'/><span>Save</span></>:<><BookmarkRoundedIcon className='saveIcon'/><span>Saved</span></>}</button>:null}</CategoryLists>
                        <KeywordLists>
                        <h3>Keywords: </h3>
                        <ul>
                            {article.key_terms ? (<>
                                {article.key_terms.map((term, key) =>(
                                <li key={key}><KeyWordLink to={`/EjKBA/search?q=${term}`}>{term}</KeyWordLink></li>
                            ))}
                            </>) : (null) }
                        </ul>
                    </KeywordLists>

                </>
            ) : (<h2>Loaindg article...</h2>) }
           <ButtonBox>
               {article.user_id ? (<>
                {localStorage.getItem('isLoggedIn') && article.user_id.uid == user.uid ? ( 
                    <>
                        <FormattedButton component={Link} to={`/EjKBA/user_articles?author=${article.user_id._id}&delete=${_id}`}>Delete</FormattedButton>
                        <FormattedButton component={Link} to={`/EjKBA/edit_article/${localStorage.getItem('userSecret')}/${_id}`}>Edit Article</FormattedButton>
                    </>) : 
                    (null)
               }
               </>) : (null) }
               
               <Likes likes={article.likes} article_id={_id} />
           </ButtonBox>
           <Responses article_id ={_id} />
        </ArticleInfoContext.Provider>
        
    )
}

export default ViewArticle
