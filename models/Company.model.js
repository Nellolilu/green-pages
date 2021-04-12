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
  },

  ecological1: {
    type: String,
    max: 100,
  },

  economic1: {
    type: String,
    max: 100,
  },
});

const Company = model("Company", companySchema);

module.exports = Company;
