const User = require("../../models/User");
const { mongoose } = require("../../utils/mongo");

async function changeUniversity(request, response) {
  User.updateOne({ _id: mongoose.Types.ObjectId(request.params.id) }, [
    {
      $set: {
        universityId: mongoose.Types.ObjectId(request.body.universityId),
        rank: request.body.rank,
      },
    },
  ]).then((res) => {
    response.status(200).json({ message: "updated successfully", data: res });
  });
}

module.exports = changeUniversity;
