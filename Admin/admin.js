'use strict'
// import { addCustomer } from "./validation.js";

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



// ======================================================
// Users Logic
// ======================================================

// Fetch users from JSON file and store them in localStorage
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

const usersData = [
    {
        "id": 1,
        "name": "Admin User",
        "email": "admin@store.com",
        "password": "123456",
        "role": "admin"
    },
    {
        "id": 2,
        "name": "Seller One",
        "email": "seller1@gmail.com",
        "password": "123456",
        "role": "seller"
    },
    {
        "id": 3,
        "name": "Kariem Tamer",
        "email": "Kariem@gmail.com",
        "password": "123456",
        "role": "customer"
    },
    {
        "id": 4,
        "name": "Ahmed Mohamed",
        "email": "ahmed@gmail.com",
        "password": "123456",
        "role": "customer"
    },
    {
        "id": 5,
        "name": "Sara Ali",
        "email": "sara@gmail.com",
        "password": "123456",
        "role": "customer"
    },
    {
        "id": 6,
        "name": "Omar Hassan",
        "email": "omar@gmail.com",
        "password": "123456",
        "role": "customer"
    },
    {
        "id": 7,
        "name": "Seller Two",
        "email": "seller2@gmail.com",
        "password": "123456",
        "role": "seller"
    },
    {
        "id": 8,
        "name": "Seller Three",
        "email": "seller3@gmail.com",
        "password": "123456",
        "role": "seller"
    }
];

// localStorage.clear()
// localStorage.setItem('users', JSON.stringify(usersData));
let users;
// Only set default users if localStorage is empty
if (!localStorage.getItem('users')) {
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

function deleteUser(id) {
    let deletedUser = users.filter(u => u.id == id);
    users.splice(users.indexOf(deletedUser[0]), 1);
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users))
    console.log(users);
}

// ======================================================
// Customers Logic
// ======================================================

const customersContainer = document.getElementById('customers-container');
let totalCustomers = document.getElementById('total-customers');


// Function to render one customer card
function displayCustomer(customer) {
    // Main row container
    let col = document.createElement('div');
    col.classList.add(
        'col-12', 'p-3', 'd-flex',
        'bg-light', 'rounded-3',
        'gap-5', 'flex-wrap', 'mb-3'
    );

    // ---------------- Name + Email ----------------
    let div1 = document.createElement('div');

    let customerName = document.createElement('p');
    customerName.classList.add('fs-4', 'mb-0');
    customerName.innerText = customer.name;

    let customerEmail = document.createElement('a');
    customerEmail.classList.add('text-secondary');
    customerEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${customer.email}`;
    customerEmail.target = "_blank";
    customerEmail.innerText = customer.email;
    customerEmail.style.textDecoration = "none";

    // ---------------- ID Section ----------------
    let div3 = document.createElement('div');
    div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-center');

    let customerId = document.createElement('p');
    customerId.classList.add('fs-5');
    customerId.innerText = "ID: " + customer.id;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete'
    deleteBtn.id = customer.id;
    // delete logic
    deleteBtn.addEventListener('click', (e) => {
        deleteUser(e.target.id);
        customersContainer.innerHTML = '';
        customers.forEach(c => displayCustomer(c))
        location.reload()
    })

    totalCustomers.innerText = customers.length;

    // ---------------- Append ----------------
    customersContainer.appendChild(col);

    col.appendChild(div1);
    // col.appendChild(div2);
    col.appendChild(div3);

    div1.appendChild(customerName);
    div1.appendChild(customerEmail);

    // div2.appendChild(customerRole);

    div3.appendChild(customerId);
    div3.appendChild(deleteBtn)
}

if (customers.length == 0) {
    console.log('empty');
    totalCustomers.innerText = '0'
    const customersEmptyMessage = document.getElementById('customers-empty-message');
    customersEmptyMessage.classList.remove('d-none')
    customersEmptyMessage.innerText = 'No customers found. Try adding some!'
}
else {
    customers.forEach(customer => {
        displayCustomer(customer)
    })
}


// addCustomer()
// ======================================================
// Sellers Logic
// ======================================================



// ======================================================
// Products Logic
// ======================================================
const productsContainer = document.getElementById('products-container');
let allProducts = [];
let activeFilters = {
    brands: [],
    categories: [],
    maxPrice: 0
};


// Function responsible for rendering a single product card in the UI
function displayProduct(product) {


    // Create main container for product row
    let col = document.createElement('div');
    col.classList.add(
        'col-12', 'p-3', 'd-flex',
        'bg-light', 'rounded-3',
        'gap-5', 'flex-wrap', 'mb-3'
    )

    // ----------------- Product Image -----------------
    let productImg = document.createElement('img')
    productImg.classList.add('product-img')
    productImg.src = product.image

    // ----------------- Name + Seller -----------------
    let div1 = document.createElement('div');

    let productName = document.createElement('p');
    productName.innerText = product.name;
    productName.classList.add('fs-4', 'mb-0');

    let productSeller = document.createElement('p');

    // Find seller name using seller_id
    productSeller.innerText = 'Seller: ' + sellers.filter(s => s.id == product.seller_id)[0].name

    // ----------------- Brand / Category / Quantity -----------------
    let div2 = document.createElement('div');

    let productBrand = document.createElement('p');
    productBrand.classList.add('text-secondary');
    productBrand.innerText = 'Brand:  ' + product.brand;

    let productCategory = document.createElement('p');
    productCategory.classList.add('text-secondary');
    productCategory.innerText = 'Category:  ' + product.category

    let productQuantity = document.createElement('p');
    productQuantity.classList.add('text-secondary');
    productQuantity.innerText = 'Quantity:  ' + product.quantity

    // ----------------- Price Section -----------------
    let div3 = document.createElement('div');
    div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-center', 'me-2')

    let productPrice = document.createElement('p');
    productPrice.classList.add('fs-3')
    productPrice.innerText = product.price + '$'

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete'

    // Append elements to DOM in structured hierarchy
    productsContainer.appendChild(col);
    col.appendChild(productImg);
    col.appendChild(div1);
    col.appendChild(div2);
    col.appendChild(div3);

    div1.appendChild(productName)
    div1.appendChild(productSeller)

    div2.appendChild(productBrand)
    div2.appendChild(productCategory)
    div2.appendChild(productQuantity)

    div3.appendChild(productPrice)
    div3.appendChild(deleteBtn)
}



// ======================================================
// Dynamic Filters Rendering
// ======================================================

// This function creates a group of checkboxes
// t is for title and arr is for brands and categories arrays
function displayFilters(arr, t) {

    const filters = document.getElementById('filters');
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('col-6', 'col-md-12')

    // Filter group title
    let title = document.createElement('p');
    title.classList.add('mt-4', 'fs-5')
    title.innerText = t;

    mainDiv.appendChild(title)

    // Create checkbox for each element in array
    arr.forEach(element => {

        let div = document.createElement('div');
        div.classList.add('form-check');

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.type = 'checkbox';
        input.value = element;
        input.classList.add(element);

        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.for = element;
        label.innerText = element;

        mainDiv.appendChild(div);
        div.appendChild(input);
        div.appendChild(label);
    })

    filters.appendChild(mainDiv);
}



// ======================================================
// Top Statistics Cards
// ======================================================

// Select elements that display summary statistics
const totalProducts = document.getElementById('total-products');
const totalCategories = document.getElementById('total-categories');
const totalBrands = document.getElementById('total-brands');

function applyFilters() {

    let filtered = allProducts;
    // Brand & Category filtering
    if (activeFilters.brands.length > 0 || activeFilters.categories.length > 0) {
        filtered = filtered.filter(product =>
            activeFilters.brands.includes(product.brand) ||
            activeFilters.categories.includes(product.category)
        );
    }

    // Price filtering
    if (activeFilters.maxPrice > 0) {
        filtered = filtered.filter(product =>
            product.price >= activeFilters.maxPrice &&
            product.price <= activeFilters.maxPrice + 100
        );
    }

    // Render
    productsContainer.innerHTML = '';
    filtered.forEach(p => displayProduct(p));
}


// Fetch products data from JSON file
fetch('../Dummy Data/products.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(products => {
        allProducts = products;
        // Render all products
        for (let i = 0; i < products.length; i++) {
            displayProduct(products[i]);
        }

        // Extract unique categories
        let categories = []
        products.map(p => categories.push(p.category))
        categories = [...new Set(categories)]

        // Extract unique brands
        let brands = []
        products.map(p => brands.push(p.brand))
        brands = [...new Set(brands)]

        // Render filter checkboxes
        displayFilters(brands, 'Brands');
        displayFilters(categories, 'Categories')

        // filtering(products, 'brand')
        // filtering(products, 'category')
        filtering(products);
        FilterByPrice(products)

        // Update dashboard summary cards
        totalProducts.innerText = products.length;
        totalCategories.innerHTML = categories.length
        totalBrands.innerText = brands.length
    })
    .catch(error => {
        console.error('There was a problem with fetching products:', error);
    });


//getting the products from the local storage
// const products = JSON.parse(localStorage.getItem('products'));
// totalProducts.innerText = products.length; // setting card 1 of 3 in top of products cards
// console.log(products);
// for (let i = 0; i < products.length; i++) {
//     displayProduct(products[i]);
// }



function filtering() {
    const filtersContainer = document.getElementById('filters');
    filtersContainer.addEventListener('change', function () {
        const checkedBoxes = [...document.querySelectorAll("input[type='checkbox']:checked")];
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
    })
}

// range
const rangeInput = document.getElementById('range4');
const rangeOutput = document.getElementById('rangeValue');
// Set initial value
rangeOutput.textContent = rangeInput.value;
rangeInput.addEventListener('input', function () {
    rangeOutput.textContent = this.value;
});


function FilterByPrice() {
    rangeInput.addEventListener('input', (e) => {
        activeFilters.maxPrice = parseInt(e.target.value);
        applyFilters();
    })
}


filtering();
FilterByPrice();
