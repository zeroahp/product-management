//system
const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route")
const productsRoutes = require("./product.route")

module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productsRoutes);
        
}