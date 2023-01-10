const User = require("../../models/User");

async function getRequests(request, response) {
  User.find({isVerified: false})
    .select("-password")
    .then((res) => {
      response.status(200).json({ data: res });
    });
}

module.exports = getRequests;
