const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },

    friend: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
