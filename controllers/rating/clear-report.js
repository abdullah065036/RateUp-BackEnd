const Rating = require("../../models/Rating");
const { mongoose } = require("../../utils/mongo");

async function clearReport(request, response) {
  Rating.updateOne({ _id: mongoose.Types.ObjectId(request.params.id) }, [
    {
      $set: {
        reported: false,
      },
    },
  ]).then((res) => {
    response.status(200).json({ message: "updated successfully", data: res });
  });
}

module.exports = clearReport;
