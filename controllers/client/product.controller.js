const Product = require("../../models/product_model")

//              tên
module.exports.index = async(req, res) => {
    //mongoose model
    const products = await Product.find({
        deleted : false,
        status: "active"
    }).sort({position : "asc"});

    const newProduct = products.map(item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0);

        return item;
    })
    //------
    res.render("client/Page/Products/index.pug", {
        pageTitle: "Danh sách ản phẩm",
        products : newProduct  
    })
}

module.exports.detail = async(req, res) => { 

    try {
        const slug = req.params.slug;

        const product = await Product.findOne({
            slug : slug,
            deleted: false,
            status: "active"
        })
        res.render("client/Page/products/detail", {
            pageTitle: "Product details",
            product: product
        })
    } catch (error) {
        // req.flash('error', `Not found!`);
        res.redirect("/");  
    }
}


