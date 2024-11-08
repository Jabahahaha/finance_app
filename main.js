// main.js - Entry point

import App from './App.js';

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Toggle Theme Function
document.getElementById('toggleThemeBtn').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    // Optionally save the theme in local storage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load theme from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
