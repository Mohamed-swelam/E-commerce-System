'use strict'

// ==============================
// Navigation Tabs Logic
// ==============================

// Select all main tabs and their corresponding sub sections
const mainTabs = document.querySelectorAll('.main-tab')
const subTabs = document.querySelectorAll('.sub-tab')

// Add click event to each main tab
mainTabs.forEach(p => {
    p.addEventListener('click', (e) => {

        // Remove active style from all main tabs
        mainTabs.forEach(p => p.classList.remove('active-tab'))
        // Add active style to the clicked tab
        p.classList.add('active-tab')
        // Hide all sub tabs first
        subTabs.forEach(div => {
            div.classList.remove('active-sub-tab')
        })
        // Show the sub tab that matches the clicked tab text
        subTabs.forEach(div => {
            if (div.id == e.target.innerHTML) {
                div.classList.add('active-sub-tab')
            }
        })
    })
});



// localStorage.clear()

// localStorage.removeItem('users');
// // Fetch users from JSON file and store them in localStorage
// fetch('../Dummy Data/users.json')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     })
//     .then(users => {
//         localStorage.setItem('users', JSON.stringify(users));
//         // location.reload();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });

// localStorage.removeItem('products');
// // Fetch users from JSON file and store them in localStorage
// fetch('../Dummy Data/products.json')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     })
//     .then(products => {
//         localStorage.setItem('products', JSON.stringify(products));
//         // location.reload();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });

// localStorage.removeItem('orders');
// fetch('../Dummy Data/orders.json')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     }
//     ).then(orders => {
//         localStorage.setItem('orders', JSON.stringify(orders));
//         // location.reload();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });





// ======================================================
// Users Logic
// ======================================================
let users;
// Only set default users if localStorage is empty
if (!localStorage.getItem('users') || JSON.parse(localStorage.getItem('users')).length === 0) {
    localStorage.setItem('users', JSON.stringify(usersData));
    users = JSON.parse(localStorage.getItem('users'));
}
else {
    users = JSON.parse(localStorage.getItem('users'));
}

// Separate users based on role
let sellers = users.filter(user => user.role == 'seller')
// localStorage.setItem('sellers', JSON.stringify(sellers))

let customers = users.filter(user => user.role == 'customer');
// localStorage.setItem('customers', JSON.stringify(customers))

let orders = JSON.parse(localStorage.getItem('orders'));

// function deleteUser(id) {
//     let deletedUser = users.filter(u => u.id == id);
//     users.splice(users.indexOf(deletedUser[0]), 1);
//     localStorage.removeItem('users');
//     localStorage.setItem('users', JSON.stringify(users))
//     location.reload()
//     showToast('User deleted successfully', 'success');
//     console.log(users);
// }

// function deleteProduct(id) {
//     let deletedProduct = products.filter(p => p.product_id == id);
//     products.splice(products.indexOf(deletedProduct[0]), 1);
//     localStorage.removeItem('products');
//     localStorage.setItem('products', JSON.stringify(products))
//     location.reload()
//     showToast('Product deleted successfully', 'success');
//     console.log(products);
// }

function deleteItem(id, type) {
    if (type === 'user') {
        let deletedItem = users.filter(u => u.id == id);
        users.splice(users.indexOf(deletedItem[0]), 1);
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(users))
        location.reload()
        showToast('User deleted successfully', 'success');
        console.log(users);
    } else if (type === 'product') {
        let deletedProduct = products.filter(p => p.product_id == id);
        products.splice(products.indexOf(deletedProduct[0]), 1);
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(products))
        showToast('Product deleted successfully', 'success');
        location.reload()
        console.log(products);
    }
}





//getting the products from the local storage
let products = JSON.parse(localStorage.getItem('products'));





// ======================================================
// Products Logic
// ======================================================

const productsContainer = document.getElementById('products-container');

// let allProducts = JSON.parse(localStorage.getItem('products')) || [];
let allProducts = [];

let activeFilters = {
    brands: [],
    categories: [],
    minPrice: 0,
    maxPrice: 0
};

// function displayProduct(product) {

//     let col = document.createElement('div');
//     col.classList.add(
//         'col-12', 'p-3', 'd-flex',
//         'bg-light', 'rounded-3',
//         'gap-5', 'flex-wrap', 'mb-3'
//     );

//     // ----------------- Image -----------------
//     let productImg = document.createElement('img');
//     productImg.classList.add('product-img');
//     productImg.src = product.image;

//     // ----------------- Name + Seller -----------------
//     let div1 = document.createElement('div');

//     let productName = document.createElement('p');
//     productName.innerText = product.name;
//     productName.classList.add('fs-4', 'mb-0');

//     let productSeller = document.createElement('p');

//     const seller = users.find(s => s.id == product.seller_id);
//     productSeller.innerText = 'Seller: ' + (seller ? seller.name : 'Unknown');

//     // ----------------- Brand / Category / Quantity -----------------
//     let div2 = document.createElement('div');

//     let productBrand = document.createElement('p');
//     productBrand.classList.add('text-secondary');
//     productBrand.innerText = 'Brand:  ' + product.brand;

//     let productCategory = document.createElement('p');
//     productCategory.classList.add('text-secondary');
//     productCategory.innerText = 'Category:  ' + product.category;

//     let productQuantity = document.createElement('p');
//     productQuantity.classList.add('text-secondary');
//     productQuantity.innerText = 'Quantity:  ' + product.quantity;

//     let productDiscount = document.createElement('p');
//     productDiscount.classList.add('text-secondary');
//     if (product.discount && product.discount > 0) {
//         productDiscount.innerText = 'Discount:  ' + product.discount + '%';
//     }
//     else {
//         productDiscount.innerText = 'Discount:  No discount';
//     }

//     // ----------------- Price + Delete -----------------
//     let div3 = document.createElement('div');
//     div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-center', 'me-2');
//     div3.id = product.product_id;

//     let productPrice = document.createElement('p');
//     productPrice.classList.add('fs-3');
//     productPrice.innerText = product.price + '$';

//     let productFinalPrice = document.createElement('p');
//     productFinalPrice.classList.add('fs-5', 'text-secondary');
//     if (product.discount && product.discount > 0) {
//         const discountedPrice = product.price * (1 - product.discount / 100);
//         productFinalPrice.innerText = 'After Discount: ' + discountedPrice.toFixed(2) + '$';
//     } else {
//         productFinalPrice.innerText = 'No discount applied';
//     }

//     let deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('btn', 'btn-danger');
//     deleteBtn.innerText = 'Delete';

//     deleteBtn.addEventListener('click', function (e) {
//         console.log(e);
//         const deletedProduct = allProducts.findIndex(p => p.product_id == e.target.parentElement.attributes.id.textContent);
//         console.log(deletedProduct);
//         allProducts.splice(deletedProduct, 1);
//         console.log(allProducts);
//         localStorage.removeItem('products');
//         localStorage.setItem('products', JSON.stringify(allProducts))
//         allProducts = JSON.parse(localStorage.getItem('products'));
//         renderEverything();
//     });

//     // Append structure
//     productsContainer.appendChild(col);
//     col.appendChild(productImg);
//     col.appendChild(div1);
//     col.appendChild(div2);
//     col.appendChild(div3);

//     div1.appendChild(productName);
//     div1.appendChild(productSeller);

//     div2.appendChild(productBrand);
//     div2.appendChild(productCategory);
//     div2.appendChild(productQuantity);
//     div2.appendChild(productDiscount);

//     div3.appendChild(productPrice);
//     div3.appendChild(productFinalPrice);
//     div3.appendChild(deleteBtn);
// }


const tbody = document.getElementById('product-table-body');
tbody.innerHTML = "";
allProducts.forEach(p => displayProduct(p));

// ------------------------------------- Dynamic Filters Rendering ----------------------------------

function displayFilters(arr, titleText) {

    const filterContainers = document.querySelectorAll('.filters');

    filterContainers.forEach(container => {

        let mainDiv = document.createElement('div');
        mainDiv.classList.add('col-6', 'col-md-12');

        let title = document.createElement('p');
        title.classList.add('mt-4', 'fs-5');
        title.innerText = titleText;

        mainDiv.appendChild(title);

        arr.forEach(value => {

            let div = document.createElement('div');
            div.classList.add('form-check');

            let input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'checkbox';
            input.value = value;

            let label = document.createElement('label');
            label.classList.add('form-check-label');
            label.innerText = value;

            div.appendChild(input);
            div.appendChild(label);
            mainDiv.appendChild(div);
        });

        container.appendChild(mainDiv);
    });
}


// ---------------------------------------------- Filtering Logic ---------------------------------


function applyFilters() {

    let filtered = [...allProducts];

    // Brand & Category
    if (activeFilters.brands.length > 0 || activeFilters.categories.length > 0) {
        filtered = filtered.filter(product =>
            activeFilters.brands.includes(product.brand) ||
            activeFilters.categories.includes(product.category)
        );
    }

    // Price Range Filtering
    if (activeFilters.maxPrice > 0) {
        filtered = filtered.filter(product =>
            product.price >= activeFilters.minPrice &&
            product.price <= activeFilters.maxPrice
        );
    }

    // productsContainer.innerHTML = '';
    tbody.innerHTML = "";

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center p-5"><p class="fs-4 text-muted">No products found!</p></td></tr>`;
        return;
    }

    filtered.forEach(product => displayProduct(product));
}



// -------------------------------------- Checkbox Filtering ------------------------------------ 

function initializeCheckboxFiltering() {

    const filterContainers = document.querySelectorAll('.filters');

    filterContainers.forEach(container => {

        container.addEventListener('change', function () {

            const checkedBoxes = [
                ...document.querySelectorAll(".filters input[type='checkbox']:checked")
            ];

            activeFilters.brands = [];
            activeFilters.categories = [];

            checkedBoxes.forEach(cb => {

                if (allProducts.some(p => p.brand === cb.value)) {
                    activeFilters.brands.push(cb.value);
                }

                if (allProducts.some(p => p.category === cb.value)) {
                    activeFilters.categories.push(cb.value);
                }
            });

            applyFilters();
        });
    });
}

// ------------------------------------- Price Range Filtering ---------------------------

function initializePriceFiltering() {

    const ranges = document.querySelectorAll('.range4');
    const outputs = document.querySelectorAll('.rangeValue');
    ranges.forEach((range, index) => {
        outputs[index].textContent = range.value + " - " + (parseInt(range.value) + 100);
        range.addEventListener('input', function () {
            let value = parseInt(this.value);
            outputs[index].textContent = value + " - " + (value + 100);
            activeFilters.minPrice = value;
            activeFilters.maxPrice = value + 100;
            applyFilters();
        });
    });
}

// ======================================================
// Statistics
// ======================================================

const totalProducts = document.getElementById('total-products');
const totalCategories = document.getElementById('total-categories');
const totalBrands = document.getElementById('total-brands');

function updateStatistics() {

    const categories = [...new Set(allProducts.map(p => p.category))];
    const brands = [...new Set(allProducts.map(p => p.brand))];

    totalProducts.innerText = allProducts.length;
    totalCategories.innerText = categories.length;
    totalBrands.innerText = brands.length;
}

// ======================================================
// Initialization
// ======================================================

function initializeProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts && JSON.parse(storedProducts).length > 0) {
        allProducts = JSON.parse(storedProducts);
        renderEverything();
    }
    else {
        fetch('../Dummy Data/products.json')
            .then(res => res.json())
            .then(products => {
                allProducts = products;
                localStorage.setItem('products', JSON.stringify(allProducts));
                renderEverything();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
}
// let allTickets = [];
// function initializeTickets() {
//     const storedTickets = localStorage.getItem('tickets');
//     if (storedTickets && JSON.parse(storedTickets).length > 0) {
//         allTickets = JSON.parse(storedTickets);
//         displayTickets();
//     }
//     else {
//         fetch('../Dummy Data/tickets.json')
//             .then(res => res.json())
//             .then(tickets => {
//                 allTickets = tickets;
//                 localStorage.setItem('tickets', JSON.stringify(allTickets));
//                 displayTickets();
//             })
//             .catch(error => {
//                 console.error('Error fetching tickets:', error);
//             });
//     }
// }


function renderEverything() {

    // productsContainer.innerHTML = '';
    tbody.innerHTML = "";

    const categories = [...new Set(allProducts.map(p => p.category))];
    const brands = [...new Set(allProducts.map(p => p.brand))];

    displayFilters(brands, 'Brands');
    displayFilters(categories, 'Categories');

    initializeCheckboxFiltering();
    initializePriceFiltering();

    updateStatistics();

    allProducts.forEach(product => displayProduct(product));
}

initializeProducts();
// initializeTickets();


function displayProduct(product) {
    allProducts.push(product);
    tbody.innerHTML += `<tr>
            <td><div class="d-flex align-items-center gap-2"><img src="${product.image}" class="product-img" onerror="this.src='https://via.placeholder.com/50'"><b>${product.name}</b></div></td>
            <td>${product.category}</td>
            <td>${product.brand}</td>
            <td class="text-primary fw-bold">$${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.seller_id}</td>
            <td><button class="btn btn-sm btn-info me-2" onclick="openModal('edit',${product.product_id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${product.product_id}, 'product')">Delete</button>
            </td>
        </tr>`
}




//////////////////////////////////////////////////
/////  CHARTS for products
//////////////////////////////////////////////////
const cat = document.getElementById('categories');
new Chart(cat, {
    type: 'doughnut',
    data: {
        labels: [...new Set(products.map(p => p.category))],
        datasets: [{
            label: ' products in this category',
            data: [...new Set(products.map(p => p.category))].map(c => products.filter(p => p.category == c).length),
            borderWidth: 1
        }]
    },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});
const brand = document.getElementById('brands');
new Chart(brand, {
    type: 'bar',
    data: {
        labels: [...new Set(products.map(p => p.brand))],
        datasets: [{
            label: ' products in this brand',
            data: [...new Set(products.map(p => p.brand))].map(b => products.filter(p => p.brand == b).length),
            borderWidth: 1
        }]
    },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});









let userProfile = document.getElementById('profile');
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// localStorage.removeItem("currentUser");
if (currentUser) {
    userProfile.style.display = "block";
    document.getElementById('login-link').style.display = "none";
    if (currentUser.role === "admin") {
        document.getElementById("admin-dashboard").classList.remove("d-none");
        document.getElementById("seller-dashboard").classList.add("d-none");
    }
    else if (currentUser.role === "seller") {
        document.getElementById("seller-dashboard").classList.remove("d-none");
        document.getElementById("admin-dashboard").classList.add("d-none");
    }

} else {
    userProfile.style.display = "none";
    document.getElementById('login-link').style.display = "block";
}