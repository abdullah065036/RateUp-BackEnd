const mongoose = require("mongoose");

const instance = new mongoose.Schema({
  domain: String,
});

const modelName = "Domain";

module.exports = mongoose.model(modelName, instance);
