'use strict'

const addProductModal = document.getElementById('add-product-modal')
const modalInstance = new bootstrap.Modal(addProductModal);

// Get the form element
const addProductForm = document.getElementById('add-product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput = document.getElementById('product-quantity');
const productDescriptionInput = document.getElementById('product-description');
const categoriesSelect = document.getElementById('product-category');
const brandsSelect = document.getElementById('product-brand');
const productDiscount = document.getElementById('product-discount');
const productDiscountValue = document.getElementById('product-discount-value')
const image_path = document.getElementById('image-path');


// Get unique categories and brands from the products in localStorage
// const products = JSON.parse(localStorage.getItem('products'));
// console.log(products);
const categories = [...new Set(products.map(product => product.category))];
const brands = [...new Set(products.map(product => product.brand))];


// for dynamic display of categories and brands in the select options
for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoriesSelect.appendChild(option);
}
for (const brand of brands) {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandsSelect.appendChild(option);
}


// Event listener for the discount checkbox to enable/disable the discount value input
productDiscount.addEventListener('change', () => {
    if (productDiscount.checked) {
        productDiscountValue.disabled = false;
    } else {
        productDiscountValue.disabled = true;
        productDiscountValue.value = 0;
    }
})


addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    let inputs = []
    for (let i = 0; i < 6; i++) {
        const input = e.target.elements[i];
        inputs.push(input);
    }
    const allValid = inputs.every(input => input.classList.contains('is-valid'));
    if (allValid) {
        const newProduct = {
            product_id: products.length + 1,
            name: productNameInput.value.trim(),
            price: productDiscountValue.value ? Math.floor(parseFloat(productPriceInput.value) * (1 - parseFloat(productDiscountValue.value) / 100)) : parseFloat(productPriceInput.value),
            oldPrice: parseFloat(productPriceInput.value),
            quantity: parseInt(productQuantityInput.value),
            description: productDescriptionInput.value.trim(),
            category: categoriesSelect.value,
            brand: brandsSelect.value,
            discount: productDiscount.checked ? parseFloat(productDiscountValue.value) : 0,
            dailySale: true,
            monthSale: false,
            reviews: [],
            seller_id: 1
        }
        if (image_path.value.trim() === '') {
            newProduct.image = 'https://t4.ftcdn.net/jpg/03/13/59/81/360_F_313598127_M2n9aSAYVsfYuSSVytPuYpLAwSEp5lxH.jpg';
        } else {
            newProduct.image = image_path.value.trim();
        }
        products.push(newProduct);
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(products));
        console.log('Form is valid, ready to submit');
        addProductFormReset();
        addProductForm.reset();
        modalInstance.hide();
        displayProduct(newProduct);
        showToast('Product added successfully', 'success');
        setInterval(() => {
            location.reload();
        }, 2000);
    } else {
        console.log('Form is invalid, please correct the errors');
    }
});

function validateName() {
    const name = productNameInput.value.trim();
    if (name === '' || name.length < 3) {
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        return false;
    } else {
        productNameInput.classList.remove('is-invalid');
        productNameInput.classList.add('is-valid');
        return true;
    }
}

function validatePrice() {
    const price = parseFloat(productPriceInput.value);
    if (isNaN(price) || price <= 0) {
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        return false;
    } else {
        productPriceInput.classList.remove('is-invalid');
        productPriceInput.classList.add('is-valid');
        return true;
    }
}

function validateQuantity() {
    const quantity = parseInt(productQuantityInput.value);
    if (isNaN(quantity) || quantity < 0) {
        productQuantityInput.classList.add('is-invalid');
        productQuantityInput.classList.remove('is-valid');
        return false;
    } else {
        productQuantityInput.classList.remove('is-invalid');
        productQuantityInput.classList.add('is-valid');
        return true;
    }
}

function validateDescription() {
    const description = productDescriptionInput.value.trim();
    if (description === '' || description.length < 10) {
        productDescriptionInput.classList.add('is-invalid');
        productDescriptionInput.classList.remove('is-valid');
        return false;
    } else {
        productDescriptionInput.classList.remove('is-invalid');
        productDescriptionInput.classList.add('is-valid');
        return true;
    }
}

function validateCategory() {
    if (categoriesSelect.value === '') {
        categoriesSelect.classList.add('is-invalid');
        categoriesSelect.classList.remove('is-valid');
        return false;
    } else {
        categoriesSelect.classList.remove('is-invalid');
        categoriesSelect.classList.add('is-valid');
        return true;
    }
}

function validateBrand() {
    if (brandsSelect.value === '') {
        brandsSelect.classList.add('is-invalid');
        brandsSelect.classList.remove('is-valid');
        return false;
    } else {
        brandsSelect.classList.remove('is-invalid');
        brandsSelect.classList.add('is-valid');
        return true;
    }
}

function validateDiscount() {
    if (productDiscount.checked && productDiscountValue.value === '') {
        productDiscountValue.classList.add('is-invalid');
        productDiscountValue.classList.remove('is-valid');
        return false;
    } else {
        productDiscountValue.classList.remove('is-invalid');
        productDiscountValue.classList.add('is-valid');
        return true;
    }
}

productNameInput.addEventListener('input', validateName);
productPriceInput.addEventListener('input', validatePrice);
productQuantityInput.addEventListener('input', validateQuantity);
productDescriptionInput.addEventListener('input', validateDescription);
categoriesSelect.addEventListener('change', validateCategory);
brandsSelect.addEventListener('change', validateBrand);
productDiscountValue.addEventListener('input', validateDiscount);


function addProductFormReset() {
    productNameInput.classList.remove('is-valid', 'is-invalid');
    productPriceInput.classList.remove('is-valid', 'is-invalid');
    productQuantityInput.classList.remove('is-valid', 'is-invalid');
    productDescriptionInput.classList.remove('is-valid', 'is-invalid');
    categoriesSelect.classList.remove('is-valid', 'is-invalid');
    brandsSelect.classList.remove('is-valid', 'is-invalid');
    productDiscountValue.classList.remove('is-valid', 'is-invalid');
    productDiscount.checked = false;
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
    productDescriptionInput.value = '';
    categoriesSelect.value = '';
    brandsSelect.value = '';
    productDiscountValue.value = '';
}