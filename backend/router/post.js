const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");

router.get("/post", PostController.getPost);
router.post(
  "/post",
  PostController.upload.single("image"),
  PostController.createPost
);

module.exports = router;
