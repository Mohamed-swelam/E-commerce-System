'use strict';

// let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

const totalOrders = document.getElementById('total-orders');
totalOrders.innerText = orders.length;

console.log(orders);

const ordersTableBody = document.getElementById('orders-table-body');

function displayOrders() {
    ordersTableBody.innerHTML = '';
    orders.forEach((order) => {
        ordersTableBody.innerHTML += `<tr>
            <td class="fw-bold">${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.total}</td>
            <td class="text-capitalize"><span class="badge">${order.status}</span></td>
            <td><button class="btn btn-sm btn-outline-primary"><i class="fa-regular fa-eye"></i></button></td>
        </tr>
        `;
    })
};

displayOrders();

const orderDetailsModal = new bootstrap.Modal(document.getElementById('order-details-modal'));
const orderDetailModalBody = document.getElementById('order-details-modal-body');
// add event listener to view buttons
const viewButtons = document.querySelectorAll('#orders-table-body .btn-outline-primary');
viewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // for now, just log the order details to the console
        orderDetailsModal.show();
        orderDetailModalBody.innerHTML = `
        <p style="font-size: 0.8rem;"><span class="fw-bold">ID:</span> ${orders[index].orderId}<br><span class="fw-bold">Dates:</span> ${(orders[index].createdAt).slice(0, 10)}</p>
            <div class="row p-4">
                <div class="col-12 col-md-6 border border-1 p-3">
                    <h5>Customer Details</h5>
                    <p class="mb-1 text-secondary">${orders[index].customerName}</p>
                    <p class="mb-1 text-secondary">${orders[index].phone}</p>
                </div>
                <div class="col-12 col-md-6 border border-1 p-3">
                    <h5>Shipping Address</h5>
                    <p class="mb-1 text-secondary">${orders[index].address} / ${orders[index].city}</p>
                </div>
                <div class="col-12 border border-1 borer-bottom-0 p-3 mt-4">
                    <div class="row">
                        <div class="col-6">
                            <h5>Orders Items</h5>
                        </div>
                        <div class="col-6 text-end">
                            <h5>Total: $ ${orders[index].total}</h5>
                        </div>
                    </div>
                
                    <div class="card p-3 rounded-4 border-0 table-responsive-md">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${orders[index].items
                .map(item => {
                    const product = products.find(p => p.product_id == item.productId);
                    if (!product) return "";
                    return `<tr class="mb-1 text-secondary">
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${item.quantity}</td>
                <td>${product.price * item.quantity}</td>
                </tr>`;
                })
                .join("")
            }
            </div>

                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        `
    })
});


// change badge color based on status
const badgeElements = document.querySelectorAll('#orders-table-body .badge');
badgeElements.forEach((badge) => {
    const status = badge.innerText.toLowerCase();
    if (status === 'shipped') {
        badge.classList.add('bg-secondary');
    } else if (status === 'delivered') {
        badge.classList.add('bg-success');
    } else if (status === 'cancelled') {
        badge.classList.add('bg-danger');
    } else {
        badge.classList.add('bg-primary');
    }
});






// Chart for orders statues
const ordersStatues = document.getElementById('orders-statues');
new Chart(ordersStatues, {
    type: 'bar',
    data: {
        labels: [...new Set(orders.map(o => (o.status).toLowerCase()))],
        datasets: [{
            label: ' orders in this status',
            data: [...new Set(orders.map(o => o.status))].map(s => orders.filter(o => o.status == s).length),
            borderWidth: 1
        }]
    },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});
