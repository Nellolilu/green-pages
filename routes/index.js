const Company = require("../models/Company.model");

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

module.exports = router;
