const express = require("express");
const router = express.Router();
//upload thumbnail
const multer  = require('multer')

//Middlewares upload
const uploadClound = require('../../middlewares/admin/uploadCloud.middlewares');

//save thumbnail
const upload = multer()

const controller = require("../../controllers/admin/my-account.controller");

router.get("/", controller.index);
router.get("/edit", controller.edit);
router.patch("/edit",
    upload.single('avatar'),
    uploadClound.uploadClound,
    controller.editPatch
);

module.exports = router;