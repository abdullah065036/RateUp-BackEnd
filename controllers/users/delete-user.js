const Like = require("../../models/Like");
const Rating = require("../../models/Rating");
const Unlike = require("../../models/Unlike");
const User = require("../../models/User");
const { mongoose } = require("../../utils/mongo");

async function deleteUser(request, response, next) {
  try {
    await Rating.deleteMany({
      $or: [
        { ratedBy: mongoose.Types.ObjectId(request.params.id) },
        { ratedTo: mongoose.Types.ObjectId(request.params.id) },
      ],
    });
    await Like.deleteMany({
      $or: [
        { liked: mongoose.Types.ObjectId(request.params.id) },
        { likedBy: mongoose.Types.ObjectId(request.params.id) },
      ],
    });
    await Unlike.deleteMany({
      $or: [
        { unLiked: mongoose.Types.ObjectId(request.params.id) },
        { unLikedBy: mongoose.Types.ObjectId(request.params.id) },
      ],
    });
    User.findByIdAndDelete(mongoose.Types.ObjectId(request.params.id)).then(
      (res) => {
        response.status(200).json(res);
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
}

module.exports = deleteUser;
