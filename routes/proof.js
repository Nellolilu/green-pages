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
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }
      if (isOwner) {
        res.render("proof/proof1", { thisCompany });
      } else {
        res.redirect("/");
      }
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

      if (isOwner) {
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
      } else {
        res.redirect("/");
      }
    });
});

router.get("/:mufasa/1", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }
      if (isOwner) {
        res.render("proof/proof1", { thisCompany });
      } else {
        res.redirect("/");
      }
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

      if (isOwner) {
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
      } else {
        res.redirect("/");
      }
    });
});

router.get("/:mufasa/3", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }
      if (isOwner) {
        res.render("proof/proof3", { thisCompany });
      } else {
        res.redirect("/");
      }
    });
});

router.post("/:mufasa/3", parser.single("proof3"), (req, res) => {
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

      if (isOwner) {
        let proof3;
        if (req.file) {
          proof3 = req.file.path;
        }

        Company.findByIdAndUpdate(
          req.params.mufasa,
          { proof3 },
          { new: true }
        ).then((newCompany) => {
          console.log("newCompany", newCompany);
          res.render("show-company", { isOwner, thisCompany: newCompany });
        });
      } else {
        res.redirect("/");
      }
    });
});

router.get("/:mufasa/4", (req, res) => {
  Company.findById(req.params.mufasa)
    .populate("owner")
    .then((thisCompany) => {
      console.log(thisCompany);
      let isOwner = false;
      if (req.session.user) {
        if (thisCompany.owner.email === req.session.user.email) {
          isOwner = true;
          console.log("isOwner?", isOwner);
        }
      }
      if (isOwner) {
        res.render("proof/proof4", { thisCompany });
      } else {
        res.redirect("/");
      }
    });
});

router.post("/:mufasa/4", parser.single("proof4"), (req, res) => {
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

      if (isOwner) {
        let proof4;
        if (req.file) {
          proof4 = req.file.path;
        }

        Company.findByIdAndUpdate(
          req.params.mufasa,
          { proof4 },
          { new: true }
        ).then((newCompany) => {
          console.log("newCompany", newCompany);
          res.render("show-company", { isOwner, thisCompany: newCompany });
        });
      } else {
        res.redirect("/");
      }
    });
});

module.exports = router;
