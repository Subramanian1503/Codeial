// Requiring the express to get router object
const express = require("express");

// Requiring passport to handle authentication
const passport = require("passport");

// Requiring the user controller to map with router URLS
const userController = require("../controllers/user_controller");

// Initialise a variable with router object
const router = express.Router();

// Map the URLS with the controllers

// POST router URLS
router.post("/create", userController.createUser);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  userController.createSession
);
router.post("/update/:id", passport.checkAuthentication, userController.update);

// GET router URLS
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.userProfile
);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.destroySession);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.get(
  "/auth/password_reset",
  userController.resetPassword
)
router.post(
  "/auth/verify_user",
  userController.verifyUser
)

// Export the router to be used as a middle ware in main router class
module.exports = router;
