const Reply = require("../../models/Reply");

async function addReply(request, response, next) {
  try {
    const reply = new Reply({ ...request.body });
    await reply.save();

    response.status(201).json({
      message: "Successfully registered",
      data: reply,
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

module.exports = addReply;
