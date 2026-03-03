async function SendMessage() {

    if (!localStorage.getItem("tickets")) {
        try {
            const response = await fetch('../../Dummy Data/tickets.json');
            const ticketsFromJson = await response.json();
            localStorage.setItem("tickets", JSON.stringify(ticketsFromJson));
        } catch (error) {
            console.error("Failed to load tickets.json", error);
            localStorage.setItem("tickets", JSON.stringify([]));
        }
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        // alert("Please login first to add items to cart.");
        // window.location.href = "../../login/login.html";

        showToast("Please login first to Send a Message.", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 2500)
        return;
    }

    if (currentUser.role === "admin") {
        showToast("Admins cannot send messages from this page.", "error");

        setTimeout(() => {
            window.location.href = "../../HomePage&Products/home.html";
        }, 1500);
        return;
    }

    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const form = document.getElementById('contactForm');
    const button = form.querySelector('button');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value;
        const message = messageInput.value.trim();

        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.classList.remove("is-invalid");
        });

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z\s]{3,30}$/;

        let isValid = true;

        if (!name) {
            nameInput.classList.add("is-invalid");
            nameError.textContent = "Name is required";
            isValid = false;
        } else if (!nameRegex.test(name)) {
            nameInput.classList.add("is-invalid");
            nameError.textContent = "Name must be 3-30 letters only";
            isValid = false;
        }

        if (!email) {
            emailInput.classList.add("is-invalid");
            emailError.textContent = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add("is-invalid");
            emailError.textContent = "Please enter a valid email address";
            isValid = false;
        }

        if (!subject) {
            subjectInput.classList.add("is-invalid");
            subjectError.textContent = "Please select a Subject type";
            isValid = false;
        }

        if (!message) {
            messageInput.classList.add("is-invalid");
            messageError.textContent = "Message cannot be empty";
            isValid = false;
        } else if (message.length < 10) {
            messageInput.classList.add("is-invalid");
            messageError.textContent = "Message must be at least 10 characters";
            isValid = false;
        }

        if (!isValid) return;


        const ticket = {
            id: Date.now(),
            userId: currentUser.id,
            userName: name,
            email: email,
            subject: subject,
            message: message,
            status: "Pending",
            reply: "",
            createdAt: new Date().toISOString()
        };

        tickets.push(ticket);
        localStorage.setItem("tickets", JSON.stringify(tickets));


        button.innerHTML = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            showToast("Message Sent Successfully!", "success");
            form.reset();
            button.innerHTML = 'Send Message';
            button.disabled = false;

            window.location.href = "../../customerinfo/customerinfo.html?tab=tickets";
        }, 1500);
    });
}


SendMessage();