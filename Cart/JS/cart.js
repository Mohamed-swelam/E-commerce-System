document.getElementById("continue").addEventListener("click", function () {
    window.location.href = "../../HomePage&Products/home.html";
});

async function displaycart() {
    if (!localStorage.getItem("carts")) {
        const response_2 = await fetch('../../Dummy Data/carts.json');
        let cartsFromJson = await response_2.json();


        localStorage.setItem("carts", JSON.stringify(cartsFromJson));
        // console.log(localStorage.getItem("carts"));
    }

    if (!localStorage.getItem("users")) {
        const response_3 = await fetch('../../Dummy Data/users.json');
        let usersFromJson = await response_3.json();


        localStorage.setItem("users", JSON.stringify(usersFromJson));
        // console.log(localStorage.getItem("carts"));
    }


    //checkLogin
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        showToast("Please login first to add items to cart.", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 1000)
        return;
    }

    if (currentUser.role === "seller" || currentUser.role === "admin") {
        showToast("Access denied. Only customers can access the cart.", "error");

        setTimeout(() => {
            window.location.href = "../../HomePage&Products/home.html";
        }, 1500);
        return;
    }



    let carts = JSON.parse(localStorage.getItem("carts")) || [];
    let userCart = carts.find(c => c.userId === currentUser.id);
    let btn = document.getElementById("go_Checkout");
    if (!userCart || userCart.items.length === 0) {

        document.getElementById("cart-items").innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping empty-cart-icon"></i>
                <h5>Your Cart is Empty</h5>
                <p>Add items to your cart to see them here</p>
            </div>
        `;

        document.getElementById("total-price").innerText = "0";

        btn.disabled = true;
        // btn.style.cursor = "not-allowed";
        return;
    }

    btn.disabled = false;
    // btn.style.cursor = "pointer";

    // console.log(userCart.items);
    const products = JSON.parse(localStorage.getItem("products"));

    let itemsDiv = document.getElementById("cart-items");
    itemsDiv.innerHTML = "";


    let totalSum = 0;
    for (let i = 0; i < userCart.items.length; i++) {
        let product = products.find(p => p.product_id == userCart.items[i].productId);

        const idealPrice = product.price;

        const numericPrice =
            typeof idealPrice === "string"
                ? Number(idealPrice.replace(/,/g, ""))
                : Number(idealPrice);

        let total = userCart.items[i].quantity * numericPrice;

        itemsDiv.innerHTML += `
                                <div class="row align-items-center py-4 border-bottom">

                                    <!-- Product Info -->
                                    <div class="col-12 col-md-6 d-flex gap-3">
                                        <img src="${product.image}"
                                            class="img-fluid rounded" 
                                            style="width: 100px; height: 100px; object-fit: contain;" >
                                            
                                        <div class="ms-3">
                                            <h6 class="my-2 fw-semibold">${product.name}</h6>
                                            <p class="small mb-1">
                                                ${product.description || "No description available for this product."}
                                            </p>
                                            <span class="fw-semibold">${numericPrice.toFixed(2)}$</span>
                                        </div>
                                    </div>

                                    <!-- Quantity + Delete -->
                                    <div class="col-12 col-md-3 mt-3 mt-md-0">

                                        <!-- Mobile -->
                                        <div class="d-flex d-md-none justify-content-evenly align-items-center">
                                            
                                            <div class="d-flex align-items-center gap-2 ms-5">
                                                <span class="fw-bolder">Quantity:</span>

                                                <button class="btn btn-sm btn-light border minus-btn" 
                                                        data-id="${product.product_id}">-</button>

                                                <span class="fw-semibold">${userCart.items[i].quantity}</span>

                                                <button class="btn btn-sm btn-light border plus-btn" 
                                                        data-id="${product.product_id}">+</button>
                                            </div>

                                            <!-- Delete Icon (Right on Mobile) -->
                                            <button class="btn btn-sm btn-outline-danger delete-btn"
                                                    data-id="${product.product_id}">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </div>

                                        <!-- Desktop Quantity Only -->
                                        <div class="d-none d-md-flex justify-content-center align-items-center gap-2">
                                            <button class="btn btn-sm btn-light border minus-btn" 
                                                    data-id="${product.product_id}">-</button>

                                            <span class="fw-semibold">${userCart.items[i].quantity}</span>

                                            <button class="btn btn-sm btn-light border plus-btn" 
                                                    data-id="${product.product_id}">+</button>
                                        </div>

                                    </div>

                                    <!-- Total + Delete  -->
                                    <div class="col-12 col-md-3 d-none d-md-flex justify-content-between justify-content-md-end align-items-center gap-3 mt-3 mt-md-0">
                                        
                                        <span class="fw-semibold">
                                            ${total.toFixed(2)}$
                                        </span>

                                        <button class="btn btn-sm btn-outline-danger delete-btn d-none d-md-inline-flex"
                                                data-id="${product.product_id}">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>

                                    </div>

                                </div>`;

        totalSum += total;
    }

    document.getElementById("total-price").innerText = `${totalSum.toFixed(2)}$`



    document.getElementById("go_Checkout")


}

document.addEventListener("click", async function (e) {
    const isPlus = e.target.classList.contains("plus-btn");
    const isMinus = e.target.classList.contains("minus-btn");
    const isDelete = e.target.closest(".delete-btn");

    if (!isPlus && !isMinus && !isDelete) return;

    //checkLogin
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        // alert("Please login first to add items to cart.");
        // window.location.href = "../../login/login.html";
        showToast("Please login first to add items to cart.", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 2500)
        return;
    }

    let carts = JSON.parse(localStorage.getItem("carts")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let userCart = carts.find(c => c.userId === currentUser.id);
    if (!userCart) return;


    const button = isDelete ? e.target.closest(".delete-btn") : e.target;
    const productId = parseInt(button.dataset.id);

    const cartItemIndex = userCart.items.findIndex(i => i.productId === productId);
    const cartItem = userCart.items[cartItemIndex];
    const product = products.find(p => p.product_id == productId);

    if (cartItemIndex === -1) return;


    if (isDelete) {
        if (isDelete) {
            const confirmed = await showConfirmModal(
                "Are you sure you want to remove this item from cart?",
                "Remove Item"
            );

            if (!confirmed) return;

            userCart.items.splice(cartItemIndex, 1);
            localStorage.setItem("carts", JSON.stringify(carts));
            displaycart();
            return;
        }
    }

    if (!product) return;

    const maxStock = product.quantity || 0;

    if (isPlus) {
        if (cartItem.quantity < maxStock) {
            cartItem.quantity += 1;
        } else {
            // alert("Maximum available quantity reached");
            showToast("Maximum available quantity reached", "error");
            return;
        }
    }

    if (isMinus) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            if (cartItem.quantity == 1) {
                const confirmed = await showConfirmModal(
                    "Quantity will be zero. Remove item from cart?",
                    "Remove Item"
                );

                if (!confirmed) return;

                userCart.items.splice(cartItemIndex, 1);
                localStorage.setItem("carts", JSON.stringify(carts));
                displaycart();
                return;
            }
        }
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    displaycart();
});


document.getElementById("go_Checkout").addEventListener("click", function () {
    window.location.href = "../../Checkout/Checkout.html";
})


displaycart()