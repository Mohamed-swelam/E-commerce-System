

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
    let product_oldprice = document.getElementById("product_oldprice");
    let product_discount = document.getElementById("product_discount");

    if (product.oldPrice && product.oldPrice > product.price) {

        product_price.innerText = `${product.price}$`;
        product_price.classList.add("new-price");

        product_oldprice.innerText = `${product.oldPrice}$`;
        product_oldprice.classList.add("old-price");

        product_discount.innerText = `Save ${product.discount}%`;

    } else {

        product_price.innerText = `${product.price}$`;
        product_price.classList.remove("new-price");

        product_oldprice.style.display = "none";
        product_discount.style.display = "none";
    }

    let product_description = document.getElementById("product_description");
    product_description.innerText = product.description || "No description available for this product.";

    let product_brand = document.getElementById("product-brand");
    product_brand.innerText = product.brand;

    const relatedProducts = products
        .filter(p =>
            p.category == product.category
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

    // console.log(randomProducts);
    console.log(relatedProducts);
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

    document.getElementById("view_Collection").addEventListener("click", function () {
        window.location.href = `../../HomePage&Products/categroy.html?categroy=${product.category}`;

    });

    const wishlistIcon = document.getElementById("wishlist_icon");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (currentUser) {
        const isWishlisted = wishlist.some(item =>
            item.product_id === product.product_id &&
            item.user_id === currentUser.id
        );

        if (isWishlisted) {
            wishlistIcon.classList.remove("fa-regular");
            wishlistIcon.classList.add("fa-solid", "text-danger");
        }
    }

    wishlistIcon
        .addEventListener("click", function () {
            addToWishlist(product, this);
        });
    if (currentUser) {
        if (currentUser.role === "admin" || currentUser.role === "seller") {
            wishlistIcon.style.display = "none";
        } else {
            wishlistIcon.style.display = "block";
        }
    } else {
        wishlistIcon.style.display = "none";
    }

}

function displayRelatedProducts(productsArray) {
    const container = document.getElementById("related-products");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    container.innerHTML = productsArray.map(item => {

        let isWishlisted = false;

        if (currentUser) {

            //check if the product in the wishlist

            isWishlisted = wishlist.some(product =>
                product.product_id === item.product_id &&
                product.user_id === currentUser.id
            );
        }

        let priceHTML = "";

        if (item.oldPrice && item.oldPrice > item.price) {
            priceHTML = `
                <div>
                    <span class="card-text text-decoration-line-through text-danger">
                        ${item.oldPrice}$
                    </span>
                    <span class="card-text text-success" style="font-size:25px;">
                        ${item.price}$
                    </span>
                </div>
            `;
        } else {
            priceHTML = `
                <span class="card-text" style="font-size:25px;">
                    ${item.price}$
                </span>
            `;
        }

        return `
        <div class="col-6 col-md-3">
            <div class="card border-0 related-card h-100 position-relative">
                <div class=" bg-white text-end py-3">
                        <span>
                            <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart wishlist-btn"
                            data-id="${item.product_id}"
                            style="font-size: 35px; cursor: pointer;">
                            </i>
                        </span>
                </div>
                <img src="${item.image}" 
                     class="card-img-top"
                     data-id="${item.product_id}" 
                     alt="${item.name}">

                <div class="card-body px-0 pt-2">
                    <h6 class="mb-1 product-title">${item.name}</h6>
                    ${priceHTML}
                </div>

                ${item.discount && item.discount > 0
                ? `
                    <div class="discount position-absolute top-0 start-0 bg-danger rounded-circle d-flex"
                         style="width:65px; height:65px;">
                        <p class="m-auto text-white fw-bold">
                            ${item.discount}%
                        </p>
                    </div>
                    `
                : ``
            }

            </div>
        </div>
        `;
    }).join("");

    container.addEventListener("click", function (e) {
        if (e.target.classList.contains("wishlist-btn")) {
            e.stopPropagation();
            const productId = parseInt(e.target.dataset.id);

            const products = JSON.parse(localStorage.getItem("products")) || [];
            const product = products.find(p => p.product_id === productId);

            if (product) {
                addToWishlist(product, e.target);
            }
        }
    });
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


        //checkLogin
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {

            showToast("Please login first to add items to cart.", "error");

            setTimeout(() => {
                window.location.href = "../../login/login.html";
            }, 2500);

            return;
        }


        if (currentUser.role === "admin" || currentUser.role === "seller") {
            showToast("Admins and sellers cannot add items to cart.", "error");
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




