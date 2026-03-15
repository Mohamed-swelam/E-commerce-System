'use strict';

let allTickets = localStorage.getItem('tickets') ? JSON.parse(localStorage.getItem('tickets')) : [];
const tickectsModal = new bootstrap.Modal(document.getElementById('reply-modal'));
const replyModalElement = document.getElementById('reply-modal');



// ---------------- Display Tickets ----------------
function displayTickets(data = allTickets) {
    const ticketsContainer = document.getElementById('tickets-container');
    ticketsContainer.innerHTML = '';
    data.forEach((ticket) => {
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
                <div class="text-center d-none" id="t${ticket.id}">
                    <button class="btn btn-sm btn-outline-primary m-3 reply-btn" id="tt${ticket.id}">Reply</button>
                </div>
                <div class="text-center d-none" id="v${ticket.id}">
                    <button class="btn btn-sm btn-outline-primary m-3 view-reply-btn" id="v22${ticket.id}">View Reply</button>
                </div>
                <div class="text-center pb-3 d-none border border-bottom-1" id="v2${ticket.id}">
                    <i class="fa-regular fa-eye view-reply-icon text-primary" style="cursor: pointer;" id="vv2${ticket.id}"></i>
                </div>
                <div class="card-footer">
                    <small class="text-muted">From: ${ticket.email}</small>
                    <small class="text-muted float-end">${(ticket.createdAt).slice(0, 10)}, id: ${ticket.id}</small>
                </div>
            </div>
        </div>
        `;
    })
}

displayTickets();


// ---------------- Ticket Status Badges ----------------
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


// Show/hide buttons based on ticket status
allTickets.forEach(ticket => {
    if (ticket.status.toLowerCase() === 'pending') {
        const replyBtn = document.getElementById(`t${ticket.id}`);
        if (replyBtn) {
            replyBtn.classList.remove('d-none');
        }
    }
    else if (ticket.status.toLowerCase() === 'replied') {
        const viewReplyBtn = document.getElementById(`v${ticket.id}`);
        if (viewReplyBtn) {
            viewReplyBtn.classList.remove('d-none');
        }
    }
    else {
        const viewReplyIcon = document.getElementById(`v2${ticket.id}`);
        if (viewReplyIcon) {
            viewReplyIcon.classList.remove('d-none');
        }
    }
})


// ---------------- Reply to Ticket ----------------
let ticket;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('reply-btn')) {
        const ticketId = e.target.id.slice(2, e.target.id.length); // delete 'tt' from id
        ticket = (allTickets.find(t => t.id == ticketId));
        tickectsModal.show();
        replyModalElement.querySelector('.modal-content').innerHTML = `
                        <div class="modal-content" id="r${ticket.id}">
                            <div class="modal-header">
                                <h5 class="modal-title">Reply to Ticket</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="reply-modal-body">
                                <div class="mb-3">
                                    <p class="text-secondary mb-1"><span class="fw-bold">From:</span> ${ticket.email}</p>
                                    <label for="reply-message" class="form-label" >Reply Message</label>
                                    <textarea class="form-control" id="reply-message" rows="3"></textarea>
                                </div>
                            <div class="mb-3">
                                <label for="ticket-status-select" class="form-label">Ticket Status</label>
                                <select name="ticket-status" id="ticket-status-select" class="form-select">
                                    <option value="pending" selected>Pending</option>
                                    <option value="replied">Replied</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary save-ticket-reply-btn">Save
                                    reply</button>
                            </div>
                        </div>
                    `;
    }

    if (e.target.classList.contains('save-ticket-reply-btn')) {
        const replyMessage = document.getElementById('reply-message').value;
        const ticketStatus = document.getElementById('ticket-status-select').value;
        const errorMessage = validateReplyMessage(replyMessage) || validateTicketStatus(ticketStatus);
        if (errorMessage) {
            showToast(errorMessage, 'error');
            return;
        } else {
            if (ticket) {
                ticket.reply = replyMessage;
                ticket.status = ticketStatus;
                localStorage.removeItem('tickets');
                localStorage.setItem('tickets', JSON.stringify(allTickets));
                tickectsModal.hide();
                showToast('Ticket replied successfully', 'success');
                setTimeout(() => { location.reload() }, 2000);
                displayTickets();
            }
        }
    }

    if (e.target.classList.contains('view-reply-btn') || e.target.classList.contains('view-reply-icon')) {
        const ticketId = e.target.id.slice(3, e.target.id.length);
        const ticket = allTickets.find(t => t.id == ticketId);
        tickectsModal.show();
        replyModalElement.querySelector('.modal-content').innerHTML = `
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">View Ticket Reply</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p class="text-secondary mb-1"><span class="fw-bold">From:</span> ${ticket.email}</p>
                                <p class="text-secondary mb-1"><span class="fw-bold">Subject:</span> ${ticket.subject}</p>
                                <p class="text-secondary mb-1"><span class="fw-bold">Message:</span> ${ticket.message}</p>
                                <hr>
                                <p><span class="fw-bold">Reply:</span></p>
                                <textarea class="form-control" rows=4 disabled>${ticket.reply ? ticket.reply : 'No reply yet.'}
                                </textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary ${ticket.status?.trim().toLowerCase() === 'replied' ? 'd-block' : 'd-none'} edit-reply-btn" >Edit</button>
                                <button type="button" class="btn btn-info text-light d-none" id="save-reply" >Save Reply</button>
                            </div>
                        </div>
                    `;

        const editeReolyBtn = document.querySelector('.edit-reply-btn')
        editeReolyBtn.addEventListener('click', () => {
            const saveReply = document.getElementById('save-reply');
            saveReply.classList.remove('d-none');
            editeReolyBtn.classList.remove('d-block')
            editeReolyBtn.classList.add('d-none')
            const textArea = replyModalElement.children[0].children[0].children[0].children[1].children[5];
            textArea.disabled = false;
            textArea.addEventListener('input', (e) => {
                ticket.reply = textArea.value = e.srcElement.value;
                console.log(ticket.reply);
            })
            saveReply.onclick = () => {
                ticket.status = 'resolved'
                localStorage.removeItem('tickets');
                localStorage.setItem('tickets', JSON.stringify(allTickets))
                tickectsModal.hide()
                showToast("Reply is updated successfuly and ticket status is 'Resolved' now", 'success')
                setTimeout(() => {
                    location.reload()
                }, 3000)
            }
            // textArea.innerHTML = ''
        })
    }
});


// validation for reply message and status
function validateReplyMessage(message) {
    if (message.trim() === '' || (message.length == 0)) {
        return 'Reply message cannot be empty.';
    }
}

function validateTicketStatus(status) {
    if (status == 'pending') {
        return 'Please change the ticket status to either "Replied" or "Resolved".';
    }
}



// chart to display the number of tickets in each status
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
    }
});



// ----------------------------- search  in tickets ----------------------
const ticketsSearch = document.getElementById('tickets-search');
ticketsSearch.addEventListener('input', (e) => {
    const searchInput = e.target.value;

    const filteredOrders = allTickets.filter(ticket =>
        ticket.id.toString().includes(searchInput)
    );

    displayTickets(filteredOrders);
});