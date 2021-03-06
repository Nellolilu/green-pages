const express = require("express");
const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const Company = require("../models/Company.model");
const User = require("../models/User.model");
const createCompanyValidation = require("../utils/create-company-validation");
const isLoggedMiddleware = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const parser = require("../config/cloudinary");
const router = express.Router();

router.get("/", isLoggedMiddleware, (req, res) => {
  console.log("user:", req.session.user);
  res.render("create-company", {
    branch: BRANCH_ENUM,
    size: SIZE_ENUM,
  });
});

router.post("/", isLoggedMiddleware, parser.single("image"), (req, res) => {
  console.log("req.file:", req.file);
  console.log("req.files:", req.files);

  let logo;
  if (req.file) {
    logo = req.file.path;
  }

  let answers = 0;

  const {
    name,
    url,
    email,
    adress,
    size,
    branch,
    description,
    social1,
    ecological1,
    ecological2,
    economic1,
    otherBranches,
    otherSizes,
  } = req.body;

  if (social1.length > 0) {
    answers += 1;
  }
  if (economic1.length > 0) {
    answers += 1;
  }
  if (ecological1.length > 0) {
    answers += 1;
  }
  if (ecological2.length > 0) {
    answers += 1;
  }

  // // to do: error messages  for email does not match

  const errorMessage = createCompanyValidation(req.body);
  if (errorMessage) {
    return res.render("create-company", {
      errorMessage,
      branch: BRANCH_ENUM,
      size: SIZE_ENUM,
    });
  }

  Company.findOne({ url }).then((found) => {
    if (found) {
      return res.render("create-company", {
        errorMessage: "sorry, that company already exists.",
        branch: BRANCH_ENUM,
        size: SIZE_ENUM,
      });
    }
    Company.create({
      name,
      url,
      email,
      adress,
      size,
      branch,
      description,
      logo,
      social1,
      ecological1,
      ecological2,
      economic1,
      answers,
      owner: req.session.user._id,
    }).then((createdCompany) => {
      console.log(createdCompany);
      res.redirect("/");
    });
  });
});

module.exports = router;
