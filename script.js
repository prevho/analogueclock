//Create canvass object
var canvas = document.getElementById('canvas');

// Create 2D drawing object for the canvas object
var ctx = canvas.getContext('2d');

//Calculate radius using height
var radius = canvas.height / 2;

// Remap the position to the center of the canvas
ctx.translate(radius, radius);

// Reduce clock radius to 90 percent, so clock remains inside canvass
radius = radius * 0.90;

// Set Interval for moving hands in milliseconds
// Calling the function every milliseconds
setInterval(drawClock, 1000);

// Draw clock face
function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    // Draws white circle for the face
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);

    // Creating the radial gradient of the clock edges
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, '#fff');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // Draw the clock center
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

// Draw clock function for the face of the clock
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}
drawClock();


// Draw clock numbers
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for(num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// Create the time for the clock
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    // Minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

    // Second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

// Hour, Minute and Second Hands Creation Functions
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

