//edit user needs to be updated, bright potato can help

const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;
// Require the User model in order to interact with the database
const User = require("../models/User.model");
// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");
router.get("/signup", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", shouldNotBeLoggedIn, (req, res) => {
  const { name, email, password } = req.body;

  if (!email) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your E-Mail-Adress.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */
  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((found) => {
    // If the email is found, send the message email is taken
    if (found) {
      return res
        .status(400)
        .render("signup", { errorMessage: "E-mail-adress already taken." });
    }
    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          name,
          email,
          password: hashedPassword,
        });
      })
      .then((user) => {
        // Bind the user to the session object
        req.session.user = user;
        res.redirect("/");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "The e-mail adress needs to be unique. The e-mail adress you chose is already used.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});
router.get("/login", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/login");
});
router.post("/login", shouldNotBeLoggedIn, (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your e-mail-adress.",
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
      }
      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/profile");
      });
    })
    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.get("/edit-user", isLoggedIn, (req, res) => {
  res.render("auth/edit-user", {
    user: req.session.user,
  });
});

router.post("/edit-user", (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  User.findByIdAndUpdate(
    req.session.user._id,
    { name, email, password },
    { new: true }
  ).then((newUser) => {
    console.log("newUser", newUser);
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

router.get("/delete", isLoggedIn, (req, res) => {
  User.findByIdAndDelete(req.session.user._id).then(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
