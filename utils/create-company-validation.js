module.exports = (body) => {
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
  } = body;
  if (name.length < 3) {
    return "please add your companies name";
  }
  if (url.length < 16) {
    return "please fill in complete url";
  }

  if (email.length < 8) {
    return "please fill in a complete emailadress";
  }
  if (adress.length < 4) {
    return "please share your adress";
  }
  if (size.length < 1) {
    return "please pick a size for your company";
  }
  if (branch.length < 1) {
    return "please pick a branch for your company";
  }

  if (social1 < 1 || ecological1 < 1 || economic1 < 1) {
    return "are you sure you dont want to go transparent?";
  }
};
