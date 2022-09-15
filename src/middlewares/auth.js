const { BadRequestError, validateJwtToken } = require("../utils/helpers");

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }
  return null;
};

const isAuthenticated = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (!token) {
    return BadRequestError("Access denied, no authorization token is provided");
  }

  try {
    const decodedToken = validateJwtToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ status: "error", message: "Authentication token is not valid" });
  }
};

module.exports = isAuthenticated;
