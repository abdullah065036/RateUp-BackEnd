const Rating = require("../../models/Rating");
const { mongoose } = require("../../utils/mongo");

async function getReportedRatings(request, response) {
  Rating.aggregate([
    {
      $match: { reported: true },
    },
    {
      $lookup: {
        from: "users",
        localField: "ratedTo",
        foreignField: "_id",
        pipeline: [{ $unset: ["password", "role"] }],
        as: "ratedTo",
      },
    },
    { $unwind: "$ratedTo" },
  ]).then((res) => {
    response.status(200).json({ data: res });
  });
}

module.exports = getReportedRatings;
