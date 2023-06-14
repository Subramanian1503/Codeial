// Requiring express to define router
const express = require("express");
const homeController = require("../controllers/home_controller");

// Getting the router from express
const router = express.Router();
console.log(`Router from express was created successfully`);

// Setup home controller router function
router.get("/", homeController.home);

// Requiring the user routers
const userRouter = require("./users");

// Setup a middle ware URLS for posts routers
router.use("/users", userRouter);

// Requiring the posts routers
const postsRouter = require("./posts");

// Setup a middle ware URLS for users routers
router.use("/posts", postsRouter);

// Requiring the comments routers
const commentsRouter = require("./comments");

// Setup a middle ware URLS for users routers
router.use("/comment", commentsRouter);

// Exporting the router from express
module.exports = router;