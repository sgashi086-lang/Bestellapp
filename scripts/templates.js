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
        <div class="basketCard">
            <div class="basketCardTop">
                <span class="basketItemTitle">${item.amount} x ${item.name}</span>
                <button type="button" class="deleteBtn" onclick="removeItem(${index})" aria-label="Eintrag löschen">
                    <img src="./assets/icons/delete_icon.png" alt="Delete Icon">
                </button>
            </div>
            <div class="basketCardBottom">
                <div class="amountControls">
                    <button type="button" onclick="decreaseAmount(${index})">
                        <img src="./assets/icons/minus_icon.png" alt="Minus Icon">
                    </button>
                    <span>${item.amount}</span>
                    <button type="button" onclick="increaseAmount(${index})">
                        <img src="./assets/icons/plus_icon.png" alt="Plus Icon">
                    </button>
                </div>
                <span class="basketItemPrice">${(item.price * item.amount).toFixed(2)} $</span>
            </div>
        </div>
        <hr>
    `;
}

function getBasketSummaryTemplate(subtotal, deliveryFee, total) {
    return `
        <div class="summaryRow">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} $</span>
        </div>
        <div class="summaryRow">
            <span>Delivery fee</span>
            <span>${deliveryFee.toFixed(2)} $</span>
        </div>
        <hr class="summaryDivider">
        <div class="summaryRow totalRow">
            <span>Total</span>
            <span>${total.toFixed(2)} $</span>
        </div>
        <button type="button" class="buyBtn" onclick="orderNow()">
            Buy now (${total.toFixed(2)} $)
        </button>
    `;
}

function getDeliveryToggleTemplate(isDelivery) {
    return `
        <div class="deliveryToggle">
            <button type="button" class="toggleBtn ${isDelivery ? 'active' : ''}" onclick="setDeliveryMode(true)">
                <img src="./assets/icons/delivery_icon2.png" alt="Delivery Icon">
                Delivery
            </button>
            <button type="button" class="toggleBtn ${!isDelivery ? 'active' : ''}" onclick="setDeliveryMode(false)">
                <img src="./assets/icons/pickup_icon.png" alt="Pickup Icon">
                Pick-up
            </button>
        </div>
    `;
}

function getEnptyBasketTemplate() {
    return `
        <div class="emptyBasket" id="emptyBasket">
            <span>Your Basket</span>
            <p>Nothing here yet.
                Go ahead and choose something
                delicious!
            </p>
            <img src="./assets/icons/basket.png" alt="Basket Icon">
        </div>
    `;
}

function getDialogTemplate() {
    return `
        <div class="myDialog">
            <img src="./assets/icons/delivery_icon.png" alt="Delivery Icon">
            <div>
                <span>Order confirmed!</span>
                <p>Your food is on the way!</p>
            </div>
        </div>
    `
}