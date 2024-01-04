const express = require("express");
const router = express.Router();
//upload thumbnail
const multer  = require('multer')
const controller = require("../../controllers/admin/account.controller");

//Middlewares upload
const uploadClound = require('../../middlewares/admin/uploadCloud.middlewares');

//save thumbnail
const upload = multer()


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
    upload.single('avatar'),
    uploadClound.uploadClound,
    controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single('avatar'),
    uploadClound.uploadClound,
    controller.editPatch
);
module.exports = router;