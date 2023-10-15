module.exports.checkError = (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", `Please fill in title!`);
        res.redirect("back");
        return;
    }
    next();
}