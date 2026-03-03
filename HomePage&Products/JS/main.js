let products = [];

async function initializeProducts() {
  try {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts && storedProducts !== "undefined") {
      products = JSON.parse(storedProducts);
      return;
    }

    const response = await fetch('../../Dummy Data/products.json');

    if (!response.ok) {
      throw new Error("Failed to fetch products.json");
    }

    const productsFromJson = await response.json();

    if (Array.isArray(productsFromJson)) {
      localStorage.setItem("products", JSON.stringify(productsFromJson));
      products = productsFromJson;
    } else {
      console.error("Invalid JSON structure");
      products = [];
    }

  } catch (error) {
    console.error("Initialize Products Error:", error);
    products = [];
  }
}


async function initializeUsers() {
  try {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers && storedUsers !== "undefined") {
      return;
    }

    const response = await fetch('../../Dummy Data/users.json');

    if (!response.ok) {
      throw new Error("Failed to fetch users.json");
    }

    const usersFromJson = await response.json();

    if (Array.isArray(usersFromJson)) {
      localStorage.setItem("users", JSON.stringify(usersFromJson));
    } else {
      console.error("Invalid users JSON structure");
    }

  } catch (error) {
    console.error("Initialize Users Error:", error);
  }
}

async function initializeOrders() {
  try {
    const storedOrders = localStorage.getItem("orders");

    if (storedOrders && storedOrders !== "undefined") {
      return;
    }

    const response = await fetch('../../Dummy Data/orders.json');

    if (!response.ok) {
      throw new Error("Failed to fetch orders.json");
    }

    const ordersFromJson = await response.json();

    if (Array.isArray(ordersFromJson)) {
      localStorage.setItem("orders", JSON.stringify(ordersFromJson));
    } else {
      console.error("Invalid orders JSON structure");
    }

  } catch (error) {
    console.error("Initialize Orders Error:", error);
  }
}
initializeOrders();
initializeUsers();

console.log(products);

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

(async function () {
  await initializeProducts();
  displayProducts(0, document.getElementById("row-data"));
  displayProducts(4, document.getElementById("row-data-two"));
})();

function displayProducts(x, container) {
  if (JSON.parse(localStorage.getItem("products"))) {
    // Then Display
    productArray = JSON.parse(localStorage.getItem("products")) || [];
    console.log(productArray);

    let productBox = " ";
    if (x === 0) {
      for (let i = 0; i < 4; i++) {

        let isWishlisted = false;

        if (currentUser) {

          //check if the product in the wishlist

          isWishlisted = wishlist.some(item =>
            item.product_id === productArray[i].product_id &&
            item.user_id === currentUser.id
          );
        }


        productBox += `
                      <div class="col-lg-3">
                        <div class="card position-relative w-100 p-0 m-0" 
                            style="cursor:pointer;" 
                            onclick="showDetails(${productArray[i].product_id})">

                          <div class="bg-white text-end py-3">
                            <span>
                              <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
                              onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(productArray[i])}, this)'>
                              </i>
                            </span>
                          </div>    

                          <img src="${productArray[i].image}" 
                              class="card-img-top" 
                              alt="${productArray[i].name}" height="200">

                          <div class="card-body">
                            <h5 class="card-title">${productArray[i].name.slice(0, 15)}</h5>
                            <p class="card-text">
                              ${getPriceUI(productArray[i])}
                            </p>
                          </div>
                            
                          <div class="text-center w-100" id="cart">
                            <button class="btn add-to-cart-btn"
                              onclick="event.stopPropagation();addToCart(${productArray[i].product_id})">
                              Add To Cart
                            </button> 
                          </div>

                          ${getDiscountUI(productArray[i])}

                        </div>
                      </div>
                      `;
      }
    }
    else {

      productBox = `
                        <div class="card position-relative col-12 col-lg-6"
                            style="background-color:transparent !important;cursor:pointer;"
                            onclick="showDetails(${productArray[20].product_id})">

                          <div class="bg-white text-end py-3">
                            <span>
                              ${getHeartIcon(productArray[20])}
                            </span>
                          </div>

                          <img src="${productArray[20].image}" class="card-img-top" height="200">

                          <div class="card-body">
                            <h5 class="card-title">${productArray[20].name.slice(0, 15)}</h5>
                            <p class="card-text">
                              ${getPriceUI(productArray[20])}
                            </p>
                          </div>

                          <div class="text-center w-100" id="cart">
                            <button class="btn add-to-cart-btn"
                              onclick="event.stopPropagation();addToCart(${productArray[20].product_id})">
                              Add To Cart
                            </button>
                          </div>

                          ${getDiscountUI(productArray[20])}
                        </div>

                        <div class="card position-relative col-12 col-lg-3"
                            style="background-color:transparent !important;cursor:pointer;"
                            onclick="showDetails(${productArray[21].product_id})">

                          <div class="bg-white text-end py-3">
                            <span>
                              ${getHeartIcon(productArray[21])}
                            </span>
                          </div>

                          <img src="${productArray[21].image}" class="card-img-top" height="200">

                          <div class="card-body">
                            <h5 class="card-title">${productArray[21].name.slice(0, 15)}</h5>
                            <p class="card-text">
                              ${getPriceUI(productArray[21])}
                            </p>
                          </div>

                          <div class="text-center w-100" id="cart">
                            <button class="btn add-to-cart-btn"
                              onclick="event.stopPropagation();addToCart(${productArray[21].product_id})">
                              Add To Cart
                            </button>
                          </div>

                          ${getDiscountUI(productArray[21])}
                        </div>


                    <div class="card position-relative col-12 col-lg-3"
                        style="background-color:transparent !important;cursor:pointer;"
                        onclick="showDetails(${productArray[6].product_id})">

                      <div class="bg-white text-end py-3">
                        <span>
                          ${getHeartIcon(productArray[6])}
                        </span>
                      </div>

                      <img src="${productArray[6].image}" class="card-img-top" height="200">

                      <div class="card-body">
                        <h5 class="card-title">${productArray[6].name.slice(0, 15)}</h5>
                        <p class="card-text">
                          ${getPriceUI(productArray[6])}
                        </p>
                      </div>

                      <div class="text-center w-100" id="cart">
                        <button class="btn add-to-cart-btn"
                          onclick="event.stopPropagation();addToCart(${productArray[6].product_id})">
                          Add To Cart
                        </button>
                      </div>

                      ${getDiscountUI(productArray[6])}
                    </div>
`

    }
    console.log(productBox);
    container.innerHTML += productBox;
  }
}



function getHeartIcon(product) {
  let isWishlisted = false;

  if (currentUser) {
    isWishlisted = wishlist.some(item =>
      item.product_id === product.product_id &&
      item.user_id === currentUser.id
    );
  }

  return `
    <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
       onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(product)}, this)'>
    </i>
  `;
}


function getDiscountUI(product) {
  const hasDiscount =
    product.discount &&
    product.discount > 0 &&
    product.oldPrice &&
    product.oldPrice > product.price;

  if (!hasDiscount) return "";

  return `
    <div class="discount position-absolute top-0 left-0 bg-danger rounded-circle d-flex fw-bold"
         style="width:65px; height:65px;transform: rotate(-35deg);">
        <p class="m-auto text-white">${product.discount}%</p>
    </div>
  `;
}

function getPriceUI(product) {
  const hasDiscount =
    product.discount &&
    product.discount > 0 &&
    product.oldPrice &&
    product.oldPrice > product.price;

  if (hasDiscount) {
    return `
      <span class="text-decoration-line-through text-danger me-2">
        ${product.oldPrice}$
      </span>
      <span class="text-success fw-bold">
        ${product.price}$
      </span>
    `;
  }

  return `
    <span class="text-dark fw-bold">
      ${product.price}$
    </span>
  `;
}




function showDetails(id) {
  location.href = `../../product_details/product-details.html?id=${id}`
  console.log(`Id = ${id}`);

}

function addToCart(productId) {

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



//handle navbar displaying
const userProfile = document.getElementById("profile");
const loginLink = document.getElementById("login-link");
const adminDashboard = document.getElementById("admin-dashboard");
const sellerDashboard = document.getElementById("seller-dashboard");
const cartIcon = document.getElementById("cart-icon");
const wishlistIcon = document.getElementById("wishlist-icon");
const logoutBtn = document.getElementById("logout-btn");
const contactLink = document.getElementById("contact-link");


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

    loginLink.style.display = "none";
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




let collectionButtons = document.getElementsByClassName("collection");

for (let btn of collectionButtons) {
  btn.addEventListener("click", function () {
    window.location.href = "/HomePage&Products/AllProducts.html";
  });
}


