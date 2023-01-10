const User = require("../../models/User");

async function getUsers(request, response) {
  User.find()
    .select("-password")
    .then((res) => {
      response.status(200).json({ data: res });
    });
}

module.exports = getUsers;
