const currentPath = window.location.pathname;

if (currentPath.includes("admin-dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== 'admin') {
        window.location.href = "/HomePage&Products/home.html";
    }
}
