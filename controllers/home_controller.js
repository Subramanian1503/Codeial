// Requiring the user model to do CRUD operation
const User = require("../models/user");

const Post = require("../models/post");

// Define a function called home which will be used in main router
module.exports.home = async function (request, response) {
  try {
    //Getting all the posts from DB
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("comments")
      .populate("likes");

    // Getting all the users from DB
    const users = await User.find({});

    // Redirecting the home page view with collected data
    return response.render("home", {
      title: "Home Page",
      pageHeading: "Home page",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    request.flash("error", error);
    return response.redirect("back");
  }
};
