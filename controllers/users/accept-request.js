const User = require("../../models/User");
const { mongoose } = require("../../utils/mongo");

async function acceptRequest(request, response) {
  User.updateOne({ _id: mongoose.Types.ObjectId(request.params.id) }, [
    {
      $set: {
        isVerified: true
      },
    },
  ]).then((res) => {
    response.status(200).json({ message: "updated successfully", data: res });
  });
}

module.exports = acceptRequest;
