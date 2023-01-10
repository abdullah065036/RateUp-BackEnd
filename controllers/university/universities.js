const User = require("../../models/User");

async function getUniversities(request, response) {
  User.aggregate([
    {
      $match: { role: "university" },
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
    { $unset: ["password", "role", "ratings"] },
  ]).then((res) => {
    response.status(200).json({ data: res });
  });
}

module.exports = getUniversities;
