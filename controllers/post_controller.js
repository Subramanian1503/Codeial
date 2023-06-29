// Requiring the post model to perform CRUD opration
const Post = require("../models/post");

// Requiring the comments model to perform CRUD operation
const Comment = require("../models/comment");

const Like = require("../models/like");

// Deleting a post and it comments from DB
module.exports.deletePost = async function (request, response) {
  try {
    // Getting the post identifier to delete from DB
    const postId = request.params.id;
    console.log(`Getting post identifier: ${postId}`);

    // Find the post by its identifier
    const post = await Post.findById(postId);

    // If available, check if it is created by the user
    if (post.user == request.user.id) {
      // Delete all the likes associated with this post
      await Like.deleteMany({
        likeable: postId,
        onModel: "Post",
      });

      // Delete all the likes associated with the comments of this post
      await Like.deleteMany({
        _id: {
          $in: post.comments,
        },
      });

      // Delete the comments of that post as well
      await Comment.deleteMany({
        post: postId,
      });

      // If yes, Delete the post
      await Post.findByIdAndRemove(postId);

      // If the request is from ajax then return status code and deleted post
      if (request.xhr) {
        return response.status(200).json({
          data: {
            post_id: postId,
          },
          message: `Post with id: ${postId} deleted successfully`,
        });
      }

      // Redirecting to the same page with updated data
      return response.redirect("back");
    } else {
      console.log(`User not authorized to delete the post`);
      return response.redirect("back");
    }
  } catch (error) {
    console.log(`Error while trying to delete comments :${error}`);
    return response.redirect("back");
  }
};

// Defining a create post controller to create posts
module.exports.createPost = function (request, response) {
  console.log("Reached Post create function");

  // Getting the post request
  const postContent = request.body.content;

  // Populate it will user inforamtion
  const userId = request.user;

  // Building the post model
  const post = {
    content: postContent,
    user: userId,
  };

  // Save the request in the mongo DB
  Post.create(post)
    .then((post) => {
      console.log("Post created successfully");

      if (request.xhr) {
        return response.status(200).json({
          data: {
            post: post,
          },
          message: "Post created successfully",
        });
      }

      // Flasing the notification that post created successfully
      request.flash("success", "Post created successfully");

      return response.redirect("back");
    })
    .catch((error) => {
      request.flash("error", error);
      return response.redirect("back");
    });
};
