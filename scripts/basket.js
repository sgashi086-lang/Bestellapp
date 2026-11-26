let basket = [];
const DELIVERY_FEE = 4.99;
let isDelivery = true;
let modalTimeout;

function clearBasketContainers(toggle, items, summary) {
    toggle.innerHTML = '';
    items.innerHTML = '';
    summary.innerHTML = '';
}

function renderBasket() {
    let toggleContainer = document.getElementById('deliveryToggleContainer');
    let basketItems = document.getElementById('basketItems');
    let basketSummary = document.getElementById('basketSummary');
    clearBasketContainers(toggleContainer, basketItems, basketSummary);
    toggleEmptyBasket();
    updateBasketBadge();
    if (basket.length === 0) return;
    toggleContainer.innerHTML = getDeliveryToggleTemplate(isDelivery);
    renderBasketItems(basketItems);
    renderBasketSummary(basketSummary);
    saveToLocalStorage();
}

function toggleEmptyBasket() {
    let basketSection = document.getElementById('basketSection');
    let basketContainer = document.getElementById('basketContainer');
    let basketEmpty = document.getElementById('emptyBasket');
    if (basket.length === 0) {
        basketContainer.classList.add('d_none');
        if (!basketEmpty) basketSection.insertAdjacentHTML('beforeend', getEmptyBasketTemplate());
    } else {
        basketContainer.classList.remove('d_none');
        if (basketEmpty) basketEmpty.remove();
    }
}

function findBasketItem(name) {
    return basket.find(item => item.name === name);
}

function addToBasket(name, price) {
    let existingItem = findBasketItem(name);
    if (existingItem) {
        existingItem.amount++;
    } else {
        basket.push({ name: name, price: price, amount: 1 });
    }
    renderBasket();
    document.getElementById('basketScrollBox').scrollTop = 99999;
}

function setDeliveryMode(mode) {
    isDelivery = mode;
    renderBasket();
}

function renderBasketItems(container) {
    for (let i = 0; i < basket.length; i++) {
        container.innerHTML += getBasketItemTemplate(basket[i], i);
    }
}

function renderBasketSummary(container) {
    let subtotal = calculateSubtotal();
    let currentDeliveryFee = (isDelivery && subtotal <= 50) ? DELIVERY_FEE : 0;
    let total = subtotal + currentDeliveryFee;
    container.innerHTML = getBasketSummaryTemplate(subtotal, currentDeliveryFee, total);
}

function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
    }
    return subtotal;
}

function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();
}

function decreaseAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }
    if (basket.length === 0) clearBasketStorage();
    renderBasket();
}

function removeItem(index) {
    basket.splice(index, 1);
    if (basket.length === 0) clearBasketStorage();
    renderBasket();
}

function orderNow(total) {
    saveLastOrder(total);
    basket = [];
    clearBasketStorage();
    renderBasket();
    renderDialog();
    openModal();
}

function openBasket() {
    let basketEl = document.getElementById('basketSection');
    basketEl.classList.toggle('showBasket');
    document.body.style.overflow = basketEl.classList.contains('showBasket') ? 'hidden' : '';
}

function renderDialog() {
    let dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.classList.remove('d_none');
        dialog.innerHTML = getDialogTemplate();
    }
}

function openModal() {
    let dialog = document.getElementById('myDialog');
    document.getElementById('basketSection').classList.add('d_none');
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    modalTimeout = setTimeout(closeModal, 3000);
}

function closeModal() {
    let dialog = document.getElementById('myDialog');
    let basketEl = document.getElementById('basketSection');
    clearTimeout(modalTimeout);
    if (dialog.open) dialog.close();
    document.body.style.overflow = '';
    basketEl.classList.remove('showBasket', 'd_none');
    dialog.classList.add('d_none');
    window.scrollTo({ top: 0 });
}

function updateBasketBadge() {
    let badge = document.getElementById('basketBadge');
    if (!badge) return;
    let totalItems = basket.reduce((sum, item) => sum + item.amount, 0);
    badge.textContent = totalItems;
    badge.classList.toggle('d_none', totalItems === 0);
}

window.addEventListener('resize', () => {
    let basketEl = document.getElementById('basketSection');
    if (window.innerWidth > 768 && basketEl.classList.contains('showBasket')) {
        basketEl.classList.remove('showBasket');
        document.body.style.overflow = '';
    }
});
