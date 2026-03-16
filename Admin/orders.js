'use strict';

// let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

const totalOrders = document.getElementById('total-orders');
totalOrders.innerText = orders.length;


const ordersTableBody = document.getElementById('orders-table-body');

function displayOrders(data = orders) {
    ordersTableBody.innerHTML = '';

    data.forEach((order) => {
        ordersTableBody.innerHTML += `<tr>
            <td class="fw-bold">${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.total}$</td>
            <td class="text-capitalize"><span class="badge">${order.status}</span></td>
            <td><button class="btn btn-sm btn-outline-primary"><i class="fa-regular fa-eye"></i></button></td>
        </tr>`;
    });
}

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
                                ${orders[index].items.map(item => {
            const product = products.find(p => p.product_id == item.productId);
            if (!product) return "";
            return `<tr class="mb-1 text-secondary">
                                            <td>${product.name}</td>
                                            <td>${product.price}</td>
                                            <td>${item.quantity}</td>
                                            <td>${product.price * item.quantity}</td>
                                            </tr>`;
        }).join("")}
                                    </tbody>
                                    </table>
                    </div>
                </div>
                <div class="col-12 text-center mt-4 st-col select-status-container">
                    <select class="form-select form-select-sm w-auto mx-auto mb-3" aria-label=".form-select-sm example" id="order-status-select">
                        <option value="pending" ${orders[index].status == "pending" ? "selected" : ""}>Pending</option>
                        <option value="processing" ${orders[index].status == "processing" ? "selected" : ""}>Processing</option>
                        <option value="shipped" ${orders[index].status == "shipped" ? "selected" : ""}>Shipped</option>
                        <option value="delivered" ${orders[index].status == "delivered" ? "selected" : ""}>Delivered</option>
                        <option hidden value="cancelled" ${orders[index].status == "cancelled" ? "selected" : ""}>Cancelled</option>
                    </select>
                    <button class="btn btn-sm btn-outline-primary" onclick="updateOrderStatus(${orders[index].orderId}, this.previousElementSibling.value)">Change Status</button>
                </div>
            </div>
        `
        const statusSelectContainer = document.querySelector('.select-status-container');
        const statusSelect = document.getElementById('order-status-select');
        if (statusSelect.value == "cancelled") {
            statusSelectContainer.classList.add('d-none');
        } else {
            statusSelectContainer.classList.remove('d-none');
        }
    })

});

function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(o => o.orderId == orderId);
    if (orderIndex !== -1) {
        orderDetailsModal.hide();
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders();
        showToast(`Order status updated to ${newStatus}`, "success");
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}


// change badge color based on status
const badgeElements = document.querySelectorAll('#orders-table-body .badge');
badgeElements.forEach((badge) => {
    const status = badge.innerText.toLowerCase();
    if (status === 'shipped') {
        badge.classList.add('bg-secondary');
    } else if (status === 'processing') {
        badge.classList.add('bg-warning');
    }
    else if (status === 'delivered') {
        badge.classList.add('bg-success');
    } else if (status === 'cancelled') {
        const stcol = document.querySelectorAll('.st-col');
        stcol.forEach(col => {
            col.style.display = 'none';
        });
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
    }
});



// ----------------------------- search  in orders ----------------------
const ordersSearch = document.getElementById('orders-search');
ordersSearch.addEventListener('input', (e) => {
    const searchInput = e.target.value;

    const filteredOrders = orders.filter(order =>
        order.orderId.toString().includes(searchInput)
    );

    displayOrders(filteredOrders);
});