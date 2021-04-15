// TO DOS THURSDAY (FRIDAY)
// - multiple pictures / picturecut?
// - edit & delete (need a user!!) inkl. logo change
// - branch go selected, check id for email vs. url

// TO SET UO SATURDAY
// -  Profile, Search

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
// const createErrors = require("../middlewares/createErrors");

const parser = require("../config/cloudinary");

// //test didnt work
// var alert = require("alert");

const router = express.Router();

router.get("/", (req, res) => {
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
      // owner: req.session.user._id,
    }).then((createdCompany) => {
      console.log("created company:", createdCompany);
      res.redirect("/");
    });
  });
});

// THE ROUTER BELONGS INTO PROFILE ROUTE
// FIRST AUTH; THEN FINISH

// // NEED A PARAMS FOR ID CHECK
// router.get("/edit-company", (req, res) => {

//   // find by id  - /:eder3r /edit
//   // :eder3r -- send branch, size
//   //

//   // Company.find({}).then((allCompanies) => {
//   //   console.log("this is all you got", allCompanies);
//   //   // console.log("req.session.user:", req.session.user);

//     console.log(req.session);
//     res.render("edit-company", {
//       company: allCompanies[0],
//       branch: BRANCH_ENUM,
//       size: SIZE_ENUM,
//     });
//   });
// });

router.post("/edit-company", (req, res) => {
  const {
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
  } = req.body;

  // Company.findByIdAndUpdate(
  //   req.session.user.listings.

  // populate to get _id ?
  //   // id of the company ??
  //   { name, url, email },
  //   // how do I say all??
  //   { new: true }
  // ).then((newCompany) => {
  //   console.log("new Company:", newCompany);
  //   req.session.user.listings = newCompany;
  //   res.redirect("/profile");
  // });
});

module.exports = router;
