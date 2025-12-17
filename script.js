// Typing animation
// API base for PHP backend (empty string uses same domain)
const API_URL = (window.__API_URL__ || '');
const typingTexts = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast",
    "Creative Thinker"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize default data
function initializeData() {
    if (!localStorage.getItem('portfolioData')) {
        const defaultData = {
            hero: {
                navName: 'Your Name',
                title: 'Welcome to My Portfolio',
                subtitle: 'Passionate Professional | Creative Problem Solver',
                description: "Building innovative solutions for tomorrow's challenges"
            },
            about: {
                image: 'https://via.placeholder.com/400',
                name: 'Your Name',
                role: 'Professional Title',
                description: "I'm a passionate professional with a strong background in technology and innovation. I love creating solutions that make a difference and am always eager to learn new things.",
                stats: {
                    experience: '5+',
                    projects: '50+',
                    clients: '30+'
                }
            },
            skills: [
                {
                    id: 1,
                    name: 'Web Development',
                    icon: 'fa-code',
                    description: 'Building responsive and dynamic web applications',
                    level: 90
                },
                {
                    id: 2,
                    name: 'UI/UX Design',
                    icon: 'fa-palette',
                    description: 'Creating beautiful and intuitive user interfaces',
                    level: 85
                },
                {
                    id: 3,
                    name: 'Database Management',
                    icon: 'fa-database',
                    description: 'Designing and optimizing database systems',
                    level: 80
                }
            ],
            projects: [
                {
                    id: 1,
                    title: 'E-Commerce Platform',
                    description: 'A full-featured online shopping platform with payment integration',
                    image: 'https://via.placeholder.com/400x300',
                    tags: ['React', 'Node.js', 'MongoDB'],
                    category: 'web',
                    github: 'https://github.com',
                    demo: 'https://example.com'
                },
                {
                    id: 2,
                    title: 'Task Management App',
                    description: 'Collaborative task management tool for teams',
                    image: 'https://via.placeholder.com/400x300',
                    tags: ['Vue.js', 'Firebase', 'Tailwind'],
                    category: 'web',
                    github: 'https://github.com',
                    demo: 'https://example.com'
                }
            ],
            experience: [
                {
                    id: 1,
                    title: 'Senior Developer',
                    company: 'Tech Company Inc.',
                    date: '2020 - Present',
                    description: 'Leading development of innovative web applications and mentoring junior developers.'
                },
                {
                    id: 2,
                    title: 'Full Stack Developer',
                    company: 'Digital Solutions Ltd.',
                    date: '2018 - 2020',
                    description: 'Developed and maintained multiple client projects using modern web technologies.'
                }
            ],
            contact: {
                email: 'your.email@example.com',
                phone: '+1 (123) 456-7890',
                location: 'City, Country',
                social: {
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com'
                }
            },
            testimonials: [
                {
                    id: 1,
                    name: 'John Doe',
                    role: 'CEO, Tech Company',
                    avatar: 'https://i.pravatar.cc/150?img=12',
                    content: 'Outstanding work! Professional, creative, and always delivers on time. Highly recommended for any project.',
                    rating: 5
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    role: 'Product Manager',
                    avatar: 'https://i.pravatar.cc/150?img=45',
                    content: 'Excellent technical skills and great communication. Made our project a huge success!',
                    rating: 5
                },
                {
                    id: 3,
                    name: 'Mike Johnson',
                    role: 'Startup Founder',
                    avatar: 'https://i.pravatar.cc/150?img=33',
                    content: 'Creative problem solver with exceptional attention to detail. A pleasure to work with!',
                    rating: 5
                }
            ],
            certifications: [
                {
                    id: 1,
                    title: 'AWS Certified Developer',
                    issuer: 'Amazon Web Services',
                    date: '2023',
                    icon: 'fa-award'
                },
                {
                    id: 2,
                    title: 'Google Cloud Professional',
                    issuer: 'Google',
                    date: '2023',
                    icon: 'fa-certificate'
                },
                {
                    id: 3,
                    title: 'Full Stack Web Development',
                    issuer: 'Coursera',
                    date: '2022',
                    icon: 'fa-graduation-cap'
                }
            ],
            resumeUrl: '#'
        };
        localStorage.setItem('portfolioData', JSON.stringify(defaultData));
    }
}

// Load data from localStorage
async function loadData() {
    // Try PHP API first
    try {
        const res = await fetch(`${API_URL}/api/portfolio.php`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            // keep localStorage in sync for offline usage
            localStorage.setItem('portfolioData', JSON.stringify(data));
            return data;
        }
    } catch (e) {
        // ignore and fallback
    }
    // Fallback to localStorage
    initializeData();
    return JSON.parse(localStorage.getItem('portfolioData'));
}

// Save data to localStorage
function saveData(data) {
    // Save locally for instant UI
    localStorage.setItem('portfolioData', JSON.stringify(data));
    // Attempt to persist to API (fire-and-forget)
    try {
        fetch(`${API_URL}/api/portfolio.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (_) { /* no-op */ }
}

// Load and display portfolio content
async function loadPortfolioContent() {
    const data = await loadData();

    // Hero section
    document.getElementById('nav-name').textContent = data.hero.navName;
    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-description').textContent = data.hero.description;

    // About section
    document.getElementById('about-image').src = data.about.image;
    document.getElementById('about-name').textContent = data.about.name;
    document.getElementById('about-role').textContent = data.about.role;
    document.getElementById('about-description').textContent = data.about.description;
    document.getElementById('stats-experience').textContent = data.about.stats.experience;
    document.getElementById('stats-projects').textContent = data.about.stats.projects;
    document.getElementById('stats-clients').textContent = data.about.stats.clients;

    // Skills section with radar chart
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <i class="fas ${skill.icon}"></i>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <div class="skill-level">
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    });

    // Create radar chart if function exists
    if (typeof window.createSkillsRadarChart === 'function') {
        window.createSkillsRadarChart(data.skills);
    }

    // Projects section with categories
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    data.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category || 'web');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });

    // Experience section
    const experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = '';
    data.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'timeline-item';
        expItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${exp.date}</span>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        experienceContainer.appendChild(expItem);
    });

    // Contact section
    document.getElementById('contact-email').textContent = data.contact.email;
    document.getElementById('contact-phone').textContent = data.contact.phone;
    document.getElementById('contact-location').textContent = data.contact.location;

    // Social links
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = '';
    if (data.contact.social.linkedin) {
        socialLinks.innerHTML += `<a href="${data.contact.social.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>`;
    }
    if (data.contact.social.github) {
        socialLinks.innerHTML += `<a href="${data.contact.social.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>`;
    }
    if (data.contact.social.twitter) {
        socialLinks.innerHTML += `<a href="${data.contact.social.twitter}" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>`;
    }
    if (data.contact.social.instagram) {
        socialLinks.innerHTML += `<a href="${data.contact.social.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>`;
    }

    // Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = data.hero.navName;

    // Testimonials section
    const testimonialsContainer = document.getElementById('testimonials-container');
    const dotsContainer = document.getElementById('testimonial-dots');
    testimonialsContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    data.testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card scroll-reveal';
        testimonialCard.innerHTML = `
            <p class="testimonial-content">${testimonial.content}</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                    <div class="testimonial-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                    </div>
                </div>
            </div>
        `;
        testimonialsContainer.appendChild(testimonialCard);

        const dot = document.createElement('span');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => scrollToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    // Certifications section
    const certificationsContainer = document.getElementById('certifications-container');
    certificationsContainer.innerHTML = '';
    
    data.certifications.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'certification-card scroll-reveal';
        certCard.innerHTML = `
            <div class="certification-badge">
                <i class="fas ${cert.icon}"></i>
            </div>
            <h3>${cert.title}</h3>
            <p>${cert.issuer}</p>
            <span class="certification-date">${cert.date}</span>
        `;
        certificationsContainer.appendChild(certCard);
    });

    // Resume download link
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn && data.resumeUrl) {
        downloadBtn.href = data.resumeUrl;
    }

    // Initialize scroll reveal
    initScrollReveal();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Scroll reveal animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Testimonial scroll
function scrollToTestimonial(index) {
    const container = document.getElementById('testimonials-container');
    const cards = container.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form. In a real application, this would send your message.');
    this.reset();
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Particles.js configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6366f1'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Start typing animation after loading
        setTimeout(() => {
            typeText();
        }, 200);
    }, 200);
});

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadPortfolioContent();
    
    // Animate statistics counters when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.stat h4');
                statElements.forEach(el => {
                    const text = el.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        el.textContent = '0';
                        animateCounter(el, number);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
