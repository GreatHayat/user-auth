const { Router } = require("express");
const { User } = require("../../models");
const {
  BadRequestError,
  joiValidationError,
  generateHash,
  compareHash,
  generateJWTAuthToken,
} = require("../../utils/helpers");
const { createUserValidation, loginValidation } = require("./validationSchema");
const asyncHandler = require("../../middlewares/async");
const isAuthenticated = require("../../middlewares/auth");

class UserController {
  static router;

  static getRouter() {
    this.router = Router();

    this.router.get("/", isAuthenticated, asyncHandler(this.getUserProfile));
    this.router.post("/register", asyncHandler(this.createUser));
    this.router.post("/login", asyncHandler(this.login));
    return this.router;
  }

  static async getUserProfile(req, res) {
    const {
      user: { id },
    } = req;

    const user = await User.findById(id);
    if (!user) {
      return BadRequestError("Invalid credentials", 400);
    }

    res.status(200).send(user);
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

  static async login(req, res) {
    const { body: loginPayload } = req;

    const { email, password } = loginPayload;
    const { error } = loginValidation(loginPayload);
    if (error) {
      return BadRequestError(joiValidationError(error), 400);
    }

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return BadRequestError("Invalid credentials", 400);
    }

    const isPasswordValid = compareHash(password, user.password);
    if (!isPasswordValid) {
      return BadRequestError("Invalid credentials", 400);
    }

    const token = generateJWTAuthToken({
      id: user._id,
      email,
      isAdmin: user.isAdmin,
    });

    const response = {
      id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    };

    res.status(200).send({ status: "success", user: response });
  }
}

module.exports = UserController;
