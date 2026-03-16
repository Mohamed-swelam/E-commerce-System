let allPrds = [];
let categoryPrds = [];
const category = new URLSearchParams(location.search).get("categroy");
const itemsPerPage = 5;
let currentPage = 1;
let searchInput = document.getElementById("input-search");
let sorCategory = []
let searchPrds = [];
let sortValue;
let baseCategory = [];

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let spans = [];
let currentPath = location.search.split("?").pop();
console.log(currentPath);

document.querySelectorAll("#bottom-navbar .nav-link").forEach(a => {
    if (a.getAttribute("href").split("?").pop() === currentPath) {
        a.style.cssText =
            `color:#3599db;
                 border-bottom:3px solid #3599db; 
                `
    }
});


if (localStorage.getItem("products")) {
    allPrds = JSON.parse(localStorage.getItem("products"))
}


(function () {
    CategroyData();
    displayCategroyData(1);
    navigateNumbrsWithPrevAndNext();
})()


function CategroyData() {
    allPrds.filter(prd => {
        if (prd.category === category) categoryPrds.push(prd);
    })
    baseCategory = categoryPrds;
}



function displayCategroyData(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const categoryArray = baseCategory.slice(start, end);
    let prdBox = " "

    for (let i = 0; i < categoryArray.length; i++) {

        let isWishlisted = false;

        if (currentUser) {

            //check if the product in the wishlist

            isWishlisted = wishlist.some(item =>
                item.product_id === categoryArray[i].product_id &&
                item.user_id === currentUser.id
            );
        }

        const hasDiscount = categoryArray[i].discount && categoryArray[i].discount > 0;

        prdBox += `   
                    <div class="col-lg-4 col-6">
                        <div class="card position-relative" style="min-height:500px;" onclick="showDetails(${categoryArray[i].product_id})">
                            
                            <div style="cursor:pointer">
                                <div class="bg-white text-end py-3">
                                    <span>
                                        <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
                                        onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(categoryArray[i])}, this)'>
                                        </i>
                                    </span>
                                </div>

                                <img class="card-img-top" height="300" 
                                    src="${categoryArray[i].image}" 
                                    alt="${categoryArray[i].name}" />

                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p class="card-title m-0 p-0" id = "product_name">${categoryArray[i].name}</p>
                                            <small>${categoryArray[i].brand}</small>
                                        </div>

                                        <div>
                                            ${hasDiscount
                ? `<span class="card-text text-decoration-line-through text-danger">
                                                    ${categoryArray[i].oldPrice ?? "0"}$
                                                </span>`
                : ``
            }

                                            <span class="card-text ${hasDiscount ? 'text-success' : 'text-dark'}" 
                                                style="font-size:25px;">
                                                ${categoryArray[i].price}$
                                            </span>
                                        </div>
                                    </div>

                                    <p class="card-text lead" id = "product_description">
                                        ${categoryArray[i].description ?? "No description available for this product."}
                                    </p>
                                </div>

                                <div class="text-center w-100" id="cart">
                                    <button class="btn add-to-cart-btn "
                                        onclick="event.stopPropagation();addToCart(${categoryArray[i].product_id})">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>

                            ${hasDiscount
                ? `<div class="discount position-absolute top-0 left-0 bg-danger rounded-circle d-flex fw-bold"
                                        style="width:65px; height:65px;">
                                        <p class="m-auto text-white">${categoryArray[i].discount}%</p>
                                </div>`
                : ``
            }

                        </div>
                    </div>`;
    }
    document.getElementById("data").innerHTML = prdBox;
}



function nextPrds() {
    if (currentPage * itemsPerPage < baseCategory.length) currentPage++;
    else if (currentPage * itemsPerPage >= baseCategory.length) currentPage = 1;
    displayCategroyData(currentPage);
}


function prevPrds() {
    if (currentPage > 1) {
        currentPage--;
        displayCategroyData(currentPage);
    }
}



function navigateNumbrsWithPrevAndNext() {
    const navigatNumbers = Math.ceil(baseCategory.length / 5);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        numberBox += `
                    <span class="p-3 border number-span" style="cursor: pointer;">${i}</span>`
    }
    document.getElementById("navigators").innerHTML = numberBox;






    spans = document.querySelectorAll(".number-span");
    spans[0].style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset";

    spans.forEach((span, index) => {
        span.addEventListener("click", (e) => {
            currentPage = +span.innerText;
            spans.forEach(span => {
                if (getComputedStyle(span).boxShadow === "rgb(53, 153, 219) 2px 2px 5px 0px inset") {
                    span.style.boxShadow = "none";
                }
            })
            e.target.style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset"
            displayCategroyData(index + 1);
        })
    })


    document.getElementById("prev").addEventListener("click", () => {
        prevPrds();
        colorNavigatorBasedOnArrow();
    })


    document.getElementById("next").addEventListener("click", () => {
        nextPrds();
        colorNavigatorBasedOnArrow()
    })
}






//  filter by sort 
document.querySelector(".dropdown-menu").addEventListener("click", (e) => {

    if (getComputedStyle(e.target).color === "rgb(0, 0, 0)") {
        e.target.style.color = "rgba(26, 24, 24, 0.562)";
        e.target.innerHTML = e.target.innerText;
        baseCategory = categoryPrds;
    }
    else {
        document.querySelectorAll(".dropdown-menu li a").forEach(a => {
            a.style.color = "";
            if (a.children.length) {
                a.children[0].style.display = "none"
            }
        })
        e.target.style.color = "black";
        e.target.innerHTML += "<i class='fa-solid fa-check '></i>"
        sorCategory = [];
        sortValue = e.target.innerText;
        sortByValue(baseCategory);
    }
    displayCategroyData(1);
})


function sortByValue(sortPrds) {

    if (sortValue === "A to Z") {
        sorCategory = [...sortPrds].sort((a, b) => a.name.localeCompare(b.name ?? " "));
        baseCategory = [...sorCategory];
    }
    else if (sortValue === "Z to A") {
        sorCategory = [...sortPrds].sort((a, b) => b.name.localeCompare(a.name ?? " "));
        baseCategory = [...sorCategory];
    }
    else if (sortValue === "Low Price") {
        sorCategory = [...sortPrds].sort((a, b) => a.price - b.price);
        baseCategory = [...sorCategory];
    }

    else if (sortValue === "High Price") {
        sorCategory = [...sortPrds].sort((a, b) => b.price - a.price);
        baseCategory = [...sorCategory];
    }
    spans.forEach(span => {
        if (getComputedStyle(span).boxShadow === "rgb(53, 153, 219) 2px 2px 5px 0px inset") {
            span.style.boxShadow = "none";
        }
    })
    spans[0].style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset";

}




function searchByName() {
    for (let i = 0; i < categoryPrds.length; i++) {
        if (
            categoryPrds[i].name
                .toLowerCase()
                .trim()
                .includes(searchInput.value.toLowerCase().trim())
        ) {
            searchPrds.push(categoryPrds[i]);
        }
    }

    if (searchPrds.length === 0) {
        showToast("No products found matching your search.", "error");
        return;
    }

    baseCategory = [...searchPrds];

    if (sortValue) {
        sortByValue(baseCategory);
    }

    displayCategroyData(1);
    navigateNumbrsWithPrevAndNext();
}



// search product
document.getElementById("input-search").addEventListener('search', () => {
    searchPrds = [];
    baseCategory = [];
    searchByName();
})



function colorNavigatorBasedOnArrow() {
    let spans = document.querySelectorAll(".number-span");
    spans.forEach(span => {
        if (+span.innerText === currentPage) {
            console.log(currentPage);

            span.style.boxShadow = "2px 2px 5px #3599db inset";
        } else {
            span.style.boxShadow = "none";
        }
    })
}

function showDetails(id) {
    location.href = `../../product_details/product-details.html?id=${id}`
}


function addToCart(productId) {
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

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.product_id === productId);

    if (!product) return;

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

    const quantity = 1;

    if (existingItem) {
        const newTotalQuantity = existingItem.quantity + quantity;

        if (newTotalQuantity > maxStock) {
            showToast(`Stock limit reached.`, "error");
            return;
        }

        existingItem.quantity = newTotalQuantity;
    } else {
        if (quantity > maxStock) {
            showToast("Selected quantity exceeds available stock.", "error");
            return;
        }

        userCart.items.push({
            productId: product.product_id,
            quantity: quantity
        });
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    showToast("Product added to cart successfully..", "success");
}

function handleNavbarAuth() {
    const userProfile = document.getElementById("profile");
    const loginLink = document.getElementById("login-link");
    const adminDashboard = document.getElementById("admin-dashboard");
    const sellerDashboard = document.getElementById("seller-dashboard");
    const cartIcon = document.getElementById("cart-icon");
    const wishlistIcon = document.getElementById("wishlist-icon");
    const logoutBtn = document.getElementById("logout-btn");
    const contactLink = document.getElementById("contact-link");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!userProfile || !loginLink) return;

    if (currentUser) {
        // userProfile.style.display = "block";
        loginLink.style.display = "none";
        logoutBtn?.classList.remove("d-none");

        if (currentUser.role === "admin" || currentUser.role === "seller") {

            userProfile && (userProfile.style.display = "block");
            cartIcon && (cartIcon.style.display = "none");
            wishlistIcon && (wishlistIcon.style.display = "none");


            if (currentUser.role === "admin") {
                adminDashboard?.classList.remove("d-none");
                sellerDashboard?.classList.add("d-none");
                contactLink?.classList.add("d-none");
            } else if (currentUser.role === "seller") {
                sellerDashboard?.classList.remove("d-none");
                adminDashboard?.classList.add("d-none");
                contactLink?.classList.add("d-block");
            }
        }

        else {
            userProfile && (userProfile.style.display = "block");
            cartIcon && (cartIcon.style.display = "block");
            wishlistIcon && (wishlistIcon.style.display = "block");
            contactLink?.classList.add("d-block");

            adminDashboard?.classList.add("d-none");
            sellerDashboard?.classList.add("d-none");
            logoutBtn?.classList.add("d-none");
        }

        logoutBtn?.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "../login/login.html";
        });

    }

    else {
        loginLink.style.display = "block";
        logoutBtn?.classList.add("d-none");

        userProfile && (userProfile.style.display = "none");
        cartIcon && (cartIcon.style.display = "none");
        wishlistIcon && (wishlistIcon.style.display = "none");

        contactLink?.classList.add("d-none");

        adminDashboard?.classList.add("d-none");
        sellerDashboard?.classList.add("d-none");
    }
}
handleNavbarAuth();


let cartItemsNumber = document.getElementById('cart-items-number');
// let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let carts = JSON.parse(localStorage.getItem('carts'));
let wellcome = document.getElementById('wellcome')
if (currentUser) {
    wellcome.classList.remove('d-none');
    wellcome.innerHTML = `Wellcome <span class="text-danger"> ${currentUser.firstName}</span>`
    cartItemsNumber.classList.remove('d-none')
    let currentUserCart = carts.filter(c => c.userId == currentUser.id)[0]
    let count = 0;
    currentUserCart.items.forEach(i => {
        console.log(i.quantity);
        count += i.quantity;
    });
    cartItemsNumber.innerHTML = count
} else {
    cartItemsNumber.classList.add('d-none')
}