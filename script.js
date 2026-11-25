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
renderBasket();