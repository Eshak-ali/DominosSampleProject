const mongoose = require("mongoose");
require("dotenv").config();

const Db = async () => {
  try {
    await mongoose.connect(process.env.MONOGDB_URL);
    console.log("connected to ", process.env.MONOGDB_URL);
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = Db;
