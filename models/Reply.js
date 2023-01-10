const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    repliedBy: {
      type: mongoose.Types.ObjectId,
      required: "Replied by is required",
    },
    ratingId: {
      type: mongoose.Types.ObjectId,
      required: "Rating is required",
    },
    message: {
      type: String,
      required: "Message is required",
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Reply";

module.exports = mongoose.model(modelName, instance);
