//====================== Login Function ===================
document.addEventListener("DOMContentLoaded", () => {

    const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

    confirmLogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        sessionStorage.clear();
        window.location.href = "../login/login.html";
    });

});
//======================  Handel Edit  Password   =============+===================

document.addEventListener("DOMContentLoaded", () => {
    const showPasswordFormBtn = document.getElementById("showPasswordFormBtn");
    const passwordFormContainer = document.getElementById("passwordFormContainer");
    const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
    const passwordForm = document.getElementById("passwordForm");

    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordMessage = document.getElementById("passwordMessage");

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));


    //  handel Update Btn
    showPasswordFormBtn.addEventListener("click", () => {

        if (!currentUser) return;

        currentPasswordInput.value = currentUser.password || "";

        passwordFormContainer.classList.remove("d-none");
    });


    //  handel Cansel Btn
    cancelPasswordBtn.addEventListener("click", () => {
        passwordForm.reset();
        passwordFormContainer.classList.add("d-none");
        passwordMessage.innerHTML = "";
    });

    // keep update in local storage
    passwordForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if (newPasswordInput.value.length < 6) {
            passwordMessage.innerHTML =
                "<span class='text-danger'>Password must be at least 6 characters.</span>";
            return;
        }

        if (newPasswordInput.value !== confirmPasswordInput.value) {
            passwordMessage.innerHTML =
                "<span class='text-danger'>Passwords do not match.</span>";
            return;
        }

        currentUser.password = newPasswordInput.value;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));


        passwordFormContainer.classList.add("d-none");
        textSuccess.classList.remove("d-none");

        setTimeout(() => {
            textSuccess.classList.add("d-none");
        }, 3000);

        passwordForm.reset();

    })

});