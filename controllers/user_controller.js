// Defining a function for the controller which can be called using the name user
module.exports.user = function (request, response) {
  return response.render("user_profile", {
    title: "User profile",
    pageHeading: "Viewing user profile page",
  });
};

// Defining a function for the controller which can be called using the name user
module.exports.createUser = function (request, response) {
  return response.render("create_user", {
    title: "Create User",
    pageHeading: "Creating user",
  });
};
