const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const compareHash = (rawString, hashString) => {
  const isValid = bcrypt.compareSync(rawString, hashString);
  return isValid;
};

const generateJWTAuthToken = ({ id, email, isAdmin }) =>
  jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET_KEY);

module.exports = {
  BadRequestError,
  joiValidationError,
  generateHash,
  generateJWTAuthToken,
  compareHash,
};
