// Requiring a express object to get router
const express = require('express');

// Initialise a variable with router object
const router = express.Router();

// Requiring the post controller to call the controller from router
const postController = require('../controllers/PostsController');

// Map the required post urls with the routers
router.get("/create", postController.createPost);

// Export the post router to use it as a middleware in main router
module.exports = router;