import React, { useState, useContext, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import styles from "styled-components";
import { ValidateCommentType, ValidatePost } from "./postValidator";
import { Button, Box } from "@mui/material";
import axios from "axios";
import Config from "../../../../config/index";
import { UserContext } from "../../../../App";
import { ArticleInfoContext } from "../ViewArticle";
import Gravatar from "react-gravatar";
import SendIcon from "@mui/icons-material/Send";

const NewPost = (props) => {
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [articleInfo, setArticleInfo] = useContext(ArticleInfoContext);
  const postRef = useRef();
  const [clickedValueForCommentAndIssue, setClickedValueForCommentAndIssue] =
    useState("");

  const [newPost, setNewPost] = useState({
    userResponse_type: "",
    post_content: "",
    article_id: "",
    user_id: "",
  });

  useEffect(() => {
    if (newPost.post_content) {
      postRef.current.value = newPost.post_content;
      postRef.current.focus();
    }
  });

  const handleNewPost = (event) => {
    if (props.article_id == "") {
      setError("failed to load article id.");
    } else if (ValidatePost(newPost.post_content)) {
      setError("Please enter a post.");
    } else if (ValidateCommentType(newPost.userResponse_type)) {
      setError("Please select comment or issue");
    } else {
      if (newPost.article_id != "") {
        console.log(newPost);
        axios.post(`${Config.URL}api/creatPost`, {
          post: newPost,
        });
        window.location.reload();
      }
    }
  };

  const handlePostChange = (event) => {
    setNewPost({ ...newPost, post_content: event.target.value });
  };

  const FormattedGroup = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
  });
  const FormattedRadio = styled(Button)((props) => ({
    backgroundColor: props.isclicked.color,
    boxShadow: props.isclicked.shadow,
    color: "#FFFFFF",
    width: "150px",
    textAlign: "center",
    marginLeft: "10px",
    marginBottom: "5px",
    fontSize: "1.2em",
    padding: "5px 5px",
    borderRadius: "5px",
    fontFamily: "Acme, sans-serif",
    "&:hover": {
      backgroundColor: "#213946",
    },
    "&:focus": {
      backgroundColor: "#213946",
    },
  }));

  const LeaveCommentGroup = styled("div")({
    position: "relative",
    ".profileImage": {
      boxShadow: "3px 3px 20px black",
      outline: "5px double #033F63",
      marginRight: "10px",
      height: "60px",
      width: "60px",
      position: "absolute",
      top: "18px",
      left: "16px",
      ["@media (max-width:500px)"]: {
        height: "45px",
        width: "45px",
        top: "26px",
      },
    },
  });

  const FormattedButton = styled(Button)({
    background: "#033F63",
    color: "#FFFFFF",
    maxWidth: "150px",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#213946",
      transform: "scale(1.2)",
    },
    position: "absolute",
    right: "10px",
    top: "31px",
    transition: "0.3s ease all",
    fontFamily: "Acme, sans-serif",
    boxShadow: "1px 1px 5px black",
    ["@media (max-width:500px)"]: {
      ".icon": {
        fontSize: "1.5em",
        marginLeft: "2px",
      },
      minWidth: "40px",
      right: "22px",
    },
  });
  const StyledTextArea = styles.textarea`
        width: 100%;
        min-height: 100px;
        resize: vertical;
        padding: 10px 100px;
        marginBottom: 10px;
        box-shadow: 1px 1px 5px black;
        border-radius: 10px;
        box-sizing:border-box;
        outline:none;
        font-size: 1.2em;
        font-weight:bold;
        @media (max-width:500px){ 
            padding: 10px 75px;
         }
    `;

  const ErrorMessage = styled(Box)({
    color: "red",
    textSize: "1.7em",
  });

  const handleToggle = (event) => {
    setNewPost({
      ...newPost,
      userResponse_type: event.target.value,
      user_id: articleInfo.user_id,
      article_id: articleInfo.article_id,
    });
    setClickedValueForCommentAndIssue(event.target.value);
    //console.log('set type', event.target.value)
  };

  //console.log("Testing new post ", newPost)

  return (
    <>
      <FormattedGroup aria-label="type">
        <FormattedRadio
          value="comment"
          onClick={handleToggle}
          name="Comment"
          isclicked={
            "comment" === clickedValueForCommentAndIssue
              ? { color: "black", shadow: "1px 1px 10px black" }
              : { color: "#033F63", shadow: "none" }
          }
        >
          Comment
        </FormattedRadio>
        <FormattedRadio
          value="issue"
          onClick={handleToggle}
          name="Issue"
          isclicked={
            "issue" === clickedValueForCommentAndIssue
              ? { color: "black", shadow: "1px 1px 10px black " }
              : { color: "#033F63", shadow: "none" }
          }
        >
          Issue
        </FormattedRadio>
      </FormattedGroup>
      <LeaveCommentGroup>
        <Gravatar
          className="profileImage"
          email={"xxxx@gmail.com"}
          size={100}
          rating="pg"
          default="mp"
          style={{
            margin: "0 10px 0 0",
            borderRadius: "50%",
            display: "block",
          }}
        />
        <StyledTextArea
          ref={postRef}
          name="post_content"
          onChange={handlePostChange}
        />

        <FormattedButton onClick={handleNewPost}>
          <SendIcon className="icon" />
        </FormattedButton>
      </LeaveCommentGroup>
      {error != "" ? <ErrorMessage>{error}</ErrorMessage> : null}
    </>
  );
};

export default NewPost;
