const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Email is required",
    },
    code: {
      type: String,
      required: "Code is required",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Code";

module.exports = mongoose.model(modelName, instance);
