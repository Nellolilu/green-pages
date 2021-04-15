module.exports = (req, res, next) => {
  if (name.length < 3) {
    res.render("create-company", {
      errorMessage: "please add your companies name",
    });
    return;
  }
  if (webpage.length < 16) {
    res.render("create-company", {
      errorMessage: "please fill in a complete url",
    });
    return;
  }
  // to do: error messages  for email does not match
  if (email.length < 8) {
    res.render("create-company", {
      errorMessage: "please fill in a complete emailadress",
    });
    return;
  }
  if (adress.length < 4) {
    res.render("create-company", {
      errorMessage: "please share your adress",
    });
    return;
  }
  if (size.length < 1) {
    res.render("create-company", {
      errorMessage: "please pick a size for your company",
    });
    return;
  }
  if (branch.length < 1) {
    res.render("create-company", {
      errorMessage: "please pick a branch for your company",
    });
    return;
  }
  if (social1 < 1 || ecological1 < 1 || economic1 < 1) {
    res.render("create-company", {
      errorMessage: "are you sure you dont want to go transparent?",
    });
    return;
  }
  next();
};
