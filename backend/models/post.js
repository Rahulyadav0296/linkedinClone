const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "OTP",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store image as Buffer
  },
  imageType: {
    type: String, // Store the image MIME type (e.g., 'image/jpeg', 'image/png')
  },
  likes_count: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
