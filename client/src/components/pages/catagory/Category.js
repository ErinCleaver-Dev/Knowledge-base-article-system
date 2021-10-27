import React, {useState, useEffect} from 'react'
import SearchBox from '../../layout/search_box/SearchBox'
import axios from 'axios';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import { styled } from '@mui/material/styles';
import {Button, Box} from '@mui/material'
import Config from '../../../config/index'


const Category = (props) => {

    let category = props.location.search.replace('?q=', '')
    console.log(category)

    const [articles, setArticles] = useState();
    const [sortby, setSortBy] = useState('data');
    const [start, setStart] = useState(0);
    useEffect(() => {
        axios.post(`${Config.URL}api/getCategories`, {
        category : category,
        sort: sortby,
        start: start,
        }).then((response) => {
            setArticles(response.data)
        })
    }, []);
    
    const Sort = styled(Box) ({
        alignSelf: 'flex-end',
        display: 'flex',
    })

    return (
        <>
            <BackButton/>
            <h2 className="category_title">{category}</h2>
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

        </>
    )
}

export default Category
