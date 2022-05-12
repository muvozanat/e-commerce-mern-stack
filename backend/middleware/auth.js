const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  });
};
