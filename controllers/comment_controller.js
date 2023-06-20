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
    const comment = await Comment.findById(commentId);
    if (request.user.id == comment.user) {
      // Getting the post identifier to remove comments
      const postId = comment.post;
      console.log(`Requested comment of the post: ${postId} to delete`);

      // If present, Delete the comment
      await Comment.findByIdAndRemove(commentId);
      console.log(`Found the comment with requested commentId`);

      // If Delete successful, Delete the comment id from comments of post
      console.log("Finding the post");
      const post = await Post.findById(postId);

      // Find the index to remove from post comments
      console.log("Finding the index of comment");
      const commentIndex = post.comments.indexOf(commentId);

      // Remove the index
      if (commentIndex > -1) {
        console.log("Removing and saving the comment");
        post.comments.splice(commentIndex, 1);
        post.save();
      }

      // Returning the resonse for Xhr request to deYlete the comment
      if (request.xhr) {
        return response.status(200).json({
          data: {
            comment_id: commentId,
          },
          message: "Comment deleted successfully",
        });
      }

      // Redirecting to the same page
      return response.redirect("back");
    } else {
      console.log(`user not authorized to delete comment`);
      return response.redirect("back");
    }
  } catch (error) {
    request.flash("error", error);
    console.log(`Error occurred : ${error}`);
  }
};

// Defining the action to create a comment
module.exports.create = (request, response) => {
  // Getting the post of the comment
  const postId = request.body.post;
  console.log(postId);

  Post.findById(postId)
    .then((post) => {
      // Create comment for the post
      Comment.create({
        content: request.body.content,
        user: request.user,
        post: postId,
      })
        .then((comment) => {
          // Adding the comment id to post
          post.comments.push(comment);
          post.save();

          // Sending response if the request is from AJAX API call
          if (request.xhr) {
            return response.status(200).json({
              data: {
                comment: comment,
              },
              message: "Comment Created successfully",
            });
          }

          // Flasing the notification that post created successfully
          request.flash("success", "Comment created successfully");

          response.redirect("/");
        })
        .catch((error) => {
          request.flash("error", error);
        });
    })
    .catch((error) => {
      request.flash("error", error);
    });
};
