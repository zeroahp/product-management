//system
const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route")
const productsRoutes = require("./product.route")
const category = require("./category.route")
const role = require("./role.route")
const account = require("./account.route")
const auth = require("./auth.route")
const myAccount = require("./my-account.route")
const setting = require("./setting.route")

const authController = require("../../controllers/admin/auth.controller");

//middleware
const middlewareAuth = require("../../middlewares/admin/auth.middlewares");

module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;
    app.get(PATH_ADMIN, authController.login);
    
    app.use(PATH_ADMIN + "/dashboard", middlewareAuth.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + "/products", middlewareAuth.requireAuth, productsRoutes);
    app.use(PATH_ADMIN + "/category", middlewareAuth.requireAuth, category);
    app.use(PATH_ADMIN + "/role", middlewareAuth.requireAuth, role);
    app.use(PATH_ADMIN + "/account", middlewareAuth.requireAuth, account);
    app.use(PATH_ADMIN + "/my-account", middlewareAuth.requireAuth, myAccount);
    app.use(PATH_ADMIN + "/auth", auth);
    app.use(PATH_ADMIN + "/setting",middlewareAuth.requireAuth, setting);

}