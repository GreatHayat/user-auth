const errorHandler = (err, req, res, next) => {
  return res.status(500).send({ status: "error", message: err?.message });
};

module.exports = errorHandler;
