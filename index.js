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

//http
const http = require("http");
//socket.io
const { Server } = require("socket.io");

const moment = require("moment");
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

// tao socket.io
const server = http.createServer(app);
const io = new Server(server)
global._io = io; //tao bien toan cuc

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
app.locals.moment = moment;

//Goi Route
routeClient(app);
routeAdmin(app);

//den cac duong dan khoong hop le
app.get("*", (req, res) => {
    res.render("client/Page/errors/404", {
        pageTitle: "404 Not Found"
    });
});


// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// })

//socket.io, express,..
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
})