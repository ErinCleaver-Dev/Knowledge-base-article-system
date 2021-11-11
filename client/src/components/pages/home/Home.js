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
import { MdOutlineWeb } from 'react-icons/md';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';



const Home = () => {
    
    const  [user, setUser] = useContext(UserContext)

    const CategoryBox = styled(Box) ({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 33% [col-start])', 
    })
    
    const HomeButtons = styled(Button) ({
        backgroundColor: '#28666E',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '150px',
        marginLeft: '20px',
        marginBottom: '30px',
        fontSize: '1.8em',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#28666E'
        },
        ['@media (max-width:1024px)']: { 
            marginLeft: '10px',
            fontSize: '.9em',
            height: '100px',
        }
        
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
        marginTop: '80px',
        width: '100%',
    })
    
    const Articles = styled(Box) ({
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    })
    

    return (
        <>
            <h1 className="homeTitle">Welcome to the Knowledge Base Article System!</h1>
            {/* {console.log(articles)} */}
            <SearchBox />
            <CategoryBox>
                <HomeButtons component={Link} to='/EjKBA/category?q=react'>React</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=javascript'>Javascript</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=frontend'>Frontend</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=backend'>Backend</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=database'>Database</HomeButtons>
                <HomeButtons component={Link} to='/EjKBA/category?q=deployment'>Deployment</HomeButtons>
            </CategoryBox>
            <TopTen>
                <h1 className="homeTitle">Top 10 Articles</h1>
                <Articles>
                    {articles ? (
                    articles.map(data => (
                        <ArticleCard width={'48%'} 
                        key={data._id}
                        id={data._id}
                        title={data.title} 
                        likes={data.likes} 
                        date={data.published_date}
                        user_id={data.user_id}
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
