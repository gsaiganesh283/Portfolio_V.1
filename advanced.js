// ==========================================
// ADVANCED PORTFOLIO FEATURES
// ==========================================

// Wait for DOM to be ready
function initAdvancedFeatures() {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        const speed = 0.15;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Magnetic buttons
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Reading Progress Bar
function initProgressBar() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.pageYOffset / documentHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Terminal Welcome Screen
const terminalCommands = [
    { cmd: 'ssh visitor@portfolio', delay: 100 },
    { cmd: 'Connecting to portfolio server...', delay: 800 },
    { cmd: '> Establishing secure connection...', delay: 600 },
    { cmd: '> Connection established successfully!', delay: 500 },
    { cmd: '> Loading portfolio data...', delay: 700 },
    { cmd: '> Initializing interactive experience...', delay: 600 },
    { cmd: '> Welcome! Redirecting to main interface...', delay: 500 }
];

let terminalIndex = 0;
let terminalCharIndex = 0;
let currentTerminalCmd = '';

function typeTerminalCommand() {
    const terminalCmdElement = document.getElementById('terminal-command');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (terminalIndex < terminalCommands.length) {
        const current = terminalCommands[terminalIndex];
        currentTerminalCmd = current.cmd;
        
        if (terminalCharIndex < currentTerminalCmd.length) {
            terminalCmdElement.textContent = currentTerminalCmd.substring(0, terminalCharIndex + 1);
            terminalCharIndex++;
            setTimeout(typeTerminalCommand, 50);
        } else {
            // Command finished, add to output
            const output = document.createElement('div');
            output.className = 'terminal-output-line';
            output.innerHTML = `<span class="success">✓</span> ${currentTerminalCmd}`;
            terminalOutput.appendChild(output);
            
            terminalCmdElement.textContent = '';
            terminalCharIndex = 0;
            terminalIndex++;
            
            if (terminalIndex < terminalCommands.length) {
                setTimeout(typeTerminalCommand, current.delay);
            } else {
                setTimeout(() => {
                    document.getElementById('terminal-screen').classList.add('hidden');
                }, 1000);
            }
        }
    }
}

function skipTerminal() {
    document.getElementById('terminal-screen').classList.add('hidden');
}

// Auto-skip terminal on load
window.addEventListener('load', () => {
    // Automatically skip terminal screen
    setTimeout(() => {
        skipTerminal();
    }, 100);
});

// 3D Background with Three.js
function init3DBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    if (particles) {
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Handle resize
function handleWindowResize(camera, renderer) {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Store for resize handler
window._handleResizeWithCamera = handleWindowResize;

// Glitch Text Effect
function createGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glitch-active');
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 500);
        });
    });
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize scramble effect
setTimeout(() => {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    scrambleElements.forEach(el => {
        const fx = new TextScramble(el);
        const originalText = el.innerText;
        
        el.addEventListener('mouseenter', () => {
            fx.setText(originalText);
        });
    });
}, 2000);

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

function initGSAPAnimations() {
    // Hero elements fade in
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 3,
        ease: 'power3.out'
    });
    
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });
    
    // Skill cards stagger
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6
    });
    
    // Project cards with 3D effect
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            opacity: 0,
            rotateY: 90,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    });
    
    // Parallax background shapes
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 300,
        rotation: 360
    });
    
    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        rotation: -180
    });
    
    gsap.to('.shape-3', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 400,
        rotation: 270
    });
}

// Skills Radar Chart
function createSkillsRadarChart(skills) {
    const ctx = document.getElementById('skills-radar-chart');
    if (!ctx) return;
    
    const labels = skills.slice(0, 6).map(s => s.name);
    const data = skills.slice(0, 6).map(s => s.level);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skill Level',
                data: data,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgb(99, 102, 241)',
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 102, 241)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: 'rgba(148, 163, 184, 0.8)'
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.2)'
                    },
                    pointLabels: {
                        color: 'rgba(241, 245, 249, 0.9)',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Project Filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects with animation
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(project, {
                        opacity: 1,
                        scale: 1,
                        display: 'block',
                        duration: 0.4
                    });
                } else {
                    gsap.to(project, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        onComplete: () => {
                            project.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Smooth Scroll with Lenis alternative (using GSAP)
function initSmoothScroll() {
    gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0,
        ease: 'power2.inOut'
    });
}

// Hover interactions for links and buttons
function initHoverInteractions() {
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorDot = document.querySelector('.cursor-dot');
    if (!cursorOutline || !cursorDot) return;

    document.querySelectorAll('a, button, .btn, input, textarea, select, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorDot.style.width = '20px';
            cursorDot.style.height = '20px';
            cursorDot.style.background = 'linear-gradient(135deg, #ff006e, #8000ff)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '45px';
            cursorOutline.style.height = '45px';
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorDot.style.background = 'linear-gradient(135deg, #00d4ff, #ff006e)';
        });
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cursor and progress bar
    initAdvancedFeatures();
    initProgressBar();
    initHoverInteractions();
    
    // Initialize 3D background
    init3DBackground();
    createGlitchEffect();
    
    // Delay GSAP animations until terminal is done
    setTimeout(() => {
        initGSAPAnimations();
    }, 4000);
    
    // Initialize project filters after content loads
    setTimeout(() => {
        initProjectFilters();
    }, 1000);
});

// Export function to be called from main script
window.createSkillsRadarChart = createSkillsRadarChart;

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Performance monitoring
console.log('%c🚀 Advanced Portfolio Loaded', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cPowered by Three.js, GSAP, Chart.js', 'color: #8b5cf6; font-size: 12px;');
