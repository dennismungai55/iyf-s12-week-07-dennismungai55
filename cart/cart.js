
// =====================================
// SHOPPING CART STATE
// =====================================

const state = {
    products: [
        {
            id: 1,
            name: "Laptop",
            price: 75000,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
        },
        {
            id: 2,
            name: "Smartphone",
            price: 35000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
        },
        {
            id: 3,
            name: "Headphones",
            price: 5000,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        }
    ],

    cart: []
};

const CART_KEY = "week7-shopping-cart";

// =====================================
// LOAD AND SAVE CART
// =====================================

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem(CART_KEY);

        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart.filter(item =>
            item &&
            state.products.some(product => product.id === item.productId) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch (error) {
        console.error("Could not load cart:", error);
        return [];
    }
}

// =====================================
// CART FUNCTIONS
// =====================================

// Add product to cart
function addToCart(productId) {
    const existing = state.cart.find(
        item => item.productId === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId,
            quantity: 1
        });
    }

    updateCart();
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = state.cart.find(
        item => item.productId === productId
    );

    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    item.quantity = quantity;
    updateCart();
}

// Remove product
function removeFromCart(productId) {
    state.cart = state.cart.filter(
        item => item.productId !== productId
    );

    updateCart();
}

// Calculate total price
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(
            product => product.id === item.productId
        );

        return total + product.price * item.quantity;
    }, 0);
}

// Calculate total quantity
function getCartCount() {
    return state.cart.reduce(
        (count, item) => count + item.quantity,
        0
    );
}

// =====================================
// DISPLAY PRODUCTS
// =====================================

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

function renderProducts() {
    productList.innerHTML = "";

    state.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `KSh ${product.price.toLocaleString()}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.dataset.id = product.id;

        button.addEventListener("click", () => {
            addToCart(product.id);
        });

        card.append(image, name, price, button);
        productList.appendChild(card);
    });
}

// =====================================
// DISPLAY CART
// =====================================

function renderCart() {
    cartItems.innerHTML = "";

    if (state.cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    state.cart.forEach(item => {
        const product = state.products.find(
            product => product.id === item.productId
        );

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent =
            `${product.name} - KSh ${product.price.toLocaleString()}`;

        const controls = document.createElement("div");

        const decrease = document.createElement("button");
        decrease.textContent = "-";
        decrease.addEventListener("click", () => {
            updateQuantity(item.productId, item.quantity - 1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = ` ${item.quantity} `;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.addEventListener("click", () => {
            updateQuantity(item.productId, item.quantity + 1);
        });

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove";
        remove.addEventListener("click", () => {
            removeFromCart(item.productId);
        });

        controls.append(decrease, quantity, increase, remove);
        div.append(name, controls);

        cartItems.appendChild(div);
    });

    cartCount.textContent = getCartCount();

    cartTotal.textContent = getCartTotal().toLocaleString();
}

// =====================================
// UPDATE CART AND PERSISTENCE
// =====================================

function updateCart() {
    saveCart();
    renderCart();
}

// Clear entire cart
clearCartButton.addEventListener("click", () => {
    state.cart = [];
    updateCart();
});

// =====================================
// START APPLICATION
// =====================================

state.cart = loadCart();

renderProducts();
renderCart();
