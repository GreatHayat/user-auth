const { Router } = require("express");
const { User } = require("../../models");
const {
  BadRequestError,
  joiValidationError,
  generateHash,
} = require("../../utils/helpers");
const { createUserValidation } = require("./validationSchema");
const asyncHandler = require("../../middlewares/async");

class UserController {
  static router;

  static getRouter() {
    this.router = Router();

    this.router.post("/register", asyncHandler(this.createUser));
    return this.router;
  }

  static async createUser(req, res) {
    const { body: userPayload } = req;
    const { email, password } = userPayload;

    const { error } = createUserValidation(userPayload);
    if (error) {
      return BadRequestError(joiValidationError(error), 400);
    }

    let user = await User.findOne({ email });
    if (user) {
      return BadRequestError("User Already Exist!", 400);
    }
    userPayload.password = generateHash(password);

    user = new User(userPayload);
    await user.save();

    res.send({ status: "success", user });
  }
}

module.exports = UserController;
