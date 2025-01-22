const User = require("../Model/UserSchema");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { name, number } = req.body;
  try {
    const user = await User.findOne({
      name,
      number,
    });

    if (user) {
      console.log('find');
      
      return res.status(200).json(user);
    } else {
      const data = new User({
        name: name,
        number: number,
      });
      await data.save();
      console.log("created");
      
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error on server" });
  }
});

router.get("/all/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const split = customerId.split(",");
  try {
    const alluser = await User.find({ _id: { $in: split } });
    console.log(alluser);
    return res.status(202).json(alluser);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error on server" });
  }
});

module.exports = router;
