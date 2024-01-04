const SettingGeneral = require("../../models/setting-general_model");

module.exports.general = async(req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});

    res.render("admin/page/setting/general", {
        pageTitle: "Setting General",
        settingGeneral: settingGeneral,
    })
}

module.exports.generalPatch = async(req, res) => {
    console.log("req.body", req.body);
    const record = new SettingGeneral(req.body);
    await record.save();

    req.flash("success", "Update success!");
    res.redirect("back");
    
}