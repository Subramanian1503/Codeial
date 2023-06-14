// Requiring the comment model to do CRUD actions
const Comment = require("../models/comment");

const Post = require("../models/post");

// Deleting a comment and remvoving it from Posts
module.exports.deleteComment = async function (request, response) {
  try {
    // Getting the comment identifier from params to delete
    const commentId = request.params.id;
    console.log(`Requested comment to delete: ${commentId}`);

    // Find the comment
    await Comment.findById(commentId);
    if (request.user.id == comment.user.id) {
      // Getting the post identifier to remove comments
      const postId = comment.post.id;
      console.log(`Requested comment of the post: ${postId} to delete`);

      // If present, Delete the comment
      await Comment.findByIdAndRemove(commentId);
      console.log(`Found the comment with requested commentId`);

      // If Delete successful, Delete the comment id from comments of post
      await Post.findById(postId);

      // Find the index to remove from post comments
      const commentIndex = post.comments.indexOf(commentId);

      // Remove the index
      if (commentIndex > -1) {
        post.comments.splice(commentIndex, 1);
        post.save();
      }

      // Redirecting to the same page
      return response.redirect("back");
    } else {
      console.log(`user not authorized to delete comment`);
      return response.redirect("back");
    }
  } catch (error) {
    console.log(`error while trying to find the comment`);
    return response.redirect("back");
  }
};

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
