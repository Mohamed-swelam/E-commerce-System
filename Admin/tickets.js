'use strict';

let allTickets = localStorage.getItem('tickets') ? JSON.parse(localStorage.getItem('tickets')) : [];

function displayTickets() {
    const ticketsContainer = document.getElementById('tickets-container');
    ticketsContainer.innerHTML = '';
    allTickets.forEach((ticket) => {
        ticketsContainer.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                    <h5 class="card-title">${ticket.subject}</h5>
                    <p class="badge ticket-badge">${ticket.status}</p>
                    </div>
                    <p class="card-text">${ticket.message}</p>
                </div>
                <div class="text-center reply-btn d-none" id="t${ticket.id}">
                    <button class="btn btn-sm btn-outline-primary m-3">Reply</button>
                </div>
                <div class="text-center view-reply-btn d-none">
                    <button class="btn btn-sm btn-outline-primary m-3">View Reply</button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">From: ${ticket.email}</small>
                    <small class="text-muted float-end">${(ticket.createdAt).slice(0, 10)}</small>
                </div>
            </div>
        </div>
        `;
    })
}

displayTickets();


const ticketBadge = document.querySelectorAll('.ticket-badge');
ticketBadge.forEach((badge) => {
    const status = badge.innerText.toLowerCase();
    if (status === 'pending') {
        badge.classList.add('bg-warning');
    } else if (status === 'replied') {
        badge.classList.add('bg-info');
    } else if (status === 'resolved') {
        badge.classList.add('bg-success');
    } else {
        badge.classList.add('bg-secondary');
    }
});


allTickets.forEach(ticket => {
    if (ticket.status.toLowerCase() === 'pending') {
        const replyBtn = document.getElementById(`t${ticket.id}`);
        if (replyBtn) {
            replyBtn.classList.remove('d-none');
        }
    }
})




const tickets = document.getElementById('tickets-status');
new Chart(tickets, {
    type: 'bar',
    data: {
        labels: [...new Set(allTickets.map(p => p.status))],
        datasets: [{
            label: ' tickets in this status',
            data: [...new Set(allTickets.map(p => p.status))].map(s => allTickets.filter(p => p.status == s).length),
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