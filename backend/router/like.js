const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like");

router.post("/like", LikeController.postLike);

module.exports = router;
