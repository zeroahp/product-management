const Category = require("../../models/category_model");

const createTree = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
    try{
        const categoryProduct = await Category.find({
            deleted: false
        });
    
        const newCategoryProduct = createTree(categoryProduct);
    
        res.locals.layoutCategory = newCategoryProduct;
    
        next();
    }catch(error){
        console.log(error);
    }
}