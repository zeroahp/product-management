const Product = require("../../models/product_model")
const Category = require("../../models/category_model")
const productHelper = require("../../helpers/productPrice")


module.exports.index = async(req, res) => {
    const products = await Product.find({
        deleted : false,
        status: "active"
    }).sort({position : "asc"});

    const newProduct = productHelper.priceNewProduct(products);
    //------
    res.render("client/Page/Products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
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
        });

        if(product.category_id){
            const category =  await Category.findOne({
                _id: product.category_id,
                status: "active",
                deleted: false,
            })
            product.category = category;

            product.priceNew = productHelper.priceNewOneProduct(product);
        }


        res.render("client/Page/products/detail", {
            pageTitle: "Product details",
            product: product
        })
    } catch (error) {
        res.redirect("/");  
    }
}

//product-slug
module.exports.category = async(req, res) => {
    const slugCategory = req.params.slugCategory;
    const category =  await Category.findOne({
        deleted: false,
        status: "active",
        slug: slugCategory,
    })

    const getSubCategory = async (parentId) => {
        const subs =  await Category.find({
            parent_id: parentId,
            deleted: false,
            status: "active",
        });

        let allSub = [...subs];

        for(const sub of subs) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }

        return allSub;
    }

    const listSubcate = await getSubCategory(category.id);
    const listSubcateId = listSubcate.map(item => item.id);

    const products = await Product.find({
        deleted : false,
        status: "active",
        category_id: { $in: [category.id, ...listSubcateId]},

    }).sort({position : "desc"});

    const newProduct = productHelper.priceNewProduct(products);
    //------
    res.render("client/Page/Products/index.pug", {
        pageTitle: category.title,
        products : newProduct  
    })
}

