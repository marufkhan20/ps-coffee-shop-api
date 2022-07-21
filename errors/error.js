// external imports
const createError = require("http-errors");

// not found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your Request Content Was not found"));
};

// error handler
const errorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server error occurred";
  const status = err.status ? err.status : 500;
  console.log(err);
  res.status(status).json({ message });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
