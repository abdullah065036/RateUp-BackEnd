const Like = require("../../models/Like");
const Rating = require("../../models/Rating");
const Reply = require("../../models/Reply");
const Unlike = require("../../models/Unlike");
const { mongoose } = require("../../utils/mongo");

async function deleteRating(request, response) {
  Rating.deleteOne({ _id: mongoose.Types.ObjectId(request.params.id) }).then(
    (res) => {
      response.status(200).json({ message: "Deleted Successfully", data: res });
    }
  );
  await Like.deleteMany({ liked: mongoose.Types.ObjectId(request.params.id) });
  await Unlike.deleteMany({
    unLiked: mongoose.Types.ObjectId(request.params.id),
  });
  await Reply.deleteMany({
    ratingId: mongoose.Types.ObjectId(request.params.id),
  });
}

module.exports = deleteRating;
