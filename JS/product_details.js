

async function getProducts() {
    const response = await fetch('/Dummy Data/products.json');
    let products = await response.json();


    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    // console.log(productId);

    const product = products.find(p => p.product_id == id);
    // console.log(product);

    let productImage = document.querySelector(".product-image img");
    productImage.src = product.image;

    let product_title = document.getElementById("product_title");
    product_title.innerText = product.name;

    let product_price = document.getElementById("product_price");
    product_price.innerText = product.price;

    let product_description = document.getElementById("product_description");
    product_description.innerText = product.description;

    let product_brand = document.getElementById("product-brand");
    product_brand.innerText = product.brand;



    const relatedProducts = products
        .filter(p =>
            p.category === product.category &&
            p.product_id !== product.product_id
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    // console.log(randomProducts);
    displayRelatedProducts(relatedProducts);

    var card_images = document.getElementsByClassName("card-img-top");

    for (let i = 0; i < card_images.length; i++) {
        card_images[i].addEventListener("click", function (e) {
            const productId = e.target.dataset.id;
            window.location.href = `product-details.html?id=${productId}`;
        })
    }

}

function displayRelatedProducts(productsArray) {
    const container = document.getElementById("related-products");

    container.innerHTML = productsArray.map(item => `
        <div class="col-6 col-md-3">
        <div class="card border-0 related-card">
            <img src="${item.image}" 
                class="card-img-top"
                data-id="${item.product_id}" 
                alt="${item.name}">
                
            <div class="card-body px-0 pt-2">
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">£${item.price}</small>
            </div>
        </div>
        </div>
    `).join("");
}

getProducts();

