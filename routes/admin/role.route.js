const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create);
router.post("/create", controller.createRole);

router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);

router.get("/permission", controller.rolePermission);
router.patch("/permission", controller.rolePermissionPatch);

module.exports = router;