const Joi = require("joi");

const createUserValidation = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    isAdmin: Joi.boolean(),
    isActive: Joi.boolean(),
  });

  return schema.validate(user);
};

const loginValidation = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  });

  return schema.validate(user);
};

module.exports = { createUserValidation, loginValidation };
