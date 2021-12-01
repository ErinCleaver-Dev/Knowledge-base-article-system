import React, { useState, useContext, createRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Config from "../../../../config/index";
import { UserContext } from "../../../../App";
import { ArticleInfoContext } from "../ViewArticle";

const Likes = ({ likes, article_id }) => {
  const history = useHistory();
  const location = useLocation();

  const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext);

  const newLike = {
    article_id: articleInfo.article_id,
    user_id: articleInfo.user_id,
  };

  const clickHandler = () => {
    axios
      .post(`${Config.URL}api/likeArticle`, {
        newLike,
      })
      .then((response) => {
        let deleteLike = response.data;
        if (response) {
          axios.post(`${Config.URL}api/deleteLike`, {
            deleteLike,
          });
        }
      });
     setTimeout(() => {     
       window.location.reload(false)
     }, 4000)

  };

  useEffect(() => {
    countLikes()

  }, []);

  const countLikes = () => {
    axios.post(`${Config.URL}api/updateLikeCounter`, {
      article_id: articleInfo.article_id,
    });
  }

  const LikesIcon = styled(FavoriteIcon)({
    color: "#033F63",
    fontSize: "1.8em",
    paddingLeft: "10px",
    pointerEvents: localStorage.getItem("isLoggedIn") ? "auto" : "none",
    cursor: "pointer",
  });

  return (
    <>
      <LikesIcon onClick={clickHandler} /> Likes: {likes ? likes : 0}
    </>
  );
};

export default Likes;
