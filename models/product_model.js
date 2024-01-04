const mongoose = require('mongoose');

//phan cach title
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: String,
        category_id : {
            type : String,
            default : ""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail:  String,
        status: String,
        featured: String,
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
        createBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date
            },
        ],
        deletedBy:{
            account_id: String,
            deletedAt: Date
        }
    }, 
    {
        timestamps: true
    }
 );

const Product = mongoose.model("Product", productSchema, "products")
module.exports = Product;