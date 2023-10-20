const mongoose = require('mongoose');

//phan cach title
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
    {
        title: String,
        category: String,
        parent_id : {
            type : String,
            default : ""
        },
        description: String,
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

const category = mongoose.model("category", categorySchema, "category")
module.exports = category;