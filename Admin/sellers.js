// ======================================================
// Sellers Logic
// ======================================================
const sellersContainer = document.getElementById('sellers-container');
let totalSellers = document.getElementById('total-sellers');


// Function to render one seller card
// function displaySeller(seller) {
//     // Main row container
//     let col = document.createElement('div');
//     col.classList.add(
//         'col-12', 'p-3', 'd-flex',
//         'rounded-3', 'gap-5', 'flex-wrap', 'mb-3'
//     );
//     col.style.backgroundColor = "#fff";

//     // ---------------- Name + Email ----------------
//     let div1 = document.createElement('div');

//     let sellerName = document.createElement('p');
//     sellerName.classList.add('fs-4', 'mb-0');
//     sellerName.innerText = seller.fullName || seller.firstName + " " + seller.lastName;

//     let sellerrEmail = document.createElement('a');
//     sellerrEmail.classList.add('text-secondary');
//     sellerrEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${seller.email}`;
//     sellerrEmail.target = "_blank";
//     sellerrEmail.innerText = seller.email;
//     sellerrEmail.style.textDecoration = "none";

//     // ---------------- Products -------------------
//     let div2 = document.createElement('div')
//     let sellerProducts = document.createElement('p')
//     sellerProducts.innerText = `Seller Products : ${(products.filter(p => p.seller_id == seller.id)).length}`

//     // ---------------- ID Section ----------------
//     let div3 = document.createElement('div');
//     div3.classList.add('ms-auto', 'd-flex', 'flex-column', 'align-items-end');

//     let sellerId = document.createElement('p');
//     sellerId.classList.add('fs-5');
//     sellerId.innerText = "ID: " + seller.id;

//     // let deleteBtn = document.createElement('button');
//     // deleteBtn.classList.add('btn', 'btn-danger');
//     // deleteBtn.innerText = 'Delete'
//     // deleteBtn.id = seller.id;
//     // // delete logic
//     // deleteBtn.addEventListener('click', (e) => {
//     //     deleteUser(e.target.id);
//     //     sellersContainer.innerHTML = '';
//     //     sellers.forEach(c => displaySeller(c))
//     //     location.reload()
//     // })

totalSellers.innerText = sellers.length;

//     // ---------------- Append ----------------
//     sellersContainer.appendChild(col);

//     col.appendChild(div1);
//     col.appendChild(div2);
//     col.appendChild(div3);

//     div1.appendChild(sellerName);
//     div1.appendChild(sellerrEmail);

//     div2.appendChild(sellerProducts);

//     div3.appendChild(sellerId);
//     // div3.appendChild(deleteBtn);
// }
function displaySeller(seller) {

    const tbody = document.getElementById('sellers-table-body');
    tbody.innerHTML += `
    <tr class="p-3">

        <td>
            <p class="fw-bold">${seller.id}</p>
        </td>

        <td>
            ${seller.fullName}
        </td>

        <td class="text-primary fw-bold">

            <span>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${seller.email}">
                ${seller.email}
                </a>
            </span>

            <br>

            ${seller.phone}

        </td>

        <td>
            ${(products.filter(p => p.seller_id == seller.id)).length}
        </td>

        <td>
            <button class="btn btn-sm btn-danger"
            onclick="deleteItem(${seller.id}, 'seller')">
            Delete
            </button>
        </td>

    </tr>
    `;
}

if (sellers.length == 0) {
    console.log('empty');
    totalSellers.innerText = '0'
    const sellersEmptyMessage = document.getElementById('sellers-empty-message');
    sellersEmptyMessage.classList.remove('d-none')
    sellersEmptyMessage.innerText = 'No Sellers found. Try adding some!'
}
else {
    sellers.forEach(s => displaySeller(s))
}