

async function getProducts() {

    if (!localStorage.getItem("products")) {
        const response = await fetch('../../Dummy Data/products.json');
        let productsFromJson = await response.json();


        localStorage.setItem("products", JSON.stringify(productsFromJson));
        // console.log(localStorage.getItem("products"));
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(products);

    if (!products.length) {
        console.error("No products found");
        return;
    }

    const params = new URLSearchParams(window.location.search);

    let id = parseInt(params.get("id"));
    console.log(id);

    if (isNaN(id) || id <= 0) {
        id = 1;
        console.log(id);
    }

    // console.log(productId);

    let product = products.find(p => p.product_id == id);
    // console.log(product);
    console.log(product);
    if (!product) {
        // window.location.href = "products.html";
        // return;
        product = products[0];
        console.log(product);
    }


    document.title = product.name;

    let productImage = document.querySelector(".product-image img");
    productImage.src = product.image;

    let product_title = document.getElementById("product_title");
    product_title.innerText = product.name;

    let product_price = document.getElementById("product_price");
    product_price.innerText = `${product.price}$`;

    let product_description = document.getElementById("product_description");
    product_description.innerText = product.description || "No description available for this product.";

    let product_brand = document.getElementById("product-brand");
    product_brand.innerText = product.brand;

    const relatedProducts = products
        .filter(p =>
            p.category === product.category &&
            p.product_id !== product.product_id
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    // console.log(randomProducts);
    displayRelatedProducts(relatedProducts);

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("card-img-top")) {
            const productId = e.target.dataset.id;
            window.location.href = `product-details.html?id=${productId}`;
        }
    });


    quantityInput = document.getElementById("quantity");
    quantityInput.max = product.quantity;

    getCarts(product);


}

function displayRelatedProducts(productsArray) {
    const container = document.getElementById("related-products");

    container.innerHTML = productsArray.map(item => `
        <div class="col-6 col-md-3">
        <div class="card border-0 related-card">
            <img src="${item.image}" 
                class="card-img-top"
                data-id="${item.product_id}" 
                alt="${item.name}">
                
            <div class="card-body px-0 pt-2">
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">${item.price}$</small>
            </div>
        </div>
        </div>
    `).join("");
}


async function getCarts(product) {
    if (!localStorage.getItem("carts")) {
        const response_2 = await fetch('../../Dummy Data/carts.json');
        let cartsFromJson = await response_2.json();


        localStorage.setItem("carts", JSON.stringify(cartsFromJson));
        // console.log(localStorage.getItem("carts"));
    }


    const addBtn = document.getElementById("add-to-cart-btn");
    if (!addBtn) return;

    addBtn.addEventListener("click", function () {
        // const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));

        // if (!currentUserId) {
        //     alert("Please login first to add items to cart.");
        //     window.location.href = "login.html";
        //     return;
        // }


        //checkLogin
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {
            // alert("Please login first to add items to cart.");
            // window.location.href = "../../login/login.html";

            showToast("Please login first to add items to cart.", "error");

            setTimeout(() => {
                window.location.href = "../../login/login.html";
            }, 2500);

            return;
        }



        let carts = JSON.parse(localStorage.getItem("carts")) || [];

        const maxStock = product.quantity || 0;

        let userCart = carts.find(c => c.userId === currentUser.id);
        if (!userCart) {
            userCart = {
                userId: currentUser.id,
                items: []
            };
            carts.push(userCart);
        }

        let existingItem = userCart.items.find(
            item => item.productId === product.product_id
        );

        const quantityInput = document.getElementById("quantity");
        const quantity = Math.max(1, parseInt(quantityInput?.value) || 1);

        if (existingItem) {
            const newTotalQuantity = existingItem.quantity + quantity;

            if (newTotalQuantity > maxStock) {
                // alert(`You can only add ${maxStock - existingItem.quantity} more item(s). Stock limit reached.`);
                showToast(`You can only add ${maxStock - existingItem.quantity} more item(s). Stock limit reached.`, "error");
                return;
            }

            existingItem.quantity = newTotalQuantity;
        } else {
            if (quantity > maxStock) {
                // alert("Selected quantity exceeds available stock.");
                showToast("Selected quantity exceeds available stock.", "error");
                return;
            }


            userCart.items.push({
                productId: product.product_id,
                quantity: quantity
            });
        }

        localStorage.setItem("carts", JSON.stringify(carts));
        console.log(carts);
        // alert("Product added to cart successfully 🛒");
        showToast("Product added to cart successfully...", "success");

    });

}

getProducts();



function showToast(message, type = "success") {
    const toastEl = document.getElementById("mainToast");
    const toastMsg = document.getElementById("toastMessage");


    if (type === "success") {
        toastEl.className = "toast align-items-center text-white bg-success border-0";
    } else if (type === "error") {
        toastEl.className = "toast align-items-center text-white bg-danger border-0";
    } else if (type === "warning") {
        toastEl.className = "toast align-items-center text-dark bg-warning border-0";
    }

    toastMsg.textContent = message;

    const toast = new bootstrap.Toast(toastEl, {
        delay: 3000,
    });

    toast.show();
}