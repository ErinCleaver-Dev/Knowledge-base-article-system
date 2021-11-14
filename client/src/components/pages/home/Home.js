import React, {useState, useEffect, useContext} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import axios from 'axios';
import {Link} from 'react-router-dom'
import Config from '../../../config/index'
import SearchBox from '../../layout/search_box/SearchBox'
import { UserContext } from '../../../App';
import { FaReact, FaServer } from 'react-icons/fa';
import { SiJavascript, SiMongodb } from 'react-icons/si';
import {CgScreenWide} from 'react-icons/cg'
import { AiOutlineDeploymentUnit } from 'react-icons/ai';






const Home = () => {
 

    const  [user, setUser] = useContext(UserContext)

    const CategoryBox = styled(Box) ({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
        gridGap: '20px',
        boxSizing:'border-box',
        ['@media (max-width:600px)']: { 
            gridGap: '8px',
        }
    })
    
    const HomeButtons = styled(Button) ({
        backgroundColor: '#28666E',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        height: '150px',
        fontSize: '1.8em',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#014260'
        },
        ['@media (max-width:1024px)']: { 
            fontSize: '1.4em',
            height: '150px',
        },
        ['@media (max-width:600px)']: { 
            fontSize: '1em',
            height: '100px',
        },
        fontFamily: 'Acme, sans-serif',
        boxShadow: '4px 4px 4px black'
        
    })
    
    const [articles, setArticles] = useState();
    useEffect(() => {
        axios.get(`${Config.URL}api/topTen`).then((response) => {
            setArticles(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    const TopTen = styled(Box) ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        width: '100%',
        ['@media (max-width:600px)']: { 
            marginTop:'30px'
        },
    })
    
    
    const Articles = styled(Box) ({
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent:'center'
    })
    

    return (
        <>
            <h1 className="homeTitle">Welcome to the Knowledge Base Article System!</h1>
            {/* {console.log(articles)} */}
            <SearchBox />
            <CategoryBox>
                <HomeButtons component={Link} to='/EjKBA/category?q=react'><FaReact style={{color:'lightblue'}}/>React</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=javascript'><SiJavascript style={{color:'yellow'}}/>Javascript</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=frontend'><CgScreenWide style={{color:'black'}}/>Frontend</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=backend'><FaServer style={{color:'lightGray'}}/>Backend</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=database'><SiMongodb style={{color:'#12b412'}}/>Database</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=deployment'><AiOutlineDeploymentUnit style={{color:'#d419d4'}}/>Deployment</HomeButtons>
            </CategoryBox>
            <TopTen>
                <h1 className="homeTitle">Top 10 Articles</h1>
                <Articles>
                    {articles ? (
                    articles.map((data, i) => (
                        <ArticleCard width={'48%'} 
                        key={data._id}
                        id={data._id}
                        title={data.title} 
                        likes={data.likes} 
                        date={data.published_date}
                        user_id={data.user_id}
                        index={i}
                        />
                    ))
                    ) : 
                    (<>Is Loading...</>)}
                   
                </Articles>
            </TopTen>
        </>
    )
}

export default Home
