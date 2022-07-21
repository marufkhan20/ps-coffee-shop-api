// external imports

// internal imports
const Coffee = require("../models/Coffee");

// create new coffee
const createNewCoffee = ({
  creatorId,
  title,
  description,
  price,
  inStock,
  coffeeTypes,
  images,
}) => {
  const coffee = new Coffee({
    title,
    creatorId,
    description,
    price,
    inStock,
    coffeeTypes,
    images,
  });

  return coffee.save();
};

// find single coffee
const findSingleCoffee = (id) => {
  return Coffee.findById(id);
};

// find all coffees
const findCoffees = () => {
  return Coffee.find();
};

// update single coffee
const updateCoffee = (id, data) => {
  return Coffee.findByIdAndUpdate(id, data, { new: true });
};

// delete single coffee
const deleteCoffee = (id) => {
  return Coffee.findByIdAndDelete(id);
};

module.exports = {
  createNewCoffee,
  findSingleCoffee,
  findCoffees,
  updateCoffee,
  deleteCoffee,
};
