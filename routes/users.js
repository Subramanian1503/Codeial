// Requiring the express to get router object
const express = require("express");

// Requiring the user controller to map with router URLS
const userController = require("../controllers/user_controller");

// Initialise a variable with router object
const router = express.Router();
console.log("User router created successfully");

// Map the URLS with the controllers
router.get("/profile", userController.user);
router.post("/create", userController.createUser);
router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);

// Export the router to be used as a middle ware in main router class
module.exports = router;
