
// =====================================
// EXERCISE 1: CONSOLE METHODS
// =====================================

// Basic logging
console.log("Welcome to JavaScript debugging!");

// Styled logging
console.log("%cImportant!", "color: red; font-size: 20px;");

// Warnings and errors
console.warn("This might be a problem");
console.error("This is definitely wrong");

// Tables for arrays and objects
const users = [
    { name: "Dennis", age: 21 },
    { name: "John", age: 25 },
    { name: "Mary", age: 19 }
];

console.table(users);

// Grouping messages
console.group("User Processing");
console.log("Step 1: Validate user");
console.log("Step 2: Save user");
console.groupEnd();

// Timing
console.time("calculation");

let total = 0;

for (let i = 0; i < 100000; i++) {
    total += i;
}

console.timeEnd("calculation");

// Conditional logging
const x = 10;
console.assert(x > 0, "x should be positive");

// Stack trace
console.trace("How did we get here?");



// =====================================
// EXERCISE 2: BREAKPOINT PRACTICE
// =====================================

export function runBreakpointDemo() {
    let price = 100;
    let quantity = 3;

    let total = price * quantity;

    console.log("Total price:", total);

    total = total + 50;

    console.log("Updated total:", total);
}



function calculateOrderTotal(items) {
    let orderTotal = 0;

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        orderTotal += item.price * item.quantity;
    }

    if (orderTotal > 100) {
        orderTotal *= 0.9;
    }

    return orderTotal;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 }
];

console.log("Correct order total:", calculateOrderTotal(order));
