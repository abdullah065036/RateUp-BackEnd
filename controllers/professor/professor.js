const User = require("../../models/User");
const { mongoose } = require("../../utils/mongo");

async function getProfessor(request, response) {
  User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(request.params.id) },
    },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "ratedTo",
        pipeline: [{ $match: { reported: false } }],
        as: "ratings",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "universityId",
        foreignField: "_id",
        as: "universityId",
      },
    },
    {
      $addFields: {
        reputation: {
          $avg: {
            $map: {
              input: "$ratings",
              as: "datum",
              in: "$$datum.rating.reputation",
            },
          },
        },
        location: {
          $avg: {
            $map: {
              input: "$ratings",
              as: "datum",
              in: "$$datum.rating.location",
            },
          },
        },
        internet: {
          $avg: {
            $map: {
              input: "$ratings",
              as: "datum",
              in: "$$datum.rating.internet",
            },
          },
        },
        opportunities: {
          $avg: {
            $map: {
              input: "$ratings",
              as: "datum",
              in: "$$datum.rating.opportunities",
            },
          },
        },
        facilities: {
          $avg: {
            $map: {
              input: "$ratings",
              as: "datum",
              in: "$$datum.rating.facilities",
            },
          },
        },
        total: {
          $cond: {
            if: { $isArray: "$ratings" },
            then: { $size: "$ratings" },
            else: 0,
          },
        },
      },
    },
    {
      $unwind: {
        path: "$universityId",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $unset: ["password", "ratings"] },
  ]).then((res) => {
    response.status(200).json({ data: res[0] });
  });
}

module.exports = getProfessor;
