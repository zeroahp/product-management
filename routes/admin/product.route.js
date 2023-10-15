const express = require("express");
const router = express.Router();
//upload thumbnail
const multer  = require('multer')
const controller = require("../../controllers/admin/product.controller");

const storagMulterHelper = require("../../helpers/storageMulter");
const storage = storagMulterHelper();
//save thumbnail
const upload = multer({ storage: storage})
const validate = require("../../validates/admin/product.validates");

router.get("/", controller.index);

//---- /inactive/021156bdhcd6cvdwvew6d6
router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

//create
router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'), 
    validate.checkError,
    controller.createProduct
);
//End create

//edit
router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.checkError,
    controller.editProduct
  );
//End edit

//detail
router.get("/detail/:id", controller.detail);

//End detail

module.exports = router;