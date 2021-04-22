const express = require("express");

const router = express.Router();
const isLoggedMiddleware = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Company = require("../models/Company.model");

router.get("/", isLoggedMiddleware, (req, res) => {
  console.log("req.session.user", req.session.user);
  Company.find({owner: {$eq: `${req.session.user._id}`}})
  .then((ownersCompanies) => {
    console.log("test", ownersCompanies)
    res.render("profile", { user: req.session.user, ownersCompanies} )
  });
});







module.exports = router;