const passport = require("passport");

const localStrategy = require("passport-local");

const User = require("../models/user");

// Implement the local strategy and use that for authentication using passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      // Finding the user whether present in DB using email sent as input
      User.findOne({ email: email })
        .then((user) => {
          // If the user is present and password provided by the user matches, then allow
          if (user && user.password == password) {
            console.log(`Login successful`);
            return done(null, user);
          } else {
            // If not then done allow
            console.log(`Login not successful`);
            return done(null, false);
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Error while finding user -> passport");
            return done(error);
          }
        });
    }
  )
);

// Serialize the user that what needs to be stored in the session cookie when user logged in
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialise the user that we need to find and return the user using the stored item in session cookie
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
});

// Provide implementation to check whether the user is authenticated
passport.checkAuthentication = function (request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.redirect("/users/signIn");
};

// Provide implementation to set the user information in the resonse from the request set by passport
passport.setAuthenticatedUser = function (request, response, next) {
  if (request.isAuthenticated()) {
    // Set the user information to the response, so that the response web page can access user inforamtion
    response.locals.user = request.user;
  }
  next();
};
