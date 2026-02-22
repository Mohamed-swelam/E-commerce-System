
let allPrds = [];
let categoryPrds = [];
const category = new URLSearchParams(location.search).get("categroy");
const itemsPerPage = 5 ;
let currentPage = 1; 



if (localStorage.getItem("products")) {
    allPrds = JSON.parse(localStorage.getItem("products"))
    console.log(allPrds);
}

(function () {
    CategroyData();
    displayCategroyData(1);
    navigateNumbrsWithPrevAndNext();
})()


function CategroyData() {
    allPrds.filter(prd => {
        if (prd.category === category) categoryPrds.push(prd);
    })
    console.log(categoryPrds);
}

function displayCategroyData(page) {
     const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const categoryArray = categoryPrds.slice(start , end ) ;
    let prdBox = " "
    for (let i = 0; i < categoryArray.length; i++) {
      prdBox +=`   
       <div class="col-lg-4 col-6">
                    <div class="card"style="min-height:500px;" onclick="showDetails(${i})">
                    <div style="cursor:pointer">
                        <img class="card-img-top"  height="300" src="${categoryArray[i].image}" alt="${categoryArray[i].name}" />
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div >
                                    <h4 class="card-title m-0 p-0">${categoryArray[i].name}</h4>
                                    <small  >${categoryArray[i].brand}</small>
                                </div>
                                <div>
                                    <small>${categoryArray[i].price}$</small>
                                </div>
                            </div>
                            <p class="card-text lead">${categoryArray[i].description  }</p>
                        </div>
                            <div class="text-center w-100">
                            <button class="btn">Add To Cart </button> 
                             </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("data").innerHTML = prdBox ;
}

function nextPrds() {
    if (currentPage * itemsPerPage < categoryPrds.length) currentPage++;
    else if (currentPage * itemsPerPage >= categoryPrds.length) currentPage = 1;
    displayCategroyData(currentPage);
}


function prevPrds() {
    if (currentPage > 1) {
        currentPage--;
        displayCategroyData(currentPage);
    }
}

function navigateNumbrsWithPrevAndNext() {
    const navigatNumbers = Math.ceil(categoryPrds.length / 5);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        numberBox += `
                  <span class="p-3 border number-span" style="cursor: pointer;">${i}</span>`}
     document.getElementById("navigators").innerHTML = numberBox;

     let spans = document.querySelectorAll(".number-span");
    spans.forEach((span, index) => {
        span.addEventListener("click", () => {
            displayCategroyData(index + 1);
        })
    })

    document.getElementById("prev").addEventListener("click", () => {
        prevPrds()
    })

    document.getElementById("next").addEventListener("click", () => {
        nextPrds()
    })
}




function showDetails (id)
 {
    location.href =`./details.html?id=${id}`
 }