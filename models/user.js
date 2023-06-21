// Requiring mongoose to create a model
const mongoose = require("mongoose");

// Adding multer as a library to maintain images as avatar for user
const multer = require("multer");

// Adding path to define path fr images to store
const path = require("path");

// Defining the folder to store avatar
const AVATAR_PATH = path.join("/upload/users/avatar");

// Defining the schema from mongoose and define its attributes
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
    avatar: {
      type: String,
    },
  },
  {
    timeStamp: true,
  }
);

// Defining the required properties to store a uploaded file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Defining the static methods in user to be used in the controller action
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


// 03 => Converting a schema into a model by provide the collection name for the defined schema
const User = mongoose.model("User", userSchema);

// 04 => Export the model
module.exports = User;
