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
    document.getElementById("userName2").textContent=currentUser.fullName ; 

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