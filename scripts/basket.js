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
    let toggleContainer = document.getElementById('deliveryToggleContainer')
    let basketItems = document.getElementById('basketItems');
    let basketSummary = document.getElementById('basketSummary');
    clearBasketContainers(toggleContainer, basketItems, basketSummary);
    toggleEmptyBasket();
    if (basket.length === 0) {
        return;
    }
    toggleContainer.innerHTML = getDeliveryToggleTemplate(isDelivery);
    renderBasketItems(basketItems);
    renderBasketSummary(basketSummary);
    // removeContent();
}

function removeContent() {
    let basketSection  = document.getElementById('basketContainer');
    let basketItems  = document.getElementById('basketItems');
    if (basketItems.innerHTML.trim() === '' || basketItems.textContent.includes('No Order yet')) {
        basketSection.classList.add('d_none');
    }
    else {
        basketSection.classList.remove('d_none');
    }
    toggleEmptyTemplate();
}

function toggleEmptyBasket() {
    let basketSection = document.getElementById('basketSection');
    let basketContainer = document.getElementById('basketContainer');
    let basketEmpty = document.getElementById('emptyBasket');
    if (basket.length === 0) {
        basketContainer.classList.add('d_none');
        if (!basketEmpty) {
            basketSection.innerHTML += getEnptyBasketTemplate();
        }
    } else {
        basketContainer.classList.remove('d_none');
        if (basketEmpty) {
            basketEmpty.remove();
        }
    }
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
    let content = document.getElementById('basketContainer');
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1)
    }
    if (basket.length === 0) {
        content.classList.add('d_none');
    }
    renderBasket();
}

function removeItem(index) {
    let content = document.getElementById('basketContainer');
    basket.splice(index, 1);
    renderBasket();

    if (basket.length === 0) {
        content.classList.add('d_none');
    }
}

function orderNow() {
    basket = [];
    renderBasket();
    renderDialog();
    toggleModal();
}

function toggleModal() {
    let dialog = document.getElementById('myDialog');
    if (dialog.open) {
        closeModal();
    } else {
        openModal();
    }
}

function activateButton() {
    const buttons = document.querySelectorAll('.deliveryToggle button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });           
    });
}

function renderDialog() {
    let dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.classList.remove('d_none')
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
    clearTimeout(modalTimeout);
    if (dialog.open) {
        dialog.close();
    }
    document.body.style.overflow = '';
    document.getElementById('basketSection').classList.remove('d_none');
    document.getElementById('myDialog').classList.add('d_none');
}

renderBasket();