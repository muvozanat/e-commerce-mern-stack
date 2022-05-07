const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/UserModel");

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this",
      url: "this",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});


// login a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ErrorHander("Please enter email & password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(new ErrorHander("Invalid login or password"), 401);
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    next(new ErrorHander("Invalid login or password"), 401);
  }

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});
