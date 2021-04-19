const Company = require("../models/Company.model");
// NO NEEDED?
// const SIZE_ENUM = require("../utils/size-enum");
// const BRANCH_ENUM = require("../utils/branch-enum");
// const createCompanyValidation = require("../utils/create-company-validation");
// const isLoggedMiddleware = require("../middlewares/isLoggedIn");
// const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
// const parser = require("../config/cloudinary");
const User = require("../models/User.model");

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

router.get("/branch=production", (req, res) => {
  Company.find({ branch: { $eq: "Production" } }).then((foundByBranch) => {
    console.log("foundByBranch", foundByBranch);
    res.render("search-result", { companiesList: foundByBranch });
  });
});

router.get("/branch=service", (req, res) => {
  Company.find({ branch: { $eq: "Service" } }).then((foundByBranch) => {
    console.log("foundByBranch", foundByBranch);
    res.render("search-result", { companiesList: foundByBranch });
  });
});

router.get("/branch=other", (req, res) => {
  Company.find({ branch: { $eq: "Other" } }).then((foundByBranch) => {
    console.log("foundByBranch", foundByBranch);
    res.render("search-result", { companiesList: foundByBranch });
  });
});

router.get("/branch=sales", (req, res) => {
  Company.find({ branch: { $eq: "Sales" } }).then((foundByBranch) => {
    console.log("foundByBranch", foundByBranch);
    res.render("search-result", { companiesList: foundByBranch });
  });
});

module.exports = router;
