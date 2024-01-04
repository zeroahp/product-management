//model
const Account = require("../../models/account_model");
const Role = require("../../models/role_model");

//md5
const md5 = require('md5');

//systemconfig
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false
    });

    for( const record of records){
        const role = await Role.findOne({
           _id: record.role_id
        });

        record.role = role;
    }
    
    res.render("admin/page/account/index", {
        pageTitle: "Tài khoản",
        records: records,

    })
}

module.exports.create = async (req, res) => {

    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/page/account/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    });
}


module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const records = new Account(req.body);
    console.log(records);
    await records.save();

    req.flash("success", "Thêm tài khoản thành công");

    res.redirect(`/${systemConfig.prefixAdmin}/account`);

}

module.exports.edit = async (req, res) => {

    let find = {
        _id: req.params.id,
        deleted: false
    }

    try {
        const data = await Account.findOne(find);

        const roles = await Role.find({
            deleted: false
        });

        res.render("admin/page/account/edit", {
            pageTitle: "Chỉnh sủa thông tin tài khoản",
            data: data,
            roles: roles
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/account`)
    }
}

module.exports.editPatch = async (req, res) => {
    if(req.params.password){
        req.body.password = md5(req.body.password);
    }else{
        delete req.params.password;
    }
    
    await Account.updateOne({_id: req.params.id}, req.body);
    req.flash("success", "Chỉnh sửa tài khoản thành công");

    res.redirect(`/${systemConfig.prefixAdmin}/account`);
  
}