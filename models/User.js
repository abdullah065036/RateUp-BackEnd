const mongoose = require("mongoose");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const instance = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: "Password is required",
    },
    name: {
      type: String,
      required: "Name is required",
    },
    photo: {
      type: String,
      required: "Photo is required",
    },
    role: {
      type: String,
      required: true,
      default: "student",
    },
    universityId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    rank: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "User";

module.exports = mongoose.model(modelName, instance);
