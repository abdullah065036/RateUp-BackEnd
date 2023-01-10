const Domain = require("../../models/Domain");

const getDomains = async (request, response) => {
  Domain.find().then((res) => {
    response.status(200).json({ data: res });
  });
};

module.exports = getDomains;
