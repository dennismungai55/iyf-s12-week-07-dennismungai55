// Product list
const products = [
    { name: 'Laptop', price: 50000, quantity: 2 },
    { name: 'Phone', price: 30000, quantity: 1 },
    { name: 'Mouse', price: 1500, quantity: 3 },
];

// Calculate the total price of all products
function calculateTotal() {
    let total = 0;

    products.forEach((product) => {
        total += product.price * product.quantity;
    });

    return total;
}

// Add a new product with basic error handling
function addProduct(name, price, quantity) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        console.error('Invalid product name.');
        return;
    }

    if (!Number.isFinite(price) || price <= 0) {
        console.error('Price must be a positive number.');
        return;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        console.error('Quantity must be a positive whole number.');
        return;
    }

    products.push({
        name: name.trim(),
        price: price,
        quantity: quantity,
    });

    console.log('Product added successfully.');
}

// Display all products
function displayProducts() {
    if (products.length === 0) {
        console.log('No products available.');
        return;
    }

    products.forEach((product) => {
        console.log(
            `${product.name} - KSh ${product.price} x ${product.quantity}`
        );
    });
}

// Display the shopping summary
function displaySummary() {
    displayProducts();
    console.log(`Total: KSh ${calculateTotal()}`);
}

// Run the program
addProduct('Keyboard', 2500, 2);
displaySummary();

// Test error handling
addProduct('', -100, 0);
