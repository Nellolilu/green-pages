// ******** USEFUL LATER
// const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");
// const slugify = require("slugify");

// **************BUGS:
// after errorMessage select is empty, message doent go away

const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const Company = require("../models/Company.model");
const User = require("../models/User.model");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("new", {
    branch: BRANCH_ENUM,
    size: SIZE_ENUM,
  });
});

router.post("/", (req, res) => {
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
    economic1,
  } = req.body;
  console.log(req.body);

  // error messages for name(taken), email, adress, size, branch, decription, questions
  if (name.length > 20) {
    res.render("new", {
      errorMessage: "Your name is too long",
    });
    return;
  }

  // create new, redirect
});

module.exports = router;
