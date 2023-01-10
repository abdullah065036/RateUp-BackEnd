const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    unLikedBy: {
      type: mongoose.Types.ObjectId,
      required: "Un Liked by is required",
    },
    unLiked: {
      type: mongoose.Types.ObjectId,
      required: "Un Liked to is required",
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Unlike";

module.exports = mongoose.model(modelName, instance);
