const mongoose = require('mongoose');

//phan cach title
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: String,
        category: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail:  String,
        status: String,
        position: Number,
        slug: { 
            type: String, 
            slug: "title" ,
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    }, 
    {
        timestamps: true
    }
 );

const Product = mongoose.model("Product", productSchema, "products")
module.exports = Product;