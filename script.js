// Product data
const products = [
    { id: 1, name: 'iPhone 14 Pro', category: 'phones', price: 999, image: 'images/iphone-14-pro.png', description: 'The latest Pro iPhone with advanced features.', rating: 4.8 },
    { id: 2, name: 'iPhone 14', category: 'phones', price: 799, image: 'images/iphone-14.png', description: 'The powerful iPhone 14 for everyday use.', rating: 4.7 },
    { id: 3, name: 'iPad Pro', category: 'tablets', price: 799, image: 'images/ipad-pro.png', description: 'Powerful tablet for professionals.', rating: 4.9 },
    { id: 4, name: 'iPad Air', category: 'tablets', price: 599, image: 'images/ipad-air.png', description: 'Lightweight and powerful tablet for creatives.', rating: 4.7 },
    { id: 5, name: 'MacBook Pro', category: 'laptops', price: 1299, image: 'images/macbook-pro.png', description: 'High-performance laptop for professionals.', rating: 4.8 },
    { id: 6, name: 'MacBook Air', category: 'laptops', price: 999, image: 'images/macbook-air.png', description: 'Ultra-thin, ultra-capable laptop.', rating: 4.7 },
    { id: 7, name: 'Apple Watch Series 8', category: 'watches', price: 399, image: 'images/apple-watch-8.png', description: 'Advanced health features and fitness tracking.', rating: 4.6 },
    { id: 8, name: 'AirPods Pro', category: 'accessories', price: 249, image: 'images/airpods-pro.png', description: 'Immersive sound with active noise cancellation.', rating: 4.7 },
    { id: 9, name: 'iMac', category: 'desktops', price: 1299, image: 'images/imac.png', description: 'All-in-one desktop computer with stunning display.', rating: 4.8 },
    { id: 10, name: 'Mac Mini', category: 'desktops', price: 699, image: 'images/mac-mini.png', description: 'Compact desktop computer with powerful performance.', rating: 4.6 }
];

let cart = [];

// Utility functions
const formatPrice = (price) => `$${price.toFixed(2)}`;

const displayProducts = (category = 'all') => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <p>Rating: ${product.rating}/5</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="showProductDetails(${product.id})">View Details</button>
        `;
        productsContainer.appendChild(productCard);
    });
};

const displayFeaturedProducts = () => {
    const featuredProductsContainer = document.querySelector('.featured-products-grid');
    const featuredProducts = products.slice(0, 4); // Display the first 4 products as featured
    
    featuredProductsContainer.innerHTML = '';
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'featured-product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        featuredProductsContainer.appendChild(productCard);
    });
};

const showProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with id ${productId} not found`);
        return;
    }
    const productModal = document.getElementById('product-modal');
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: ${formatPrice(product.price)}</p>
        <p>Rating: ${product.rating}/5</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productModal.style.display = 'block';
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with id ${productId} not found`);
        return;
    }
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const cartItemCount = document.getElementById('cart-item-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = totalItems;
    
    // Update cart icon
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span id="cart-item-count">${totalItems}</span>
    `;
};

const displayCart = () => {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartModal || !cartItems || !cartTotal) {
        console.error('One or more cart elements not found');
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty</li>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <li>
                    ${item.name} - ${item.quantity} x ${formatPrice(item.price)}
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </li>
            `;
        });
    }
    
    cartTotal.textContent = `Total: ${formatPrice(total)}`;
    cartModal.style.display = 'block';
};

const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartDisplay();
        displayCart();
    }
};

const searchProducts = () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    const matchingProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    if (matchingProducts.length === 0) {
        searchResults.innerHTML = '<p>No products found.</p>';
    } else {
        matchingProducts.forEach(product => {
            searchResults.innerHTML += `
                <div class="search-result-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${formatPrice(product.price)}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                        <button onclick="showProductDetails(${product.id})">View Details</button>
                    </div>
                </div>
            `;
        });
    }
};

const filterProducts = () => {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const filteredProducts = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    displayFilteredProducts(filteredProducts);
};

const displayFilteredProducts = (filteredProducts) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products match your criteria.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>
                <p>Rating: ${product.rating}/5</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="showProductDetails(${product.id})">View Details</button>
            `;
            productsContainer.appendChild(productCard);
        });
    }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', searchProducts);
    document.getElementById('filter-button').addEventListener('click', filterProducts);
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.getAttribute('data-category'));
        });
    });
    document.getElementById('cart-icon').addEventListener('click', displayCart);
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Initialize
    displayFeaturedProducts();
    displayProducts();
    updateCartDisplay();
});
