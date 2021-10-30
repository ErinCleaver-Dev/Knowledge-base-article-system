import React, {useState, useEffect} from 'react'
import SearchBox from '../../layout/search_box/SearchBox'
import axios from 'axios';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import { styled } from '@mui/material/styles';
import {Button, Box} from '@mui/material'
import Config from '../../../config/index'
import Pagination from '@mui/material/Pagination';


const Search = (props) => {

    let search = props.location.search.replace('?q=', '')
    const [articles, setArticles] = useState();
    const [sortby, setSortBy] = useState('data');
    const [start, setStart] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        console.log("testing axois")
        axios.post(`${Config.URL}api/findArticles`, {
        search : search,
        sort: sortby,
        start: start,
        }).then((response) => {
            setArticles(response.data.articles)
            setPages(response.data.pages)
        })
    }, []);

    const StyledDiv = styled('div') ({
        color: "#033F63",
        fontSize: '2.0em',
    })
    
    const Sort = styled(Box) ({
        alignSelf: 'flex-end',
        display: 'flex',
    })

    const handleChange = (event, value) => {

        if(pages < value) {
            console.log('no articles found');

        }
        console.log(value)
    }

    const PaginationArticles = styled(Pagination) ({
        alignSelf: 'center',
        button: {
            color: '#033F63',
            fontSize: '1.8em',
            fontWeight: 'bold',
            border: 'none',
            background: 'none',
            
        },
    })

    return (
        <>
            <BackButton/>
            <h2 className="category_title">Search</h2>
            <SearchBox />
            <Sort>
                Sort by
            </Sort>
            {articles ? (
                articles.map(data => (
                    <ArticleCard 
                    width={'100%'}
                    key={data._id}
                    id={data._id}
                    title={data.title} 
                    likes={data.likes} 
                    date={data.published_date}
                    user_id={data.user_id}
                    />
                ))
                
                ) : 
                (<>Is Loading...</>)
            }
            <PaginationArticles count={pages} defaultPage={start} onChange={handleChange} siblingCount={0} />

        </>
    )
}

export default Search
