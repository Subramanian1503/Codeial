// Requiring the express to launch the server
const express = require("express");

// Requiring the express layout module to be used for layouts
const expressLayout = require('express-ejs-layouts');

// Declaring a port on which the server need to listen
const port = 8080;

// Initialise the express applicaition
const app = express();

// Initialise the layout to be used before route configuration
app.use(expressLayout);

// Setting up the static file directory
app.use(express.static('./assets'));

// Setting up the extract style and script from layout property
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Initialise the custom router class
app.use("/", require("./routes"));

// Setup view engine and views folder
app.set("view engine", "ejs");
app.set("views", "./views");

// Express applicaiton listening the port
app.listen(port, function (error) {
  if (error) {
    console.log(
      `Error occured while trying to listen the port ${port} and the error logs are ${error}`
    );
  }
  console.log(`Server listening the port ${port} successfully`);
});
