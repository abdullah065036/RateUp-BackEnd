const Like = require("../../models/Like");
const Reply = require("../../models/Reply");

async function addLike(request, response, next) {
  try {
    const like = new Like({ ...request.body });
    await like.save();

    response.status(201).json({
      message: "Successfully registered",
      data: like,
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

module.exports = addLike;
