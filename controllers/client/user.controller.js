const User = require("../../models/user.model")
const Cart = require("../../models/cart_model")

const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/generate")
const sendMailHelper = require("../../helpers/sendMail")

// [POST] user/register
module.exports.register = (req, res) => {
    res.render("client/Page/User/register", {
        pagetitle: "Register",
    });
}

// [POST] user/register
module.exports.registerPost = async (req, res) => {
    
    req.body.password = md5( req.body.password);

    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existEmail){
        req.flash("error", "Exist email!");
        res.redirect("back");
        return;
    }

    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

// [GET] user/login
module.exports.login = (req, res) => {
    res.render("client/Page/User/login", {
        pagetitle: "Login",
    });
}

// [POST] user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false,
    })

    if(!user){
        req.flash("error", "Email not found!")
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password){
        req.flash("error", "Password is not correct!")
        res.redirect("back");
        return;
    }

    if(user.status =="inactive"){
        req.flash("error", "Account is blocked!")
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    //luu user_id vao cart
    await Cart.updateOne(
        {
            _id: req.cookies.cartId,
        },
        {
            user_id: user.id
        }
    )

    res.redirect("/");
    
}

// [GET] user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}


// [GET] user/password/forgot
module.exports.passwordForgot = (req, res) => {
    res.render("client/Page/User/forgot-password", {
        pagetitle: "Forgot password",
    });
}

// [POST] user/password/forgot
module.exports.passwordForgotPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false,
    });

    if(!user){
        req.flash("error", 'Email not found!');
        res.redirect("back");
        return;
    }

    //tao ma OTP
    const otp = generateHelper.generateRandomNumber(6);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now(),
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    //Send OTP to email user
    const subject = `Your reset password code`;
    const html = `<b>${otp}</b> is your reset password code. Limit 3 minutes. Don't share it.`;

    sendMailHelper.sendMail(email, subject, html)
    res.redirect(`/user/password/otp?email=${email}`);
}


// [GET] user/password/otp
module.exports.passwordOtp = (req, res) => {
    res.render("client/Page/User/otp-password", {
        pagetitle: "OTP Authencation",
    });
}

// [POST] user/password/otp
module.exports.passwordOtpPost = async (req, res) => {
    const email =  req.body.email;
    const otp =  req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    })

    if(!result){
        req.flash("error", "OTP is not valid!")
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email,
    })

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
}

// [GET] user/password/otp
module.exports.passwordReset = (req, res) => {
    res.render("client/Page/User/reset-password", {
        pagetitle: "OTP Authencation",
    });
}

// [POST] user/password/otp
module.exports.passwordResetPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne(
        {
            tokenUser: tokenUser
        },
        {
            password: md5(password)
        }
    )
    
    req.flash("success", "Login successful")
    res.redirect("/");

}

// [GET] user/info
module.exports.info = (req, res) => {
    res.render("client/Page/User/info", {
        pagetitle: "Profile",
    });
}
