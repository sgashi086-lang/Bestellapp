function saveToLocalStorage() {
    localStorage.setItem('bestellapp_basket', JSON.stringify(basket));
    localStorage.setItem('bestellapp_delivery', JSON.stringify(isDelivery));
}

function saveRatingStorage() {
    if (hasRated) {
        localStorage.setItem('bestellapp_rating', JSON.stringify(true));
    } else {
        localStorage.removeItem('bestellapp_rating');
    }
}

function loadFromLocalStorage() {
    let savedBasket = localStorage.getItem('bestellapp_basket');
    let savedDelivery = localStorage.getItem('bestellapp_delivery');
    let savedRating = localStorage.getItem('bestellapp_rating');
    if (savedBasket) basket = JSON.parse(savedBasket);
    if (savedDelivery !== null) isDelivery = JSON.parse(savedDelivery);
    if (savedRating !== null) hasRated = JSON.parse(savedRating);
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