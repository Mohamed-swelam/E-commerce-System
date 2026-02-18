mainTabs = document.querySelectorAll('.main-tab')
subTabs = document.querySelectorAll('.sub-tab')

mainTabs.forEach(p => {
    p.addEventListener('click', (e) => {
        mainTabs.forEach(t => t.classList.remove('active-tab'))
        p.classList.add('active-tab')
        subTabs.forEach(div => { div.classList.remove('active-sub-tab') })
        // console.log(e.target.innerHTML);
        subTabs.forEach(div => {
            if (div.id == e.target.innerHTML) {
                div.classList.add('active-sub-tab')
            }
        })
    })
});

