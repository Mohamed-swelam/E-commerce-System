// async function loadComponent(id, file, callback) {
//     const res = await fetch(file);
//     const html = await res.text();
//     document.getElementById(id).innerHTML = html;


//     if (callback) callback();
// }

async function loadComponent(id, file, callback) {
    const element = document.getElementById(id);
    if (!element) return;
    const res = await fetch(file);
    const html = await res.text();
    element.innerHTML = html;
    if (callback) callback();
}




function ensureGlobalModal() {
    if (document.getElementById("appConfirmModal")) return;

    const modalHTML = `
    <div class="modal fade" id="appConfirmModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <div class="modal-header">
                    <h5 class="modal-title" id="appModalTitle">Confirm Action</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body" id="appModalMessage">
                    Are you sure?
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button class="btn btn-danger" id="appModalConfirm">
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function showConfirmModal(message, title = "Confirm") {
    return new Promise((resolve) => {
        const modalEl = document.getElementById("appConfirmModal")
            || document.getElementById("navbarConfirmModal");

        const titleEl = document.getElementById("appModalTitle")
            || modalEl?.querySelector(".modal-title");

        const msgEl = document.getElementById("appModalMessage")
            || modalEl?.querySelector(".modal-body");

        const confirmBtn = document.getElementById("appModalConfirm")
            || document.getElementById("navbarConfirmLogout");

        if (!modalEl || !confirmBtn) {
            resolve(confirm(message));
            return;
        }

        titleEl.textContent = title;
        msgEl.textContent = message;

        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        const cancelBtn = modalEl.querySelector(".btn-secondary, .btn-close");

        confirmBtn.onclick = () => {
            modal.hide();
            resolve(true);
        };

        cancelBtn.onclick = () => {
            modal.hide();
            resolve(false);
        };
    });
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
    let cartItemsNumber = document.getElementById("cart-items-number");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let wellcome = document.getElementById('wellcome')
    let carts = JSON.parse(localStorage.getItem('carts'));
    if (!userProfile || !loginLink) return;

    if (currentUser) {
        // userProfile.style.display = "block";
        loginLink.style.display = "none";
        wellcome.classList.remove('d-none');
        wellcome.innerHTML = `Wellcome <span class="text-danger"> ${currentUser.firstName}</span>`
        logoutBtn?.classList.remove("d-none");
        let currentUserCart = carts.filter(c => c.userId == currentUser.id)[0]
        let count = 0;
        currentUserCart.items.forEach(i => {
            count += i.quantity;
        });
        cartItemsNumber.innerHTML = count
        if (currentUser.role === "admin" || currentUser.role === "seller") {

            userProfile && (userProfile.style.display = "block");
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
            // wellcome.classList.add('d-none')
            userProfile && (userProfile.style.display = "block");
            cartIcon && (cartIcon.style.display = "block");
            wishlistIcon && (wishlistIcon.style.display = "block");
            contactLink?.classList.add("d-block");

            adminDashboard?.classList.add("d-none");
            sellerDashboard?.classList.add("d-none");
            logoutBtn?.classList.add("d-none");
        }

        logoutBtn?.addEventListener("click", async () => {
            const confirmed = await showConfirmModal(
                "Are you sure you want to logout?",
                "Confirm Logout"
            );

            if (!confirmed) return;

            localStorage.removeItem("currentUser");
            sessionStorage.clear();
            window.location.href = "../login/login.html";
        });

    }

    else {
        loginLink.style.display = "block";
        logoutBtn?.classList.add("d-none");

        userProfile && (userProfile.style.display = "none");
        cartIcon && (cartIcon.style.display = "none");
        wishlistIcon && (wishlistIcon.style.display = "none");
        contactLink?.classList.add("d-none");
        adminDashboard?.classList.add("d-none");
        sellerDashboard?.classList.add("d-none");
    }
}


loadComponent("navbar", "../Components/navbar.html", () => {
    ensureGlobalModal();
    handleNavbarAuth();
});
loadComponent("footer", "../components/footer.html");

// window.addEventListener("load", () => {

//     loadComponent("navbar", "../Components/navbar.html", () => {
//         ensureGlobalModal();
//         handleNavbarAuth();
//     });

//     loadComponent("footer", "../Components/footer.html");

// });