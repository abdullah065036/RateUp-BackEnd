const Rating = require("../../models/Rating");
const { mongoose } = require("../../utils/mongo");

async function getRatings(request, response) {
  Rating.aggregate([
    {
      $match: {
        $and: [
          { ratedTo: mongoose.Types.ObjectId(request.params.id) },
          { reported: false },
        ],
      },
    },
    {
      $lookup: {
        from: "replies",
        localField: "_id",
        foreignField: "ratingId",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "repliedBy",
              foreignField: "_id",
              pipeline: [{ $unset: ["password", "role"] }],
              as: "repliedBy",
            },
          },
          { $unwind: "$repliedBy" },
        ],
        as: "replies",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "liked",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "unlikes",
        localField: "_id",
        foreignField: "unLiked",
        as: "unlikes",
      },
    },
  ]).then((res) => {
    response.status(200).json({ data: res });
  });
}

module.exports = getRatings;
