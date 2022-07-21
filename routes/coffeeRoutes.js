// external imports
const router = require("express").Router();

// internal imports
const {
  createCoffee,
  getSingleCoffee,
  getAllCoffees,
  updateSingleCoffee,
  deleteSingleCoffee,
} = require("../controllers/coffeeControllers");
const adminAuthMiddleware = require("../middlewares/admin/adminAuthMiddleware");
const {
  createCoffeeValidation,
  createCoffeeValidationErrorHandler,
} = require("../validations/coffeeValidation");
const coffeeUpload = require("../middlewares/admin/coffeeUpload");

// create new coffee (Private)
router.post(
  "/create",
  coffeeUpload,
  createCoffeeValidation,
  createCoffeeValidationErrorHandler,
  adminAuthMiddleware,
  createCoffee
);

// update single coffee (Private)
router.patch("/:id", adminAuthMiddleware, coffeeUpload, updateSingleCoffee);

// delete single coffee (Private)
router.delete("/:id", adminAuthMiddleware, deleteSingleCoffee);

// get single coffee (Public)
router.get("/:id", getSingleCoffee);

// get all coffees (Public)
router.get("/", getAllCoffees);

module.exports = router;
