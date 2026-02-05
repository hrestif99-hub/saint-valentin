const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const buttonsContainer = document.querySelector('.buttons-container');

// Fonction pour déplacer le bouton "Non"
function moveButton(e) {
    const btnRect = noBtn.getBoundingClientRect();
    const containerRect = buttonsContainer.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
        Math.pow(e.clientY - btnCenterY, 2)
    );

    if (distance < 100) {
        noBtn.style.position = 'absolute';

        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }
}

// Déplacer le bouton "Non" quand la souris bouge
buttonsContainer.addEventListener('mousemove', moveButton);

// Également déplacer le bouton au survol direct
noBtn.addEventListener('mouseenter', (e) => {
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
});

// Quand on clique sur "Oui"
yesBtn.addEventListener('click', () => {
    buttonsContainer.style.display = 'none';
    successMessage.classList.remove('hidden');

    showHearts = false;
    hearts = [];

    for (let i = 0; i < 6; i++) {
        firework(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2
        );
    }

    animateFireworks();
});


// Si quelqu'un arrive à cliquer sur "Non" (très difficile)
noBtn.addEventListener('click', () => {
    alert('Tu es sûre ? 🥺');
});

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let hearts = [];
let showHearts = true;

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function drawHeart(heart) {
    ctx.fillStyle = `rgba(231, 76, 60, ${heart.opacity})`;
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(heart.x - heart.size, heart.y - heart.size,
                      heart.x - heart.size * 2, heart.y + heart.size,
                      heart.x, heart.y + heart.size * 2);
    ctx.bezierCurveTo(heart.x + heart.size * 2, heart.y + heart.size,
                      heart.x + heart.size, heart.y - heart.size,
                      heart.x, heart.y);
    ctx.fill();
}

function animateHearts() {
    if (!showHearts) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        hearts.push(createHeart());
    }

    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart);

        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();
function firework(x, y) {
    for (let i = 0; i < 80; i++) {
        fireworks.push({
            x,
            y,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            life: 100
        });
    }
}

let fireworks = [];

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) fireworks.splice(i, 1);
    });

    requestAnimationFrame(animateFireworks);
}
