const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let { ...data } = req.body;
  const product = await Product.create(data);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Get Product a Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let products = await Product.findById(req.params.id);
  if (!products) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product --Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { ...data } = req.body;
  let product = Product.findById(id);
  if (!products) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let products = await Product.findByIdAndRemove(id);

  if (!products) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully !",
  });
});
