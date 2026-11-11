const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistory = document.getElementById('search-history');

// Load saved searches from localStorage
let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Display search history
function displaySearches() {
    searchHistory.innerHTML = '';

    searches.forEach((search) => {
        const listItem = document.createElement('li');
        const historyButton = document.createElement('button');

        historyButton.textContent = search;

        historyButton.addEventListener('click', () => {
            searchInput.value = search;
            performSearch();
        });

        listItem.appendChild(historyButton);
        searchHistory.appendChild(listItem);
    });
}

// Perform a search
function performSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    // Remove duplicates
    searches = searches.filter((item) => item !== searchTerm);

    // Add the newest search at the beginning
    searches.unshift(searchTerm);

    // Keep only the latest 5 searches
    searches = searches.slice(0, 5);

    // Save searches
    localStorage.setItem('recentSearches', JSON.stringify(searches));

    console.log('Searching for:', searchTerm);

    displaySearches();
    searchInput.value = '';
}

// Search button
searchButton.addEventListener('click', performSearch);

// Allow Enter key to search
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Show saved searches when page loads
displaySearches();
