import React, {useState, useEffect} from 'react'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import axios from 'axios';
import {Link} from 'react-router-dom'
import SearchBox from '../../layout/search_box/SearchBox'

const Home = () => {


    const CatagoryBox = styled(Box) ({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 33% [col-start])', 
    })
    
    const HomeButtons = styled(Button) ({
        backgroundColor: '#7C9885',
        color: '#033F63',
        height: '150px',
        marginLeft: '100px',
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
        axios.get('http://localhost:5000/api/topTen').then((response) => {
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
            {console.log(articles)}
            <CatagoryBox>
                <HomeButtons component={Link} to='/category?q=react'>React</HomeButtons>
                <HomeButtons component={Link} to='/category?q=javascript'>Javascript</HomeButtons>
                <HomeButtons component={Link} to='/category?q=frontend'>Frontend</HomeButtons>
                <HomeButtons component={Link} to='/category?q=backend'>Backend</HomeButtons>
                <HomeButtons component={Link} to='/category?q=database'>Database</HomeButtons>
                <HomeButtons component={Link} to='/category?q=deployment'>Deployment</HomeButtons>
            </CatagoryBox>
            <SearchBox />
            <TopTen>
                <h1 className="top10Title">Top 10 Articles</h1>
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
