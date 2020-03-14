const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  } else {
    next();
  }
};

exports.redirectLogin = redirectLogin;
exports.redirectHome = redirectHome;
