// Requiring the user model to do CRUD operations in user DB
const { error } = require("console");
const User = require("../models/user");

// Requiring the file system and path to delete the previous existng
const fs = require("fs");
const path = require("path");

// Defining a function to update user inforamtion
module.exports.update = async function (request, response) {
  try {
    // Getting the userId
    const userId = request.params.id;

    // Finding the user
    const userFromDB = await User.findById(userId);

    // Process the request using multer as the request is not readable due to multipart encryption
    User.uploadedAvatar(request, response, (error) => {
      // If error then log that and do nothing
      if (error) {
        console.log(
          `Error while trying to process request using multer: 
          ${error}`
        );
      }

      // If not then get the values from request.body
      userFromDB.name = request.body.name;
      userFromDB.email = request.body.email;

      // Check if there any file present to update it in DB
      if (request.file) {
        // Delete the previous existing file
        if (userFromDB.avatar) {
          // Delete the exisiting avatar file from source
          fs.unlinkSync(path.join(__dirname, "..", userFromDB.avatar));
        }

        userFromDB.avatar = User.avatarPath + "\\" + request.file.filename;
      }

      // Save the user
      userFromDB.save();
    });

    return response.redirect("back");
  } catch (error) {
    console.log("Error while trying to process request using multer: ", error);
    request.flash("error", error.responseText);
  }

  return response.redirect("back");
};

// Defining a function for the controller which can be called using the name user
module.exports.userProfile = async function (request, response) {
  try {
    // Getting the requested user id to go for profile
    const userId = request.params.id;

    // Finding the user with the id
    const requestedUser = await User.findById(userId);

    // Redircting the view page with collected data
    return response.render("user_profile", {
      title: "User profile",
      requested_user: requestedUser,
    });
  } catch (error) {
    console.log(`Error occured while tryint to find user: ${error}`);
    request.flash("error", error.responseText);
  }
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
  // Adding the success message to the request to show as a flash message
  request.flash("success", "User logged in successfully");

  // TODO create a user session and sign in the user using cookies
  return response.redirect("/");
};

// Logging out from the session
module.exports.destroySession = (request, response) => {
  request.logout((error) => {
    request.flash("error", error);
  });

  // Adding the success message to the request to show as a flash message
  request.flash("success", "User logged out successfully");
  return response.redirect("/");
};

// Defining a function for the controller which can be called using the name user
module.exports.createUser = async function (request, response) {
  // TODO: create the user using the inputs from query param and path variable

  // Validate the user inputs
  const validationResponse = validateCreateUserRequest(request);

  if (validationResponse == "REQUEST_VALID") {
    try {
      // If request is valid then create a user
      const createdUser = await User.create(request.body);

      // Adding the success message to the request to show as a flash message
      request.flash("success", "User created successfully");

      // redirecting with the view page and collected data from DB
      return response.redirect("/users/sign-in");
    } catch (error) {
      request.flash("error", error);
      return response.redirect("back");
    }
  } else {
    // Adding the success message to the request to show as a flash message
    request.flash("error", `${validationResponse}`);
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
    return errorMessage;
  }

  return "REQUEST_VALID";
}
