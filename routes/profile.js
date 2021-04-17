const express = require("express");

const router = express.Router();
const isLoggedMiddleware = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");

router.get("/", isLoggedMiddleware, (req, res) => {
  console.log("req.session.user", req.session.user);

  res.render("profile", { user: req.session.user });
});


module.exports = router;