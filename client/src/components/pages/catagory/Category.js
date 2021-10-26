import React, {useState, useEffect} from 'react'
import SearchBox from '../../layout/search_box/SearchBox'
import axios from 'axios';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import { styled } from '@mui/material/styles';


const Category = (props) => {

    let category = props.location.search.replace('?q=', '')
    console.log(category)

    const [articles, setArticles] = useState();
    useEffect(() => {
        axios.post('http://localhost:5000/api/getCategories', {
        category : category
        }).then((response) => {
            setArticles(response.data)
        })
    }, []);

   
    return (
        <>
            <BackButton/>
            <h2 className="category_title">React</h2>
            <SearchBox />
            {console.log(articles)}
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
                    (<>Is Loading...</>)}
        </>
    )
}

export default Category
