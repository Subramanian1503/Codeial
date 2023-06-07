// Requiring the express to launch the server
const express = require("express");

// Requiring the cookie parser installed to use it
const cookieParser = require("cookie-parser");

// Requiring the express layout module to be used for layouts
const expressLayout = require("express-ejs-layouts");

// Requiring express-session to save the auth information in session cookie in encrypted format
const expressSession = require('express-session');

// Requiring passport to handle the authentication and create session cookies based on auth result
const passport = require('passport');

// Requiring passport local strategy config to say how to handle authentication
const passportLocal = require('./configs/passport');

// Requiring connect-mongo to store the encrypted session cookie content into DB so that users will not log out whenever server restart happends
const MongoStore = require('connect-mongo')

// Declaring a port on which the server need to listen
const port = 8080;

// Initialise the express applicaition
const app = express();

// Initialise the layout to be used before route configuration
app.use(expressLayout);

// Connect the mongo configuration to the server
const db = require("./configs/mongoose");

// Encode the request values in a readable format
app.use(express.urlencoded());

// Enable the cookie parser in the application to use and alter cookies within client and server
app.use(cookieParser());

// Setting up the static file directory
app.use(express.static("./assets"));

// Setting up the extract style and script from layout property
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



// Setup view engine and views folder
app.set("view engine", "ejs");
app.set("views", "./views");

// Initialise and configure express-session as middleware to handle session cookie creation with properties
app.use(expressSession({
  name: 'codeial',
  // TODO: need to change this while deployment
  secret: 'SomeThingBlah',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: (10 * 60 * 1000),
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/users_db'
  }),
}));

// Initialise passport to handle authentication and trigger express-session to create session
app.use(passport.initialize());
app.use(passport.session());

// Use middleware to set authentication user information in the response so that views can use that
app.use(passport.setAuthenticatedUser);

// Initialise the custom router class
app.use("/", require("./routes"));

// Express applicaiton listening the port
app.listen(port, function (error) {
  if (error) {
    console.log(
      `Error occured while trying to listen the port ${port} and the error logs are ${error}`
    );
  }
  console.log(`Server listening the port ${port} successfully`);
});
