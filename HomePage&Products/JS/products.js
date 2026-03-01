
let itemsPerPage = 9;
let currentPage = 1;
let allPrds = [];
let start, end, brand;
let searchInput = document.getElementById("input-search");
let searchedPrds = [];

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

let curretPath = location.pathname.split("/").pop();
console.log(curretPath);


document.querySelectorAll("#bottom-navbar  .nav-link").forEach(a => {
    if (a.getAttribute("href").slice(2) === curretPath) {
        a.style.cssText =
            `color:#3599db;
                 border-bottom:3px solid #3599db; 
                `
    }

});







(function () {
    if (localStorage.getItem("products")) {
        console.log(JSON.parse(localStorage.getItem("products")));
        allPrds = JSON.parse(localStorage.getItem("products"))
    }
    displayPaginationItems(allPrds, 1);
    navigateNumbrsWithPrevAndNext(allPrds);
})()

let baseProducts = searchedPrds.length ? searchedPrds : allPrds;
console.log(baseProducts);




function displayAllPrds(prds) {
    product = " ";
    for (let i = 0; i < prds.length; i++) {

        let isWishlisted = false;

        if (currentUser) {

            //check if the product in the wishlist

            isWishlisted = wishlist.some(item =>
                item.product_id === prds[i].product_id &&
                item.user_id === currentUser.id
            );
        }



        const hasDiscount = prds[i].discount && prds[i].discount > 0 && prds[i].oldPrice;

        product +=
            `
                <div class="col-6 col-lg-4">
                    <div class="card position-relative" style="cursor:pointer;">
                        
                        <div class="bg-white text-end py-3">
                            <span>
                                <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
                                onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(prds[i])}, this)'>
                                </i>
                            </span>
                        </div>

                        <img src="${prds[i].image}" class="card-img-top" 
                            alt="${prds[i].name}" height="200" 
                            onclick="showDetails(${prds[i].product_id})">

                        <div class="card-body">
                            <p class="card-title fw-normal" id="product_name">
                                ${prds[i].name}
                            </p>
                            
                            <div>
                                ${hasDiscount
                ? `<span class="card-text text-decoration-line-through text-danger">
                                        ${prds[i].oldPrice}$
                                    </span>`
                : ``
            }

                                <span class="card-text ${hasDiscount ? 'text-success' : 'text-dark'}" 
                                    style="font-size:25px;">
                                    ${prds[i].price}$
                                </span>
                            </div>
                        </div>

                        <div class="text-center w-100" id="cart">
                            <button class="btn add-to-cart-btn"
                                onclick="event.stopPropagation();addToCart(${prds[i].product_id})">
                                Add To Cart
                            </button>
                        </div>

                        ${hasDiscount
                ? `<div class="discount position-absolute top-0 left-0 bg-danger rounded-circle d-flex fw-bold"
                                style="width:65px; height:65px;">
                                <p class="m-auto text-white">${prds[i].discount}%</p>
                            </div>`
                : ``
            }

                    </div>
                </div>`
    }
    document.getElementById("prds-data").innerHTML = product;
}
// ===================== Add to wishlist =====================




window.addToWishlist = function (product, heartIcon) {

    if (!currentUser) {

        showToast("Please login first to add to wish list", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 1000)
        return;
    }


    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const existsIndex = wishlist.findIndex(item =>
        item.product_id === product.product_id &&
        item.user_id === currentUser.id
    );

    if (existsIndex === -1) {
        wishlist.push({
            user_id: currentUser.id,
            product_id: product.product_id
        });
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid', 'text-danger');
    } else {
        wishlist.splice(existsIndex, 1);
        heartIcon.classList.remove('fa-solid', 'text-danger');
        heartIcon.classList.add('fa-regular');
    }

    showToast("Product added to wishlist successfully...", "success");
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};







function showDetails(id) {
    location.href = `../product_details/product-details.html?id=${id}`
}

function displayPaginationItems(prds, page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginationPrds = prds.slice(start, end);
    displayAllPrds(paginationPrds);
}


function nextPrds(prds) {
    if (currentPage * itemsPerPage < prds.length) currentPage++;
    else if (currentPage * itemsPerPage >= prds.length) currentPage = 1;
    displayPaginationItems(prds, currentPage);
}


function prevPrds(prds) {
    if (currentPage > 1) {
        currentPage--;
        displayPaginationItems(prds, currentPage);
    }
}


function navigateNumbrsWithPrevAndNext(prds) {
    console.log(prds);

    console.log(Math.ceil(prds.length / 9))
    const navigatNumbers = Math.ceil(prds.length / 9);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        console.log(i);
        numberBox += ` <span class="p-3 border number-span" style="cursor: pointer;">${i}</span> `
    }
    document.getElementById("navigators").innerHTML = numberBox;

    let spans = document.querySelectorAll(".number-span");
    spans[0].style.boxShadow = "2px 2px 5px #3599db inset";

    spans.forEach((span, index) => {

        span.addEventListener("click", (e) => {

            currentPage = +span.innerText;

            spans.forEach(span => {
                if (getComputedStyle(span).boxShadow === "rgb(53, 153, 219) 2px 2px 5px 0px inset") {
                    span.style["boxShadow"] = "none";
                }
            })
            e.target.style.boxShadow = "2px 2px 5px #3599db inset";
            displayPaginationItems(prds, index + 1);
        })
    })



    document.getElementById("prev").addEventListener("click", (e) => {
        prevPrds(prds);
        colorNavigatorBasedOnArrow()
    })


    document.getElementById("next").addEventListener("click", (e) => {
        nextPrds(prds)

        colorNavigatorBasedOnArrow()
    })
}

// Filter By Price
document.querySelectorAll("#price").forEach(divPrice => {
    divPrice.addEventListener('click', (e) => {
        console.log(baseProducts);
        let pricePrds = [];
        if (e.target.nodeName === "INPUT") {
            document.querySelectorAll("input[name='price']").forEach(input => {
                if (input.checked) {
                    input.checked = false;
                    e.target.checked = true;
                }
            })

            if (e.target.checked) {
                start = +e.target.value.split(' - ')[0];
                end = +e.target.value.split(' - ')[1];
                if (brand !== undefined) {
                    for (let i = 0; i < baseProducts.length; i++) {
                        if (baseProducts[i].price > start && baseProducts[i].price < end && (baseProducts[i].brand === brand)) { pricePrds.push(baseProducts[i]); }
                    }
                }
                else {
                    for (let i = 0; i < baseProducts.length; i++) {
                        if (baseProducts[i].price > start && baseProducts[i].price < end) { pricePrds.push(baseProducts[i]) }
                    }
                }
                displayPaginationItems(pricePrds, 1);
                navigateNumbrsWithPrevAndNext(pricePrds)
            }


            else {
                start = undefined;
                if (brand !== undefined) {
                    let brandsPrdsOnly = [];
                    for (let i = 0; i < baseProducts.length; i++) {
                        if (baseProducts[i].brand === brand) { brandsPrdsOnly.push(baseProducts[i]); }
                    }
                    displayPaginationItems(brandsPrdsOnly, 1);
                    navigateNumbrsWithPrevAndNext(brandsPrdsOnly)
                }
                else {
                    displayPaginationItems(baseProducts, 1);
                    navigateNumbrsWithPrevAndNext(baseProducts)
                }
            }
        }
    })
})



// Filter by Brands
document.querySelectorAll("#brands").forEach(divBrand => {
    divBrand.addEventListener('click', (e) => {
        let brandsPrds = [];
        if (e.target.nodeName === "INPUT") {
            document.querySelectorAll("input[name='brand']").forEach(input => {
                if (input.checked) {
                    input.checked = false;
                    e.target.checked = true;
                }
            })


            if (e.target.checked) {
                brand = e.target.value;
                if (start !== undefined) {
                    for (let i = 0; i < baseProducts.length; i++) {
                        if ((baseProducts[i].brand === brand) && (baseProducts[i].price > start && baseProducts[i].price < end)) { brandsPrds.push(baseProducts[i]); }
                    }
                }
                else {
                    for (let i = 0; i < baseProducts.length; i++) {
                        if (baseProducts[i].brand === brand) { brandsPrds.push(baseProducts[i]); }
                    }
                }
                displayPaginationItems(brandsPrds, 1);
                navigateNumbrsWithPrevAndNext(brandsPrds)
            }
            else {
                brand = undefined;
                if (start !== undefined) {
                    let pricePrdsOnly = [];
                    for (let i = 0; i < baseProducts.length; i++) {
                        if (baseProducts[i].price > start && baseProducts[i].price < end) { pricePrdsOnly.push(baseProducts[i]); }
                    }
                    displayPaginationItems(pricePrdsOnly, 1);
                    navigateNumbrsWithPrevAndNext(pricePrdsOnly)
                }
                else {
                    displayPaginationItems(baseProducts, 1);
                    navigateNumbrsWithPrevAndNext(baseProducts)
                }
            }
        }
    })
});


// search product
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("input-search");

    if (searchInput) {
        searchInput.addEventListener('search', () => {
            searchedPrds = [];
            for (let i = 0; i < allPrds.length; i++) {
                if (allPrds[i].name.toLowerCase().trim()
                    .includes(searchInput.value.toLowerCase().trim())) {
                    searchedPrds.push(allPrds[i]);
                }
            }
            baseProducts = [...searchedPrds];
            displayPaginationItems(searchedPrds, 1);
            navigateNumbrsWithPrevAndNext(searchedPrds);
        });
    }
});

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


function addToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        showToast("Please login first to add items to cart.", "error");
        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 2500);
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

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!userProfile || !loginLink) return;

    if (currentUser) {
        userProfile.style.display = "block";
        loginLink.style.display = "none";

        if (currentUser.role === "admin") {
            adminDashboard?.classList.remove("d-none");
            sellerDashboard?.classList.add("d-none");
        } else if (currentUser.role === "seller") {
            sellerDashboard?.classList.remove("d-none");
            adminDashboard?.classList.add("d-none");
        }
    } else {
        userProfile.style.display = "none";
        loginLink.style.display = "block";
    }
}
handleNavbarAuth();