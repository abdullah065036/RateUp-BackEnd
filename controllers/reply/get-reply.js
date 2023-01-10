const Reply = require("../../models/Reply");
const { mongoose } = require("../../utils/mongo");

async function getReplies(request, response) {
  Reply.aggregate([
    {
      $match: { ratingId: mongoose.Types.ObjectId(request.params.id) },
    },
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
  ]).then((res) => {
    response.status(200).json({ data: res });
  });
}

module.exports = getReplies;
