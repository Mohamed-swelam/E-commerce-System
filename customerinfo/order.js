fetch('./orders.json')
    .then(res => res.json())
    .then(orders => {
        displayOrdersByUser(orders);
    })
    .catch(err => console.error(err));

function displayOrdersByUser(orders) {
    const container = document.getElementById('orders-container');
    container.innerHTML = '';  

    const usersMap = {};

    orders.forEach(order => {
        if (!usersMap[order.userId]) {
            usersMap[order.userId] = {
                customerName: order.customerName,
                orders: []
            };
        }
        usersMap[order.userId].orders.push(order);
    });

    for (const userId in usersMap) {
        const user = usersMap[userId];

        const userDiv = document.createElement('div');
        userDiv.style.border = '1px solid #ccc';
        userDiv.style.borderRadius = '8px';
        userDiv.style.padding = '15px';
        userDiv.style.marginBottom = '20px';
        userDiv.style.backgroundColor = '#f9f9f9';

        const userHeader = document.createElement('h3');
        userHeader.textContent = `User: ${user.customerName} (ID: ${userId})`;
        userHeader.style.marginBottom = '10px';
        userDiv.appendChild(userHeader);

        user.orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.style.border = '1px solid #ddd';
            orderDiv.style.borderRadius = '6px';
            orderDiv.style.padding = '10px';
            orderDiv.style.marginBottom = '10px';
            orderDiv.style.backgroundColor = '#fff';

            orderDiv.innerHTML = `
                <p><strong>Order ID:</strong> ${order.orderId}</p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>City:</strong> ${order.city}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Total:</strong> $${order.total}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <div>
                    <strong>Items:</strong>
                    <ul>
                        ${order.items.map(item => `<li>Product ID: ${item.productId}, Quantity: ${item.quantity}</li>`).join('')}
                    </ul>
                </div>
            `;

            userDiv.appendChild(orderDiv);
        });

        container.appendChild(userDiv);
    }
}