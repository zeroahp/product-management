const systemConfig = require("../../config/system");
const Account = require("../../models/account_model");
const Role = require("../../models/role_model");

module.exports.requireAuth = async (req, res, next) => {

    if(!req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const user = await Account.findOne({
        token: req.cookies.token
    })

    if(!user){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    };

    const role = await Role.findOne({
        _id: user.role_id
    }).select("title permission")

    res.locals.user = user;
    res.locals.role = role;

    next();
}