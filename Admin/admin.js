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

