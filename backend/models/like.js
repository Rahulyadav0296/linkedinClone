const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "OTP", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  created_at: { type: Date, default: Date.now },
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
