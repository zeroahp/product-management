module.exports.priceNewProduct = (products) => {
    const newProduct = products.map(item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage))/100).toFixed(0);
        return item;
    });

    return newProduct;
}


module.exports.priceNewOneProduct = (product) => {
    const priceNew = ((product.price * (100 - product.discountPercentage))/100).toFixed(0);
    return priceNew;

}