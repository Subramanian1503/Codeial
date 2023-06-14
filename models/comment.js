// Requiring the mongoose
const mongoose = require("mongoose");

// Defining the comment schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamp: true,
  }
);

// Converting it into a model
const Comment = mongoose.model("Comment", commentSchema);

// Exports a model
module.exports = Comment