const Account = require("../../models/account_model");
const md5 = require('md5');

const systemConfig = require("../../config/system")

module.exports.login = async(req, res) => {
    res.render("admin/page/auth/login", {
        pageTitle: "Login",
    })
}

module.exports.loginPost = async(req, res) => {
    // console.log(req.body);
    const user = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    // console.log(user);

    if(!user){
        req.flash("error", "Not found!");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) != user.password){
        req.flash("error", "Wrong password!");
        res.redirect("back");
        return;
    }
    

    if(user.status == "inactive"){
        req.flash("error", "Account is locked!");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout = async(req, res) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);

}