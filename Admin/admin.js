mainTabs = document.querySelectorAll('.main-tab')
subTabs = document.querySelectorAll('.sub-tab')

mainTabs.forEach(p => {
    p.addEventListener('click', (e) => {
        mainTabs.forEach(p => p.classList.remove('active-tab'))
        p.classList.add('active-tab')
        subTabs.forEach(div => { div.classList.remove('active-sub-tab') })
        subTabs.forEach(div => {
            if (div.id == e.target.innerHTML) {
                div.classList.add('active-sub-tab')
            }
        })
    })
});




//------------------------------------------- Products logic --------------------------------------------

// fetching data from the json file
fetch('../Dummy Data/products.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

//storing data in the local storage

// getProducts()
const products = JSON.parse(localStorage.getItem('products'));

console.log(products);
