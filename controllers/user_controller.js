// Requiring the user model to do CRUD operations in user DB
const { error } = require("console");
const User = require("../models/user");

// Defining a function for the controller which can be called using the name user
module.exports.user = function (request, response) {
  return response.render("user_profile", {
    title: "User profile",
    pageHeading: "Viewing user profile page",
  });
};

// Defining a action to render sign up page
module.exports.signUp = function (request, response) {
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }
  return response.render("user_sign_up", {
    title: "SignUp",
  });
};

// Defining a action to render sign in page
module.exports.signIn = function (request, response) {
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }
  return response.render("user_sign_in", {
    title: "SignIn",
  });
};

// Defining a action for creating a session for user
module.exports.createSession = function (request, response) {
  // TODO create a user session and sign in the user using cookies
  return response.redirect("/");
};

// Logging out from the session
module.exports.destroySession = (request, response) => {
  request.logout((error) => {
    console.log(`Error while trying to logging out from session`);
  });
  return response.redirect("/");
};

// Defining a function for the controller which can be called using the name user
module.exports.createUser = function (request, response) {
  // TODO: create the user using the inputs from query param and path variable

  // Validate the user inputs
  const validationResponse = validateCreateUserRequest(request);
  if (validationResponse == "REQUEST_VALID") {
    // If request is valid then create a user
    User.create(request.body)
      .then((user) => {
        console.log("User created successfully");
        return response.redirect("/users/sign-in");
      })
      .catch((error) => {
        console.log(
          `Error occured while trying to create user please try again: ${error}`
        );
        return response.redirect("back");
      });
  } else {
    console.log(
      `Error occured while trying to signUp user with error message: ${validationResponse}`
    );
    return response.redirect("back");
  }
};

function validateCreateUserRequest(request) {
  // Validate whether the provided password and confirm password is valid
  console.log(request.body);
  if (request.body.password != request.body.confirmPassword) {
    return "password and confirm password not matching with each other";
  }

  // Check if the user already exists
  let errorMessage = "";
  User.findOne({ email: request.body.email })
    .then((user) => {
      if (user) {
        errorMessage = `User already exists ${user}`;
      }
    })
    .catch((error) => {
      errorMessage = `Error occured while trying to fetch user from DB: ${error}`;
    });
  if (errorMessage) {
    console.log(errorMessage);
    return errorMessage;
  }

  return "REQUEST_VALID";
}
