
const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const status = document.getElementById("status");

// Load saved values and save new input
inputs.forEach(input => {
    const saved = sessionStorage.getItem(`form_${input.name}`);

    if (saved !== null) {
        input.value = saved;
    }

    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
        status.textContent = "Your entries are saved!";
    });
});

// Clear saved values after successful submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });

    form.reset();
    status.textContent = "Form submitted successfully! Saved entries cleared.";
});
