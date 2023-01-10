const Like = require("../../models/Like");
const { mongoose } = require("../../utils/mongo");

async function deleteLike(request, response, next) {
  try {
    Like.deleteOne({
      liked: mongoose.Types.ObjectId(request.query.liked),
      likedBy: mongoose.Types.ObjectId(request.query.likedBy),
    }).then((res) => {
      response.status(200).json({
        message: "Successfully deleted",
        data: res,
      });
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = [];

      Object.keys(error.errors).forEach((key) => {
        errors.push(error.errors[key].message);
      });

      return response.status(400).json({ message: errors[0] });
    }
    console.log(error);
    return response.status(500).send();
  }
}

module.exports = deleteLike;
