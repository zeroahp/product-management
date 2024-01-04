const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/setting.controller");

//upload thumbnail
const multer  = require('multer')
//Middlewares upload
const uploadClound = require('../../middlewares/admin/uploadCloud.middlewares');
//save thumbnail
const upload = multer()


router.get("/general", controller.general);
router.patch(
    "/general", 
    upload.single('logo'),
    uploadClound.uploadClound, 
    controller.generalPatch
);

module.exports = router;