// Requiring the comment model to do CRUD actions
const Comment = require("../models/comment");

const Post = require("../models/post");

// Defining the action to create a comment
module.exports.create = (request, response) => {
  // Getting the post of the comment
  console.log(request.body);

  const postId = request.body.post;
  console.log(postId);

  Post.findById(postId)
    .then((post) => {
      // Create comment for the post
      console.log(request.user);
      Comment.create({
        content: request.body.content,
        user: request.user._id,
        post: postId,
      })
        .then((comment) => {
          // Adding the comment id to post
          post.comments.push(comment);
          post.save();
          response.redirect("/");
        })
        .catch((error) => {
          console.log("Error while trying to create comment");
        });
    })
    .catch((error) => {
      console.log(`Error while trying to find post : ${error}`);
    });
};
