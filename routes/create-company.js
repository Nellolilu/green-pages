// TO DOS THURSDAY (FRIDAY)
// - Bugfix no fileupload
// - multiple pictures / picturecut?
// - Bugfix errormessages & middelware

// - edit & delete (need a user!!) inkl. logo change

// TO SET UO SATURDAY
// - Index, Profile, Search

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
  const logo = req.file.path;
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

  // if (name.length < 3) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please add your companies name",
  //   });
  //   return;
  // }

  // if (url.length < 16) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please fill in a complete url",
  //   });
  //   return;
  // }

  // // to do: error messages  for email does not match
  // if (email.length < 8) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please fill in a complete emailadress",
  //   });
  //   return;
  // }

  // if (adress.length < 4) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please share your adress",
  //   });
  //   return;
  // }

  // if (size.length < 1) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please pick a size for your company",
  //   });
  //   return;
  // }

  // if (branch.length < 1) {
  //   // alert("howdy");
  //   res.render("create-company", {
  //     errorMessage: "please pick a branch for your company",
  //   });
  //   return;
  // }

  // // to do: error messages  for email does not match

  // // only works if the input stays
  // if (social1 < 1 || ecological1 < 1 || economic1 < 1) {
  //   res.render("create-company", {
  //     errorMessage: "are you sure you dont want to go transparent?",
  //   });
  //   return;
  // }

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

// NEED A PARAMS FOR ID CHECK
router.get("/edit-company", (req, res) => {
  Company.find({}).then((allCompanies) => {
    console.log("this is all you got", allCompanies);
    // console.log("req.session.user:", req.session.user);
    // REQ SESSION USER IS UNDEFINED
    console.log(req.session);
    res.render("edit-company", {
      company: allCompanies[0],
      branch: BRANCH_ENUM,
      size: SIZE_ENUM,
    });
  });
});

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

  //   THIS ROUTER BELONGS TO INDEX? SHOW COMPANY // ROUTE DOESNT WORK

  //   router.get("/:mufasa", (req, res) => {
  //     console.log("req.params", req.params.mufasa);
  //     Company.findById(req.params.mufasa).then((thisCompany) => {
  //       console.log("this is the company", thisCompany);
  //       res.render("show-company", { thisCompany });
  //     });
  //   });
});

module.exports = router;
