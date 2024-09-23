const Post = require("../models/post");
const Like = require("../models/like");
const { StatusCodes } = require("http-status-codes");

const postLike = async (req, res) => {
  const { user_id, post_id } = req.body;
  try {
    const existingLike = await Like.findOne({ _id: user_id });

    if (existingLike) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    const like = new Like({
      user_id,
      post_id,
    });
    await like.save();

    // increament the post likes_count
    const post = await Post.findById({ _id: post_id });
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Post Not Found!" });
    }

    post.likes_count += 1;
    await post.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post Liked Successfully!",
      likes_count: post.likes_count,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { postLike };
