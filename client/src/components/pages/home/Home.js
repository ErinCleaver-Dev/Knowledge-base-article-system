import React from 'react'
import {Button, Box, OutlinedInput, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import ArticleCard from './ArticleCard'

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

const TopTen = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px'
})

const SearchBox = styled(OutlinedInput) ({
    alignSelf: 'center',
    width: '600px',
    ['@media (max-width:1024px)']: {
        width: '100%'
    }
})


const Home = () => {
    return (
        <>
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
                
            </TopTen>
        </>
    )
}

export default Home
