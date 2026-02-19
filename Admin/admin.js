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


const totalProducts = document.getElementById('total-products');
const productsContainer = document.getElementById('products-container');

//------------------------------------------- Products logic --------------------------------------------


// function to display product

function displayProduct(product) {
    let col = document.createElement('div');
    col.classList.add('col-12', 'p-2', 'd-flex', 'bg-light', 'rounded-3', 'gap-5', 'flex-wrap', 'mb-3')

    let productImg = document.createElement('img')
    productImg.classList.add('product-img')
    productImg.src = product.image

    let div1 = document.createElement('div'); // div for the name and seller

    let productName = document.createElement('p');
    productName.innerText = product.name;
    productName.classList.add('fs-4', 'mb-0');

    let productSeller = document.createElement('p');
    productSeller.innerText = 'Seller: ' + product.seller_id


    let div2 = document.createElement('div'); // div for Brand, Category, Quantity

    let productBrand = document.createElement('p');
    productBrand.classList.add('text-secondary');
    productBrand.innerText = 'Brand:  ' + product.brand;

    let productCategory = document.createElement('p');
    productCategory.classList.add('text-secondary');
    productCategory.innerText = 'Category:  ' + product.category

    let productQuantity = document.createElement('p');
    productQuantity.classList.add('text-secondary');
    productQuantity.innerText = 'Quantity:  ' + product.rating

    let div3 = document.createElement('div'); // div for the price
    div3.classList.add('ms-auto', 'd-flex', 'align-items-center', 'me-2')

    let productPrice = document.createElement('p');
    productPrice.classList.add('fs-3')
    productPrice.innerText = product.price


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

// fetching products data from the json file
fetch('../Dummy Data/products.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(products => {
        totalProducts.innerText = products.length;
        // working with products
        for (let i = 0; i < products.length; i++) {
            displayProduct(products[i]);
        }
        // console.log(products);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

//getting the products from the local storage
// const products = JSON.parse(localStorage.getItem('products'));




// fetching users data from the json file
fetch('../Dummy Data/users.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(users => {
        // working with users
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });






