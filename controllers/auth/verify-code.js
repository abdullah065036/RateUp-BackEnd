const Code = require("../../models/Code");

const verifyCode = async (request, response) => {
  const isVerified = await Code.find({
    $and: [
      { email: request.body.email },
      { code: request.body.code },
      { isActive: true },
    ],
  });
  if (isVerified.length > 0) {
    await Code.deleteOne({
      $and: [{ email: request.body.email }, { code: request.body.code }],
    }).then((res) => {
      response.status(200).send();
    });
  } else {
    response.status(400).json({ message: "Invalid verification code" });
  }
};
module.exports = verifyCode;
