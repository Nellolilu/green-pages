const Company = require("../models/Company.model");
const User = require("../models/User.model");
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// FILTER OPTIONS
router.get("/search-result", (req, res) => {
  const companyName = new RegExp(req.query.company, "i");
  Company.find({ name: { $regex: companyName } })
    .then((allCompanies) => {
      // console.log("allCompanies[0]", allCompanies[0]);
      // console.log("spread allCompanies[0]", { ...allCompanies[0].toJSON() });

      const proofArray = allCompanies.map((element) => {
        let proofed = 0;
        if (element.proof1) {
          proofed += 1;
        }
        if (element.proof2) {
          proofed += 1;
        }
        if (element.proof3) {
          proofed += 1;
        }
        if (element.proof4) {
          proofed += 1;
        }
        return { ...element.toJSON(), proofed };
      });

      console.log("AFTER THE MAP: ", proofArray);

      res.render("search-result", { companiesList: proofArray });
    })
    .catch((err) => {
      console.log("err:", err);
      console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
      res.redirect("/");
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
