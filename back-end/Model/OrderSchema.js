const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  items: [
    {
      pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza", // Reference to the Pizza model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // A minimum of 1 pizza must be ordered
      },
      price: {
        type: Array,
        required: true, // The price of the pizza at the time of order
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  ordernumber: {
    type: Number,
    default: 1,
  },
  totalquantity: {
    type: Number,
    required: true,
    min: 1, // A minimum of 1 pizza must be ordered
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending", // Default status
  },
  payment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
    timeStamp: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the update date
    timeStamp: true,
  },
  comment: {
    type: String,
    default:"wait for response"
  },
  location:{
    type:String
  }
});

// Create an Order model using the schema
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
