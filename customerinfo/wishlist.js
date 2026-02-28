
const container = document.getElementById('wishlist-container');
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// handel if no item in local storage 
if (wishlist.length === 0) {
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
    wishlist.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('wishlist-card');
        card.style.position = 'relative';

        card.innerHTML = `
            <img src="${product.image}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:10px; display:flex; flex-direction:column; gap:5px;">
                <h4 style="margin:0; font-size:16px;">${product.name}</h4>
                <p style="margin:0; font-size:13px; color:#555;">${product.description || ''}</p>
                <p style="margin:5px 0; font-weight:bold;">${product.price}$</p>
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
        `;

        container.appendChild(card);

        // HANDLE DELETE BUTTON
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            card.remove();

        
            let updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            updatedWishlist = updatedWishlist.filter(item => item.product_id !== product.product_id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

                // after delete all item 
            if (updatedWishlist.length === 0) {
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