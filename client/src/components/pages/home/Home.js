import React, {useState, useEffect} from 'react'
import {Button, Box, OutlinedInput, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import ArticleCard from './ArticleCard'
import axios from 'axios';



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
    
    const [article, setArticle] = useState();
    useEffect(() => {
        axios.get('http://localhost:5000/api/topTen').then((response) => {
            setArticle(response.data)
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
    
    const SearchBox = styled(OutlinedInput) ({
        alignSelf: 'center',
        width: '600px',
        ['@media (max-width:1024px)']: {
            width: '100%'
        }
    })

    return (
        <>
            {console.log(article)}
            <CatagoryBox>
                <HomeButtons>React</HomeButtons>
                <HomeButtons>Javascript</HomeButtons>
                <HomeButtons>Frontend</HomeButtons>
                <HomeButtons>Backend</HomeButtons>
                <HomeButtons>Database</HomeButtons>
                <HomeButtons>Deployment</HomeButtons>
            </CatagoryBox>
            <SearchBox
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            />
            <TopTen>
                <h1 className="top10Title">Top 10 Articles</h1>
                <Articles>
                    {article ? (<ArticleCard 
                    id={'1'}
                    title={"How to install React"} 
                    likes={1024} 
                    date={10/25/2021}
                    Author={"Jimmy Lo"}
                    />) : 
                    (<>Is Loading...</>)}
                   
                    
                </Articles>
            </TopTen>
        </>
    )
}

export default Home
