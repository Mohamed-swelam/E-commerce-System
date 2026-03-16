const currentPath1 = window.location.pathname;

if (currentPath1.includes("admin-dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== 'admin') {
        window.location.href = "/HomePage&Products/home.html";
    }
}
