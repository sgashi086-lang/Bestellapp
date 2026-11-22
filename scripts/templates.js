function getMenuTemplate(item) {
    const safeName = item.name.replace(/'/g, "\\'");

    return `
        <div class="dishCard">
            <img src="${item.image || ''}" alt="${item.name}">
            <div class="infoBox">
                <span>${item.name}</span>
                <p>${item.ingredients}</p>
            </div>
            <div class="buyBox">
                <span>${item.price.toFixed(2)} $</span>
                <button type="button" onclick="addToBasket('${safeName}', ${item.price})">Add to basket</button>
            </div>
        </div>
    `;
}

function getBasketItemTemplate(item, index) {
    return `
        <div class="basketCard" id="basketCard>
            <div class="basketCardTop">
                <span class="basketItemTitle">${item.amount} x ${item.name}</span>
                <button type="button" class="deleteBtn" onclick="removeItem(${index})">x</button>
            </div>
            <div class="basketCardBottom">
                <div class="amountControls">
                    <button type="button" onclick="decreaseAmount(${index})">-</button>
                    <span>${item.amount}</span>
                    <button type="button" onclick="increaseAmount(${index})">+</button>
                </div>
                <span class="basketItemPrice">${(item.price * item.amount).toFixed(2).replace('.', ',')} $</span>
            </div>
        </div>
    `;
}

function getBasketSummaryTemplate(subtotal, deliveryFee, total) {
    return `
        <div class="summaryRow">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2).replace('.', ',')} $</span>
        </div>
        <div class="summaryRow">
            <span>Delivery fee</span>
            <span>${deliveryFee.toFixed(2).replace('.', ',')} $</span>
        </div>
        <hr class="summaryDivider">
        <div class="summaryRow totalRow">
            <span>Total</span>
            <span>${total.toFixed(2).replace('.', ',')} $</span>
        </div>
        <button type="button" class="buyBtn" onclick="orderNow()">
            Buy now (${total.toFixed(2).replace('.', ',')} $)
        </button>
    `;
}

function getDeliveryToggleTemplate(isDelivery) {
    return`
        <div class="deliveryToggle">
            <button type="button" class="toggleBtn ${isDelivery ? 'active' : ''}" onclick="setDeliveryMode(true)">
                Delivery
            </button>
            <button type="button" class="toggleBtn ${!isDelivery ? 'active' : ''}" onclick="setDeliveryMode(false)">
                Pickup
            </button>
        </div>
    `;
}