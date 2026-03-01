const sidebarItems = document.querySelectorAll('#sidebarMenu button');
const sections = document.querySelectorAll('.content-section');
const breadcrumbTitle = document.getElementById('breadcrumbTitle');
const breadcrumbSubTitle = document.getElementById("breadcrumbSubTitle");
sidebarItems.forEach(item => {
    item.addEventListener('click', function () {

        // active class
        sidebarItems.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // hide all sections
        sections.forEach(section => section.classList.add('d-none'));

        // show selected section
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.remove('d-none');

        //  change breadcrumb
        const newTitle = this.getAttribute('data-title');
        breadcrumbTitle.textContent = newTitle;

        // change breadcrumbSubTitle
        breadcrumbSubTitle.textContent = newTitle;
    });
});


// ======================= Handel Dashboard =======================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//  display data current User in account 
if (currentUser) {

    const fullName = `${currentUser.firstName} ${currentUser.lastName}`.trim();

    currentUser.fullName = fullName;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById("userName").textContent = currentUser.fullName;
    document.getElementById("tableName").textContent = currentUser.fullName;

    document.getElementById("tableEmail").textContent = currentUser.email;
    document.getElementById("tablePhone").textContent = currentUser.phone;
}

//  if user no login => not Allow enter the Page .
if (!currentUser) {
    window.location.href = "../login/login.html";
}

//  Handel Edit Btn 
//  (display data in table by edit)

function loadUserData() {
    document.getElementById("userName").textContent = currentUser.fullName;
    document.getElementById("tableName").textContent = currentUser.fullName;
    document.getElementById("userName2").textContent = currentUser.fullName;

    document.getElementById("tableEmail").textContent = currentUser.email;
    document.getElementById("tablePhone").textContent = currentUser.phone;
}

loadUserData();

const editBtn = document.getElementById("editBtn");
const editFormContainer = document.getElementById("editFormContainer");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Handel Edit Button 
editBtn.addEventListener("click", function () {

    // set current Value in form to edit 
    document.getElementById("editName").value = currentUser.fullName;
    document.getElementById("editEmail").value = currentUser.email;
    document.getElementById("editPhone").value = currentUser.phone;

    editFormContainer.classList.remove("d-none");
});

// Handel Cansel Button 
cancelBtn.addEventListener("click", function () {
    editFormContainer.classList.add("d-none");
});

// Handel Save Button 
saveBtn.addEventListener("click", function () {

    currentUser.fullName = document.getElementById("editName").value;
    currentUser.email = document.getElementById("editEmail").value;
    currentUser.phone = document.getElementById("editPhone").value;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    loadUserData();  //update data

    editFormContainer.classList.add("d-none");
});

//======================  Handel add /Edit  Addresses  ===================

if (!currentUser.addresses) {
    currentUser.addresses = [
        {
            fullAddress: currentUser.address || "",
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            email: currentUser.email,
            country: "",
            postalCode: "",
            phone: "",
            default: true
        }
    ];
}

const addressesContainer = document.getElementById("addressesContainer");
const addressForm = document.getElementById("addressFormContainer");
const addAddressBtn = document.getElementById("addAddressBtn");
const saveAddrBtn = document.getElementById("saveAddrBtn");
const cancelAddrBtn = document.getElementById("cancelAddrBtn");

let editIndex = null;

// ================== Display Defalut Adresses ==================
function renderAddresses() {
    addressesContainer.innerHTML = "";

    currentUser.addresses.forEach((addr, index) => {
        const table = document.createElement("table");
        table.classList.add("Addresses_table");

        table.innerHTML = `
            <tr><th>${addr.fullAddress} ${addr.default ? "(Default Address)" : ""}</th></tr>
            <tr><td>${addr.name}</td></tr>
            <tr><td>${addr.email}</td></tr>
            <tr><td>${addr.fullAddress}</td></tr>
            <tr><td>${addr.country}</td></tr>
            <tr><td>${addr.postalCode}</td></tr>
            <tr><td>${addr.phone}</td></tr>
            <tr>
                <td>
                    <button class="editBtn btn btn-dark btn-sm">Edit</button>
                    ${addr.default ? '' : '<button class="deleteBtn btn btn-danger btn-sm">Delete</button>'}
                </td> 
            </tr>
        `;

        addressesContainer.appendChild(table);

        // Edit Button
        table.querySelector(".editBtn").addEventListener("click", () => {
            editIndex = index;
            showAddressForm(addr);
        });

        // Delete Button Handel
        const deleteBtn = table.querySelector(".deleteBtn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this address?")) {
                    currentUser.addresses.splice(index, 1);
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    renderAddresses();
                }
            });
        }
    });
}

// ================== Display form Adresses ==================
function showAddressForm(addr = null) {
    addressForm.classList.remove("d-none");

    if (addr) {

        document.getElementById("formTitle").textContent = "Edit Address";
        document.getElementById("fullAddress").value = addr.fullAddress;
        document.getElementById("addrName").value = addr.name;
        document.getElementById("addrEmail").value = addr.email;
        document.getElementById("addrCountry").value = addr.country;
        document.getElementById("addrPostalCode").value = addr.postalCode;
        document.getElementById("addrPhone").value = addr.phone;
        document.getElementById("addrDefault").checked = addr.default;
    } else {
        document.getElementById("formTitle").textContent = "Add Address";
        document.getElementById("fullAddress").value = "";
        document.getElementById("addrName").value = "";
        document.getElementById("addrEmail").value = "";
        document.getElementById("addrCountry").value = "";
        document.getElementById("addrPostalCode").value = "";
        document.getElementById("addrPhone").value = "";
        document.getElementById("addrDefault").checked = false;
        editIndex = null;
    }
}

// ==================  Add New Address ==================
addAddressBtn.addEventListener("click", () => {
    showAddressForm();
});

// ==================  Cancel Btn ==================
cancelAddrBtn.addEventListener("click", () => {
    addressForm.classList.add("d-none");
    editIndex = null;
});

// ==================  Save Btn ==================
saveAddrBtn.addEventListener("click", () => {
    const newAddr = {
        fullAddress: document.getElementById("fullAddress").value,
        name: document.getElementById("addrName").value,
        email: document.getElementById("addrEmail").value,
        country: document.getElementById("addrCountry").value,
        postalCode: document.getElementById("addrPostalCode").value,
        phone: document.getElementById("addrPhone").value,
        default: document.getElementById("addrDefault").checked
    };

    if (editIndex !== null) {
        currentUser.addresses[editIndex] = newAddr;
    } else {
        currentUser.addresses.push(newAddr);
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    renderAddresses();
    addressForm.classList.add("d-none");
    editIndex = null;
});
renderAddresses();









const params = new URLSearchParams(window.location.search);
const tab = params.get("tab");

if (tab === "wishlist") {

    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.add("d-none");
    });

    document.getElementById("wishlist").classList.remove("d-none");

    document.querySelectorAll("#sidebarMenu .list-group-item").forEach(btn => {
        btn.classList.remove("active");
    });

    const wishlistBtn = document.querySelector('[data-target="wishlist"]');
    if (wishlistBtn) wishlistBtn.classList.add("active");
}




// ======================= Orders Section =======================

const ordersContainer = document.getElementById("ordersContainer");
const emptyOrdersMessage = document.getElementById("emptyOrdersMessage");

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    let userOrders = orders.filter(e => e.userId == currentUser.id);
    console.log(userOrders);

    ordersContainer.innerHTML = "";

    if (userOrders.length === 0) {
        emptyOrdersMessage.classList.remove("d-none");
        return;
    }

    emptyOrdersMessage.classList.add("d-none");

    userOrders.forEach((order, index) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("card", "mb-4", "shadow-sm");

        orderCard.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <strong>Order #${order.orderId}</strong>
                </div>
                <div>
                    ${getStatusBadge(order.status)}
                </div>
            </div>

            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-4">
                        <p class="mb-1"><strong>Date:</strong></p>
                        <span>${formatDate(order.createdAt)}</span>
                    </div>

                    <div class="col-md-4">
                        <p class="mb-1"><strong>Total:</strong></p>
                        <span>$${order.total}</span>
                    </div>

                    <div class="col-md-4">
                        <p class="mb-1"><strong>Phone:</strong></p>
                        <span>${order.phone ?? ""}</span>
                    </div>
                </div>

                <hr/>

                <h6 class="mb-2">Shipping Address</h6>
                <p class="mb-1">Name : ${order.customerName}</p>
                <p class="mb-1">Address : ${order.address}</p>
                <p class="mb-1">City : ${order.city}</p>

                <hr/>

                <h6 class="mb-3">Items (${order.items.length})</h6>
                <ul class="list-group">
                    ${order.items.map(item => {
            const product = allProducts.find(p => p.product_id === item.productId);

            if (!product) {
                return `
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Product Not Found (ID: ${item.productId})</span>
                                    <span>Qty: ${item.quantity}</span>
                                </li>
                            `;
            }

            return `
                            <li class="list-group-item d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-3">
                                    <img 
                                        src="${product.image}" 
                                        alt="${product.name}" 
                                        width="60" 
                                        height="60"
                                        style="object-fit: contain; border-radius: 8px;"
                                    />
                                    <div>
                                        <div class="fw-semibold">${product.name}</div>
                                        <small class="text-muted">Price: $${product.price}</small>
                                    </div>
                                </div>

                                <div class="text-end">
                                    <div>Qty: ${item.quantity}</div>
                                    <div class="fw-bold">
                                        $${(product.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            `;
        }).join("")}
                </ul>
                <hr/>

            <div class="d-flex justify-content-end mt-3">
                ${getOrderAction(order)}
            </div>
            </div>
        `;

        ordersContainer.appendChild(orderCard);
        const cancelBtn = orderCard.querySelector(".cancel-order-btn");
        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => {
                cancelOrder(order.orderId);
            });
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
}


function getStatusBadge(status) {
    switch (status.toLowerCase()) {
        case "delivered":
            return `<span class="badge bg-success">Delivered</span>`;
        case "pending":
            return `<span class="badge bg-warning text-dark">Pending</span>`;
        case "cancelled":
            return `<span class="badge bg-danger">Cancelled</span>`;
        default:
            return `<span class="badge bg-secondary">${status}</span>`;
    }
}

function getOrderAction(order) {
    const status = order.status.toLowerCase();

    if (status === "cancelled") {
        return `<span class="badge bg-danger">Order Cancelled</span>`;
    }

    if (status === "pending" || status === "processing") {
        return `
            <button 
                class="btn btn-outline-danger btn-sm cancel-order-btn" 
                data-id="${order.orderId}">
                Cancel Order
            </button>
        `;
    }

    if (status === "shipped" || status === "delivered") {
        return `
            <span class="text-muted fw-semibold">
                Cannot cancel (Already ${order.status})
            </span>
        `;
    }

    return "";
}

function cancelOrder(orderId) {
    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];

    const index = allOrders.findIndex(o => o.orderId === orderId);
    if (index === -1) return;

    const order = allOrders[index];
    const status = order.status.toLowerCase();


    if (status === "shipped" || status === "delivered") {
        alert("This order cannot be cancelled because it is already " + order.status);
        return;
    }


    if (status === "cancelled") {
        alert("This order is already cancelled.");
        return;
    }

    const confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    // return the quantity to the stock
    order.items.forEach(item => {
        const product = products.find(p => p.product_id == item.productId);
        console.log(product);

        if (product) {
            product.quantity = Number(product.quantity) + Number(item.quantity);

        }
        console.log(product);
    });

    localStorage.setItem("products", JSON.stringify(products));

    allOrders[index].status = "cancelled";

    localStorage.setItem("orders", JSON.stringify(allOrders));

    renderOrders();

    if (typeof showToast === "function") {
        showToast("Order cancelled and stock restored!", "success");
    }
}

renderOrders();