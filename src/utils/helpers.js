const { BadRequest } = require("./error");

const BadRequestError = (message, code) => {
  throw new BadRequest(message, code);
};

const joiValidationError = (joiError) => joiError.details[0].message;

module.exports = { BadRequestError, joiValidationError };
