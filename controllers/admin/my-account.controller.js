const md5 = require("md5");
//model
const Account = require("../../models/account_model");
const Role = require("../../models/role_model");

module.exports.index = async (req, res) => {
    res.render("admin/page/my-account/index", {
        pageTitle: "Personal Information"
    })
}

module.exports.edit = async (req, res) => {
    res.render("admin/page/my-account/edit", {
        pageTitle: "Change Information"
    })
}

module.exports.editPatch = async (req, res) => {
    if(req.params.password){
        req.body.password = md5(req.body.password);
    }else{
        delete req.params.password;
    }
    // console.log("local",res.locals.use r.id);
    
    await Account.updateOne({_id: res.locals.user.id}, req.body);
    req.flash("success", "Chỉnh sửa tài khoản thành công");

    res.redirect("back");
}
