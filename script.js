const canvas = document.getElementById('underwaterCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Background gradient
const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
bgGradient.addColorStop(0, '#68a0cf'); // Light blue
bgGradient.addColorStop(1, '#1e4877'); // Dark blue
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Fish animation
let fish = [];

class Fish {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.direction = Math.random() * Math.PI * 2; // Random initial direction
    }

    update() {
        // Move fish in current direction
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Check boundaries and wrap around
        if (this.x > canvas.width + this.size) {
            this.x = -this.size;
        } else if (this.x < -this.size) {
            this.x = canvas.width + this.size;
        }
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
        } else if (this.y < -this.size) {
            this.y = canvas.height + this.size;
        }

        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFish() {
    for (let i = 0; i < 20; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 20 + 10; // Random size between 10 and 30
        let speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`; // Random color
        fish.push(new Fish(x, y, size, speed, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw fish
    fish.forEach(fish => fish.update());
}

createFish();
animate();
