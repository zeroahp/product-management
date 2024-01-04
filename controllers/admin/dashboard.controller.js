const Category = require("../../models/category_model")
const Product = require("../../models/product_model")
const Account = require("../../models/account_model")
const User = require("../../models/account_model")

module.exports.dashboard = async (req, res) => {
    
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        
    };

    // category
    statistic.categoryProduct.total = await Category.count({
        deleted: false,
    })
    console.log("   statistic.categoryProduct.total",    statistic.categoryProduct.total);
    statistic.categoryProduct.active = await Category.count({
        deleted: false,
        status: "active",
    })
    statistic.categoryProduct.inactive = await Category.count({
        deleted: false,
        status: "inactive",
    })

    // //product
    statistic.product.total = await Product.count({
        deleted: false
    })
    statistic.product.active = await Product.count({
        deleted: false,
        status: "active",
    })
    statistic.product.inactive = await Product.count({
        deleted: false,
        status: "inactive",
    })
    
    // //account
    statistic.account.total = await Account.count({
        deleted: false
    })
    statistic.account.active = await Account.count({
        deleted: false,
        status: "active",
    })
    statistic.account.inactive = await Account.count({
        deleted: false,
        status: "inactive",
    })

    // //user
    statistic.user.total = await User.count({
        deleted: false
    })
    statistic.user.active = await User.count({
        deleted: false,
        status: "active",
    })
    statistic.user.inactive = await User.count({
        deleted: false,
        status: "inactive",
    })

    res.render("admin/page/dashboard/index", {
        pagetitle: "Dashboard",
        statistic: statistic
    });
}

