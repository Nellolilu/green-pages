// ******** USEFUL LATER
// const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");
// const slugify = require("slugify");

// ********* SERIOUS BUGS:

// ********* NICE TO SOLVE BUGS:
// after errorMessage select is empty, message doent go away
// make select and branch by default other, and name as placeholder
// May exchange errormessage to alerts? to keep contents

const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const Company = require("../models/Company.model");
const User = require("../models/User.model");

const express = require("express");

// //test didnt work
// var alert = require("alert");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("create-company", {
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

  // to do: error messages  for email does not match

  if (adress.length < 4) {
    // alert("howdy");
    res.render("create-company", {
      errorMessage: "please share your adress",
    });
    return;
  }

  // only works if the input stays
  if (social1 < 1 || ecological1 < 1 || economic1 < 1) {
    res.render("create-company", {
      errorMessage: "are you sure you dont want to go transparent?",
    });
    return;
  }

  Company.findOne({ url }).then((found) => {
    if (found) {
      return res.render("create-company", {
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

// THE ROUTER BELONGS INTO PROFILE
router.get("/edit-company", (req, res) => {
  Company.find({}).then((allCompanies) => {
    console.log("this is all sou got", allCompanies);
    res.render("edit-company", {
      company: allCompanies[0],
      // company: req.session.listings,
      branch: BRANCH_ENUM,
      size: SIZE_ENUM,
    });
  });
});

module.exports = router;
