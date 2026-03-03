'use strict'

const addCustomerModal = document.getElementById('add-customer-modal');
// Add Customer Form Validation
let formIsValid = false;
const addCustomerForm = document.getElementById('add-customer-form')
const customerCity = document.getElementById('cust-city')
const customerName = document.getElementById('cust-name')
const customerEmail = document.getElementById('cust-email')
const customerPhone = document.getElementById('cust-phone')
const customerStreet = document.getElementById('cust-street')
const customerPassword = document.getElementById('cust-password')
// const customerModalAddBtn = document.getElementById('customer-modal-add-btn')
addCustomerForm.addEventListener('submit', addCustomer);

// messages for password
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");


// messages for user name
const nameLetters = document.getElementById("name-letters");
const nameLength = document.getElementById("name-length");

// messages for email
const emailPattern = document.getElementById("email-pattern");

// messages for phone
const phoneNumbers = document.getElementById('phone-numbers');
const phoneLength = document.getElementById('phone-length');

// messages for city
const cityEmpty = document.getElementById('city-empty')

// messages for street
const streetLength = document.getElementById('street-length')

/* 
    When the user clicks on the any field, show the message box,
    When the user clicks outside of the field, hide the message box 
*/
function viewValidationMsg(input, massageId) {
    input.onfocus = function () {
        document.getElementById(massageId).style.display = "block";
    }
    input.onblur = function () {
        document.getElementById(massageId).style.display = "none";
    }
}

viewValidationMsg(customerPassword, 'pass-msg')
viewValidationMsg(customerEmail, 'email-msg')
viewValidationMsg(customerPhone, 'phone-msg')
viewValidationMsg(customerStreet, 'street-msg')
viewValidationMsg(customerName, 'name-msg')
viewValidationMsg(customerCity, 'city-msg')




customerName.onkeyup = function () {
    // Validate starts with a letter
    var startsWithLetters = /^[a-zA-Z]/g;
    if (customerName.value.match(startsWithLetters)) {
        nameLetters.classList.remove("invalid");
        nameLetters.classList.add("valid");
        customerName.classList.add('valid-input')
    } else {
        nameLetters.classList.remove("valid");
        nameLetters.classList.add("invalid");
    }

    // Validate length
    if (customerName.value.length >= 3 && customerName.value.match(startsWithLetters)) {
        nameLength.classList.remove("invalid");
        nameLength.classList.add("valid");
        customerName.classList.add('valid-input')
    } else {
        nameLength.classList.remove("valid");
        nameLength.classList.add("invalid");
        customerName.classList.remove('valid-input')
    }
}

customerEmail.onkeyup = function () {
    // Validate with a pattern
    var emailPatternRgx = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/g;
    if (customerEmail.value.match(emailPatternRgx)) {
        let emails = [];
        customers.forEach(c => emails.push(c.email))
        console.log(emails);
        if (emails.includes(customerEmail.value)) {
            emailPattern.classList.remove("valid");
            emailPattern.classList.add("invalid");
            customerEmail.classList.remove('valid-input')
            customerEmail.classList.add('is-invalid')
            showToast('Email already exists', 'error')
        } else {
            customerEmail.classList.remove('is-invalid')
            emailPattern.classList.remove("invalid");
            emailPattern.classList.add("valid");
            customerEmail.classList.add('valid-input')
        }
    } else {
        emailPattern.classList.remove("valid");
        emailPattern.classList.add("invalid");
        customerEmail.classList.remove('valid-input')
    }
}

customerPhone.onkeyup = function () {
    const phoneNumber = /^\d+$/g
    if (customerPhone.value.match(phoneNumber)) {
        phoneNumbers.classList.remove('invalid')
        phoneNumbers.classList.add('valid')
        customerPhone.classList.add('valid-input')
    }
    else {
        phoneNumbers.classList.remove('valid')
        phoneNumbers.classList.add('invalid')
        customerPhone.classList.remove('valid-input')
    }

    // Validate length
    if (customerPhone.value.length >= 8 && customerPhone.value.match(phoneNumber)) {
        phoneLength.classList.remove("invalid");
        phoneLength.classList.add("valid");
        customerPhone.classList.add('valid-input')
    } else {
        phoneLength.classList.remove("valid");
        phoneLength.classList.add("invalid");
        customerPhone.classList.remove('valid-input')
    }
}

customerStreet.onkeyup = function () {
    if (customerStreet.value == '') {
        streetLength.classList.remove('valid');
        streetLength.classList.add('invalid');
        customerStreet.classList.remove('valid-input');
    }
    else if (customerStreet.value.trim().length >= 3) {
        streetLength.classList.remove('invalid');
        streetLength.classList.add('valid');
        customerStreet.classList.add('valid-input');
    }
    else {
        streetLength.classList.remove('valid');
        streetLength.classList.add('invalid');
        customerStreet.classList.remove('valid-input');
    }
}

customerCity.onkeyup = function () {
    if (customerCity.value.length > 3 && customerCity.value.trim() != '') {
        cityEmpty.classList.remove('invalid');
        cityEmpty.classList.add('valid');
        customerCity.classList.add('valid-input');
    }
    else {
        cityEmpty.classList.remove('valid');
        cityEmpty.classList.add('invalid');
        cityEmpty.style.display = 'block'
        customerCity.classList.remove('valid-input');
    }
}

customerPassword.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (customerPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        customerPassword.classList.add('valid-input')
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (customerPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        customerPassword.classList.add('valid-input')
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        customerPassword.classList.remove('valid-input')
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (customerPassword.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        customerPassword.classList.add('valid-input')
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        customerPassword.classList.remove('valid-input')
    }

    // Validate length
    if (customerPassword.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        customerPassword.classList.add('valid-input')
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        customerPassword.classList.remove('valid-input')
    }
}

function addCustomer(e) {
    e.preventDefault()
    let arrOfInputs = [];
    for (let i = 0; i < 6; i++) {
        arrOfInputs.push(e.target[i])
    }
    formIsValid = arrOfInputs.every(input => input.classList.contains('valid-input'))
    console.log(formIsValid);
    if (formIsValid) {
        let maxId;
        users.reduce((p, c) => p.id > c.id ? maxId = p.id : maxId = c.id)
        console.log(maxId + 1);

        const fullNameValue = customerName.value.trim();

        const [firstName, ...rest] = fullNameValue.split(" ");
        const lastName = rest.join(" ");

        const newCustomer = {
            id: maxId + 1,
            role: 'customer',
            address: customerCity.value,
            fullName: customerName.value,
            firstName: firstName,
            lastName: lastName,
            email: customerEmail.value,
            phone: customerPhone.value,
            street: customerStreet.value,
            password: customerPassword.value
        }
        addCustomerModal.querySelector('.btn-close').click();
        addCustomerForm.reset();
        users.push(newCustomer);
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(users))
        displayCustomer(newCustomer);
        totalCustomers.innerText = users.length
        showToast('Customer added successfully', 'success');
        setTimeout(() => {
            location.reload()
        }, 2000);
    } else {
        showToast('please enter valid data', 'warning')
    }
}

// export { addCustomer };