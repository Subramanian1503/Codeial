// 01 => Requiring mongoose to create a model
const mongoose = require("mongoose");

// 02 => Defining the schema from mongoose and define its attributes
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

// 03 => Converting a schema into a model by provide the collection name for the defined schema
const User = mongoose.model("User", userSchema);

// 04 => Export the model
module.exports = User;
