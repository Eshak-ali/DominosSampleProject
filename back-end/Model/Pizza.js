const mongoose = require("mongoose");

// Define the Pizza Schema
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: [Number],

    min: [0, "Price cannot be negative"], // Ensure the price is not negative
  },
  size: {
    type: String,
    enum: ["Regular", "Medium", "Large"], // Allowed pizza sizes
  },
  ingredients: {
    type: [String], // Array of strings for ingredients (e.g., ['Cheese', 'Pepperoni'])
  },
  imageUrl: {
    type: String,
    // URL for the pizza image
  },
  isAvailable: {
    type: Boolean,
    default: true, // Pizza is available by default
  },
  category: {
    type: String,
    enum: ["Veg", "Non-Veg", "Vegan"], // Types of pizzas based on ingredients
  },
  menu: {
    type: String,
    enum: [
      "pizza",
      "combo",
      "desserts",
      "Garlic Bread",
      "beverage",
      "pizzaMania",
      "Cheese Volcano",
      "cheesiken",
      "Chicken Fiesta",
    ],
  },
  base: {
    type: String,
    enum: ["Classic Hand Toassed", "Cheese Burst", "Fresh pan"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  updatedAt: {
    type: Date,
  },
});

// Create a Pizza model using the schema
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
