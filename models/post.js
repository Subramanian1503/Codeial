// Requiring mongoose to define the schema
const mongoose = require("mongoose");

// Define the schema using mongoose
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Convert the schema into a model by providing its name
const Post = mongoose.model("Post", postSchema);

// Export the model to use the model in different files
module.exports = Post;
