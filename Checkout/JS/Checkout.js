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
        alert("Please login first to enter checkout page.");
        window.location.href = "../../login/login.html";
        return;
    }

    let carts = JSON.parse(localStorage.getItem("carts")) || [];
    let userCart = carts.find(c => c.userId === currentUser.id);


    //fill default values
    document.getElementById("city").value = currentUser.address ? currentUser.address : currentUser.city;
    document.getElementById("user_name").value = currentUser.fullName ? currentUser.fullName : currentUser.name;
    document.getElementById("Address").value = currentUser.address ? currentUser.address : currentUser.city;
    document.getElementById("Phone").value = currentUser.phone;




    // console.log(userCart);

    if (!userCart || userCart.items.length === 0) {
        alert("There is no items in the cart");
        window.location.href = "../../Cart/cart.html";
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
    document.getElementById("subtotal").innerText = `${subtotal}$`;

    document.getElementById("totalAll").innerText = `${(subtotal + 90.00)}$`;

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
            status: "processing",
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