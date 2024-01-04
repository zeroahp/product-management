const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if(inputsQuantity.length > 0){
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e) => {
            const productId = input.getAttribute("product-id");
            // console.log(productId);
            const quantity = input.value;
            // console.log(quantity);

            //tra ra link
            window.location.href = `/cart/update/${productId}/${quantity}`;
        })
    })
}