const User = require("../../models/User");
const { mongoose } = require("../../utils/mongo");

async function updateUser(request, response) {
  User.updateOne({ _id: mongoose.Types.ObjectId(request.params.id) }, [
    {
      $set: {
        name: request.body.name,
        email: request.body.email,
        role: request.body.role,
        photo: request.body.photo,
        rank: request.body.rank,
      },
    },
  ]).then((res) => {
    response.status(200).json({ message: "updated successfully", data: res });
  });
}

module.exports = updateUser;
