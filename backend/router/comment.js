const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment");

router.post("/comment", CommentController.postComment);
router.get("/comment/:id", CommentController.getComment);

module.exports = router;
