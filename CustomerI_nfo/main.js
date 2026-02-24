
const currentUser = JSON.parse(localStorage.getItem("currentUser"));


 if (!currentUser || currentUser.role !== "admin") {
            window.location.href = "../login.html";
        } else { 
            document.getElementById("adminName").textContent = currentUser.firstName;
        }

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../login.html";
}

