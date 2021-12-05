import React, { useState, useContext, createRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Config from "../../../../config/index";
import { UserContext } from "../../../../App";
import { ArticleInfoContext } from "../ViewArticle";

const Likes = ({ likes, article_id, setRender }) => {
  const [liked, setLiked] = useState(false);
  const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext);
  //console.log(articleInfo);

  useEffect(() => {
    if (localStorage.getItem("userSecret")) {
      axios
        .post(`${Config.URL}api/checkLikedCondition`, {
          user_id: localStorage.getItem("userSecret"),
          article_id: articleInfo.article_id,
        })
        .then((result) => {
          console.log(result.data.liked);
          if (result.data.liked) {
            setLiked((prev) => !prev);
          }
        });
    }
  }, []);

  const newLike = {
    article_id: articleInfo.article_id,
    user_id: articleInfo.user_id,
  };

  const countLikes = (fun) => {
    console.log("Testing count likes");
    axios
      .post(`${Config.URL}api/updateLikeCounter`, {
        article_id: articleInfo.article_id,
      })
      .then((result) => {
        fun((prev) => !prev);
      });
  };

  const clickHandler = () => {
    setLiked((prev) => !prev);
    console.log("clicked");
    axios
      .post(`${Config.URL}api/likeArticle`, {
        newLike,
      })
      .then((response) => {
        let deleteLike = response.data;
        console.log(response.data);
        if (typeof response.data === "string") {
          console.log(response.data);
          axios
            .post(`${Config.URL}api/deleteLike`, {
              deleteLike,
            })
            .then((response) => {
              console.log(response.data);
              countLikes(setRender);
            });
        } else {
          countLikes(setRender);
        }
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 500);
      });
  };

  const LikesIcon = styled(FavoriteIcon)({
    color: "#033F63",
    fontSize: "1.8em",
    pointerEvents: localStorage.getItem("isLoggedIn") ? "auto" : "none",
    cursor: "pointer",
    transition: "all ease 0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  });

  const UnLikesIcon = styled(FavoriteBorderIcon)({
    color: "#033F63",
    fontSize: "1.8em",
    pointerEvents: localStorage.getItem("isLoggedIn") ? "auto" : "none",
    cursor: "pointer",
  });

  return (
    <>
      {localStorage.getItem("userSecret") ? (
        <>
          {liked ? (
            <>
              <LikesIcon onClick={clickHandler} /> Likes: {likes ? likes : 0}
            </>
          ) : (
            <>
              <UnLikesIcon onClick={clickHandler} /> Likes: {likes ? likes : 0}
            </>
          )}
        </>
      ) : (
        <>
          <LikesIcon /> Likes: {likes ? likes : 0}
        </>
      )}
    </>
  );
};

export default Likes;
