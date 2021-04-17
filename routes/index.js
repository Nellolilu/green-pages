const Company = require("../models/Company.model");
const SIZE_ENUM = require("../utils/size-enum");
const BRANCH_ENUM = require("../utils/branch-enum");
const createCompanyValidation = require("../utils/create-company-validation");
const isLoggedMiddleware = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const parser = require("../config/cloudinary");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/search-result", (req, res) => {
  const companyName = new RegExp(req.query.company, "i");
  Company.find({ name: { $regex: companyName } }).then((allCompanies) => {
    console.log("allCompanies", allCompanies);
    res.render("search-result", { companiesList: allCompanies });
  });
});

router.get("/show/:mufasa", (req, res) => {
  console.log("req.params", req.params.mufasa);
  Company.findById(req.params.mufasa).then((thisCompany) => {
    console.log("this is the company", thisCompany);
    res.render("show-company", { thisCompany });
  });
});

// THE ROUTER BELONGS INTO PROFILE ROUTE
// FIRST AUTH; THEN FINISH

// // NEED A PARAMS FOR ID CHECK
router.get("/:mufasa/edit-company", (req, res) => {
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
        };

        // console.log(updater);

        if (req.file) {
          updater.logo = req.file.path;
        }
        // UPDATE
        Company.findByIdAndUpdate(req.params.mufasa, updater, {
          new: true,
        }).then((newCompany) => {
          console.log("newCompany", newCompany);
          res.redirect("/search-result");
        });

        // IF NOT OWNER
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

module.exports = router;
