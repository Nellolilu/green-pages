// ******** USEFUL LATER
// const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");
// const slugify = require("slugify");

// BUGS:
// after errorMessage select is empty, message doent go away
// make select and branch by default other, and name as placeholder
// May exchange errormessage to alerts? to keep contents

const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const Company = require("../models/Company.model");
const User = require("../models/User.model");

const express = require("express");

//test
var alert = require("alert");

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
  console.log("this is the email:", email);

  // error messages  for email does not match
  //adress, size, branch,  questions
  if (adress.length < 4) {
    // alert("howdy");
    res.render("new", {
      errorMessage: "please share your adress",
    });
    return;
  }

  // only works if the input stays
  if (social1 < 1 || ecological1 < 1 || economic1 < 1) {
    res.render("new", {
      errorMessage: "are you sure you dont want to go transparent?",
    });
    return;
  }

  Company.findOne({ url }).then((found) => {
    if (found) {
      return res.render("new", {
        errorMessage: "sorry, that company already exists.",
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
      social1,
      ecological1,
      economic1,
      // owner: req.session.user._id,
    }).then((createdCompany) => {
      console.log("created company:", createdCompany);
      res.redirect("/");
    });
  });
});

module.exports = router;
