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

// Whiteboard Canvas Setup
const canvas = document.getElementById("whiteboardCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

// Start drawing when the mouse is pressed
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw as the mouse moves
canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = "#000"; // Set drawing color (black)
        ctx.lineWidth = 2; // Set line width
        ctx.lineCap = "round"; // Smooth the line ends
        ctx.stroke();
    }
});

// Stop drawing when the mouse is released
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();
});

// Clear the canvas
document.getElementById("clearCanvasBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-tab");
            const targetSection = document.getElementById(targetId);
            
            // Scroll to the section smoothly
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});
