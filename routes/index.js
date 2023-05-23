// Requiring express to define router
const express = require('express');
const homeController = require('../controllers/HomeController');

// Getting the router from express
const router = express.Router();
console.log(`Router from express was created successfully`);

// Setup home controller router function
router.get('/', homeController.home);

// Exporting the router from express
module.exports = router;
