//====================== Login Function ===================
document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", async () => {

        const confirmed = await showConfirmModal(
            "Are you sure you want to log out?",
            "Confirm Logout"
        );

        if (!confirmed) return;

        localStorage.removeItem("currentUser");
        sessionStorage.clear();
        window.location.href = "../login/login.html";
    });

});
//======================  Handel Edit  Password   =============+===================
document.addEventListener("DOMContentLoaded", () => {


    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const showPasswordFormBtn = document.getElementById("showPasswordFormBtn");
    const passwordFormContainer = document.getElementById("passwordFormContainer");
    const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
    const passwordForm = document.getElementById("passwordForm");

    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordMessage = document.getElementById("passwordMessage");

    showPasswordFormBtn.addEventListener("click", () => {

        if (!currentUser) return;

        passwordFormContainer.classList.remove("d-none");
    });

    cancelPasswordBtn.addEventListener("click", () => {
        console.log(" cancelPasswordBtn Password script ");
        passwordForm.reset();
        passwordFormContainer.classList.add("d-none");
        passwordMessage.innerHTML = "";
    });

    passwordForm.addEventListener("submit", (e) => {
        console.log(" Save BTN Password script ");

        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Validation on Current Password (Old Password)
        if (currentPasswordInput.value !== currentUser.password) {
            passwordMessage.innerHTML =
                "<span class='text-danger'>Current password is incorrect.</span>";
            return;
        }


        // Validation on Length of Password (must be > 6 letter )
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (!passwordPattern.test(newPasswordInput.value)) {
            passwordMessage.innerHTML =
                "<span class='text-danger'>Password must be at least 6 characters and contain letters and numbers.</span>";
            return;
        }

        // validation on Password (must be matched)
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            passwordMessage.innerHTML =
                "<span class='text-danger'>Passwords do not match.</span>";
            return;
        }

        const userIndex = users.findIndex(user => user.email === currentUser.email);

        if (userIndex !== -1) {

            users[userIndex].password = newPasswordInput.value;
            currentUser.password = newPasswordInput.value;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        passwordMessage.innerHTML =
            "<span class='text-success'>Password updated successfully ✔</span>";

        passwordFormContainer.classList.add("d-none");

        setTimeout(() => {
            passwordMessage.innerHTML = "";
        }, 3000);

        passwordForm.reset();
    });
});