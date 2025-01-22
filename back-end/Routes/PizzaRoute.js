const Pizza = require("../Model/Pizza");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../Cloudinary/Cloudinary");

const upload = multer({ storage });

router.post("/add", upload.single("imageUrl"), async (req, res) => {
  const { name, description, price, size, ingredient, category, menu, base } =
    req.body;

  console.log("Body:", req.body); //Logs form data
  console.log("File:", req.file); //Logs file data
  console.log("Headers:", req.headers);

  if (!req.file) {
    return res.status(400).json({ message: "Image not uploaded" });
  }

  try {
    const NewPizza = new Pizza({
      name: name,
      description: description,
      price: price,
      size: size,
      ingredients: JSON.parse(ingredient),
      category: category,
      menu: menu,
      base: base,
      imageUrl: req.file.path,
    });
    await NewPizza.save();
    res.status(200).json({ Message: "Add successfully", NewPizza });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.log("erroe", error);
  }
});

router.get("/category", async (req, res) => {
  const category = Pizza.schema.path("category").enumValues;
  res.json(category);
});

router.get("/size", async (req, res) => {
  const size = Pizza.schema.path("size").enumValues;
  res.json(size);
});

router.get("/menu", async (req, res) => {
  const menu = Pizza.schema.path("menu").enumValues;
  res.json(menu);
});

router.get("/base", async (req, res) => {
  const base = Pizza.schema.path("base").enumValues;
  res.json(base);
});

router.get("/all", async (req, res) => {
  const pizza = await Pizza.find();
  res.send(pizza);
});

router.post("/update", upload.single("imageUrl"), async (req, res) => {
  try {
    const { _id, imageUrl, ...data } = req.body;
    const img = req.file ? req.file.path : imageUrl;
    const pizza = await Pizza.findByIdAndUpdate(
      _id,
      { ...data, imageUrl: img },
      { new: true }
    );
    if (pizza) {
      res.status(200).json({ message: "updated successfully", pizza });
      console.log("update", pizza);
    } else {
      res.status(400).json({ message: "not deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: "not deleted" });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.params, "deleted");
    const pizza = await Pizza.findByIdAndDelete(id);
    if (pizza) {
      res.status(200).json({ message: "deleted successfully", pizza });
      console.log("delete", pizza);
    } else {
      res.status(400).json({ message: "not deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: "not deleted" });
  }
});

router.get("/orderpizza/:id", async (req, res) => {
  const { id } = req.params;
  console.log("req", req.params);
  const splitId = id.split(",");
  console.log("Array", splitId);

  try {
    const pizza = await Pizza.find({ _id: { $in: splitId } });
    if (pizza) {
      return res.status(202).json(pizza);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

module.exports = router;
