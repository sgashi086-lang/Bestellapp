function saveToLocalStorage() {
    localStorage.setItem('bestellapp_basket', JSON.stringify(basket));
    localStorage.setItem('bestellapp_delivery', JSON.stringify(isDelivery));
}

function loadFromLocalStorage() {
    let savedBasket = localStorage.getItem('bestellapp_basket');
    let savedDelivery = localStorage.getItem('bestellapp_delivery');
    if (savedBasket) basket = JSON.parse(savedBasket);
    if (savedDelivery !== null) isDelivery = JSON.parse(savedDelivery);
}

function saveLastOrder(totalPrice) {
    let orderData = {
        ordered: true,
        totalPrice: totalPrice.toFixed(2) + '$'
    };
    localStorage.setItem('bestellapp_lastOrder', JSON.stringify(orderData));
}

function clearBasketStorage() {
    localStorage.removeItem('bestellapp_basket');
    localStorage.removeItem('bestellapp_delivery');
}