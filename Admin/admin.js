
// // linked main tabs with its sub ones
// mainTabs = document.querySelectorAll('.main-tab')
// subTabs = document.querySelectorAll('.sub-tab')
// mainTabs.forEach(p => {
//     p.addEventListener('click', (e) => {
//         mainTabs.forEach(p => p.classList.remove('active-tab'))
//         p.classList.add('active-tab')
//         subTabs.forEach(div => { div.classList.remove('active-sub-tab') })
//         subTabs.forEach(div => {
//             if (div.id == e.target.innerHTML) {
//                 div.classList.add('active-sub-tab')
//             }
//         })
//     })
// });
// //------------------------------------------- Users logic --------------------------------------------


// // fetching users data from the json file and storing it on local storage
// fetch('../Dummy Data/users.json')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     }).then(users => {
//         localStorage.setItem('users', JSON.stringify(users))
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });
// // getting users data from local storage
// const users = JSON.parse(localStorage.getItem('users'));
// // filtring sellers and customers
// let sellers = users.filter(user => user.role == 'seller')
// let customers = users.filter(user => user.role == 'customer')


// //------------------------------------------- Products logic --------------------------------------------


// // function to display product
// function displayProduct(product) {
//     const productsContainer = document.getElementById('products-container');
//     let col = document.createElement('div');
//     col.classList.add('col-12', 'p-2', 'd-flex', 'bg-light', 'rounded-3', 'gap-5', 'flex-wrap', 'mb-3')
//     //Image
//     let productImg = document.createElement('img')
//     productImg.classList.add('product-img')
//     productImg.src = product.image
//     // div for the name and seller
//     let div1 = document.createElement('div');
//     //Name
//     let productName = document.createElement('p');
//     productName.innerText = product.name;
//     productName.classList.add('fs-4', 'mb-0');
//     // Seller
//     let productSeller = document.createElement('p');
//     // productSeller.innerText = 'Seller: ' + sellers.filter(s => s.id == product.sellerId)[0].name
//     productSeller.innerText = 'Seller: ' + sellers.filter(s => s.id == product.seller_id)[0].name
//     // div for Brand, Category, Quantity
//     let div2 = document.createElement('div');
//     // Brand
//     let productBrand = document.createElement('p');
//     productBrand.classList.add('text-secondary');
//     productBrand.innerText = 'Brand:  ' + product.brand;
//     //Category
//     let productCategory = document.createElement('p');
//     productCategory.classList.add('text-secondary');
//     productCategory.innerText = 'Category:  ' + product.category
//     //Quantity
//     let productQuantity = document.createElement('p');
//     productQuantity.classList.add('text-secondary');
//     productQuantity.innerText = 'Quantity:  ' + product.rating
//     // div for the price
//     let div3 = document.createElement('div');
//     div3.classList.add('ms-auto', 'd-flex', 'align-items-center', 'me-2')
//     //Price
//     let productPrice = document.createElement('p');
//     productPrice.classList.add('fs-3')
//     productPrice.innerText = product.price + '$'


//     // appending children
//     productsContainer.appendChild(col);
//     col.appendChild(productImg);
//     col.appendChild(div1);
//     col.appendChild(div2);
//     col.appendChild(div3);
//     div1.appendChild(productName)
//     div1.appendChild(productSeller)
//     div2.appendChild(productBrand)
//     div2.appendChild(productCategory)
//     div2.appendChild(productQuantity)
//     div3.appendChild(productPrice)
// }

// // function to display filters
// function displayFilters(arr, t) {
//     const filters = document.getElementById('filters');
//     let mainDiv = document.createElement('div');
//     mainDiv.classList.add('col-6', 'col-md-12')
//     let title = document.createElement('p');
//     title.classList.add('mt-4', 'fs-5')
//     title.innerText = t;
//     mainDiv.appendChild(title)
//     arr.forEach(element => {
//         let div = document.createElement('div');
//         div.classList.add('form-check');
//         let input = document.createElement('input');
//         input.classList.add('form-check-input');
//         input.type = 'checkbox';
//         input.value = element;
//         input.id = element;
//         let label = document.createElement('label');
//         label.classList.add('form-check-label');
//         label.for = element;
//         label.innerText = element;
//         // appending children
//         mainDiv.appendChild(div);
//         div.appendChild(input);
//         div.appendChild(label);
//     }
//     )
//     filters.appendChild(mainDiv);
// }





// // the 3 cards on top 
// const totalProducts = document.getElementById('total-products');
// const totalCategories = document.getElementById('total-categories');
// const totalBrands = document.getElementById('total-brands');

// // fetching products data from the json file
// fetch('../Dummy Data/products.json')
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     }).then(products => {
//         for (let i = 0; i < products.length; i++) {
//             displayProduct(products[i]);
//         }
//         // filtering categories
//         let categories = []
//         products.map(p => categories.push(p.category))
//         categories = [...new Set(categories)] // to remove duplicated categories
//         // filtering brands
//         let brands = []
//         products.map(p => brands.push(p.brand))
//         brands = [...new Set(brands)] // to remove duplicated brands
//         displayFilters(brands, 'Brands');
//         displayFilters(categories, 'Categories')
//         // setting span of the 3 cards on top
//         totalProducts.innerText = products.length;
//         totalCategories.innerHTML = categories.length
//         totalBrands.innerText = brands.length
//     })
//     .catch(error => {
//         console.error('There was a problem with fetching products:', error);
//     });




// ==============================
// Navigation Tabs Logic
// ==============================

// Select all main tabs and their corresponding sub sections
mainTabs = document.querySelectorAll('.main-tab')
subTabs = document.querySelectorAll('.sub-tab')

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
fetch('../Dummy Data/users.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(users => {
        localStorage.setItem('users', JSON.stringify(users))
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Retrieve users from localStorage
const users = JSON.parse(localStorage.getItem('users'));

// Separate users based on role
let sellers = users.filter(user => user.role == 'seller')
let customers = users.filter(user => user.role == 'customer')



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
        'col-12', 'p-2', 'd-flex',
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
    productQuantity.innerText = 'Quantity:  ' + product.rating

    // ----------------- Price Section -----------------
    let div3 = document.createElement('div');
    div3.classList.add('ms-auto', 'd-flex', 'align-items-center', 'me-2')

    let productPrice = document.createElement('p');
    productPrice.classList.add('fs-3')
    productPrice.innerText = product.price + '$'

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
}



// ======================================================
// Dynamic Filters Rendering
// ======================================================

// This function creates a group of checkboxes
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
        input.id = element;

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
    });
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
    });
}


filtering();
FilterByPrice();
