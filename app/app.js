// external imports
const express = require("express");
require("dotenv").config("../.env");

// internal imports
const routes = require("../routes");
const { notFoundHandler, errorHandler } = require("../errors/error");

const app = express();

// use express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static("public"));

// setup routes
app.use(routes);

// healt route for testing api health
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API is Perfectly Work!",
  });
});

// root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to ps coffee shop",
  });
});

// not found error handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

module.exports = app;
