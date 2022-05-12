const ErrorHander = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const msg = "Resource not found. Invalid: ID";
    err = new ErrorHander(msg, 400);
  }

  //Mongoose Duplicate key error
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHander(message, 400);
  }

  // Wrong  JWT Token
  if (err.name === "JsonWebToken") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHander(message, 400);
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, try again`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
