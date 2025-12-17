// Backend API base (empty string uses same domain for PHP)
const API_URL = (window.__API_URL__ || '');

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
    // Sync to PHP backend (non-blocking)
    try {
        fetch(`${API_URL}/api/portfolio.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (_) { /* ignore */ }
}

// Load admin data into forms
async function loadAdminData() {
    // Try to pull latest from PHP backend and sync to localStorage first
    try {
        const res = await fetch(`${API_URL}/api/portfolio.php`, { cache: 'no-store' });
        if (res.ok) {
            const fresh = await res.json();
            localStorage.setItem('portfolioData', JSON.stringify(fresh));
        }
    } catch (_) { /* fallback to local */ }

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
                    <button onclick="editSkill(${skill.id})" class="btn btn-secondary btn-small">Edit</button>
                    <button onclick="deleteSkill(${skill.id})" class="btn btn-danger btn-small">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(skillItem);
    });
}

function addSkillForm() {
    const name = prompt('Enter skill name:');
    if (!name) return;
    
    const icon = prompt('Enter Font Awesome icon class (e.g., fa-code):');
    if (!icon) return;
    
    const description = prompt('Enter skill description:');
    if (!description) return;
    
    const level = prompt('Enter skill level (0-100):');
    if (!level) return;

    const data = loadData();
    const newId = Math.max(...data.skills.map(s => s.id), 0) + 1;
    
    data.skills.push({
        id: newId,
        name,
        icon,
        description,
        level: parseInt(level)
    });
    
    saveData(data);
    loadSkillsList();
}

function editSkill(id) {
    const data = loadData();
    const skill = data.skills.find(s => s.id === id);
    if (!skill) return;

    skill.name = prompt('Enter skill name:', skill.name) || skill.name;
    skill.icon = prompt('Enter Font Awesome icon class:', skill.icon) || skill.icon;
    skill.description = prompt('Enter skill description:', skill.description) || skill.description;
    const level = prompt('Enter skill level (0-100):', skill.level);
    if (level) skill.level = parseInt(level);

    saveData(data);
    loadSkillsList();
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
    const title = prompt('Enter project title:');
    if (!title) return;
    
    const description = prompt('Enter project description:');
    if (!description) return;
    
    const image = prompt('Enter project image URL:', 'https://via.placeholder.com/400x300');
    const tags = prompt('Enter tags (comma-separated):', 'HTML, CSS, JavaScript');
    const github = prompt('Enter GitHub URL (optional):');
    const demo = prompt('Enter demo URL (optional):');

    const data = loadData();
    const newId = Math.max(...data.projects.map(p => p.id), 0) + 1;
    
    data.projects.push({
        id: newId,
        title,
        description,
        image: image || 'https://via.placeholder.com/400x300',
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        github: github || '',
        demo: demo || ''
    });
    
    saveData(data);
    loadProjectsList();
}

function editProject(id) {
    const data = loadData();
    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    project.title = prompt('Enter project title:', project.title) || project.title;
    project.description = prompt('Enter project description:', project.description) || project.description;
    project.image = prompt('Enter project image URL:', project.image) || project.image;
    const tags = prompt('Enter tags (comma-separated):', project.tags.join(', '));
    if (tags) project.tags = tags.split(',').map(t => t.trim());
    project.github = prompt('Enter GitHub URL:', project.github) || project.github;
    project.demo = prompt('Enter demo URL:', project.demo) || project.demo;

    saveData(data);
    loadProjectsList();
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
    const title = prompt('Enter job title:');
    if (!title) return;
    
    const company = prompt('Enter company name:');
    if (!company) return;
    
    const date = prompt('Enter date range (e.g., 2020 - Present):');
    if (!date) return;
    
    const description = prompt('Enter job description:');
    if (!description) return;

    const data = loadData();
    const newId = Math.max(...data.experience.map(e => e.id), 0) + 1;
    
    data.experience.push({
        id: newId,
        title,
        company,
        date,
        description
    });
    
    saveData(data);
    loadExperienceList();
}

function editExperience(id) {
    const data = loadData();
    const exp = data.experience.find(e => e.id === id);
    if (!exp) return;

    exp.title = prompt('Enter job title:', exp.title) || exp.title;
    exp.company = prompt('Enter company name:', exp.company) || exp.company;
    exp.date = prompt('Enter date range:', exp.date) || exp.date;
    exp.description = prompt('Enter job description:', exp.description) || exp.description;

    saveData(data);
    loadExperienceList();
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
    const name = prompt('Enter client name:');
    if (!name) return;
    
    const role = prompt('Enter client role/position:');
    if (!role) return;
    
    const content = prompt('Enter testimonial content:');
    if (!content) return;
    
    const avatar = prompt('Enter avatar URL (or use default):', 'https://i.pravatar.cc/150?img=1');
    const rating = prompt('Enter rating (1-5):', '5');

    const data = loadData();
    const newId = Math.max(...data.testimonials.map(t => t.id), 0) + 1;
    
    data.testimonials.push({
        id: newId,
        name,
        role,
        avatar: avatar || 'https://i.pravatar.cc/150?img=1',
        content,
        rating: parseInt(rating) || 5
    });
    
    saveData(data);
    loadTestimonialsList();
}

function editTestimonial(id) {
    const data = loadData();
    const testimonial = data.testimonials.find(t => t.id === id);
    if (!testimonial) return;

    testimonial.name = prompt('Enter client name:', testimonial.name) || testimonial.name;
    testimonial.role = prompt('Enter client role:', testimonial.role) || testimonial.role;
    testimonial.content = prompt('Enter testimonial content:', testimonial.content) || testimonial.content;
    testimonial.avatar = prompt('Enter avatar URL:', testimonial.avatar) || testimonial.avatar;
    const rating = prompt('Enter rating (1-5):', testimonial.rating);
    if (rating) testimonial.rating = parseInt(rating);

    saveData(data);
    loadTestimonialsList();
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
    const title = prompt('Enter certification title:');
    if (!title) return;
    
    const issuer = prompt('Enter issuing organization:');
    if (!issuer) return;
    
    const date = prompt('Enter date (e.g., 2023):');
    if (!date) return;
    
    const icon = prompt('Enter Font Awesome icon class (e.g., fa-award):', 'fa-certificate');

    const data = loadData();
    const newId = Math.max(...data.certifications.map(c => c.id), 0) + 1;
    
    data.certifications.push({
        id: newId,
        title,
        issuer,
        date,
        icon: icon || 'fa-certificate'
    });
    
    saveData(data);
    loadCertificationsList();
}

function editCertification(id) {
    const data = loadData();
    const cert = data.certifications.find(c => c.id === id);
    if (!cert) return;

    cert.title = prompt('Enter certification title:', cert.title) || cert.title;
    cert.issuer = prompt('Enter issuing organization:', cert.issuer) || cert.issuer;
    cert.date = prompt('Enter date:', cert.date) || cert.date;
    cert.icon = prompt('Enter Font Awesome icon class:', cert.icon) || cert.icon;

    saveData(data);
    loadCertificationsList();
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkAuth);
