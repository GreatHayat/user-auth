const { Router } = require("express");
const UserController = require("./user/user.controller");

const router = Router();

router.use("/users", UserController.getRouter());

module.exports = router;
