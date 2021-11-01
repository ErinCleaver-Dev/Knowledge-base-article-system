import React, {useEffect, useState} from 'react';
import UserArticlesCard from '../../layout/ArticleCard/UserArticlesCard';
import Config from '../../../config/index';
import axios from 'axios';


const UserArticles = (props) => {

    const [articles, setArticles] = useState([]);
    const [loadingError, setLoadingError] = useState('');

    useEffect(() => {
        axios.post(`${Config.URL}api/getUsersArticles`, {user_id: localStorage.getItem('userSecret')}).then((response) => {
            console.log(response.data)
            setArticles(response.data)
        }).catch(error => {
            console.log(error)
        })
    },[])

    return(
        <React.Fragment>
            {articles.length === 0 ? (<h1>You have not created any articles yet!</h1>):(
                articles.map(article=>{
                    return( 
                        <UserArticlesCard
                            user_id = {localStorage.getItem('userSecret')}
                            article_id = {article._id}
                            key = {article._id}
                            title={article.title} 
                            likes={article.likes} 
                            published_date={article.published_date}
                            last_revised_date = {article.last_revised_date}
                        />
                    )
                })
            )}
        </React.Fragment>
    )
}

export default UserArticles;