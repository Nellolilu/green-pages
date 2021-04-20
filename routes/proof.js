const express = require("express");

const Company = require("../models/Company.model");
const User = require("../models/User.model");
const parser = require("../config/cloudinary");

const router = express.Router();

router.get("/:mufasa/1", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      // // CHECK OWNERSHIP // AND NEED A IF TRUE
      // let isOwner = false;
      // if (req.session.user) {
      //   if (thisCompany.owner.email === req.session.user.email) {
      //     isOwner = true;
      //     console.log("isOwner?", isOwner);
      //   }
      // };
      res.render("proof/proof1", { thisCompany });
    });
});

router.post("/:mufasa/1", parser.single("proof1"), (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      // CHECK OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }

      // IF IS OWNER put it in an if(){}!!!

      let proof1;
      if (req.file) {
        proof1 = req.file.path;
      }

      Company.findByIdAndUpdate(
        req.params.mufasa,
        { proof1 },
        { new: true }
      ).then((newCompany) => {
        console.log("newCompany", newCompany);
        res.render("show-company", { isOwner, thisCompany: newCompany });
      });
    });
});

router.get("/:mufasa/2", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      // // CHECK OWNERSHIP // AND NEED A IF TRUE
      // let isOwner = false;
      // if (req.session.user) {
      //   if (thisCompany.owner.email === req.session.user.email) {
      //     isOwner = true;
      //     console.log("isOwner?", isOwner);
      //   }
      // };
      res.render("proof/proof2", { thisCompany });
    });
});

router.post("/:mufasa/2", parser.single("proof2"), (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      // CHECK OWNERSHIP
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }

      // IF IS OWNER put it in an if(){}!!!

      let proof2;
      if (req.file) {
        proof2 = req.file.path;
      }

      Company.findByIdAndUpdate(
        req.params.mufasa,
        { proof2 },
        { new: true }
      ).then((newCompany) => {
        console.log("newCompany", newCompany);
        res.render("show-company", { isOwner, thisCompany: newCompany });
      });
    });
});

module.exports = router;
