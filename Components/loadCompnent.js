async function loadComponent(id, file, callback) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;


    if (callback) callback();
}

function handleNavbarAuth() {
    const userProfile = document.getElementById("profile");
    const loginLink = document.getElementById("login-link");
    const adminDashboard = document.getElementById("admin-dashboard");
    const sellerDashboard = document.getElementById("seller-dashboard");
    const cartIcon = document.getElementById("cart-icon");
    const wishlistIcon = document.getElementById("wishlist-icon");
    const logoutBtn = document.getElementById("logout-btn");
    const contactLink = document.getElementById("contact-link");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!userProfile || !loginLink) return;

    if (currentUser) {
        // userProfile.style.display = "block";
        loginLink.style.display = "none";
        logoutBtn?.classList.remove("d-none");

        if (currentUser.role === "admin" || currentUser.role === "seller") {

            userProfile && (userProfile.style.display = "none");
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

        adminDashboard?.classList.add("d-none");
        sellerDashboard?.classList.add("d-none");
    }
}


loadComponent("navbar", "../Components/navbar.html", () => {
    handleNavbarAuth();
});
loadComponent("footer", "../components/footer.html");