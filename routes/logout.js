exports.logout = function(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    return res.redirect("/login");
  });
};
