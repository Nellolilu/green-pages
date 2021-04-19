const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  remember: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
