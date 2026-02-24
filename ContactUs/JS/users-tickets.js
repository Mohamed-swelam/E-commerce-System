function loadUserTickets() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "../../login/login.html";
        return;
    }

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const container = document.getElementById("ticketsContainer");

    // فلترة التذاكر الخاصة بالمستخدم فقط
    const userTickets = tickets.filter(
        ticket => ticket.userId === currentUser.id
    );

    if (userTickets.length === 0) {
        container.innerHTML = `
        <div class="col-12">
            <div class="empty-messages text-center py-5">
                
                <div class="empty-icon mb-3">
                    <i class="bi bi-chat-dots"></i>
                </div>

                <h4 class="fw-bold mb-2">No Messages Yet</h4>
                <p class="text-muted mb-4">
                    You haven't sent any support messages yet.
                </p>

                <a href="../ContactUs/Contact.html" class="btn btn-primary px-4">
                    Contact Support
                </a>
            </div>
        </div>
    `;
        return;
    }

    container.innerHTML = userTickets
        .sort((a, b) => b.id - a.id)
        .map(ticket => `
        <div class="col-12 mb-3">
            <div class="ticket-card p-4">

                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 class="ticket-subject mb-1">${ticket.subject}</h5>
                        <small class="ticket-date">
                            ${formatDate(ticket.createdAt)}
                        </small>
                    </div>

                    <span class="badge ${getStatusClass(ticket.status)}">
                        ${ticket.status}
                    </span>
                </div>

                <div class="ticket-message mb-3">
                    ${ticket.message}
                </div>

                ${ticket.reply ? `
                    <div class="admin-reply">
                        <strong>Admin Reply:</strong>
                        <p class="mb-0">${ticket.reply}</p>
                    </div>
                ` : `
                    <div class="waiting-reply">
                        <i class="bi bi-clock me-1"></i>
                        Waiting for admin reply...
                    </div>
                `}
            </div>
        </div>
    `).join("");
}

function getStatusClass(status) {
    switch (status) {
        case "Pending":
            return "bg-warning text-dark px-3 py-2";
        case "Replied":
            return "bg-success px-3 py-2";
        case "Closed":
            return "bg-secondary px-3 py-2";
        default:
            return "bg-primary px-3 py-2";
    }
}

function formatDate(dateString) {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

loadUserTickets();

