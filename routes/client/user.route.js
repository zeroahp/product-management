const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const userValidate = require("../../validates/client/user.validates");
const userMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/register", controller.register);
router.post("/register", userValidate.checkRegister, controller.registerPost);

router.get("/login", controller.login);
router.post("/login", userValidate.checkLogin, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.passwordForgot);
router.post("/password/forgot", userValidate.forgotPasswordPost,  controller.passwordForgotPost); 

router.get("/password/otp", controller.passwordOtp);
router.post("/password/otp", controller.passwordOtpPost);

router.get("/password/reset", controller.passwordReset);
router.post("/password/reset", userValidate.resetPasswordPost, controller.passwordResetPost);

router.get("/info",userMiddleware.requireAuth, controller.info);
// router.post("/password/reset", userValidate.resetPasswordPost, controller.passwordResetPost);

module.exports = router;