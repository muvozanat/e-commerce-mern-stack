const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/ErrorMiddleware");

app.use(express.json());
// Import Routes
const products = require("./routes/ProductRoute");
const users = require("./routes/UserRoute");
app.use("/api/v1", products);
app.use("/api/v1", users);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
