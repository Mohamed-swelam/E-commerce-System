'use strict'

// ======================================================
// Customers Logic
// ======================================================

const customersContainer = document.getElementById('customers-container');
let totalCustomers = document.getElementById('total-customers');


// Function to render one customer card
function displayCustomer(customer) {
    // Main row container
    let col = document.createElement('div');
    col.classList.add(
        'col-12', 'p-3', 'd-flex',
        'bg-light', 'rounded-3',
        'gap-5', 'flex-wrap', 'mb-3'
    );

    // ---------------- Name + Email ----------------
    let div1 = document.createElement('div');

    let customerName = document.createElement('p');
    customerName.classList.add('fs-4', 'mb-0');
    customerName.innerText = customer.name;

    let customerEmail = document.createElement('a');
    customerEmail.classList.add('text-secondary');
    customerEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${customer.email}`;
    customerEmail.target = "_blank";
    customerEmail.innerText = customer.email;
    customerEmail.style.textDecoration = "none";

    // ---------------- ID Section ----------------
    let div3 = document.createElement('div');
    div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-center');

    let customerId = document.createElement('p');
    customerId.classList.add('fs-5');
    customerId.innerText = "ID: " + customer.id;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete'
    deleteBtn.id = customer.id;
    // delete logic
    deleteBtn.addEventListener('click', (e) => {
        deleteUser(e.target.id);
        customersContainer.innerHTML = '';
        customers.forEach(c => displayCustomer(c))
        location.reload()
    })

    totalCustomers.innerText = customers.length;

    // ---------------- Append ----------------
    customersContainer.appendChild(col);

    col.appendChild(div1);
    // col.appendChild(div2);
    col.appendChild(div3);

    div1.appendChild(customerName);
    div1.appendChild(customerEmail);

    // div2.appendChild(customerRole);

    div3.appendChild(customerId);
    div3.appendChild(deleteBtn)
}

if (customers.length == 0) {
    console.log('empty');
    totalCustomers.innerText = '0'
    const customersEmptyMessage = document.getElementById('customers-empty-message');
    customersEmptyMessage.classList.remove('d-none')
    customersEmptyMessage.innerText = 'No customers found. Try adding some!'
}
else {
    customers.forEach(customer => {
        displayCustomer(customer)
    })
}