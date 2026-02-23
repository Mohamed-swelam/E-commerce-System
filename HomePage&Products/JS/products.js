let itemsPerPage = 9;
let currentPage = 1;
let allPrds = [];
let start, end, brand;

(function () {
    if (localStorage.getItem("products")) {
        console.log(JSON.parse(localStorage.getItem("products")));
        allPrds = JSON.parse(localStorage.getItem("products"))
    }
    displayPaginationItems(allPrds, 1);
    navigateNumbrsWithPrevAndNext(allPrds);
})()


function displayAllPrds(prds) {
    product = " ";
    for (let i = 0; i < prds.length; i++) {
        product +=
            `
            <div class="col-6 col-lg-4" >
                    <div class="card" style="cursor:pointer;"   >
                       <div class="position-relative bg-white"  style="height:250px; ">
                    <img src="${prds[i].image}" class="card-img-top" alt="${prds[i].name}" height="200">
                                            <span class="position-absolute start-0 bottom-0 "><i class="fa-solid fa-heart"></i></span>
 
                    </div>
                    
                    <div class="card-body" onclick="showDetails(${prds[i].id})">
                            <h4 class="card-title fw-normal">${prds[i].name.slice(0, 10)}</h4>
                            <p class="card-text">${prds[i].price}$</p>
                        </div>

                         <div class="text-center w-100">
                            <button class="btn">Add To Cart </button> 
                             </div>
                    </div>
                </div>
                `
    }
    document.getElementById("prds-data").innerHTML = product;
}



function showDetails (id)
 {
    location.href =`./details.html?id=${id}`
 }


function displayPaginationItems(prds, page) {

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginationPrds = prds.slice(start, end);
    displayAllPrds(paginationPrds);
}


function nextPrds(prds) {
    if (currentPage * itemsPerPage < prds.length) currentPage++;
    else if (currentPage * itemsPerPage >= prds.length) currentPage = 1;
    displayPaginationItems(prds, currentPage);
}


function prevPrds(prds) {
    if (currentPage > 1) {
        currentPage--;
        displayPaginationItems(prds, currentPage);
    }
}


function navigateNumbrsWithPrevAndNext(prds) {
    console.log(prds);

    console.log(Math.ceil(prds.length / 9))
    const navigatNumbers = Math.ceil(prds.length / 9);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        console.log(i);
        numberBox += `
                  <span class="p-3 border number-span" style="cursor: pointer;">${i}</span>
                `
    }
    document.getElementById("navigators").innerHTML = numberBox;

    let spans = document.querySelectorAll(".number-span");

    spans.forEach((span, index) => {
        span.addEventListener("click", () => {
            displayPaginationItems(prds, index + 1);
        })
    })

    document.getElementById("prev").addEventListener("click", () => {
        prevPrds(prds)
    })

    document.getElementById("next").addEventListener("click", () => {
        nextPrds(prds)
    })
}


// Filter By Price
document.querySelectorAll("#price").forEach( divPrice => { 
    divPrice.addEventListener('click', (e) => {
    let pricePrds = [];
    if (e.target.nodeName === "INPUT") {
        document.querySelectorAll("input[name='price']").forEach(input => {
                if(input.checked){
                     input.checked = false;
                     e.target.checked = true;}
        })

        if (e.target.checked) {
            start = +e.target.value.split(' - ')[0];
            end   = +e.target.value.split(' - ')[1];
            if (brand !== undefined) {
                for (let i = 0; i < allPrds.length; i++) {
                    if (allPrds[i].price > start && allPrds[i].price < end && (allPrds[i].brand === brand)) { pricePrds.push(allPrds[i]); }
                }
            }
            else {
                for (let i = 0; i < allPrds.length; i++) {
                    if (allPrds[i].price > start && allPrds[i].price < end) { pricePrds.push(allPrds[i]) }
                }
            }
            displayPaginationItems(pricePrds, 1);
            navigateNumbrsWithPrevAndNext(pricePrds)
        }

        else {
            start = undefined;
            if (brand !== undefined) {
                let brandsPrdsOnly = [];
                for (let i = 0; i < allPrds.length; i++) {
                    if (allPrds[i].brand === brand) { brandsPrdsOnly.push(allPrds[i]); }
                }
                displayPaginationItems(brandsPrdsOnly, 1);
                navigateNumbrsWithPrevAndNext(brandsPrdsOnly)
            }
            else {
                displayPaginationItems(allPrds, 1);
                navigateNumbrsWithPrevAndNext(allPrds)
            }
        }
    }
})})

// Filter by Brands
document.querySelectorAll("#brands").forEach( divBrand => { divBrand.addEventListener('click', (e) => {
    let brandsPrds = [];
    if (e.target.nodeName === "INPUT") {
        document.querySelectorAll("input[name='brand']").forEach(input => {
            if (input.checked) {
                input.checked = false;
                e.target.checked = true;
            }
        })

        if (e.target.checked) {
            brand = e.target.value;
            if (start !== undefined) {
                for (let i = 0; i < allPrds.length; i++) {
                    if ((allPrds[i].brand === brand) && (allPrds[i].price > start && allPrds[i].price < end)) { brandsPrds.push(allPrds[i]); }
                }
            }
            else {
                for (let i = 0; i < allPrds.length; i++) {
                    if (allPrds[i].brand === brand) { brandsPrds.push(allPrds[i]); }
                }
            }
            displayPaginationItems(brandsPrds, 1);
            navigateNumbrsWithPrevAndNext(brandsPrds)
        }
        else {
            brand = undefined ;
            if (start !== undefined) {
                let pricePrdsOnly = [];
                for (let i = 0; i < allPrds.length; i++) {
                    if (allPrds[i].price > start && allPrds[i].price < end) { pricePrdsOnly.push(allPrds[i]); }
                }
                displayPaginationItems(pricePrdsOnly, 1);
                navigateNumbrsWithPrevAndNext(pricePrdsOnly)
            }
            else {
                displayPaginationItems(allPrds, 1);
                navigateNumbrsWithPrevAndNext(allPrds)
            }
        }
    }
})});


