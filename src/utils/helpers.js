const bcrypt = require("bcrypt");
const { BadRequest } = require("./error");

const BadRequestError = (message, code) => {
  throw new BadRequest(message, code);
};

const joiValidationError = (joiError) => joiError.details[0].message;

const generateHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

module.exports = { BadRequestError, joiValidationError, generateHash };
