const Unlike = require("../../models/Unlike");
const { mongoose } = require("../../utils/mongo");

async function deleteUnLike(request, response, next) {
  try {
    Unlike.deleteOne({
      unLiked: mongoose.Types.ObjectId(request.query.unLiked),
      unLikedBy: mongoose.Types.ObjectId(request.query.unLikedBy),
    }).then((res) =>
      response.status(200).json({
        message: "Successfully deleted",
        data: res,
      })
    );
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

module.exports = deleteUnLike;
