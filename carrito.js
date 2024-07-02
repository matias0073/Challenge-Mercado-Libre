
let cart = [];



function incrementQuantity(product) {
    
        product.quantity++;
        updateCartUI();
        updateTotal();
        saveCartToLocalStorage();
    
}


function decrementQuantity(product) {
    if (product.quantity > 1) {
        product.quantity--;
        updateCartUI();
        updateTotal();
        saveCartToLocalStorage();
    }
    else {
        product.quantity = 1;
    }
}


function updateCartUI() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const title = document.createElement('h2');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `Precio: $${product.price}`;

        const quantityLabel = document.createElement('span');
        quantityLabel.textContent = 'Cantidad: ';

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = product.quantity;

        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.addEventListener('click', () => {
            incrementQuantity(product);
        });

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.addEventListener('click', () => {
            decrementQuantity(product);
        });

        const totalLabel = document.createElement('p');
        const totalPrice = product.price * product.quantity;
        totalLabel.textContent = `Total: $${totalPrice.toFixed(2)}`;

        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(document.createElement('br'));
        cartItem.appendChild(quantityLabel);
        cartItem.appendChild(quantityDisplay);
        cartItem.appendChild(incrementButton);
        cartItem.appendChild(decrementButton);
        cartItem.appendChild(document.createElement('br'));
        cartItem.appendChild(totalLabel);

        cartList.appendChild(cartItem);
    });
}


function updateTotal() {
    const totalElement = document.getElementById('total');
    if (totalElement) {
        let total = 0;

        cart.forEach(product => {
            const totalPrice = product.price * product.quantity;
            if (!isNaN(totalPrice)) {
                total += totalPrice;
            }
        });

        totalElement.textContent = `Precio Final: $${total.toFixed(2)}`;
    }
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartUI();
    updateTotal();
});


function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.getElementById('buyButton');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            buy();
            window.location.href = 'index.html';
        });
    }
});


function buy() {
    cart = [];
    updateCartUI();
    updateTotal();
    saveCartToLocalStorage();
}
