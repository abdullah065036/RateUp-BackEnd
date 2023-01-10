const Rating = require("../../models/Rating");

async function addRating(request, response, next) {
  try {
    const rating = new Rating({ ...request.body });
    await rating.save();

    response.status(201).json({
      message: "Successfully registered",
      data: rating,
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

module.exports = addRating;
