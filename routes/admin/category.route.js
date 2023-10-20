const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/category.controller");

//Middlewares upload
const uploadClound = require('../../middlewares/admin/uploadCloud.middlewares');

//save thumbnail
const upload = multer()
// const validate = require("../../validates/admin/product.validates");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
    upload.single('thumbnail'),
    uploadClound.uploadClound, 
    controller.createPost
);


module.exports = router;