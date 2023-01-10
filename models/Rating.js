const mongoose = require("mongoose");

const rating = new mongoose.Schema({
  reputation: { type: Number, required: true },
  location: { type: Number, required: true },
  internet: { type: Number, required: true },
  opportunities: { type: Number, required: true },
  facilities: { type: Number, required: true },
});

const instance = new mongoose.Schema(
  {
    ratedBy: {
      type: mongoose.Types.ObjectId,
      required: "Rated by is required",
    },
    rating: {
      type: rating,
      required: "Rating is required",
    },
    ratedTo: {
      type: mongoose.Types.ObjectId,
      required: "Rated to is required",
    },
    comments: {
      type: String,
      required: "Comments are required",
    },
    reported: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Rating";

module.exports = mongoose.model(modelName, instance);
