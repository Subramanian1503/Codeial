// Requiring the post model to perform CRUD opration
const Post = require('../models/post');

// Defining a create post controller to create posts
module.exports.createPost = function (request, response) {
  console.log("Reached Post create function");

  // Getting the post request
  const postContent = request.body.content;

  // Populate it will user inforamtion
  console.log(request.user);
  const userId = request.user;

  // Building the post model
  const post = {
    content: postContent,
    user: userId
  };
  console.log(post);

  // Save the request in the mongo DB
  Post.create(post).then((post) => {
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
