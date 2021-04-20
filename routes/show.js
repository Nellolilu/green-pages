const Company = require("../models/Company.model");
const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const createCompanyValidation = require("../utils/create-company-validation");
const isLoggedMiddleware = require("../middlewares/isLoggedIn");
// const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const parser = require("../config/cloudinary");
const User = require("../models/User.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = require("express").Router();

router.get("/:mufasa", (req, res) => {
  console.log("req.params", req.params.mufasa);
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      console.log(req.session.user);
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
        }
      }
      console.log("this is the company", thisCompany);
      console.log("this is the owner", isOwner);
      res.render("show-company", { isOwner, thisCompany });
    });
});

// THE ROUTER BELONGS INTO PROFILE ROUTE

router.get("/:mufasa/edit-company", isLoggedMiddleware, (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      // CHECK OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
        }
      }
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
        res.redirect("/show", { thisCompany, isOwner });
      }
    })
    .catch((err) => {
      console.log("err:", err);
      console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
      res.redirect("/");
    });
});

router.post(
  "/:mufasa/edit-company",
  isLoggedMiddleware,
  parser.single("logo"),
  (req, res) => {
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
      answers,
    } = req.body;

    console.log(req.body);

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

        if (isOwner) {
          let answers = 0;

          const updater = {
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
            answers,
          };

          console.log("this is the updater", updater);

          if (req.file) {
            updater.logo = req.file.path;
          }

          if (updater.social1.length > 0) {
            updater.answers += 1;
            console.log("answers", answers);
          }
          if (updater.economic1.length > 0) {
            updater.answers += 1;
            console.log("answers", answers);
          }
          if (updater.ecological1.length > 0) {
            updater.answers += 1;
            console.log("answers", answers);
          }

          // UPDATE
          Company.findByIdAndUpdate(req.params.mufasa, updater, {
            new: true,
          }).then((newCompany) => {
            console.log("newCompany", newCompany);
            res.redirect("/show", { thisCompany: newCompany });
          });

          // IF NOT OWNER
        } else {
          res.redirect("/show", { thisCompany });
        }
      })
      .catch((err) => {
        console.log("err:", err);
        console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
        res.redirect("/");
      });
  }
);

// nned also middelware & check on the pictureproof
// *********** is logged middelware needs here, need check if already existing in coworker
// THIS VERSION WORKS LIKE A PERSONAL WISHLIST
router.get("/:mufasa/remember", (req, res) => {
  Company.findById(req.params.mufasa).then((foundCompany) => {
    console.log("found", foundCompany);
    // console.log("this user", req.session.user);
    if (!foundCompany) {
      res.redirect("/");
    }

    // ************* NEXT: CHECKS FOR USER / ALREADY REMEMBER / LEAVE

    let doesNotRememberYet;
    let forgetAbout;

    //DOESNT WORK YET
    // if (!req.session.user) {
    //   res.render("/show-company", {
    //     foundCompany,
    //     errormessage: "please log in for this feature",
    //   });
    // }

    // // CHECK OWNERSHIP
    // let isOwner = false;
    // if (req.session.user) {
    //   if (foundCompany.owner.email === req.session.user.email) {
    //     isOwner = true;
    //   }
    // }
    // IS NOT OWNER
    // if (!isOwner) {
    //   console.log("you are the not owner");
    User.findByIdAndUpdate(
      req.session.user._id,
      { $addToSet: { remember: foundCompany._id } },
      { new: true }
    ).then((updatedUser) => {
      console.log("see if you remember:", updatedUser);
      res.redirect("/search-result");
    });
    // }
    // IF OWNER
    // else {
    //   console.log("you are not the owner");
    //   res.redirect("/");
    // }
  });
});

router.get("/:mufasa/delete", isLoggedMiddleware, (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log("this exists", thisCompany);

      if (!thisCompany) {
        res.redirect("/");
      }
      // CHECK OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
        }
      }

      // IS OWNER
      if (isOwner) {
        console.log("you are the owner");
        Company.findByIdAndDelete(thisCompany._id).then(() => {
          User.findByIdAndUpdate(thisCompany.owner._id, {
            $pull: { listings: thisCompany._id },
          }).then(() => {
            res.redirect("/search-result");
          });
        });
      }

      // IF NOT OWNER
      else {
        console.log("you are not the owner");
        res.redirect("/");
      }
    });
});

module.exports = router;
