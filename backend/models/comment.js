const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "OTP", required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
