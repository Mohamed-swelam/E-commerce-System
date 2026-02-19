mainTabs = document.querySelectorAll('.main-tab')
subTabs = document.querySelectorAll('.sub-tab')

mainTabs.forEach(p => {
    p.addEventListener('click', (e) => {
        mainTabs.forEach(p => p.classList.remove('active-tab'))
        p.classList.add('active-tab')
        subTabs.forEach(div => { div.classList.remove('active-sub-tab') })
        subTabs.forEach(div => {
            if (div.id == e.target.innerHTML) {
                div.classList.add('active-sub-tab')
            }
        })
    })
});





//------------------------------------------- Users logic --------------------------------------------


// fetching users data from the json file and storing it on local storage
fetch('../Dummy Data/users.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(users => {
        localStorage.setItem('users', JSON.stringify(users))
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
// getting data from local storage
const users = JSON.parse(localStorage.getItem('users'));
console.log(users);
// filtring sellers and customers
let sellers = users.filter(user => user.role == 'seller')
let customers = users.filter(user => user.role == 'customer')


//------------------------------------------- Products logic --------------------------------------------


// function to display product
function displayProduct(product) {
    const productsContainer = document.getElementById('products-container');
    let col = document.createElement('div');
    col.classList.add('col-12', 'p-2', 'd-flex', 'bg-light', 'rounded-3', 'gap-5', 'flex-wrap', 'mb-3')
    //Image
    let productImg = document.createElement('img')
    productImg.classList.add('product-img')
    productImg.src = product.image
    // div for the name and seller
    let div1 = document.createElement('div');
    //Name
    let productName = document.createElement('p');
    productName.innerText = product.name;
    productName.classList.add('fs-4', 'mb-0');
    // Seller
    let productSeller = document.createElement('p');
    productSeller.innerText = 'Seller: ' + sellers.filter(s => s.id == product.seller_id)[0].name
    // productSeller.innerText = 'Seller: ' + sellers.filter(s => s.id == product.sellerId)[0].name
    // div for Brand, Category, Quantity
    let div2 = document.createElement('div');
    // Brand
    let productBrand = document.createElement('p');
    productBrand.classList.add('text-secondary');
    productBrand.innerText = 'Brand:  ' + product.brand;
    //Category
    let productCategory = document.createElement('p');
    productCategory.classList.add('text-secondary');
    productCategory.innerText = 'Category:  ' + product.category
    //Quantity
    let productQuantity = document.createElement('p');
    productQuantity.classList.add('text-secondary');
    productQuantity.innerText = 'Quantity:  ' + product.rating
    // div for the price
    let div3 = document.createElement('div');
    div3.classList.add('ms-auto', 'd-flex', 'align-items-center', 'me-2')
    //Price
    let productPrice = document.createElement('p');
    productPrice.classList.add('fs-3')
    productPrice.innerText = product.price + '$'


    // appending children
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

// function to display filters
function displayFilters(arr, t) {
    const filters = document.getElementById('filters');
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('col-6', 'col-md-12')
    let title = document.createElement('p');
    title.classList.add('mt-4', 'fs-5')
    title.innerText = t;
    mainDiv.appendChild(title)
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
        // appending children
        mainDiv.appendChild(div);
        div.appendChild(input);
        div.appendChild(label);
    }
    )
    filters.appendChild(mainDiv);
}





// the 3 crads on top 
const totalProducts = document.getElementById('total-products');
const totalCategories = document.getElementById('total-categories');
const totalBrands = document.getElementById('total-brands');

// fetching products data from the json file
fetch('../Dummy Data/products.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(products => {
        for (let i = 0; i < products.length; i++) {
            displayProduct(products[i]);
        }
        // filtering categories
        let categories = []
        products.map(p => categories.push(p.category))
        categories = [...new Set(categories)] // to remove duplicated categories
        // filtering brands
        let brands = []
        products.map(p => brands.push(p.brand))
        brands = [...new Set(brands)] // to remove duplicated brands
        displayFilters(brands, 'Brands');
        displayFilters(categories, 'Categories')
        // setting the 3 cards on top
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




