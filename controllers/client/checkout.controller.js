const Cart = require("../../models/cart_model")
const Product = require("../../models/product_model")
const productHelper = require("../../helpers/productPrice")
const Order =  require("../../models/order_model")


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
        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice,0)

        res.render("client/Page/Checkout/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            cart: cart,
        })
    }   
}

// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    // const productId = req.params.productId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id: cartId
    })

    let products = [];

    for(const product of cart.products){
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage : 0,
            quantity: product.quantity,
        }

        const productInfo = await Product.findOne({
            _id: product.product_id
        });

        objectProduct.price = productInfo.price,
        objectProduct.discountPercentage = productInfo.discountPercentage,

        products.push(objectProduct);

    }

    const objectOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }

    const order = new Order(objectOrder);
    await order.save();
    await Cart.updateOne(
        {
            _id:cartId,
        },{
            products: []
        }
    )

    res.redirect(`/checkout/success/${order.id}`);
    
}

// [GET] /checkout/success/:id
module.exports.success = async(req, res) => {
    const order = await Order.findOne({
        _id: req.params.orderId
    });

    for(const product of order.products){
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail")

        product.productInfo = productInfo;

        product.priceNew = productHelper.priceNewOneProduct(product);

        product.totalPrice = product.priceNew * product.quantity;

    }

    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render("client/Page/Checkout/success", {
        pageTitle: "Order success",
        order: order,
    })
}