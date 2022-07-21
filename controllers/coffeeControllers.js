// external imports
const { unlink } = require("fs");
const path = require("path");

// internal imports
const createError = require("http-errors");
const {
  createNewCoffee,
  findSingleCoffee,
  findCoffees,
  updateCoffee,
  deleteCoffee,
} = require("../services/coffeeServices");

// create coffee controller
const createCoffee = async (req, res, next) => {
  try {
    const { title, description, price, inStock, coffeeTypes } = req.body;
    const images = [];

    req.files.forEach((file) => {
      images.push(`/uploads/coffees/${file.filename}`);
    });

    // create new coffee
    const coffee = await createNewCoffee({
      title,
      creatorId: req.admin.id,
      description,
      price,
      inStock,
      coffeeTypes,
      images,
    });

    res
      .status(201)
      .json({ message: "New Coffee Created Successfully!!", coffee });
  } catch (err) {
    next(err);
  }
};

// get single coffee by coffeeID
const getSingleCoffee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coffee = await findSingleCoffee(id);

    if (coffee) {
      res.status(200).json({ coffee });
    } else {
      throw createError(404, "Coffee Not Found!!");
    }
  } catch (err) {
    next(err);
  }
};

// get all coffees controller
const getAllCoffees = async (req, res, next) => {
  try {
    const coffees = await findCoffees();
    if (coffees) {
      res.status(200).json({ coffees });
    } else {
      throw createError(404, "Coffee Not Found!!");
    }
  } catch (err) {
    next(err);
  }
};

// update single coffee controller
const updateSingleCoffee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, inStock, coffeeTypes } = req.body;

    // create images array from req files
    const images = [];

    req.files.forEach((file) => {
      images.push(`/uploads/coffees/${file.filename}`);
    });

    if (id) {
      let coffee = await updateCoffee(id, {
        title,
        description,
        price,
        inStock,
        coffeeTypes,
        images,
      });

      if (coffee) {
        res
          .status(200)
          .json({ message: "Coffee Updated Successfully!!", coffee });
      } else {
        throw createError("Server error occurred!");
      }
    } else {
      throw createError(404, "Coffee Id not found!!");
    }
  } catch (err) {
    next(err);
  }
};

// delete single coffee controller
const deleteSingleCoffee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedCoffee = await deleteCoffee(id);

      if (deletedCoffee) {
        // delete coffee images
        if (deletedCoffee.images.length > 0) {
          deletedCoffee.images.forEach((image) => {
            unlink(path.join(__dirname, `/../public${image}`), (err) =>
              console.log(err)
            );
          });
        }

        // response deleted coffee
        res
          .status(200)
          .json({ message: "Coffee Deleted Successfully!", deletedCoffee });
      } else {
        throw createError("Server Error Occurred!!");
      }
    } else {
      throw createError(404, "Coffee ID Not Found! Please Provide Coffee ID!");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCoffee,
  getSingleCoffee,
  getAllCoffees,
  updateSingleCoffee,
  deleteSingleCoffee,
};
