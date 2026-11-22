let basket = [];
const DELIVERY_FEE = 4.99;
let isDelivery = true;

function clearBasketContainers(toggle, items, summary) {
    toggle.innerHTML = '';
    items.innerHTML = '';
    summary.innerHTML = '';
}

function findBasketItem(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) {
            return basket[i];
        }
    }
    return undefined;
}

function addToBasket(name, price) {
    let existingItem = findBasketItem(name);
    if (existingItem) {
        existingItem.amount++;
    } else {
        basket.push({ name: name, price: price, amount: 1 });
    }
    renderBasket();
}

function renderBasket() {
    let toggleContainer = document.getElementById('deliveryToggleContainer')
    let basketItems = document.getElementById('basketItems');
    let basketSummary = document.getElementById('basketSummary');
    clearBasketContainers(toggleContainer, basketItems, basketSummary);
    if (basket.length === 0) {
        basketItems.innerHTML = `<p>No Order yet</p>`
        return;
    }
    toggleContainer.innerHTML = getDeliveryToggleTemplate(isDelivery);
    renderBasketItems(basketItems);
    renderBasketSummary(basketSummary);
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
    let currentDeliveryFee = (isDelivery && subtotal <= 35) ? DELIVERY_FEE : 0;
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
        basket.splice(index, 1)
    }
    renderBasket();
}

function removeItem(index) {
    basket.splice(index, 1)
    renderBasket();
}

function orderNow() {
    basket = [];
    renderBasket();
}

renderBasket();