const User = require("../../models/User");
const bcrypt = require("bcrypt");

async function changePassword(request, response) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);
  User.findOneAndUpdate(
    { email: request.body.email },
    {
      password: hash,
    }
  ).then((res) => {
    response.status(200).json({ message: "updated successfully", data: res });
  });
}

module.exports = changePassword;
