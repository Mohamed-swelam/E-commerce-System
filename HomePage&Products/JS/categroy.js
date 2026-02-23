
let allPrds = [];
let categoryPrds = [];
const category = new URLSearchParams(location.search).get("categroy");
const itemsPerPage = 5;
let currentPage = 1;



if (localStorage.getItem("products")) {
    allPrds = JSON.parse(localStorage.getItem("products"))
    console.log(allPrds);
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
    console.log(categoryPrds);
}

function displayCategroyData(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const categoryArray = categoryPrds.slice(start, end);
    let prdBox = " "
    for (let i = 0; i < categoryArray.length; i++) {
        prdBox += `   
       <div class="col-lg-4 col-6">
                    <div class="card"style="min-height:500px;" onclick="showDetails(${categoryArray[i].product_id})">
                    <div style="cursor:pointer">
                        <img class="card-img-top"  height="300" src="${categoryArray[i].image}" alt="${categoryArray[i].name}" />
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div >
                                    <h4 class="card-title m-0 p-0">${categoryArray[i].name}</h4>
                                    <small  >${categoryArray[i].brand}</small>
                                </div>
                                <div>
                                    <small>${categoryArray[i].price}$</small>
                                </div>
                            </div>
                            <p class="card-text lead">${categoryArray[i].description || "No description available for this product."}</p>
                        </div>
                            <div class="text-center w-100">
                             <button class="btn add-to-cart-btn" onclick="event.stopPropagation();addToCart(${categoryArray[i].product_id})">
                              Add To Cart
                            </button>
                             </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("data").innerHTML = prdBox;
}

function nextPrds() {
    if (currentPage * itemsPerPage < categoryPrds.length) currentPage++;
    else if (currentPage * itemsPerPage >= categoryPrds.length) currentPage = 1;
    displayCategroyData(currentPage);
}


function prevPrds() {
    if (currentPage > 1) {
        currentPage--;
        displayCategroyData(currentPage);
    }
}

function navigateNumbrsWithPrevAndNext() {
    const navigatNumbers = Math.ceil(categoryPrds.length / 5);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        numberBox += `
                  <span class="p-3 border number-span" style="cursor: pointer;">${i}</span>`
    }
    document.getElementById("navigators").innerHTML = numberBox;

    let spans = document.querySelectorAll(".number-span");
    spans.forEach((span, index) => {
        span.addEventListener("click", () => {
            displayCategroyData(index + 1);
        })
    })

    document.getElementById("prev").addEventListener("click", () => {
        prevPrds()
    })

    document.getElementById("next").addEventListener("click", () => {
        nextPrds()
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