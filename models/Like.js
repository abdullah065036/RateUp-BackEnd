const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Types.ObjectId,
      required: "Liked by is required",
    },
    liked: {
      type: mongoose.Types.ObjectId,
      required: "Liked to is required",
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Like";

module.exports = mongoose.model(modelName, instance);
