const Like = require("../../models/Like");
const Reply = require("../../models/Reply");
const Unlike = require("../../models/Unlike");

async function addUnLike(request, response, next) {
  try {
    const unlike = new Unlike({ ...request.body });
    await unlike.save();

    response.status(201).json({
      message: "Successfully registered",
      data: unlike,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = [];

      Object.keys(error.errors).forEach((key) => {
        errors.push(error.errors[key].message);
      });

      return response.status(400).json({ message: errors[0] });
    }
    console.log(error);
    return response.status(500).send();
  }
}

module.exports = addUnLike;
