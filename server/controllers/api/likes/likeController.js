const { Router } = require("express");

const router = Router();
const articleService = require("../../../services/articleService");
const likesService = require("../../../services/likesService");

router.post("/api/likeArticle", (req, res, next) => {
  likesService
    .createLikes(req.body.newLike.user_id, req.body.newLike.article_id)
    .then((results) => {
      if (results) {
        console.log("11111111111111111111");
        console.log(results);
        res.send(results);
      } else {
        res.send({ message: results });
      }
    })
    .catch(next);
});

router.post("/api/deleteLike", (req, res, next) => {
  if (req.body.deleteLike) {
    likesService.deleteLike(req.body.deleteLike).then((result) => {
      // console.log("111111111111111111", result);
      res.send({ message: result });
    });
  } else {
    res.status(200).json({ errors: [{ msg: "failed to delete article" }] });
  }
});

router.post("/api/updateLikeCounter", (req, res, next) => {
  let article_id = req.body.article_id;
  if (article_id) {
    likesService
      .getLikes(article_id)
      .then((count) => {
        //res.header("Access-Control-Allow-Origin", "*");/don't need this
        //console.log(count);
        //res.send(String(count));
        res.send({ message: "counterUpdated" });
      })
      .catch(next);
  } else {
    return res
      .status(200)
      .json({ errors: [{ msg: "failed to find article" }] });
  }
});

router.post("/api/checkLikedCondition", (req, res) => {
  likesService
    .getLikeCondition(req.body.user_id, req.body.article_id)
    .then((result) => res.send({ liked: result }));
});

module.exports = router;
