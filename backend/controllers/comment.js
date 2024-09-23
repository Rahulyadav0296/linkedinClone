const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const Post = require("../models/post");

const postComment = async (req, res) => {
  const { user_id, post_id, comment: commentText } = req.body;

  if (!user_id || !post_id || !commentText) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User ID, Post ID, and comment text are required.",
    });
  }

  try {
    const comment = new Comment({
      user_id,
      post_id,
      comment: commentText,
    });
    const savedComment = await comment.save();

    await Post.findByIdAndUpdate(
      post_id,
      { $push: { comments: savedComment._id } },
      { new: true }
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      comment: savedComment,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    });
  }
};

const getComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { postComment, getComment };
