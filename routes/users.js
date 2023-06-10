// Requiring the express to get router object
const express = require("express");

// Requiring passport to handle authentication
const passport = require("passport");

// Requiring the user controller to map with router URLS
const userController = require("../controllers/user_controller");

// Initialise a variable with router object
const router = express.Router();
console.log("User router created successfully");

// Map the URLS with the controllers
router.get("/profile", passport.checkAuthentication, userController.user);
router.post("/create", userController.createUser);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signIn",
  }),
  userController.createSession
);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.destroySession);

// Export the router to be used as a middle ware in main router class
module.exports = router;
