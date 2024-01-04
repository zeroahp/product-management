const Cart = require("../../models/cart_model")
const Product = require("../../models/product_model")
const Category = require("../../models/category_model")
const productHelper = require("../../helpers/productPrice")


module.exports.index = async(req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId,
    })

    if(cart.products.length > 0){
        for(const item of cart.products){
            const productId = item.product_id;

            const productInfo = await Product.findOne({
                _id: productId,
            });

            productInfo.priceNew = productHelper.priceNewOneProduct(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = item.productInfo.priceNew * item.quantity;
            
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice,0)
    res.render("client/Page/Cart/index.pug", {
        pageTitle: "Products Cart",
        cart: cart,
    })
}

module.exports.cartPost = async (req, res) => {
    //cartID
    const cartId = req.cookies.cartId;

    //http://localhost:3000/cart/add/65870175a2cee3ebbcf4fd4b
    const productId = req.params.productId;

    //quantity form
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id: cartId
    });

    const existProduct = cart.products.find(item => item.product_id == productId)

    if (existProduct) {
       const newQuantity = quantity + existProduct.quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId,
            },
            {
                'products.$.quantity': newQuantity,
            },
        )

        req.flash("success", "Add product success!")

        res.redirect("back");

    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity,
        }

        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                products: objectCart
            }
        });

        req.flash("success", "Add product success!")

        res.redirect("back");
    }

}


module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne(
        {
            _id: cartId
        },{
            "$pull": {products: {"product_id": productId}} //xoa object trong mang
        }
    );

    req.flash("success", "Deleted");
    res.redirect("back");
}

module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity =req.params.quantity;

    await Cart.updateOne(
        {
            _id: cartId,
            'products.product_id': productId,
        },{
            'products.$.quantity': quantity, //cập nhật trường quantity
        }
    )

    req.flash("success", "Update quantity!");
    res.redirect("back");
}