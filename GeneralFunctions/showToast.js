function showToast(message, type) {
    const toastEl = document.getElementById("mainToast");
    const toastMsg = document.getElementById("toastMessage");


    if (type === "success") {
        toastEl.className = "toast align-items-center text-white bg-success border-0";
    } else if (type === "error") {
        toastEl.className = "toast align-items-center text-white bg-danger border-0";
    } else if (type === "warning") {
        toastEl.className = "toast align-items-center text-dark bg-warning border-0";
    }

    toastMsg.textContent = message;

    const toast = new bootstrap.Toast(toastEl, {
        delay: 3000,
    });

    toast.show();
}