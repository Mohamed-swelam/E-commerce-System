async function DisplayProducts() {

    //load carts
    if (!localStorage.getItem("carts")) {
        const response_2 = await fetch('../../Dummy Data/carts.json');
        let cartsFromJson = await response_2.json();

        localStorage.setItem("carts", JSON.stringify(cartsFromJson));
        // console.log(localStorage.getItem("carts"));
    }


    //check user login
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        showToast("Please login first to enter checkout page.", "error");

        setTimeout(() => {
            window.location.href = "../../login/login.html";
        }, 1500);
        return;
    }

    if (currentUser.role === "seller" || currentUser.role === "admin") {
        showToast("Access denied. Only customers can access checkout.", "error");

        setTimeout(() => {
            window.location.href = "../../HomePage&Products/home.html";
        }, 1500);
        return;
    }


    if (!currentUser.addresses || currentUser.addresses.length === 0) {

        const defaultAddressObject = {
            fullAddress: currentUser.street
                ? `${currentUser.street}, ${currentUser.address || ""}`
                : (currentUser.address || ""),
            name: currentUser.fullName || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
            email: currentUser.email || "",
            country: currentUser.address || "",
            postalCode: "",
            phone: currentUser.phone || "",
            default: true
        };

        currentUser.addresses = [defaultAddressObject];

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }



    let carts = JSON.parse(localStorage.getItem("carts")) || [];
    let userCart = carts.find(c => c.userId === currentUser.id);




    // ================= Address Select =================
    const addressSelect = document.getElementById("addressSelect");

    addressSelect.innerHTML = `
    <option value="" disabled selected>Choose a saved address</option>
`;

    currentUser.addresses.forEach((addr, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${addr.fullAddress} ${addr.default ? "(Default)" : ""}`;
        addressSelect.appendChild(option);
    });

    const defaultIndex = currentUser.addresses.findIndex(a => a.default);

    if (defaultIndex !== -1) {
        addressSelect.value = defaultIndex;

        const defaultAddress = currentUser.addresses[defaultIndex];

        document.getElementById("user_name").value =
            defaultAddress.name || currentUser.fullName || "";

        document.getElementById("Address").value =
            defaultAddress.fullAddress || "";

        document.getElementById("Phone").value =
            defaultAddress.phone || currentUser.phone || "";

        document.getElementById("city").value =
            defaultAddress.country || currentUser.address || "";
    }

    addressSelect.addEventListener("change", function () {
        const selectedIndex = this.value;

        if (selectedIndex === "") {
            document.getElementById("Address").value = "";
            return;
        }

        const selectedAddress = currentUser.addresses[selectedIndex];

        document.getElementById("user_name").value =
            selectedAddress.name || currentUser.fullName || "";

        document.getElementById("Address").value =
            selectedAddress.fullAddress || "";

        document.getElementById("Phone").value =
            selectedAddress.phone || currentUser.phone || "";

        document.getElementById("city").value =
            selectedAddress.country || currentUser.address || "";
    });




    // console.log(userCart);

    if (!userCart || userCart.items.length === 0) {
        showToast("There is no items in the cart", "error");
        setTimeout(() => {
            window.location.href = "../../Cart/cart.html";
        }, 2000);
        return;
    }

    const products = JSON.parse(localStorage.getItem("products"));
    let itemsDiv = document.getElementById("items");
    let totalItems = 0;
    let subtotal = 0;
    for (let i = 0; i < userCart.items.length; i++) {

        let product = products.find(p => p.product_id == userCart.items[i].productId);

        //check and transform string to numeric
        const idealPrice = product.price;

        const numericPrice =
            typeof idealPrice === "string"
                ? Number(idealPrice.replace(/,/g, ""))
                : Number(idealPrice);

        let total = userCart.items[i].quantity * numericPrice;
        subtotal += total;
        totalItems += userCart.items[i].quantity;

        itemsDiv.insertAdjacentHTML("afterbegin", `
                        <div class="item d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div class="d-flex align-items-start gap-4">
                    
                                    <div class="image position-relative">
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">${userCart.items[i].quantity}</span>
                                        <img 
                                            src=${product.image}
                                            class="rounded"
                                            style="width: 70px; height: 78px; object-fit: contain; ">
                                    </div>

                                    <div class="title">
                                        <div class="fw-medium">
                                            ${product.description || "No description available for this product."}
                                        </div>
                                    </div>

                                </div>

                                <div class="price fw-medium">${total.toFixed(2)}$</div>
                            </div>`);

    }
    document.getElementById("totlaItems").innerText = totalItems;
    document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)}$`;

    document.getElementById("totalAll").innerText = `${(subtotal + 90.00).toFixed(2)}$`;

    let totalAll = subtotal + 90.00;


    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        form.classList.add("was-validated");
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }


        let expiryValue = document.getElementById("Expiry_Date").value.trim();

        if (expiryValue) {

            const [month, year] = expiryValue.split("/");

            const fullYear = 2000 + parseInt(year);
            const expiryDate = new Date(fullYear, month - 1);

            const today = new Date();
            today.setDate(1);
            today.setHours(0, 0, 0, 0);

            if (expiryDate <= today) {
                showToast("invalid expiry date", "error");
                return;
            }
        }


        //getAllValues
        let name = document.getElementById("user_name").value;
        let city = document.getElementById("city").value;
        let address = document.getElementById("Address").value;
        let phone = document.getElementById("Phone").value;

        // let card_Number = document.getElementById("Card_Number").value;
        // let expiry_date = document.getElementById("Expiry_Date").value;
        // let cvv = document.getElementById("CVV").value;
        // let name_on_Card = document.getElementById("Name_on_Card").value;


        //create order
        let order = {
            orderId: Date.now(),
            userId: currentUser.id,
            customerName: name,
            city: city,
            address: address,
            phone: phone,
            total: totalAll,
            status: "pending",
            createdAt: new Date().toISOString(),
            items: userCart.items,
        };

        //decrease product quantity
        for (let i = 0; i < userCart.items.length; i++) {
            let product = products.find(p => p.product_id == userCart.items[i].productId);
            if (product) {
                product.quantity -= userCart.items[i].quantity;
            }
        }
        localStorage.setItem("products", JSON.stringify(products));

        //reomve usercart
        let userCartIndex = carts.findIndex(c => c.userId === currentUser.id);
        if (userCartIndex !== -1) {
            carts[userCartIndex].items = [];
        }
        localStorage.setItem("carts", JSON.stringify(carts));


        //update orders
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        showToast("Order placed successfully!", "success");

        setTimeout(() => {
            window.location.href = "../../HomePage&Products/home.html";
        }, 1500);
    });

}

DisplayProducts();