const { BadRequest } = require("./error");

const BadRequestError = (message, code) => {
  throw new BadRequest(message, code);
};

module.exports = { BadRequestError };
