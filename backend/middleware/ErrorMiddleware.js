const ErrorHander = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const msg = "Resource not found. Invalid: ID";
    err = new ErrorHander(msg, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
