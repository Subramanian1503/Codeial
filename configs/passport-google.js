const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const crypto = require("crypto");

// Define new google auth strategy to passport so that it will use it
passport.use(
  new GoogleStratergy(
    {
      clientID:
        "531116921629-33i2jr349ja9vpdj6kou64a0avf3i00b.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/users/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Find whether the user is present in DB
      User.findOne({
        email: profile.emails[0].value,
      })
        .then((user) => {
          console.log(profile);

          // If found return user to passport as request.user
          if (user) {
            return done(null, user);
          } else {
            // If not found create user and set it a request.user
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            })
              .then((user) => {
                return done(null, user);
              })
              .catch((error) => {
                console.log(
                  `Error while trying to create user from google in DB: ${error}`
                );
                return;
              });
          }
        })
        .catch((error) => {
          if (error) {git 
            console.log(
              `Error while trying to find user from google in DB: ${error}`
            );
            return;
          }
        });
    }
  )
);

module.exports = passport;
