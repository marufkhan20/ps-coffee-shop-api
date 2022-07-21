// external imports
const { check, validationResult } = require("express-validator");
const { unlink } = require("fs");
const path = require("path");

// create coffee validation
const createCoffeeValidation = [
  check("title")
    .isLength({ min: 2 })
    .withMessage("Coffee Title is Required!")
    .trim(),
  check("description")
    .isLength({ min: 2 })
    .withMessage("Coffee Description is Required!!")
    .trim(),
  check("price")
    .isLength({ min: 1 })
    .withMessage("Coffee Price is Required!!")
    .trim(),
  check("inStock")
    .isLength({ min: 1 })
    .withMessage("Coffee In Stock is Required!!")
    .trim(),
  check("coffeeTypes")
    .isLength({ min: 1 })
    .withMessage("Coffee Types is Required!!")
    .trim(),
];

// create coffee validation error handler
const createCoffeeValidationErrorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      // remove uploaded avatar
      if (req.files && req.files.length > 0) {
        req.files.map((file) => {
          const { filename } = file;
          unlink(
            path.join(__dirname, `/../public/uploads/coffees/${filename}`),
            (err) => console.log(err)
          );
        });
      }

      // response error object
      res.status(400).json({ errors: mappedErrors });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCoffeeValidation,
  createCoffeeValidationErrorHandler,
};
