const app = require("./app");

const dotenv = require("dotenv");
const connect = require("./config/database");

// Handling Uncaught expection
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server  due to Uncaught expection");

  process.exit(1);
});

// Setup enviroment variables
dotenv.config({ path: "./backend/config/config.env" });

// Connect DB
connect();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on the ${process.env.PORT} port`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server  due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
