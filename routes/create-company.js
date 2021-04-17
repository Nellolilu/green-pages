// - edit & delete (need a user!!)
// logo change
// -  Profile, Search

// NICE TO SKIPS?
// - multiple pictures / picturecut?
// - branch go selected - not smooth yet
//check id for email vs. url
// go back? - skip it

// MON & TUE
// - additionals: Network/ rating / Proofpicture

// TUE NIGHT
// - set up CSS looks

// ******** USEFUL LATER
// const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");
// const slugify = require("slugify");

// ********* SERIOUS BUGS:
// DOES THIS ONLY WORK IF AUTH FINISHED?
// console.log("*******req.session.user:", req.session.user);
// after errorMessage select is empty, message doent go away, ENUMS broken, also in edit

// ********* NICE TO SOLVE BUGS:

//ERROR MESSAGES

// middelware does not work
// May exchange errormessage to alerts? to keep contents
// enum required message breaks.

// CHECK EMAIL FOR COMANY

// GO BACK statt GO HOME

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

router.get("/", (req, res) => {
  console.log("user:", req.session.user);
  res.render("create-company", {
    branch: BRANCH_ENUM,
    size: SIZE_ENUM,
  });
});

router.post("/", parser.single("image"), (req, res) => {
  console.log("req.file:", req.file);
  let logo;
  if (req.file) {
    logo = req.file.path;
  }

  //const logo=req.file?.path

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
    otherBranches,
    otherSizes,
  } = req.body;

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
      economic1,
      owner: req.session.user._id,
    }).then((createdCompany) => {
      console.log("created company:", createdCompany);
      res.redirect("/");
    });
  });
});

module.exports = router;
