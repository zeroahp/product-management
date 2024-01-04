const Category = require("../../models/category_model");
const Product = require("../../models/product_model");
const productHelper = require("../../helpers/productPrice")

module.exports.index = async (req, res) => {
    
    //Feature product
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    }).limit(10);

    
    const newproductsFeatured =  productHelper.priceNewProduct(productsFeatured);

    const productNew = await Product.find({
        deleted: false,
        status: "active",
    }).sort({position: "desc"}).limit(5);

    const newProduct =  productHelper.priceNewProduct(productNew);


    res.render("client/Page/Home/index", {
        pagetitle: "Trang Chủ",
        productsFeatured: newproductsFeatured,
        newProduct: newProduct,
    });
}