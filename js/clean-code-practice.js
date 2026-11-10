
// BAD: Unclear variable names
const d = new Date();
const x = [15, 20, 17, 25, 30].filter(u => u > 18);

// GOOD: Meaningful variable names
const currentDate = new Date();

const adultAges = [15, 20, 17, 25, 30].filter(
    age => age > 18
);

// BAD: Unclear function name and parameters
function calc(a, b) {
    return a * b * 0.1;
}

// GOOD: Descriptive function and parameter names
function calculateDiscount(price, quantity) {
    const DISCOUNT_RATE = 0.1;

    return price * quantity * DISCOUNT_RATE;
}

// Display results
console.log("Current date:", currentDate);
console.log("Adult ages:", adultAges);
console.log("Discount:", calculateDiscount(1000, 2));



// =====================================
// EXERCISE 2: SINGLE RESPONSIBILITY
// =====================================

// Job 1: Validate user information
function validateUser(userData) {
    if (!userData.email.includes("@")) {
        throw new Error("Invalid email address");
    }

    if (userData.age < 18) {
        throw new Error("Must be at least 18 years old");
    }

    return true;
}

// Job 2: Clean and organize user information
function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.toLowerCase(),
        name: userData.name.trim()
    };
}

// Job 3: Create a user
function createUser(userData) {
    validateUser(userData);

    const normalizedUser = normalizeUser(userData);

    console.log("User created:", normalizedUser);

    return normalizedUser;
}

// Test the functions
const newUser = {
    name: "  Dennis Mungai  ",
    email: "mungaidennis@gmail.com",
    age: 21
};

createUser(newUser);



// =====================================
// EXERCISE 3: AVOID MAGIC NUMBERS
// =====================================

// Meaningful constants
const MIN_PASSWORD_LENGTH = 8;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const HTTP_NOT_FOUND = 404;

// Password validation
const password = "javascript123";

if (password.length < MIN_PASSWORD_LENGTH) {
    console.log("Password is too short");
} else {
    console.log("Password is strong enough");
}

// Display one day in milliseconds
console.log("One day in milliseconds:", ONE_DAY_MS);

// Check HTTP response status
const responseStatus = 404;

if (responseStatus === HTTP_NOT_FOUND) {
    console.log("Page not found");
}
