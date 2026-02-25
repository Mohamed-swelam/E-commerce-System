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

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!userProfile || !loginLink) return;

    if (currentUser) {
        userProfile.style.display = "block";
        loginLink.style.display = "none";

        if (currentUser.role === "admin") {
            adminDashboard?.classList.remove("d-none");
            sellerDashboard?.classList.add("d-none");
        } else if (currentUser.role === "seller") {
            sellerDashboard?.classList.remove("d-none");
            adminDashboard?.classList.add("d-none");
        }
    } else {
        userProfile.style.display = "none";
        loginLink.style.display = "block";
    }
}


loadComponent("navbar", "../Components/navbar.html", () => {
    handleNavbarAuth();
});
loadComponent("footer", "../components/footer.html");