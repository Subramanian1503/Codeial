// Requiring the mongoose
const mongoose = require("mongoose");

// Connecting the mongoose with the mongo db server
mongoose.connect("mongodb://127.0.0.1:27017/users_db");

//Getting the mongo connection
let db = mongoose.connection;

// If the connection is on error print the message
db.on("error", console.error.bind(console, "error conntecting to db"));

// If the connection is successful print successful message
db.once("open", function () {
  console.log("Connection to mongo db established successfully");
});
