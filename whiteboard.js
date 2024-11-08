// whiteboard.js

const canvas = document.getElementById('whiteboardCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Set drawing properties
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.lineCap = 'round';

// Start drawing when the mouse is pressed down
function startDrawing(e) {
    drawing = true;
    draw(e);
}

// Stop drawing when the mouse is released
function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Begin a new path to prevent lines from joining
}

// Draw on the canvas
function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Event listener for the Clear button
document.getElementById('clearCanvasBtn').addEventListener('click', clearCanvas);
