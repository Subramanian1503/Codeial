// Requiring the comment model to do CRUD actions
const Comment = require("../models/comment");

const Post = require("../models/post");

const Like = require("../models/like");

const commentMailer = require("../mailer/comment_mailer");

const queue = require("../configs/kue");

const newCommentEmailWorker = require("../worker/new_comment_email");

// Deleting a comment and remvoving it from Posts
module.exports.deleteComment = async function (request, response) {
  try {
    // Getting the comment identifier from params to delete
    const commentId = request.params.id;

    // Find the comment
    const comment = await Comment.findById(commentId);

    if (request.user.id == comment.user) {
      // Getting the post identifier to remove comments
      const postId = comment.post;

      // Delete all the likes associated with this comment
      await Like.deleteMany({
        likeable: commentId,
        onModel: "Comment",
      });

      // If present, Delete the comment
      await Comment.findByIdAndRemove(commentId);

      // If Delete successful, Delete the comment id from comments of post
      const post = await Post.findById(postId);

      // Find the index to remove from post comments
      const commentIndex = post.comments.indexOf(commentId);

      // Remove the index
      if (commentIndex > -1) {
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
module.exports.create = async (request, response) => {
  try {
    // Getting required information from request
    const postId = request.body.post;
    const commentContent = request.body.content;
    const user = request.user;

    // Finding the post by its identifier
    const post = await Post.findById(postId);

    // Create comment with its content and postId
    let createdComment = await Comment.create({
      content: commentContent,
      user: user,
      post: postId,
    });

    // Add the created comment in the post
    post.comments.push(createdComment);

    // Save the post with the changes
    post.save();

    // Populate the comment with the user information
    createdComment = await createdComment.populate("user", "name email");

    // Call comment mailer to generate mail
    // commentMailer.newCommentMailer(createdComment);

    let job = queue.create("NewCommentEmail", createdComment).save((error) => {
      if (error) {
        console.log(
          "Error while trying to save the data to the new comment email queue worker : ${error}"
        );
        return;
      }

      console.log(`Job queued successfully : ${job.id}`);
    });

    // If AJAX request then send response
    if (request.xhr) {
      return response.status(200).json({
        data: {
          comment: createdComment,
        },
        message: "Comment Created successfully",
      });
    }

    // Have flash message to create comment
    request.flash("success", "Comment created successfully");

    // Redirect to the home page
    response.redirect("/");
  } catch (error) {
    request.flash("error", error);
    console.log(`Error while trying to create comment: ${error}`);
    return response.redirect("/");
  }
};
