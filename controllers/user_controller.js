// Requiring the user model to do CRUD operations in user DB
const { error } = require("console");
const User = require("../models/user");

// Defining a function for the controller which can be called using the name user
module.exports.user = function (request, response) {
  // Check if the user is authorized
  if (request.cookies.user_id) {
    // If yes get the user information
    console.log("User is authorized");
    User.findById(request.cookies.user_id)
      .then((user) => {
        // If the user is present display user information as well in the profile page
        if (user) {
          console.log("Found the user profile");
          return response.render("user_profile", {
            title: "User profile",
            pageHeading: "Viewing user profile page",
            user: user,
          });
        } else {
          // If not redirect back to the sign in page
          console.log("User profile is not present in DB");
          return response.redirect("/users/signin");
        }
      })
      .catch((error) => {
        console.log(
          `Error occurred while trying to fetch profile from DB : ${error}`
        );
        return response.redirect("/users/signin");
      });
  } else {
    // If the user is not authorized then redirect back to the sign in page
    console.log("User is not authorized");
    return response.redirect("/users/signin");
  }
};

// Defining a action to render sign up page
module.exports.signUp = function (request, response) {
  return response.render("user_sign_up", {
    title: "SignUp",
  });
};

// Defining a action to render sign in page
module.exports.signIn = function (request, response) {
  return response.render("user_sign_in", {
    title: "SignIn",
  });
};

// Defining a action for creating a session for user
module.exports.createSession = function (request, response) {
  // TODO create a user session and sign in the user using cookies
  // Check if the user with requested email is present
  User.findOne({ email: request.body.email })
    .then((user) => {
      if (user) {
        // If present, Check whether the password matches
        if (request.body.password == user.password) {
          // If matches, create the cookies for the user and add the user id in cookies
          response.cookie("user_id", user.id);
          // Redirect the user to the profile page
          return response.redirect("/users/profile");
        } else {
          // If not matches, redirect the user to the signin page
          return response.redirect("back");
        }
      } else {
        // If the email not exists redirect the user to the signin page
        return response.redirect("back");
      }
    })
    .catch((error) => {
      // If the email not exists redirect the user to the signin page
      console.log(`Error occurred while trying to reach DB: ${error}`);
    });
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
        return response.redirect("/users/signIn");
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
