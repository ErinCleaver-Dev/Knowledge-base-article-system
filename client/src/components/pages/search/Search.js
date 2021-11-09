import React, {useState, useEffect} from 'react'
import SearchBox from '../../layout/search_box/SearchBox'
import axios from 'axios';
import ArticleCard from '../../layout/ArticleCard/ArticleCard'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import { styled } from '@mui/material/styles';
import {Button, Box} from '@mui/material'
import Config from '../../../config/index'
import Pagination from '@mui/material/Pagination';
import Cookies from 'universal-cookie';


const Search = (props) => {

    const cookie = new Cookies();
    //console.log('test Search order 1')
    let search = props.location.search.replace('?q=', '')
    search = search.replace('%20', ' ')
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('date');
    const [start, setStart] = useState(1);
    const [pages, setPages] = useState(1);


    const [articleData, setArticleData] = useState({
        articles: "",
        sortby: 'date',
        start: 1,
        pages: 1
    });

    
    useEffect(() => {
        //console.log("testing axios")
        search = search.replace('%20', ' ');
        console.log(search)
        axios.post(`${Config.URL}api/findArticles`, {
            search : search,
            sort: articleData.sortby,
            start: articleData.start,
            }).then((response) => {
                setArticleData({...articleData, pages: response.data.pages, articles : response.data.articles})
             
            })
    }, [cookie.get('search'), props.location.search]);

    const StyledDiv = styled('div') ({
        color: "#033F63",
        fontSize: '2.0em',
    })
    
    const Sort = styled(Box) ({
        alignSelf: 'flex-end',
        display: 'flex',
    })

    const handleChange = (event, value) => {

        if(articleData.pages < value) {
            console.log('no articles found');

        }
        //console.log(value)
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
                Sort by date
            </Sort>
            {articleData.articles ? (
                articleData.articles.map(data => (
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
                (<>Page is loading</>)
            }
            <PaginationArticles count={pages} defaultPage={start} onChange={handleChange} siblingCount={1} />

        </>
    )
}

export default Search
