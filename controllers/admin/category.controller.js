//model
const Category = require("../../models/category_model");
//systemconfig
const systemConfig = require("../../config/system") 

//[GET] admin/category
module.exports.index = async(req, res) => {
    let find = {
        deleted: false
    }
    const records = await Category.find(find);

    const newRecord = createTree(records);

    res.render("admin/page/category/index", {
        pageTitle: "Danh mục sản phẩm",
        record : newRecord
    })
}

//helper createTree
const createTree = require("../../helpers/createTree");


module.exports.create = async(req, res) => {
    let find = {
        deleted: false
    }
    const records = await Category.find(find);

    const newRecord = createTree(records);

    res.render("admin/page/category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
        record : newRecord
    })
}

module.exports.createPost = async(req,res) => {
    console.log(req.body);

    if(req.body.position === ""){
        const countCategory = await Category.countDocuments();
        req.body.position = countCategory + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    req.flash('success', `Create status success!`);
    const record = new Category(req.body);
    await record.save();
    res.redirect(`/${systemConfig.prefixAdmin}/category`);

}
