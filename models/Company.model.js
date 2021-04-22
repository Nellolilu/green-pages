const mongoose = require("mongoose");
const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    requried: true,

    // unique because check via URL-match with email
  },
  adress: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: SIZE_ENUM,
  },
  branch: {
    type: String,
    required: true,
    enum: BRANCH_ENUM,
  },

  description: {
    type: String,
    max: 500,
  },

  logo: {
    type: String,
    default:
      // TO CHANGE!
      "https://res.cloudinary.com/dlfxinw9v/image/upload/v1616837651/event_image_npqdmv.png",
  },

  social1: {
    type: String,
    max: 100,
    // default: "no comment",
  },

  proof1: {
    trype: String,
  },

  proof2: {
    trype: String,
  },
  proof3: {
    trype: String,
  },
  proof4: {
    trype: String,
  },
  ecological1: {
    type: String,
    max: 100,
    // default: "no comment",
  },

  ecological2: {
    type: String,
    max: 100,
    // default: "no comment",
  },

  economic1: {
    type: String,
    max: 100,
    // default: "no comment",
  },

  answers: { type: Number, default: 0 },
  proofed: { type: Number, default: 5 },
  // coworker: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Company = model("Company", companySchema);

module.exports = Company;
