import React, { useState, useEffect } from "react";
import SearchBox from "../../layout/search_box/SearchBox";
import axios from "axios";
import ArticleCardForSearchAndCategory from "../../layout/ArticleCard/ArticleCardForSearchAndCategory";
import { BackButton } from "../../layout/styledComponents/styledComponents";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import Config from "../../../config/index";
import Pagination from "@mui/material/Pagination";
import Cookies from "universal-cookie";

const Search = (props) => {
  const cookie = new Cookies();
  //console.log('test Search order 1')
  let search = props.location.search.replace("?q=", "");
  search = search.replaceAll("%20", " ");
  //const [sortBy, setSortBy] = useState('date');
  const [isLoadding, setLoadding] = useState(true);

  const [articleData, setArticleData] = useState({
    articles: "",
    sortby: "date",
    start: 1,
    pages: 1,
  });

  useEffect(() => {
    //console.log("testing axios")
    console.log(search);
    searchPost(1, search);
  }, [cookie.get("search"), props.location.search]);

  const searchPost = (page, search) => {
    console.log("search post");
    axios
      .post(`${Config.URL}api/findArticles`, {
        search: search,
        sort: articleData.sortby,
        start: page,
      })
      .then((response) => {
        if (response.data.articles) {
          setArticleData({
            ...articleData,
            start: page,
            pages: response.data.pages,
            articles: response.data.articles.reverse(),
          });
        }
        console.log("loaded data");
        if (!response.data.articles) {
          setLoadding("no articles found");
        }
      });

    setLoadding(false);
  };

  const StyledDiv = styled("div")({
    color: "#033F63",
    fontSize: "2.0em",
  });

  const Sort = styled(Box)({
    alignSelf: "flex-end",
    display: "flex",
  });

  const handleChange = (event, value) => {
    setLoadding(true);

    if (articleData.pages < value) {
      console.log("no articles found");
    } else {
      searchPost(value, search);
    }

    //console.log(value)
  };

  const PaginationArticles = styled(Pagination)({
    alignSelf: "center",
    marginTop: "10px",
    button: {
      color: "#033F63",
      fontSize: "1.8em",
      fontWeight: "bold",
      border: "none",
      background: "none",
    },
  });

  return (
    <>
      <BackButton />
      <h2 className="category_title">Search</h2>
      <SearchBox />
      <Sort>Newest to Oldest</Sort>
      {articleData.articles && !isLoadding ? (
        articleData.articles.map((data) => (
          <ArticleCardForSearchAndCategory
            width={"100%"}
            key={data._id}
            id={data._id}
            title={data.title}
            likes={data.likes}
            date={data.published_date}
            user_id={data.user_id}
          />
        ))
      ) : (
        <>Page is loading</>
      )}
      <PaginationArticles
        count={articleData.pages}
        defaultPage={articleData.start}
        onChange={handleChange}
        siblingCount={1}
      />
    </>
  );
};

export default Search;
