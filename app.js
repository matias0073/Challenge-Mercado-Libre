
let cart = [];

function searchProducts() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery === '') return;

    const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(searchQuery)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const title = document.createElement('h2');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `Precio: $${product.price}`;

        const image = document.createElement('img');
        image.src = product.thumbnail;
        image.alt = product.title;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            productElement.remove();
        });

        productElement.appendChild(image);
        productElement.appendChild(title);
        productElement.appendChild(price);
        productElement.appendChild(addToCartButton);

        productList.appendChild(productElement);
    });
}

function addToCart(product) {
    cart.push(product);
    updateCartUI();
    saveCartToLocalStorage();
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

        cartItem.appendChild(title);
        cartItem.appendChild(price);

        cartList.appendChild(cartItem);
    });

    
    const cartCounter = document.getElementById('cartCounter');
    cartCounter.textContent = cart.length.toString();
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}


function buy() {
    cart = [];
    updateCartUI();
    saveCartToLocalStorage();
}


const buyButton = document.getElementById('buyButton');
buyButton.addEventListener('click', buy);

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
});
