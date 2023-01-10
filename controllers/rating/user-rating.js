const Rating = require("../../models/Rating");
const { mongoose } = require("../../utils/mongo");

async function getUserRatings(request, response) {
  Rating.aggregate([
    {
      $match: { ratedBy: mongoose.Types.ObjectId(request.params.id) },
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
    {
      $lookup: {
        from: "users",
        localField: "ratedTo",
        foreignField: "_id",
        pipeline: [{ $unset: ["password"] }],
        as: "ratedTo",
      },
    },
    { $unwind: "$ratedTo" },
  ]).then((res) => {
    response.status(200).json({ data: res });
  });
}

module.exports = getUserRatings;
