// Get canvas and context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Array to store circles
let circles = [];
let selectedCircle = null;
let isDragging = false;

// Default radius and min radius
const DEFAULT_RADIUS = 20;
const MIN_RADIUS = 5;

// Helper function: redraw all circles
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle === selectedCircle ? 'red' : 'blue';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    });
}

// Helper function: get circle at position (if any)
function getCircleAt(x, y) {
    for (let i = circles.length - 1; i >= 0; i--) { // Check topmost first
        const circle = circles[i];
        const dx = x - circle.x;
        const dy = y - circle.y;
        if (Math.sqrt(dx * dx + dy * dy) <= circle.radius) {
            return circle;
        }
    }
    return null;
}

// Mouse down — select or add circle
canvas.addEventListener('mousedown', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedCircle = getCircleAt(mouseX, mouseY);
    if (clickedCircle) {
        selectedCircle = clickedCircle;
        isDragging = true;
    } else {
        // Add new circle and do NOT select it
        circles.push({ x: mouseX, y: mouseY, radius: DEFAULT_RADIUS });
        selectedCircle = null; // clear selection
    }
    drawCircles();
});

// Mouse move — drag selected circle
canvas.addEventListener('mousemove', function (e) {
    if (isDragging && selectedCircle) {
        const rect = canvas.getBoundingClientRect();
        selectedCircle.x = e.clientX - rect.left;
        selectedCircle.y = e.clientY - rect.top;
        drawCircles();
    }
});

// Mouse up — stop dragging
canvas.addEventListener('mouseup', function () {
    isDragging = false;
});

// Keydown — delete selected circle (Delete key)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete' && selectedCircle) {
        circles = circles.filter(c => c !== selectedCircle);
        selectedCircle = null;
        drawCircles();
    }
});

// Mouse wheel — resize selected circle
canvas.addEventListener('wheel', function (e) {
    if (selectedCircle) {
        e.preventDefault();
        if (e.deltaY < 0) {
            selectedCircle.radius += 2;
        } else {
            selectedCircle.radius = Math.max(MIN_RADIUS, selectedCircle.radius - 2);
        }
        drawCircles();
    }
});
