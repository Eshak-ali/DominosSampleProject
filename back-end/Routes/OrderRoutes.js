const Order = require("../Model/OrderSchema");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  const {
    customerId,
    totalprice,
    totalquantity,
    items,
    ordernumber,
    payment,
    location,
  } = req.body;

  const pizzaitems = items.map((each) => ({
    pizzaId: each.id,
    quantity: each.quantity,
    price: each.price,
  }));
  try {
    const order = new Order({
      customerId: customerId,
      items: pizzaitems,
      totalPrice: totalprice,
      totalquantity: totalquantity,
      ordernumber: ordernumber,
      payment: payment,
      location: location,
    });
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/updatestatus", async (req, res) => {
  if (!req.body || !req.body._id) {
    return res.status(400).json({ message: "Missing order details or ID" });
  }

  const { _id, status, comment } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      _id,
      { status, comment, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.post("/track", async (req, res) => {
  const { _id } = req.body;
  try {
    const order = await Order.find({
      customerId: _id,
    });
    if (order) {
      res.send(order);
    } else {
      res.status(204).json({ message: "no orders" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.get("/status", async (req, res) => {
  const status = Order.schema.path("status").enumValues;
  res.json(status);
});

router.get("/lenght", async (req, res) => {
  const order = await Order.find();
  if (order.length >= 0) {
    console.log(order);
    const length = order.length + 1;
    console.log(length);

    return res.json(length);
  } else {
    console.log("no orders");
  }
});

router.get("/all", async (req, res) => {
  const order = await Order.find();
  return res.json(order);
});

module.exports = router;
