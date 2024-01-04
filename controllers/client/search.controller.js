const Products = require("../../models/product_model");
const Producthelper = require("../../helpers/productPrice");

module.exports.index = async (req, res) => {

    const keyword = req.query.keyword;

    if(keyword){
        const keywordRegex = new RegExp(keyword, "i");

        const products = await Products.find({
            status: "active",
            deleted: false,
            title: keywordRegex,
        })

        const listProduct = Producthelper.priceNewProduct(products);

        res.render("client/Page/Search/index.pug", {
            pageTitle: "Search product",
            keyword: keyword,
            products: listProduct
        })
    }
    
}