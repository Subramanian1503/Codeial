const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    
    console.log(`${jwtPayLoad.sub}`);
    User.findOne({
      id: jwtPayLoad.sub, 
    }).then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error) => {
        console.log("Error in finding user from JWT");
        return;
      });
  })
);

module.exports = passport;
