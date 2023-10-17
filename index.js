//nhúng thư viện Express
const express = require('express');

const path = require('path');

//[GET] => [Patch]
// override with POST having ?_method=PATCH
const methodOverride = require('method-override')
//API body-parser
const bodyParser = require('body-parser')
// app.use(bodyParser.json());
const session = require('express-session');
const cookieParser = require('cookie-parser');

//dotenv
require("dotenv").config();

//monggoose
const database = require("./config/database");
database.connect();

//Gọi routes
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
//nhúng systemConfig từ config
const systemConfig = require("./config/system");

// tạo một đối tượng ứng dụng Express 
const app = express();
//Goi dotenv
const port = process.env.PORT;
// alert express-flash
const flash = require('express-flash');
app.set("views",`${__dirname}/views`);
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//express-flash
app.use(cookieParser('KWJFKWEIFHW'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//tinymce
app.use(
    '/tinymce', 
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);
//end tinymce

//variable local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Goi Route
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
