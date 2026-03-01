/* 
    to use showToast 
    1-put this in the end of the body in the html


    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
                
                <div id="mainToast" class="toast align-items-center text-white border-0" role="alert">
                    <div class="d-flex">
                        <div class="toast-body" id="toastMessage">
                            Message here
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"></button>
                    </div>
                </div>

            </div>


    2- <script src="../GeneralFunctions/showToast.js"></script> use this script at the end with scripts before your script


*/




function showToast(message, type = "success") {
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