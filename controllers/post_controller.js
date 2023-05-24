// Defining a create post controller to create posts
module.exports.createPost = function (request, response) {
  return response.render("create_post", {
    title: "Create Post",
    pageHeading: "Create Post",
  });
};
