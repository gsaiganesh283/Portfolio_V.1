// Backend API base
// For local development: http://localhost:5050
// For production: update to your deployed backend URL
// Can also be overridden via window.__API_URL__ variable
const API_URL = (window.__API_URL__ || 'http://localhost:5050');

// Admin credentials (in a real application, this should be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAdminData();
    } else {
        document.getElementById('login-panel').style.display = 'flex';
        document.getElementById('admin-panel').style.display = 'none';
    }
}

// Login function
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorDiv.textContent = '';
        checkAuth();
    } else {
        errorDiv.textContent = 'Invalid username or password!';
    }
});

// Logout function
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Load data from localStorage
function loadData() {
    const data = localStorage.getItem('portfolioData');
    return data ? JSON.parse(data) : null;
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
    // Sync to MongoDB backend via Node.js API (non-blocking)
    try {
        fetch(`${API_URL}/api/portfolio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.warn('Failed to sync with MongoDB:', error);
    }
}

// Initialize default data if it doesn't exist
function initializeDefaultData() {
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
        resumeUrl: 'https://example.com/resume.pdf'
    };
    
    saveData(defaultData);
}

// Load admin data into forms
async function loadAdminData() {
    // Try to pull latest from MongoDB backend via Node.js API
    try {
        const res = await fetch(`${API_URL}/api/portfolio`, { cache: 'no-store' });
        if (res.ok) {
            const fresh = await res.json();
            localStorage.setItem('portfolioData', JSON.stringify(fresh));
        }
    } catch (error) {
        console.warn('Failed to fetch from MongoDB:', error);
        // Fallback: Initialize default data if it doesn't exist
        if (!loadData()) {
            initializeDefaultData();
        }
    }

    const data = loadData();
    if (!data) return;

    // Hero section
    document.getElementById('nav-name-input').value = data.hero.navName;
    document.getElementById('hero-title-input').value = data.hero.title;
    document.getElementById('hero-subtitle-input').value = data.hero.subtitle;
    document.getElementById('hero-description-input').value = data.hero.description;

    // About section
    document.getElementById('about-image-input').value = data.about.image;
    document.getElementById('about-name-input').value = data.about.name;
    document.getElementById('about-role-input').value = data.about.role;
    document.getElementById('about-description-input').value = data.about.description;
    document.getElementById('stats-experience-input').value = data.about.stats.experience;
    document.getElementById('stats-projects-input').value = data.about.stats.projects;
    document.getElementById('stats-clients-input').value = data.about.stats.clients;

    // Contact section
    document.getElementById('contact-email-input').value = data.contact.email;
    document.getElementById('contact-phone-input').value = data.contact.phone;
    document.getElementById('contact-location-input').value = data.contact.location;
    document.getElementById('social-linkedin-input').value = data.contact.social.linkedin;
    document.getElementById('social-github-input').value = data.contact.social.github;
    document.getElementById('social-twitter-input').value = data.contact.social.twitter;
    document.getElementById('social-instagram-input').value = data.contact.social.instagram;

    // Load lists
    loadSkillsList();
    loadProjectsList();
    loadExperienceList();
    loadTestimonialsList();
    loadCertificationsList();
    loadSettings();
}

// Hero form submission
document.getElementById('hero-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = loadData();
    
    data.hero.navName = document.getElementById('nav-name-input').value;
    data.hero.title = document.getElementById('hero-title-input').value;
    data.hero.subtitle = document.getElementById('hero-subtitle-input').value;
    data.hero.description = document.getElementById('hero-description-input').value;
    
    saveData(data);
    alert('Hero section updated successfully!');
});

// About form submission
document.getElementById('about-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = loadData();
    
    data.about.image = document.getElementById('about-image-input').value;
    data.about.name = document.getElementById('about-name-input').value;
    data.about.role = document.getElementById('about-role-input').value;
    data.about.description = document.getElementById('about-description-input').value;
    data.about.stats.experience = document.getElementById('stats-experience-input').value;
    data.about.stats.projects = document.getElementById('stats-projects-input').value;
    data.about.stats.clients = document.getElementById('stats-clients-input').value;
    
    saveData(data);
    alert('About section updated successfully!');
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = loadData();
    
    data.contact.email = document.getElementById('contact-email-input').value;
    data.contact.phone = document.getElementById('contact-phone-input').value;
    data.contact.location = document.getElementById('contact-location-input').value;
    data.contact.social.linkedin = document.getElementById('social-linkedin-input').value;
    data.contact.social.github = document.getElementById('social-github-input').value;
    data.contact.social.twitter = document.getElementById('social-twitter-input').value;
    data.contact.social.instagram = document.getElementById('social-instagram-input').value;
    
    saveData(data);
    alert('Contact information updated successfully!');
});

// Skills management
function loadSkillsList() {
    const data = loadData();
    const container = document.getElementById('skills-list');
    container.innerHTML = '';

    data.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'admin-item';
        skillItem.innerHTML = `
            <div class="admin-item-header">
                <div>
                    <h3><i class="fas ${skill.icon}"></i> ${skill.name}</h3>
                    <p>${skill.description}</p>
                    <p>Level: ${skill.level}%</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="openSkillModal(${skill.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteSkill(${skill.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(skillItem);
    });
}

function addSkillForm() {
    openSkillModal();
}

function editSkill(id) {
    openSkillModal(id);
}

function deleteSkill(id) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const data = loadData();
    data.skills = data.skills.filter(s => s.id !== id);
    saveData(data);
    loadSkillsList();
}

// Projects management
function loadProjectsList() {
    const data = loadData();
    const container = document.getElementById('projects-list');
    container.innerHTML = '';

    data.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'admin-item';
        projectItem.innerHTML = `
            <div class="admin-item-header">
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p>Tags: ${project.tags.join(', ')}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="editProject(${project.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteProject(${project.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(projectItem);
    });
}

function addProjectForm() {
    openProjectModal();
}

function editProject(id) {
    openProjectModal(id);
}

function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const data = loadData();
    data.projects = data.projects.filter(p => p.id !== id);
    saveData(data);
    loadProjectsList();
}

// Experience management
function loadExperienceList() {
    const data = loadData();
    const container = document.getElementById('experience-list');
    container.innerHTML = '';

    data.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'admin-item';
        expItem.innerHTML = `
            <div class="admin-item-header">
                <div>
                    <h3>${exp.title}</h3>
                    <h4>${exp.company}</h4>
                    <p>${exp.date}</p>
                    <p>${exp.description}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="editExperience(${exp.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteExperience(${exp.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(expItem);
    });
}

function addExperienceForm() {
    openExperienceModal();
}

function editExperience(id) {
    openExperienceModal(id);
}

function deleteExperience(id) {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    const data = loadData();
    data.experience = data.experience.filter(e => e.id !== id);
    saveData(data);
    loadExperienceList();
}

// Testimonials management
function loadTestimonialsList() {
    const data = loadData();
    const container = document.getElementById('testimonials-list');
    container.innerHTML = '';

    data.testimonials.forEach(testimonial => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-header">
                <div>
                    <h3>${testimonial.name}</h3>
                    <p>${testimonial.role}</p>
                    <p>"${testimonial.content}"</p>
                    <p>Rating: ${'⭐'.repeat(testimonial.rating)}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="editTestimonial(${testimonial.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteTestimonial(${testimonial.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function addTestimonialForm() {
    openTestimonialModal();
}

function editTestimonial(id) {
    openTestimonialModal(id);
}

function deleteTestimonial(id) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    const data = loadData();
    data.testimonials = data.testimonials.filter(t => t.id !== id);
    saveData(data);
    loadTestimonialsList();
}

// Certifications management
function loadCertificationsList() {
    const data = loadData();
    const container = document.getElementById('certifications-list');
    container.innerHTML = '';

    data.certifications.forEach(cert => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-header">
                <div>
                    <h3><i class="fas ${cert.icon}"></i> ${cert.title}</h3>
                    <p>${cert.issuer}</p>
                    <p>Date: ${cert.date}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="editCertification(${cert.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteCertification(${cert.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function addCertificationForm() {
    openCertificationModal();
}

function editCertification(id) {
    openCertificationModal(id);
}

function deleteCertification(id) {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    
    const data = loadData();
    data.certifications = data.certifications.filter(c => c.id !== id);
    saveData(data);
    loadCertificationsList();
}

// Settings management
function loadSettings() {
    const data = loadData();
    if (data.resumeUrl) {
        document.getElementById('resume-url-input').value = data.resumeUrl;
    }
}

function saveResumeUrl() {
    const data = loadData();
    data.resumeUrl = document.getElementById('resume-url-input').value;
    saveData(data);
    alert('Resume URL saved successfully!');
}

function exportData() {
    const data = loadData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('portfolioData', JSON.stringify(data));
            alert('Data imported successfully! Reloading...');
            window.location.reload();
        } catch (error) {
            alert('Error importing data. Please make sure the file is valid JSON.');
        }
    };
    reader.readAsText(file);
}

function resetData() {
    if (!confirm('Are you sure you want to reset all data to default? This cannot be undone!')) return;
    
    localStorage.removeItem('portfolioData');
    alert('Data reset successfully! Reloading...');
    window.location.reload();
}

// ===== MODAL FUNCTIONS =====

// Skill Modal
let editingSkillId = null;

function openSkillModal(skillId = null) {
    editingSkillId = skillId;
    const modal = document.getElementById('skill-modal');
    const form = document.getElementById('skill-form');
    const title = document.getElementById('skill-modal-title');
    
    form.reset();
    
    if (skillId) {
        const data = loadData();
        const skill = data.skills.find(s => s.id === skillId);
        if (skill) {
            title.textContent = 'Edit Skill';
            document.getElementById('skill-name').value = skill.name;
            document.getElementById('skill-icon').value = skill.icon;
            document.getElementById('skill-description').value = skill.description;
            document.getElementById('skill-level').value = skill.level;
        }
    } else {
        title.textContent = 'Add Skill';
    }
    
    modal.classList.add('show');
}

function closeSkillModal() {
    document.getElementById('skill-modal').classList.remove('show');
    editingSkillId = null;
}

function saveSkill(event) {
    event.preventDefault();
    const data = loadData();
    
    const skillData = {
        name: document.getElementById('skill-name').value,
        icon: document.getElementById('skill-icon').value,
        description: document.getElementById('skill-description').value,
        level: parseInt(document.getElementById('skill-level').value)
    };
    
    if (editingSkillId) {
        const skill = data.skills.find(s => s.id === editingSkillId);
        if (skill) {
            Object.assign(skill, skillData);
        }
    } else {
        const newId = Math.max(...data.skills.map(s => s.id), 0) + 1;
        data.skills.push({ id: newId, ...skillData });
    }
    
    saveData(data);
    loadSkillsList();
    closeSkillModal();
    alert('Skill saved successfully!');
}

// Project Modal
let editingProjectId = null;

function openProjectModal(projectId = null) {
    editingProjectId = projectId;
    const modal = document.getElementById('project-modal');
    const form = document.getElementById('project-form');
    const title = document.getElementById('project-modal-title');
    
    form.reset();
    
    if (projectId) {
        const data = loadData();
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
            title.textContent = 'Edit Project';
            document.getElementById('project-title').value = project.title;
            document.getElementById('project-description').value = project.description;
            document.getElementById('project-image').value = project.image;
            document.getElementById('project-tags').value = project.tags.join(', ');
            document.getElementById('project-category').value = project.category || '';
            document.getElementById('project-github').value = project.github || '';
            document.getElementById('project-demo').value = project.demo || '';
        }
    } else {
        title.textContent = 'Add Project';
    }
    
    modal.classList.add('show');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('show');
    editingProjectId = null;
}

function saveProject(event) {
    event.preventDefault();
    const data = loadData();
    
    const projectData = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        tags: document.getElementById('project-tags').value.split(',').map(t => t.trim()),
        category: document.getElementById('project-category').value,
        github: document.getElementById('project-github').value,
        demo: document.getElementById('project-demo').value
    };
    
    if (editingProjectId) {
        const project = data.projects.find(p => p.id === editingProjectId);
        if (project) {
            Object.assign(project, projectData);
        }
    } else {
        const newId = Math.max(...data.projects.map(p => p.id), 0) + 1;
        data.projects.push({ id: newId, ...projectData });
    }
    
    saveData(data);
    loadProjectsList();
    closeProjectModal();
    alert('Project saved successfully!');
}

// Experience Modal
let editingExperienceId = null;

function openExperienceModal(experienceId = null) {
    editingExperienceId = experienceId;
    const modal = document.getElementById('experience-modal');
    const form = document.getElementById('experience-form');
    const title = document.getElementById('experience-modal-title');
    
    form.reset();
    
    if (experienceId) {
        const data = loadData();
        const exp = data.experience.find(e => e.id === experienceId);
        if (exp) {
            title.textContent = 'Edit Experience';
            document.getElementById('experience-title').value = exp.title;
            document.getElementById('experience-company').value = exp.company;
            document.getElementById('experience-date').value = exp.date;
            document.getElementById('experience-description').value = exp.description;
        }
    } else {
        title.textContent = 'Add Experience';
    }
    
    modal.classList.add('show');
}

function closeExperienceModal() {
    document.getElementById('experience-modal').classList.remove('show');
    editingExperienceId = null;
}

function saveExperience(event) {
    event.preventDefault();
    const data = loadData();
    
    const experienceData = {
        title: document.getElementById('experience-title').value,
        company: document.getElementById('experience-company').value,
        date: document.getElementById('experience-date').value,
        description: document.getElementById('experience-description').value
    };
    
    if (editingExperienceId) {
        const exp = data.experience.find(e => e.id === editingExperienceId);
        if (exp) {
            Object.assign(exp, experienceData);
        }
    } else {
        const newId = Math.max(...data.experience.map(e => e.id), 0) + 1;
        data.experience.push({ id: newId, ...experienceData });
    }
    
    saveData(data);
    loadExperienceList();
    closeExperienceModal();
    alert('Experience saved successfully!');
}

// Testimonial Modal
let editingTestimonialId = null;

function openTestimonialModal(testimonialId = null) {
    editingTestimonialId = testimonialId;
    const modal = document.getElementById('testimonial-modal');
    const form = document.getElementById('testimonial-form');
    const title = document.getElementById('testimonial-modal-title');
    
    form.reset();
    
    if (testimonialId) {
        const data = loadData();
        const testimonial = data.testimonials.find(t => t.id === testimonialId);
        if (testimonial) {
            title.textContent = 'Edit Testimonial';
            document.getElementById('testimonial-name').value = testimonial.name;
            document.getElementById('testimonial-role').value = testimonial.role;
            document.getElementById('testimonial-avatar').value = testimonial.avatar;
            document.getElementById('testimonial-content').value = testimonial.content;
            document.getElementById('testimonial-rating').value = testimonial.rating;
        }
    } else {
        title.textContent = 'Add Testimonial';
    }
    
    modal.classList.add('show');
}

function closeTestimonialModal() {
    document.getElementById('testimonial-modal').classList.remove('show');
    editingTestimonialId = null;
}

function saveTestimonial(event) {
    event.preventDefault();
    const data = loadData();
    
    const testimonialData = {
        name: document.getElementById('testimonial-name').value,
        role: document.getElementById('testimonial-role').value,
        avatar: document.getElementById('testimonial-avatar').value,
        content: document.getElementById('testimonial-content').value,
        rating: parseInt(document.getElementById('testimonial-rating').value)
    };
    
    if (editingTestimonialId) {
        const testimonial = data.testimonials.find(t => t.id === editingTestimonialId);
        if (testimonial) {
            Object.assign(testimonial, testimonialData);
        }
    } else {
        const newId = Math.max(...data.testimonials.map(t => t.id), 0) + 1;
        data.testimonials.push({ id: newId, ...testimonialData });
    }
    
    saveData(data);
    loadTestimonialsList();
    closeTestimonialModal();
    alert('Testimonial saved successfully!');
}

// Certification Modal
let editingCertificationId = null;

function openCertificationModal(certificationId = null) {
    editingCertificationId = certificationId;
    const modal = document.getElementById('certification-modal');
    const form = document.getElementById('certification-form');
    const title = document.getElementById('certification-modal-title');
    
    form.reset();
    
    if (certificationId) {
        const data = loadData();
        const cert = data.certifications.find(c => c.id === certificationId);
        if (cert) {
            title.textContent = 'Edit Certification';
            document.getElementById('certification-title').value = cert.title;
            document.getElementById('certification-issuer').value = cert.issuer;
            document.getElementById('certification-date').value = cert.date;
            document.getElementById('certification-icon').value = cert.icon;
        }
    } else {
        title.textContent = 'Add Certification';
    }
    
    modal.classList.add('show');
}

function closeCertificationModal() {
    document.getElementById('certification-modal').classList.remove('show');
    editingCertificationId = null;
}

function saveCertification(event) {
    event.preventDefault();
    const data = loadData();
    
    const certificationData = {
        title: document.getElementById('certification-title').value,
        issuer: document.getElementById('certification-issuer').value,
        date: document.getElementById('certification-date').value,
        icon: document.getElementById('certification-icon').value
    };
    
    if (editingCertificationId) {
        const cert = data.certifications.find(c => c.id === editingCertificationId);
        if (cert) {
            Object.assign(cert, certificationData);
        }
    } else {
        const newId = Math.max(...data.certifications.map(c => c.id), 0) + 1;
        data.certifications.push({ id: newId, ...certificationData });
    }
    
    saveData(data);
    loadCertificationsList();
    closeCertificationModal();
    alert('Certification saved successfully!');
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const skillModal = document.getElementById('skill-modal');
    const projectModal = document.getElementById('project-modal');
    const experienceModal = document.getElementById('experience-modal');
    const testimonialModal = document.getElementById('testimonial-modal');
    const certificationModal = document.getElementById('certification-modal');
    
    if (event.target === skillModal) closeSkillModal();
    if (event.target === projectModal) closeProjectModal();
    if (event.target === experienceModal) closeExperienceModal();
    if (event.target === testimonialModal) closeTestimonialModal();
    if (event.target === certificationModal) closeCertificationModal();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkAuth);
