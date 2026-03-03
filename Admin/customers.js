'use strict'

// ======================================================
// Customers Logic
// ======================================================

const customersContainer = document.getElementById('customers-container');
let totalCustomers = document.getElementById('total-customers');


// // Function to render one customer card
// function displayCustomer(customer) {
//     // Main row container
//     let col = document.createElement('div');
//     col.classList.add(
//         'col-12', 'p-3', 'd-flex',
//         'bg-light', 'rounded-3',
//         'gap-5', 'flex-wrap', 'mb-3'
//     );

//     // ---------------- Name + Email ----------------
//     let div1 = document.createElement('div');

//     let customerName = document.createElement('p');
//     customerName.classList.add('fs-4', 'mb-0');
//     customerName.innerText = customer.name;

//     let customerEmail = document.createElement('a');
//     customerEmail.classList.add('text-secondary');
//     customerEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${customer.email}`;
//     customerEmail.target = "_blank";
//     customerEmail.innerText = customer.email;
//     customerEmail.style.textDecoration = "none";

//     // ---------------- ID Section ----------------
//     let div3 = document.createElement('div');
//     div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-center');

//     let customerId = document.createElement('p');
//     customerId.classList.add('fs-5');
//     customerId.innerText = "ID: " + customer.id;

//     let deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('btn', 'btn-danger');
//     deleteBtn.innerText = 'Delete'
//     deleteBtn.id = customer.id;
//     // delete logic
//     deleteBtn.addEventListener('click', (e) => {
//         deleteUser(e.target.id);
//         customersContainer.innerHTML = '';
//         customers.forEach(c => displayCustomer(c))
//         location.reload()
//     })


//     // ---------------- Append ----------------
//     customersContainer.appendChild(col);

//     col.appendChild(div1);
//     // col.appendChild(div2);
//     col.appendChild(div3);

//     div1.appendChild(customerName);
//     div1.appendChild(customerEmail);

//     // div2.appendChild(customerRole);

//     div3.appendChild(customerId);
//     div3.appendChild(deleteBtn)
// }

if (customers.length == 0) {
    console.log('empty');
    totalCustomers.innerText = '0'
    const customersEmptyMessage = document.getElementById('customers-empty-message');
    customersEmptyMessage.classList.remove('d-none')
    customersEmptyMessage.innerText = 'No customers found. Try adding some!'
}
else {
    totalCustomers.innerText = customers.length;
    const tbody = document.getElementById('customers-table-body');
    tbody.innerHTML = "";
    customers.forEach(c => {
        tbody.innerHTML += `<tr class="p-3">
            <td><p class="fw-bold">${c.id}</p></td>
            <td>${c.fullName}</td>
            <td class="text-primary fw-bold"><span><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}">${c.email}</a></span> <br>${c.phone}</td>
            <td>${orders.filter(o => o.userId == c.id).length}</td>
            <td>
    <button class="btn btn-sm btn-danger" onclick="deleteItem(${c.id}, 'user')">Delete</button>
</td>
        </tr>`;
    });
}



function displayCustomer(customer) {
    const tbody = document.getElementById('customers-table-body');
    tbody.innerHTML += `<tr class="p-3">
        <td><p class="fw-bold">${customer.id}</p></td>
        <td>${customer.fullName}</td>
        <td class="text-primary fw-bold"><span><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${customer.email}">${customer.email}</a></span> <br>${customer.phone}</td>
        <td>${orders.filter(o => o.userId == customer.id).length}</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="deleteItem(${customer.id}, 'user')">Delete</button>
        </td>
    </tr>`;
}




