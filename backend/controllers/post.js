const multer = require("multer");
const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const createPost = async (req, res) => {
  const { user_id, content } = req.body;
  const imagePath = req.file ? req.file.path : "";
  console.log("user id is: ", user_id);
  try {
    const newPost = new Post({
      user_id,
      content,
      image: imagePath,
    });
    await newPost.save();
    res.status(StatusCodes.OK).json({ success: true, post: newPost });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Post Details fetched successfully!",
      data: posts,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createPost, getPost, upload };
