module.exports.index =  (req, res) => {
    res.render("client/Page/Home/index", {
        pagetitle: "Trang Chủ"
    });
}