let hasRated = false;
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

function renderMenuCategory(containerId, itemsArray) {
    let containerRef = document.getElementById(containerId);
    containerRef.innerHTML = '';

    for (let i = 0; i < itemsArray.length; i++) {
        containerRef.innerHTML += getMenuTemplate(itemsArray[i])

    }
}

renderMenuCategory('burgerList', burgers);
renderMenuCategory('pizzaList', pizzas);
renderMenuCategory('saladList', salads);

loadFromLocalStorage();
renderRating();
renderBasket();

function showScrollBtn() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('d_none');
        } else {
            scrollToTopBtn.classList.add('d_none');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

showScrollBtn();

function addRating() {
    let countEl = document.getElementById('ratingCount');
    let current = Number(countEl.textContent);
    countEl.textContent = hasRated ? current - 1 : current + 1;
    hasRated = !hasRated;
    saveRatingStorage();
}

function renderRating() {
    if (hasRated) document.getElementById('ratingCount').textContent = '318';
}