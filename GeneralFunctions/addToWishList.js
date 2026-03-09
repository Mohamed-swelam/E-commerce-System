function addToWishlist(product, heartIcon) {
    let loggeduser = JSON.parse(localStorage.getItem("currentUser"));
    if (!loggeduser) {

        showToast("Please login first to add to wish list", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 1000)
        return;
    }


    if (loggeduser.role === "admin" || loggeduser.role === "seller") {
        showToast("Only customers can add to wish list", "error");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const existsIndex = wishlist.findIndex(item =>
        item.product_id === product.product_id &&
        item.user_id === loggeduser.id
    );

    if (existsIndex === -1) {
        wishlist.push({
            user_id: loggeduser.id,
            product_id: product.product_id
        });
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid', 'text-danger');
        showToast("Product added to wishlist successfully...", "success");
    } else {
        wishlist.splice(existsIndex, 1);
        heartIcon.classList.remove('fa-solid', 'text-danger');
        heartIcon.classList.add('fa-regular');
        showToast("Product deleted from wishlist successfully...", "success");
    }


    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};