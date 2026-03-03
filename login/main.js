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
    const pattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
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
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;


    // Validation
    if (!lastName || !firstName || !email || !password || !role) {
        showToast("Please fill all fields", "error");
        return;
    }
    //  validation on Email 
    if (!isValidEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
    }

    // validation on Password .
    if (!isValidPassword(password)) {
        showToast("Password must be at least 6 characters and contain letters and numbers", "error");
        return;
    }
    //  validation on phone number 
    if (!isValidPhone(phone)) {
        showToast("Phone number must be exactly 11 digits", "error");
        return;
    }

    // Validation by Role .
    if (!role) {
        showToast("Please select a role", "error");
        return;
    }

    // get old users from  localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];


    // check the email not exists 
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        showToast("This email is already registered", "error");
        return;
    }

    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
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
    showToast("Account created successfully! You Will be redirected to login page.", "success");

    setTimeout(() => {
        window.location.href = "./login.html";
    }, 2500);


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
            showToast("Admin Login Successful", "success");
            setTimeout(() => {
                window.location.href = '../Admin/admin-dashboard.html';
            }, 1000);
            localStorage.setItem("currentUser", JSON.stringify(adminUser));
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
        showToast("Invalid email or password", "error");
        return;
    }

    //   Validation on Email 
    if (!isValidEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
    }

    // Keep data th0se current user in localStorage ; 
    localStorage.setItem("currentUser", JSON.stringify(validUser));


    showToast("Login successful!", "success");




    // redirect user based on role
    if (validUser.role === 'seller') {
        window.location.href = "../seller-dashboard.html";
    } else {
        window.location.href = "../HomePage&Products/home.html";
    }
});


// ============================== error Msg  ================================
// display Msg in error valid using (Bootstrap Alerts)
// ready-made component in Bootstrap .
// ===================================================================
// function showMessage(message, type, elementId) {
//     const messageBox = document.getElementById(elementId);

//     messageBox.innerHTML = `
//         <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
//             ${message}
//             <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
//         </div>
//     `;
// }