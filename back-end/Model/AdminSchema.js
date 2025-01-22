const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    require: true,
  },
  password: {
    type: String,
    minlength: 4,
    require: true,
  },
  number: {
    type: Number,
    minlength: 10,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
