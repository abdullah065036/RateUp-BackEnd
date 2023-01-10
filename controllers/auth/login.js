const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { signToken } = require("../../middlewares/jsonwebtoken");

async function login(request, response) {
  try {
    await joi
      .object({
        email: joi.string().email().required(),
        password: joi.string().required(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    const { email, password } = request.body;

    // Get account from DB, and verify existance
    const foundAccount = await User.findOne({ $and: [{email}, {isVerified: true}] });
    if (!foundAccount) {
      return response.status(400).json({
        message: "Bad credentials",
      });
    }

    // Decrypt and verify password
    const passOk = await bcrypt.compare(password, foundAccount.password);
    if (!passOk) {
      return response.status(400).json({
        message: "Bad credentials",
      });
    }

    // Remove password from response data
    foundAccount.password = undefined;
    delete foundAccount.password;

    // Generate access token
    const token = signToken({
      _id: foundAccount._id,
      name: foundAccount.name,
      role: foundAccount.role,
      photo: foundAccount.role,
    });

    response.status(200).json({
      message: "Succesfully logged-in",
      data: foundAccount,
      token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
}

module.exports = login;
