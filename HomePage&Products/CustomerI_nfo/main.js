
const currentUser = JSON.parse(localStorage.getItem("currentUser"));


// if (!currentUser) {
//     window.location.href = "../../login/login.html";
// } else {
//     document.getElementById("adminName").textContent = currentUser.firstName;
// }

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../home.html";
}

