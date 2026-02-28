



let allPrds = [];
let categoryPrds = [];
const category = new URLSearchParams(location.search).get("categroy");
const itemsPerPage = 5;
let currentPage = 1;
let searchInput = document.getElementById("input-search");
let sorCategory = []
let searchPrds = [];
let sortValue;
let baseCategory = [];
let spans = [];
let currentPath = location.search.split("?").pop();
console.log(currentPath);

document.querySelectorAll("#bottom-navbar .nav-link").forEach(a => {
    if (a.getAttribute("href").split("?").pop() === currentPath) {
        a.style.cssText =
            `color:#3599db;
                 border-bottom:3px solid #3599db; 
                `
    }
});



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
    baseCategory = categoryPrds;
}


function displayCategroyData(page) {
    console.log(baseCategory);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const categoryArray = baseCategory.slice(start, end);
    let prdBox = " "

    for (let i = 0; i < categoryArray.length; i++) {

        prdBox += `   
       <div class="col-lg-4 col-6">
                    <div class="card position-relative" style="min-height:500px;" >
                    <div style="cursor:pointer">
                    <div class=" bg-white text-end py-3"  >
                    <span ><i class="fa-regular fa-heart "></i></span>
                    </div>
                        <img class="card-img-top"  height="300" src="${categoryArray[i].image}" alt="${categoryArray[i].name}" />
                        <div class="card-body" onclick="showDetails(${categoryArray[i].id})">
                            <div class="d-flex justify-content-between align-items-center">
                                <div >
                                    <h4 class="card-title m-0 p-0">${categoryArray[i].name.slice(0, 10)}</h4>
                                    <small  >${categoryArray[i].brand}</small>
                                </div>
                            <div>
                                <span class=" card-text text-decoration-line-through text-danger">${categoryArray[i].oldPrice ?? "0"}$</span>
                                <span class=" card-text  text-success " style="font-size:25px;">${categoryArray[i].price}$</span>
                            </div>
                            </div>
                            <p class="card-text lead">${categoryArray[i].description?.slice(0, 30) ?? ""} </p>
                        </div>
                            <div class="text-center w-100" id="cart">
                            <button class="btn">Add To Cart </button> 
                             </div>
                        </div>
                         <div class="discount position-absolute top-0 left-0 bg-danger rounded-circle d-flex" style="width:65px; height:65px;">
                        <p class="m-auto text-white">${categoryArray[i].discount}%</p>
                    </div>
                    </div>

                </div>`
    }
    document.getElementById("data").innerHTML = prdBox;
}



function nextPrds() {
    if (currentPage * itemsPerPage < baseCategory.length) currentPage++;
    else if (currentPage * itemsPerPage >= baseCategory.length) currentPage = 1;
    displayCategroyData(currentPage);
}


function prevPrds() {
    if (currentPage > 1) {
        currentPage--;
        displayCategroyData(currentPage);
    }
}



function navigateNumbrsWithPrevAndNext() {
    const navigatNumbers = Math.ceil(baseCategory.length / 5);
    let numberBox = " "
    for (let i = 1; i <= navigatNumbers; i++) {
        numberBox += `
                  <span class="p-3 border number-span" style="cursor: pointer;">${i}</span>`
    }
    document.getElementById("navigators").innerHTML = numberBox;

    spans = document.querySelectorAll(".number-span");
    spans[0].style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset";

    spans.forEach((span, index) => {
        span.addEventListener("click", (e) => {
            currentPage = +span.innerText;
            spans.forEach(span => {
                if (getComputedStyle(span).boxShadow === "rgb(53, 153, 219) 2px 2px 5px 0px inset") {
                    span.style.boxShadow = "none";
                }
            })
            e.target.style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset"
            displayCategroyData(index + 1);
        })
    })


    document.getElementById("prev").addEventListener("click", () => {
        prevPrds();
        colorNavigatorBasedOnArrow();
    })


    document.getElementById("next").addEventListener("click", () => {
        nextPrds();
        colorNavigatorBasedOnArrow()
    })
}




function showDetails(id) {
    location.href = `./details.html?id=${id}`
}


//  filter by sort 
document.querySelector(".dropdown-menu").addEventListener("click", (e) => {

    if (getComputedStyle(e.target).color === "rgb(0, 0, 0)") {
        e.target.style.color = "rgba(26, 24, 24, 0.562)";
        e.target.innerHTML = e.target.innerText;
        baseCategory = categoryPrds;
    }
    else {
        document.querySelectorAll(".dropdown-menu li a").forEach(a => {
            a.style.color = "";
            if (a.children.length) {
                a.children[0].style.display = "none"
            }
        })
        e.target.style.color = "black";
        e.target.innerHTML += "<i class='fa-solid fa-check '></i>"
        sorCategory = [];
        sortValue = e.target.innerText;
        sortByValue(baseCategory);
    }
    displayCategroyData(1);
})



function sortByValue(sortPrds) {

    if (sortValue === "A to Z") {
        sorCategory = [...sortPrds].sort();
        baseCategory = [...sorCategory];
    }
    else if (sortValue === "Z to A") {
        sorCategory = [...sortPrds].sort().reverse();
        baseCategory = [...sorCategory];
    }
    else if (sortValue === "Low Price") {
        sorCategory = [...sortPrds].sort((a, b) => a.price - b.price);
        baseCategory = [...sorCategory];
    }

    else if (sortValue === "High Price") {
        sorCategory = [...sortPrds].sort((a, b) => b.price - a.price);
        baseCategory = [...sorCategory];
    }
    spans.forEach(span => {
        if (getComputedStyle(span).boxShadow === "rgb(53, 153, 219) 2px 2px 5px 0px inset") {
            span.style.boxShadow = "none";
        }
    })
    spans[0].style.boxShadow = "rgb(53, 153, 219) 2px 2px 5px 0px inset";

}




function searchByName() {
    for (let i = 0; i < categoryPrds.length; i++) {
        if (categoryPrds[i].name.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim())) {
            searchPrds.push(categoryPrds[i]);
            baseCategory = [...searchPrds];
            displayCategroyData(1);
            navigateNumbrsWithPrevAndNext()
        }
        else {
            console.log("no product");
        }
    }
    if (sortValue) {
        sortByValue(baseCategory);
        console.log(baseCategory);
        displayCategroyData(1);

    }
}






// search product
document.getElementById("input-search").addEventListener('search', () => {
    searchPrds = [];
    baseCategory = [];
    searchByName();
})



function colorNavigatorBasedOnArrow() {
    let spans = document.querySelectorAll(".number-span");
    spans.forEach(span => {
        if (+span.innerText === currentPage) {
            console.log(currentPage);

            span.style.boxShadow = "2px 2px 5px #3599db inset";
        } else {
            span.style.boxShadow = "none";
        }
    })
}
