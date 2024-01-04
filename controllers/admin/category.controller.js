//model
const Category = require("../../models/category_model");
//systemconfig
const systemConfig = require("../../config/system")
//helper createTree
const createTree = require("../../helpers/createTree");

//[GET] admin/category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Category.find(find);

    const newRecord = createTree(records);

    res.render("admin/page/category/index", {
        pageTitle: "Danh mục sản phẩm",
        record: newRecord
    })
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Category.find(find);

    const newRecord = createTree(records);

    res.render("admin/page/category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
        record: newRecord
    })
}

module.exports.createPost = async (req, res) => {

        if (req.body.position === "") {
            const countCategory = await Category.countDocuments();
            req.body.position = countCategory + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }

        req.flash('success', `Create status success!`);
        const record = new Category(req.body);
        await record.save();
        res.redirect(`/${systemConfig.prefixAdmin}/category`);
   
}

// edit
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const data = await Category.findOne({
        _id: id,
        deleted: false
    })

    let find = {
        deleted: false
    }
    const records = await Category.find(find);

    const newRecord = createTree(records);

    res.render("admin/page/category/edit.pug", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecord
    })


}

module.exports.editProduct = async (req, res) => {
    try {
        const id = req.params.id;

        req.body.position = parseInt(req.body.position);

        await Category.updateOne({
            _id: id
        }, req.body);
        res.redirect("back");

    } catch (error) {
        console.log('ERROR OCCURRED:', error);
        res.redirect("back");
    }
}
//End edit 

//delete
module.exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id}, 
        {
            deleted: true,
            deletedBy:{
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
            
        }); // xoa mềm
    res.redirect("back");
}

//end delete