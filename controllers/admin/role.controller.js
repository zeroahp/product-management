//model
const Role = require("../../models/role_model");
//systemconfig
const systemConfig = require("../../config/system") 
//helper createTree
// const createTree = require("../../helpers/createTree");

module.exports.index = async(req, res) => {
    const records = await Role.find({
        deleted: false
    });
    res.render("admin/page/role/index", {
        pageTitle: "Nhóm Quyền",
        records : records
    })
}

module.exports.create = async (req, res) => {

    res.render("admin/page/role/create", {
      pageTitle: "Tạo mới nhóm quyền",

    });
  }
  

module.exports.createRole = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

  req.flash("success", "Thêm nhóm quyền thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/role`);

}

//edit
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
    
        const data = await Role.findOne({
          _id: id,
          deleted: false
        });
    
        res.render("admin/page/role/edit", {
          pageTitle: "Chỉnh sửa nhóm quyền",
          data: data
        });
    } 
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/role`);
      }
}
  
//edit/PATCH
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({ _id: id }, req.body);

  req.flash("success", "Cập nhật nhóm quyền thành công");

  res.redirect("back");

}


module.exports.rolePermission = async(req, res) => {
  const records = await Role.find({
    deleted: false
  });
  res.render("admin/page/role/permission", {
    pageTitle: "Phan quyền",
    records: records
  });
}

module.exports.rolePermissionPatch = async(req, res) => {
  const permissions = JSON.parse(req.body.permission);
  
  
  for(const item of permissions){
    await Role.updateOne(
      { _id: item.id},
      {
        permission: item.permission
      }
    );
  }

  req.flash("success", "Phân quyền thành công");

  res.redirect("back");
}