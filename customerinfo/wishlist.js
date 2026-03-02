let products = JSON.parse(localStorage.getItem("products"));

const container = document.getElementById('wishlist-container');
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

if (!loggedUser) {

    showToast("Please login first", "error");

    setTimeout(() => {
        window.location.href = "../../login/login.html";
        return;
    }, 1000)

}

let userWishList = wishlist.filter(e => e.user_id == loggedUser.id);
console.log(userWishList);



// handel if no item in local storage 
if (userWishList.length === 0) {
    container.innerHTML = `
        <div style="
            text-align:center;
            padding:40px;
            font-size:18px;
            color:#777;
        ">
            No products were added to the wishlist page.
                <a href="../HomePage&Products/AllProducts.html">
                    Back to shopping.
                </a>
        </div>
    `;
} else {
    userWishList.forEach(item => {

        let product = getProduct(item.product_id);

        const card = document.createElement('div');
        card.classList.add('wishlist-card');
        card.style.position = 'relative';
        card.style.cursor = "pointer";

        card.innerHTML = `
                            <img src="${product.image}" 
                                style="width:100%; height:200px; object-fit:contain;">

                            <div style="padding:10px; display:flex; flex-direction:column; gap:5px;">
                                <h4 style="margin:0; font-size:16px;" id="product_name">
                                    ${product.name}
                                </h4>

                                <p style="margin:0; font-size:13px; color:#555;" class="prod_desc">
                                    ${product.description || ''}
                                </p>

                                <p style="margin:5px 0;">
                                    ${getPriceUI(product)}
                                </p>
                            </div>

                            <button class="remove-btn" style="
                                position:absolute;
                                top:10px;
                                right:10px;
                                background:#e6776b;
                                color:white;
                                border:none;
                                width:35px;
                                height:35px;
                                border-radius:50%;
                                cursor:pointer;
                            ">x</button>

                            ${getDiscountUI(product)}
                        `;

        card.addEventListener("click", function (e) {
            if (e.target.classList.contains("remove-btn")) return;

            window.location.href = `../product_details/product-details.html?id=${product.product_id}`;
        });

        container.appendChild(card);

        // HANDLE DELETE BUTTON
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            card.remove();


            let updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            updatedWishlist = updatedWishlist.filter(item =>
                !(item.product_id === product.product_id && item.user_id === loggedUser.id)
            );

            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

            const userWishlistAfterDelete = updatedWishlist.filter(
                item => item.user_id === loggedUser.id
            );

            showToast("Product deleted successfully...", "success");

            // after delete all item 
            if (userWishlistAfterDelete.length === 0) {
                container.innerHTML = `
                    <div style="
                        text-align:center;
                        padding:40px;
                        font-size:18px;
                        color:#777;
                    ">
                        No products were added to the wishlist page.
                        <a href="../HomePage&Products/AllProducts.html">
                            Back to shopping.
                        </a>
                    </div>
                `;
            }
        });
    });
}




// handel heart icon 
const hearts = document.querySelectorAll('.heartIcon i');
hearts.forEach(heart => {
    const productId = parseInt(heart.dataset.productId);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.some(item => item.product_id === productId)) {
        heart.classList.remove('fa-regular');
        heart.classList.add('fa-solid', 'text-danger');
    }

    heart.addEventListener('click', (event) => {
        event.stopPropagation();
        const product = prds.find(p => p.product_id === productId);
        addToWishlist(product, heart);
    });
});





//get product details

function getProduct(product_id) {
    return products.find(e => e.product_id == product_id);
}


//check if product has discount or not
function getDiscountUI(product) {
    const hasDiscount =
        product.discount &&
        product.discount > 0 &&
        product.oldPrice &&
        product.oldPrice > product.price;

    if (!hasDiscount) return "";

    return `
        <div style="
            position:absolute;
            top:10px;
            left:10px;
            background:#dc3545;
            color:white;
            width:45px;
            height:45px;
            border-radius:50%;
            display:flex;
            transform: rotate(-35deg);
            align-items:center;
            justify-content:center;
            font-size:12px;
            font-weight:bold;
        ">
            ${product.discount}%
        </div>
    `;
}

//check price with discount or not
function getPriceUI(product) {
    const hasDiscount =
        product.discount &&
        product.discount > 0 &&
        product.oldPrice &&
        product.oldPrice > product.price;

    if (hasDiscount) {
        return `
            <span style="text-decoration:line-through; color:#dc3545; margin-right:6px;">
                ${product.oldPrice}$
            </span>
            <span style="color:#198754; font-weight:bold;">
                ${product.price}$
            </span>
        `;
    }

    return `
        <span style="color:#000; font-weight:bold;">
            ${product.price}$
        </span>
    `;
}