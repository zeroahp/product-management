const Product = require("../../models/product_model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const objectSearchHelpers = require("../../helpers/search")
const objectPaginationHelpers = require("../../helpers/pagination")
const systemConfig = require("../../config/system") 

//[GET] /admin/products
//              tên
module.exports.index = async(req, res) => {
    
        //req.query.status yeu cau tu user ?status=active

    //mixin-filter-status
    const filterStatus = filterStatusHelpers(req.query);    
    //search : mixin-findkeyword
    let objectSearch = objectSearchHelpers(req.query)
 
     const find = {
         deleted : false
     }
 
     if(req.query.status){
         find.status =req.query.status;
     }
 
     if(req.query.keyword){
         // keyword =req.query.keyword;
         // const regex = new RegExp(keyword, "i");
         find.title = objectSearch.regex;
     }
 
     //pagination
     //count product
     const countProducts = await Product.count(find);
 
     const objectPagination = objectPaginationHelpers(req.query, countProducts);
     //End pagination
 
     //sort
     const sort = {};
     
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position ="asc";
    }
     //End sort
     const products = await Product.find(find)
       .sort(sort)
       .limit(objectPagination.limitItems)
       .skip(objectPagination.skip);
     
     if(products.length > 0){
         res.render("admin/page/products/index.pug", {
             pageTitle: "Danh sách sản phẩm",
             products : products,
             filterStatus : filterStatus,
             keyword : objectSearch.keyword,
             pagination : objectPagination,
         })
     }else {
         let stringQuery = "";
 
         for(const key in req.query){
             if(key != "page"){
                 stringQuery = `&${key}=${req.query[key]}`;
             }
         }
 
         const href = `${req.baseUrl}?page=1&${stringQuery}`
         res.redirect(href);
     }
    
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
  
    await Product.updateOne({ _id:  id}, { status: status});
  
    req.flash('success', 'Update status successful !');
    res.redirect('back');
  }

// [PATCH] /admin/products/change-multi
//install body-parser
module.exports.changeMulti = async (req, res) => {
    const status = req.body.type;
    const id = req.body.ids.split(", "); //string => array
    switch (status) {
        case "active":
        case "inactive":
            // cập nhật trạng thái của tất cả các sản phẩm có _id nằm trong mảng id
            await Product.updateMany({_id: {$in: id}}, {status: status});
            req.flash('success', `Update ${id.length} status success!`);

            break;
        case "change-position":
            for(const item of id){
                const [id, position] = item.split("-");
                await Product.updateOne({_id : id}, {position : position});
            }
            req.flash('success', `Change position ${id.length} status success!`);

            break;
        case "deleted":
            await Product.updateMany({_id: {$in: id}}, {
                deleted: true,
                deletedAt: new Date()
            })
            req.flash('success', `Delete ${id.length} status success!`);

            break;
        default:
            break;
    }
    res.redirect("back");
}

// deleteItem
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({ _id: id}); //xoa vinh vien
    await Product.updateOne({ _id: id}, 
        {
            deleted: true,
            deletedAt: new Date()
            
        }); // xoa mềm
    res.redirect("back");
}
// End deleteItem

//create
// [CREATE] /admin/products/create
module.exports.create = async (req, res) => {
    const admin = systemConfig.prefixAdmin;
    res.render("admin/page/products/create", {
        
        pageTitle: "Danh sách sản phẩm"
    })
}

module.exports.createProduct = async(req,res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position === ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    req.flash('success', `Create status success!`);
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/${systemConfig.prefixAdmin}/products`);

}
//End create

//edit
// [EDIT] /admin/products/edit
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id : id,
            deleted: false
        })
        res.render("admin/page/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        req.flash('error', `Not found!`);
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editProduct = async(req,res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    const id = req.params.id;  
    await Product.updateOne(
        {_id: id},
        req.body
    )
    console.log(req.file);
    req.flash('success', `Update status success!`);
    res.redirect(`/${systemConfig.prefixAdmin}/products`);

}
//End edit


//detail
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id : id,
            deleted: false
        })
        res.render("admin/page/products/detail", {
            pageTitle: "Product details",
            product: product
        })
    } catch (error) {
        req.flash('error', `Not found!`);
        res.redirect(`/${systemConfig.prefixAdmin}/products`);  
    }
}
//End detail


