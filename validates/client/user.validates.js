function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

module.exports.checkRegister = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", `Please fill in full name!`);
        res.redirect("back");
        return;
    }

    if(!req.body.email) {
        req.flash("error", `Please fill in email!`);
        res.redirect("back");
        return;
    }

    if(!req.body.password) {
        req.flash("error", `Please fill in password!`);
        res.redirect("back");
        return;
    }
    next();
}

module.exports.checkLogin = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", `Please fill in email!`);
        res.redirect("back");
        return;
    }

    if(!req.body.password) {
        req.flash("error", `Please fill in password!`);
        res.redirect("back");
        return;
    }
    next();
}

module.exports.forgotPasswordPost = async (req, res, next) => {
    if (!req.body.email) {
      req.flash('error', "Email must not be empty");
      res.redirect('back');
      return;
    }
  
    if (!isValidEmail(req.body.email)) {
      req.flash('error', "Invalid email format");
      res.redirect('back');
      return;
    }
  
    next();
};

module.exports.resetPasswordPost = async (req, res, next) => {
    if (!req.body.password) {
      req.flash('error', "Password must not be empty");
      res.redirect('back');
      return;
    }
  
    if (!req.body.confirmPassword) {
      req.flash('error', "Please confirm your password!");
      res.redirect('back');
      return;
    }
  
    if (req.body.confirmPassword != req.body.password) {
      req.flash('error', "Password confirm does not match, please try again!");
      res.redirect('back');
      return;
    }
  
    next();
};