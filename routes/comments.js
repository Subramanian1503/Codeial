// Requiring express object to define router
const express = require("express");

const passport = require('passport');

// Requiring the comments controller to define a action for router
const commentController = require("../controllers/comment_controller");

// Initialising a variable with router object from express
const router = express.Router();

// map the required router URLS with its action
router.post("/create", passport.checkAuthentication, commentController.create);

// export router to be used in the main router class
module.exports = router;
