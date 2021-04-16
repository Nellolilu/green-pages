// TO DOS THURSDAY (FRIDAY)
// - multiple pictures / picturecut?
// - edit & delete (need a user!!) inkl. logo change
// - branch go selected - not smooth yet
//check id for email vs. url

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

// THE ROUTER BELONGS INTO PROFILE ROUTE
// FIRST AUTH; THEN FINISH

// // NEED A PARAMS FOR ID CHECK
router.get("/:mufasa/edit-company", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(
        "this is the company",
        thisCompany
        //   "owner id",
        //   thisCompany.owner._id,
        //   "session_id",
        //   req.session.user._id,
        //   thisCompany.owner._id === req.session.user._id
        //   WHY IS ID FALSE??
      );
      // console.log("req.session.user:", req.session.user);

      // NO NEED BECAUSE OF CATCH
      // if (!thisCompany) {
      //   console.log("breeak");
      //   res.redirect("/");
      // }

      // CHECK OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          // console.log("isOwner:", isOwner);
        }
      }

      // console.log("otherBranches:", otherBranches);

      if (isOwner) {
        res.render("edit-company", {
          company: thisCompany,
          otherBranches: BRANCH_ENUM.filter(
            (BRANCH_ENUM) => BRANCH_ENUM !== thisCompany.branch
          ),
          otherSizes: SIZE_ENUM.filter(
            (SIZE_ENUM) => SIZE_ENUM !== thisCompany.size
          ),
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log("err:", err);
      console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
      res.redirect("/");
    });
});

router.post("/:mufasa/edit-company", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      // OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
        }
      }
      //ENUM WORK
      const otherBranches = BRANCH_ENUM.filter(
        (BRANCH_ENUM) => BRANCH_ENUM !== thisCompany.branch
      );
      const otherSizes = SIZE_ENUM.filter(
        (SIZE_ENUM) => SIZE_ENUM !== thisCompany.size
      );
      console.log("otherSizes:", otherSizes);

      if (isOwner) {
        // UPDATE
        Company.findByIdAndUpdate(
          req.params.mufasa,
          {
            name,
            // url,
            // email,
            // adress,
            // // size,
            // // branch,
            // description,
            // // logo,
            // social1,
            // ecological1,
            // economic1,
          },
          { new: true }
        ).then((newCompany) => {
          console.log("newCompany", newCompany);
          res.redirect("/search-result");
        });

        //RENDER

        // res.render("edit-company", {
        //   company: thisCompany,
        //   otherBranches: otherBranches,
        //   otherSizes: otherSizes,
        // });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log("err:", err);
      console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
      res.redirect("/");
    });

  // const {
  //   name,
  //   url,
  //   email,
  //   adress,
  //   size,
  //   branch,
  //   description,
  //   logo,
  //   social1,
  //   ecological1,
  //   economic1,
  // } = req.body;

  // Company.findByIdAndUpdate(
  //   req.session.user.listings.
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
