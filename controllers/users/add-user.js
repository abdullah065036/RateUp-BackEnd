const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

async function addUser(request, response, next) {
  try {
    await joi
      .object({
        email: joi.string().email().required(),
        password: joi.string().required(),
      })
      .unknown()
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }
  try {
    const { email, password } = request.body;

    // Verify account username as unique
    const existingAccount = await User.findOne({ email });
    if (existingAccount) {
      return response.status(400).json({
        message: "An account already exists with that email",
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create account
    const newUser = new User({ ...request.body, password: hash });
    await newUser.save();

    response.status(201).json({
      message: "Successfully registered",
      data: newUser,
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

module.exports = addUser;
