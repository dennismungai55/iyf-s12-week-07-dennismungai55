const form = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const status = document.getElementById('status');

const STORAGE_KEY = 'savedFormData';

// Restore saved information when the page loads
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        nameInput.value = savedData.name || '';
        emailInput.value = savedData.email || '';
        messageInput.value = savedData.message || '';

        status.textContent = 'Your previous information has been restored.';
    }
}

// Save form information
function saveFormData() {
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    status.textContent = 'Your information has been saved.';
}

// Automatically save every 5 seconds
setInterval(saveFormData, 5000);

// Clear saved information after submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.removeItem(STORAGE_KEY);

    form.reset();

    status.textContent = 'Form submitted! Saved information cleared.';
});

// Restore information when the page opens
loadSavedData();
