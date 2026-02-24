// validation Bootstrap 
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


//  display register  Form ,  and hide login Form 
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");

showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

//  display login Form  , and hide register Form 

const showLogin = document.getElementById("showLogin");

showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// ==========================
// Validation Functions
// ==========================

function isValidEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}


function isValidPassword(password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return pattern.test(password);
}

function isValidPhone(phone) {
    const pattern = /^\d{11}$/;
    return pattern.test(phone);
}

// control in (register Page ) based on role  ;
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const role = document.getElementById('roleSelect').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById("lastName").value  ;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;


    // Validation
    if (!lastName || !firstName || !email || !password || !role) {
        showMessage("Please fill all fields", "danger", "registerMessage");
        return;
    }
//  validation on Email 
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address", "danger", "registerMessage");
        return;
    }

    // validation on Password .
    if (!isValidPassword(password)) {
        showMessage("Password must be at least 6 characters and contain letters and numbers", "danger", "registerMessage");
        return;
    }
    //  validation on phone number 
    if (!isValidPhone(phone)) {
        showMessage("Phone number must be exactly 11 digits", "danger", "registerMessage");
        return;
    }

    // Validation by Role .
    if (!role) {
        showMessage("Please select a role", "danger", "registerMessage");
        return;
    }

    // get old users from  localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];


    // check the email not exists 
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        showMessage("This email is already registered", "danger", "registerMessage");
        return;
    }

    const newUser = {
        id: Date.now(),
        firstName,
        lastName ,
        email,
        password,
        address,
        phone,
        role
    };

    // add user to array 
    users.push(newUser);

    // store user array  into localStorage . 
    localStorage.setItem('users', JSON.stringify(users));

    // msg successfully . 
    showMessage("Account created successfully!", "success", "registerMessage");


    // Redirect based on role
    if (role === 'seller') {
        window.location.href = "../seller-dashboard.html";
    } else {
        window.location.href = "../HomePage&Products/home.html";
    }
});


// control in  (Login Page ) based on role  ;
// control in Admin  based on role   ;
document.querySelector('#loginForm form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // --------------------------------------------------
    // first :    ckeck if this is Admin or no .
    // ----------------------------------------------------
    try {
        const response = await fetch('../Dummy Data/users.json');
        const jsonUsers = await response.json();

        const adminUser = jsonUsers.find(user => user.role === 'admin');

        if (adminUser && adminUser.email === email && adminUser.password === password) {
            showMessage("Admin Login Successful", "success", "loginMessage");
            setTimeout(() => {
                window.location.href = '../Admin/admin-dashboard.html';
            }, 1000);
            return;
        }


    } catch (error) {
        console.error("Error loading users:", error);
    }

    // -------------------------------------------------
    // second : check on the other users .  
    // -------------------------------------------------

    let users = JSON.parse(localStorage.getItem('users')) || [];


    const validUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (!validUser) {
        showMessage("Invalid email or password", "danger", "loginMessage");
        return;
    }

    //   Validation on Email 
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address", "danger", "loginMessage");
        return;
    }

    // Keep data th0se current user in localStorage ; 
    localStorage.setItem("currentUser", JSON.stringify(validUser));



    showMessage("Login successful!", "success", "loginMessage");


    // redirect user based on role
    if (validUser.role === 'seller') {
        window.location.href = "../seller-dashboard.html";
    } else {
        window.location.href = "../HomePage&Products/home.html";
    }
});


// ==============================================================
// display Msg in error valid using (Bootstrap Alerts)
// ready-made component in Bootstrap . 
// ===================================================================
function showMessage(message, type, elementId) {
    const messageBox = document.getElementById(elementId);

    messageBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}