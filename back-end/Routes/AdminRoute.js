const Admin = require("../Model/AdminSchema");
const express = require("express");
const router = express.Router();

router.post("/set_admin", async (req, res) => {
  try {
    const prev = await Admin.findOne({
      number: Number("9999999999"),
    });

    if (prev) {
      return res.status(200).json(prev);
    }

    const data = new Admin({
      name: "admin",
      password: "1511",
      number: Number("9999999999"),
    });
    await data.save();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { name, number, password } = req.body;
  try {
    const admin = await Admin.findOne({
      number: number,
    });
    if (!admin) {
      res.status(400).json({ message: "employee not found" });
    }
    if (admin.password !== password) {
      res.status(400).json({ message: "invalid password" });
    }
    if (admin.name !== name) {
      res.status(400).json({ message: "invalid name" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: "error on server" });
  }
});

router.post("/number", async (req, res) => {
  const { number } = req.body;
  try {
    const prev = await Admin.findOne({
      number: number,
    });

    if (prev) {
      return res.status(200).json(prev);
    } else {
      res.status(400).json({ message: "admin not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  const admin = await Admin.findOne();
  console.log(admin);
  res.status(200).json({ message: "success", admin });
});

module.exports = router;
