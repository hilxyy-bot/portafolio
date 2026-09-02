// Iñaki Santiago López García - Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initTypewriter();
    initMobileMenu();
});

// --- TYPEWRITER EFFECT ---
const typewriterPhrases = [
    "Ingeniero en Robótica y Sistemas Digitales",
    "Especialista en Ensamble Robótico",
    "Programador C++ / Python / Java",
    "Certificado en Arduino & Robomind",
    "Comunicación Trilingüe (ES / EN / FR)"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    function type() {
        const currentPhrase = typewriterPhrases[phraseIndex];
        
        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// --- HERO IMAGE SWITCHER ---
function changeHeroImage(src, title, subtitle) {
    const mainImg = document.querySelector('#hero img');
    const badgeTitle = document.querySelector('#hero .font-orbitron.font-bold');
    const badgeSub = document.querySelector('#hero .font-mono.text-xs.text-cyan-400');
    const thumbs = document.querySelectorAll('.hero-thumb');

    if (mainImg) mainImg.src = src;
    if (badgeTitle) badgeTitle.textContent = title;
    if (badgeSub) badgeSub.textContent = subtitle;

    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(src.split('/')[1])) {
            thumb.classList.add('active');
            thumb.classList.remove('border-slate-700');
        } else {
            thumb.classList.remove('active');
            thumb.classList.add('border-slate-700');
        }
    });
}

// --- LIGHTBOX MODAL ---
function openLightbox(src, title) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-title');

    if (modal && img && caption) {
        img.src = src;
        caption.textContent = title;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(e) {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

// --- INTERACTIVE HUD TERMINAL ---
function handleTerminalSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    // Append user line
    const userLine = document.createElement('p');
    userLine.className = 'text-cyan-400 font-bold';
    userLine.innerHTML = `<span class="text-slate-500">inaki@robotics-core:~$</span> ${escapeHtml(cmd)}`;
    output.appendChild(userLine);

    // Process command
    const response = document.createElement('div');
    response.className = 'space-y-1 my-1 text-slate-300';

    switch (cmd) {
        case 'help':
            response.innerHTML = `
                <p class="text-cyan-400 font-bold">Comandos disponibles:</p>
                <p><span class="text-yellow-400">about</span> - Muestra el resumen profesional</p>
                <p><span class="text-yellow-400">skills</span> - Muestra las habilidades esenciales</p>
                <p><span class="text-yellow-400">education</span> - Historial académico y honores</p>
                <p><span class="text-yellow-400">contact</span> - Datos directos de contacto</p>
                <p><span class="text-yellow-400">clear</span> - Limpia la pantalla de la terminal</p>
            `;
            break;
        case 'about':
            response.innerHTML = `
                <p><strong class="text-cyan-400">Iñaki Santiago López García</strong> - Ingeniero en Robótica y Sistemas Digitales.</p>
                <p>Especialista en mecatrónica, ensamblaje de componentes robóticos y programación de microcontroladores.</p>
            `;
            break;
        case 'skills':
            response.innerHTML = `
                <p class="text-cyan-400">Core Stack:</p>
                <p>• Ensamble mecatrónico & soldadura de precisión</p>
                <p>• C++, Python, Java, Arduino, Robomind</p>
                <p>• Idiomas: Español (Natal), Francés (DELF B2), Inglés (B1)</p>
            `;
            break;
        case 'education':
            response.innerHTML = `
                <p class="text-cyan-400">Promedios Académicos:</p>
                <p>• Preparatoria CUM (2023-2026): 9.11</p>
                <p>• Sec. Carol Baur (2020-2023): 9.88 (Honores)</p>
                <p>• Primaria CADI (2019-2020): 9.76 (Honores)</p>
                <p>• Primaria Benedictino (2016-2019): 9.4 (Campeón Robótica)</p>
            `;
            break;
        case 'contact':
            response.innerHTML = `
                <p class="text-cyan-400">Direct Contact:</p>
                <p>• Teléfono: +52 56-3284-0335</p>
                <p>• Email: 94230042@cum.maristas.edu.mx</p>
                <p>• Ubicación: Narvarte Poniente, Benito Juárez, CDMX</p>
            `;
            break;
        case 'clear':
            output.innerHTML = '';
            input.value = '';
            return;
        default:
            response.innerHTML = `<p class="text-red-400">Comando no reconocido: '${escapeHtml(cmd)}'. Escribe <span class="text-cyan-400 font-bold">'help'</span> para ayuda.</p>`;
    }

    output.appendChild(response);
    input.value = '';
    output.scrollTop = output.scrollHeight;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// --- INTERACTIVE BACKGROUND CANVAS ---
function initCanvas() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(width / 25), 55);

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 1.5 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
