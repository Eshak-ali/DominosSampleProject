const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    maxlength: 10,
    require: true,
  },
  location: {
    type: Array,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
