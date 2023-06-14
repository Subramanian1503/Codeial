// Requiring the post model to perform CRUD opration
const Post = require("../models/post");

// Requiring the comments model to perform CRUD operation
const Comment = require("../models/comment");

// Deleting a post and it comments from DB
module.exports.deletePost = async function (request, response) {
  try {
    // Getting the post identifier to delete from DB
    const postId = request.params.id;
    console.log(`Getting post identifier: ${postId}`);

    // Find the post by its identifier
    const post = await Post.findById(postId);
    console.log(`post was available in DB: ${postId}`);

    // If available, check if it is created by the user
    if (post.user == request.user.id) {
      console.log(`Delete requested by authorized user`);

      // If yes, Delete the post
      await Post.findByIdAndRemove(postId);
      console.log(`Post deleted`);

      // Delete the comments of that post as well
      await Comment.deleteMany({
        post: postId,
      });
      console.log("Comments deleted");

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
      return response.redirect("back");
    })
    .catch((error) => {
      console.log(
        `Error occured while trying to create user please try again: ${error}`
      );
      return response.redirect("back");
    });
};
