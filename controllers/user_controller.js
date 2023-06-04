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

// Defining a action to render sign up page
module.exports.signUp = function(request, response){
  return response.render('user_sign_up', {
    title: 'SignUp'
  })
}

// Defining a action to render sign in page
module.exports.signIn = function(request, response){
  return response.render('user_sign_in', {
    title: 'SignIn'
  })
}

// Defining a action for creating a session for user
module.exports.createSession = function(request, response){
  // TODO create a user session and sign in the user using cookies
}