const Post = require("../models/post");

// Define a function called home which will be used in main router
module.exports.home = function (request, response) {
  // Getting all the posts
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      console.log(posts);
      return response.render("home", {
        title: "Home Page",
        pageHeading: "Home page",
        posts: posts,
      });
    })
    .catch((error) => {
      return response.redirect("back");
    });
};
