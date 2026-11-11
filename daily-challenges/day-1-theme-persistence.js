const themeButton = document.getElementById('theme-toggle');

// Load saved theme when the page opens
const savedTheme = localStorage.getItem('selectedTheme') || 'light';

document.body.classList.remove('light', 'dark');
document.body.classList.add(savedTheme);

// Switch theme when button is clicked
themeButton.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light')
        ? 'light'
        : 'dark';

    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);

    // Save selected theme
    localStorage.setItem('selectedTheme', newTheme);
});
