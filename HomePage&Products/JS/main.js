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
  displayProducts(50, document.getElementById("row-data-two"));
})();

function displayProducts(x, container) {
  if (JSON.parse(localStorage.getItem("products"))) {
    // Then Display
    productArray = JSON.parse(localStorage.getItem("products")) || [];
    console.log(productArray);

    let productBox = " ";
    if (x === 0) {
      for (let i = 7; i < 11; i++) {

        let isWishlisted = false;
        if (currentUser) {
          //check if the product in the wishlist
          isWishlisted = wishlist.some(item =>
            item.product_id === productArray[i].product_id &&
            item.user_id === currentUser.id
          );
        }
        productBox += `
                      <div class="col-12 col-sm-6 col-md-3 my-3 my-md-0" >
                        <div class="card shadow-sm border-0 position-relative p-3 w-100"
        style="width:260px;height:460px;cursor:pointer;border-radius:15px;"
        onclick="showDetails(${productArray[i].product_id})">

        <div class="text-center">
            <img src="${productArray[i].image}" 
                 alt="${productArray[i].name}"
                 style="width:200px;height:200px;object-fit:contain">
        </div>

        <div class="card-body text-center">

            <h6 class="fw-bold mb-2">
                ${productArray[i].name.slice(0, 20)}
            </h6>

            <div class="mb-3">
                ${getPriceUI(productArray[i])}
            </div>

            <div class="d-flex justify-content-between align-items-center gap-3 text-center w-100" id="cart">
                        <button class="btn btn-dark"
                          onclick="event.stopPropagation();addToCart(${productArray[i].product_id})">
                          Add To Cart
                        </button> 
                        <span>
                          ${getHeartIcon(productArray[i])}
                        </span>
                          </div>
        </div>

        ${getDiscountUI(productArray[i])}

    </div>
                      </div>
                      `;
      }
    }

    // <div class="card position-relative w-100"
    //                         style="cursor:pointer;height: 500px;" 
    //                         onclick="showDetails(${productArray[i].product_id})">
    //                       <img src="${productArray[i].image}" 
    //                           class="card-img-top" 
    //                           alt="${productArray[i].name}" width="200px">

    //                       <div class="card-body">
    //                         <h5 class="card-title">${productArray[i].name.slice(0, 15)}</h5>
    //                         <p class="card-text">
    //                           ${getPriceUI(productArray[i])}
    //                         </p>
    //                       </div>

    //                       <div class="d-flex justify-content-between align-items-center gap-3 text-center w-100" id="cart">
    //                         <button class="btn btn-dark"
    //                           onclick="event.stopPropagation();addToCart(${productArray[i].product_id})">
    //                           Add To Cart
    //                         </button> 
    //                         <span>
    //                           <i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
    //                           onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(productArray[i])}, ${this})'>
    //                           </i>
    //                         </span>
    //                       </div>
    //                       ${getDiscountUI(productArray[i])}
    //                     </div>

    else {
      for (let o = 42; o < x; o++) {
        productBox += `<div class="col-12 col-sm-6 col-md-3 my-3">
                        <div class="card shadow-sm border-0 position-relative p-3 w-100"
        style="width:260px;height:460px;cursor:pointer;border-radius:15px;"
        onclick="showDetails(${productArray[o].product_id})">

        <div class="text-center">
            <img src="${productArray[o].image}" 
                 alt="${productArray[o].name}"
                 style="width:200px;height:200px;object-fit:contain">
        </div>

        <div class="card-body text-center">

            <h6 class="fw-bold mb-2">
                ${productArray[o].name.slice(0, 20)}
            </h6>

            <div class="mb-3">
                ${getPriceUI(productArray[o])}
            </div>

            <button class="btn btn-dark w-100"
                onclick="event.stopPropagation();addToCart(${productArray[o].product_id})">
                Add To Cart
            </button>

        </div>

        ${getDiscountUI(productArray[o])}

    </div>

  </div>
</div>`

      }

    }
    // console.log(productBox);
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

  // return `
  //   <div class="discount position-absolute top-0 left-0 bg-danger rounded-circle d-flex fw-bold"
  //       style="width:65px; height:65px;transform: rotate(-35deg);">
  //       <p class="m-auto text-white">${product.discount}%</p>
  //   </div>
  // `;
  return `
    <div class="discount position-absolute top-0 end-0 rounded bg-danger  d-flex fw-bold"
        style="width:65px;">
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
      <span class="text-success fw-bold fs-4">
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


// let swipperWrapper = document.querySelector(".swiper-wrapper");
// let appleProducts = products.filter(p => p.brand == "apple");
// for (let i = 0; i < appleProducts.length; i++) {
//   swipperWrapper.innerHTML += `
//   <div class="swiper-slide mx-3" >
//                         <div class="card position-relative w-100"
//                             style="cursor:pointer;height: 500px;" 
//                             onclick="showDetails(${appleProducts[i].product_id})">
//                           <img src="${appleProducts[i].image}" 
//                               class="" 
//                               alt="${appleProducts[i].name}" width="200">

//                           <div class="card-body">
//                             <h5 class="card-title">${appleProducts[i].name.slice(0, 15)}</h5>
//                             <p class="card-text">
//                               ${getPriceUI(appleProducts[i])}
//                             </p>
//                           </div>

//                           <div class="d-flex justify-content-between align-items-center gap-3 text-center w-100" id="cart">
//                             <button class="btn btn-dark"
//                               onclick="event.stopPropagation();addToCart(${appleProducts[i].product_id})">
//                               Add To Cart
//                             </button> 
//                             <span>

//                             </span>
//                           </div>
//                           ${getDiscountUI(appleProducts[i])}
//                         </div>
//                       </div>
//   `
// }
let swipperWrapper = document.querySelector(".swiper-wrapper");

let appleProducts = products.filter(p => p.brand.toLowerCase() === "apple");

appleProducts.forEach(product => {

  swipperWrapper.innerHTML += `

  <div class="swiper-slide d-flex justify-content-center">

    <div class="card shadow-sm border-0 position-relative p-3"
        style="width:260px;height:460px;cursor:pointer;border-radius:15px;"
        onclick="showDetails(${product.product_id})">

        <div class="text-center">
            <img src="${product.image}" 
                 alt="${product.name}"
                 style="width:200px;height:200px;object-fit:contain">
        </div>

        <div class="card-body text-center">

            <h6 class="fw-bold mb-2">
                ${product.name.slice(0, 20)}
            </h6>

            <div class="mb-3">
                ${getPriceUI(product)}
            </div>

            <button class="btn btn-dark w-100"
                onclick="event.stopPropagation();addToCart(${product.product_id})">
                Add To Cart
            </button>

        </div>

        ${getDiscountUI(product)}

    </div>

  </div>

  `;

});
console.log(appleProducts);


let saleWrapper = document.querySelector("#sale-wrapper");

let saleProducts = products.filter(p => p.discount && p.discount > 0);

saleProducts.forEach(product => {

  saleWrapper.innerHTML += `
  
  <div class="swiper-slide d-flex justify-content-center">
    
    <div class="card shadow-sm border-0 position-relative p-3"
        style="width:260px;height:460px;cursor:pointer;border-radius:15px;"
        onclick="showDetails(${product.product_id})">

        <div class="text-center">
            <img src="${product.image}" 
                 alt="${product.name}"
                 style="width:200px;height:200px;object-fit:contain">
        </div>

        <div class="card-body text-center">

            <h6 class="fw-bold mb-2">
                ${product.name.slice(0, 20)}
            </h6>

            <div class="mb-3">
                ${getPriceUI(product)}
            </div>

            <button class="btn btn-dark w-100"
                onclick="event.stopPropagation();addToCart(${product.product_id})">
                Add To Cart
            </button>

        </div>

        ${getDiscountUI(product)}

    </div>

  </div>

  `;
});
/*<i class="${isWishlisted ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"
  onclick='event.stopPropagation(); addToWishlist(${JSON.stringify(appleProducts[i])}, ${this})'>
</i>*/

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