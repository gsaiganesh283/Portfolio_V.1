<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Custom Cursor -->
    <div class="cursor-dot"></div>
    <div class="cursor-outline"></div>
    
    <div class="admin-container" id="admin-panel" style="display: none;">
        <!-- Header -->
        <header class="admin-header">
            <h1><i class="fas fa-user-shield"></i> Portfolio Admin Panel</h1>
            <div class="admin-actions">
                <a href="index.php" class="btn btn-secondary"><i class="fas fa-eye"></i> View Portfolio</a>
                <button onclick="logout()" class="btn btn-danger"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
        </header>

        <!-- Tabs -->
        <div class="admin-tabs">
            <button class="tab-btn active" onclick="showTab('hero')">Hero Section</button>
            <button class="tab-btn" onclick="showTab('about')">About</button>
            <button class="tab-btn" onclick="showTab('skills')">Skills</button>
            <button class="tab-btn" onclick="showTab('projects')">Projects</button>
            <button class="tab-btn" onclick="showTab('experience')">Experience</button>
            <button class="tab-btn" onclick="showTab('testimonials')">Testimonials</button>
            <button class="tab-btn" onclick="showTab('certifications')">Certifications</button>
            <button class="tab-btn" onclick="showTab('contact')">Contact</button>
            <button class="tab-btn" onclick="showTab('settings')">Settings</button>
        </div>

        <!-- Hero Section Tab -->
        <div id="hero-tab" class="tab-content active">
            <h2>Hero Section</h2>
            <form id="hero-form" class="admin-form">
                <div class="form-group">
                    <label>Name (Navbar)</label>
                    <input type="text" id="nav-name-input" required>
                </div>
                <div class="form-group">
                    <label>Hero Title</label>
                    <input type="text" id="hero-title-input" required>
                </div>
                <div class="form-group">
                    <label>Hero Subtitle</label>
                    <input type="text" id="hero-subtitle-input" required>
                </div>
                <div class="form-group">
                    <label>Hero Description</label>
                    <textarea id="hero-description-input" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        </div>

        <!-- About Section Tab -->
        <div id="about-tab" class="tab-content">
            <h2>About Section</h2>
            <form id="about-form" class="admin-form">
                <div class="form-group">
                    <label>Profile Image URL</label>
                    <input type="url" id="about-image-input" placeholder="https://...">
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="about-name-input" required>
                </div>
                <div class="form-group">
                    <label>Professional Title/Role</label>
                    <input type="text" id="about-role-input" required>
                </div>
                <div class="form-group">
                    <label>About Description</label>
                    <textarea id="about-description-input" rows="5" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Years of Experience</label>
                        <input type="text" id="stats-experience-input" placeholder="5+">
                    </div>
                    <div class="form-group">
                        <label>Projects Completed</label>
                        <input type="text" id="stats-projects-input" placeholder="50+">
                    </div>
                    <div class="form-group">
                        <label>Happy Clients</label>
                        <input type="text" id="stats-clients-input" placeholder="30+">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        </div>

        <!-- Skills Section Tab -->
        <div id="skills-tab" class="tab-content">
            <h2>Skills Section</h2>
            <div class="admin-list-header">
                <h3>Manage Skills</h3>
                <button onclick="openSkillModal()" class="btn btn-success"><i class="fas fa-plus"></i> Add Skill</button>
            </div>
            <div id="skills-list" class="admin-list">
                <!-- Skills will be loaded here -->
            </div>
        </div>

        <!-- Projects Section Tab -->
        <div id="projects-tab" class="tab-content">
            <h2>Projects Section</h2>
            <div class="admin-list-header">
                <h3>Manage Projects</h3>
                <button onclick="openProjectModal()" class="btn btn-success"><i class="fas fa-plus"></i> Add Project</button>
            </div>
            <div id="projects-list" class="admin-list">
                <!-- Projects will be loaded here -->
            </div>
        </div>

        <!-- Experience Section Tab -->
        <div id="experience-tab" class="tab-content">
            <h2>Experience Section</h2>
            <div class="admin-list-header">
                <h3>Manage Experience</h3>
                <button onclick="openExperienceModal()" class="btn btn-success"><i class="fas fa-plus"></i> Add Experience</button>
            </div>
            <div id="experience-list" class="admin-list">
                <!-- Experience will be loaded here -->
            </div>
        </div>

        <!-- Testimonials Section Tab -->
        <div id="testimonials-tab" class="tab-content">
            <h2>Testimonials Section</h2>
            <div class="admin-list-header">
                <h3>Manage Testimonials</h3>
                <button onclick="openTestimonialModal()" class="btn btn-success"><i class="fas fa-plus"></i> Add Testimonial</button>
            </div>
            <div id="testimonials-list" class="admin-list">
                <!-- Testimonials will be loaded here -->
            </div>
        </div>

        <!-- Certifications Section Tab -->
        <div id="certifications-tab" class="tab-content">
            <h2>Certifications & Achievements</h2>
            <div class="admin-list-header">
                <h3>Manage Certifications</h3>
                <button onclick="openCertificationModal()" class="btn btn-success"><i class="fas fa-plus"></i> Add Certification</button>
            </div>
            <div id="certifications-list" class="admin-list">
                <!-- Certifications will be loaded here -->
            </div>
        </div>

        <!-- Contact Section Tab -->
        <div id="contact-tab" class="tab-content">
            <h2>Contact Information</h2>
            <form id="contact-form" class="admin-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="contact-email-input" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" id="contact-phone-input" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="contact-location-input" required>
                </div>
                <div class="form-group">
                    <label>LinkedIn URL</label>
                    <input type="url" id="social-linkedin-input" placeholder="https://linkedin.com/in/...">
                </div>
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" id="social-github-input" placeholder="https://github.com/...">
                </div>
                <div class="form-group">
                    <label>Twitter URL</label>
                    <input type="url" id="social-twitter-input" placeholder="https://twitter.com/...">
                </div>
                <div class="form-group">
                    <label>Instagram URL</label>
                    <input type="url" id="social-instagram-input" placeholder="https://instagram.com/...">
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        </div>

        <!-- Settings Tab -->
        <div id="settings-tab" class="tab-content">
            <h2>Settings & Data Management</h2>
            
            <div class="admin-form">
                <h3>Resume/CV</h3>
                <div class="form-group">
                    <label>Resume Download URL</label>
                    <input type="url" id="resume-url-input" placeholder="https://...">
                    <small>Link to your resume/CV file (PDF, Google Drive, etc.)</small>
                </div>
                <button onclick="saveResumeUrl()" class="btn btn-primary">Save Resume URL</button>
            </div>

            <div class="admin-form" style="margin-top: 2rem;">
                <h3>Data Management</h3>
                <p>Export your portfolio data or import from a backup file.</p>
                <div class="form-row">
                    <button onclick="exportData()" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Export Data
                    </button>
                    <button onclick="document.getElementById('import-file').click()" class="btn btn-secondary">
                        <i class="fas fa-upload"></i> Import Data
                    </button>
                    <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
                    <button onclick="resetData()" class="btn btn-danger">
                        <i class="fas fa-redo"></i> Reset to Default
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Skill Form -->
    <div id="skill-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="skill-modal-title">Add Skill</h2>
                <button onclick="closeSkillModal()" class="modal-close">&times;</button>
            </div>
            <form id="skill-form" onsubmit="saveSkill(event)">
                <div class="form-group">
                    <label>Skill Name</label>
                    <input type="text" id="skill-name" required>
                </div>
                <div class="form-group">
                    <label>Icon Class (FontAwesome)</label>
                    <input type="text" id="skill-icon" placeholder="e.g., fa-code" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="skill-description" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>Skill Level (0-100)</label>
                    <input type="number" id="skill-level" min="0" max="100" required>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <button type="button" onclick="closeSkillModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal for Project Form -->
    <div id="project-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="project-modal-title">Add Project</h2>
                <button onclick="closeProjectModal()" class="modal-close">&times;</button>
            </div>
            <form id="project-form" onsubmit="saveProject(event)">
                <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" id="project-title" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="project-description" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" id="project-image" required>
                </div>
                <div class="form-group">
                    <label>Tags (comma separated)</label>
                    <input type="text" id="project-tags" placeholder="React, Node.js, MongoDB">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select id="project-category" required>
                        <option value="">Select Category</option>
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="design">Design</option>
                        <option value="ai">AI/ML</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" id="project-github" placeholder="https://github.com/...">
                </div>
                <div class="form-group">
                    <label>Demo URL</label>
                    <input type="url" id="project-demo" placeholder="https://...">
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <button type="button" onclick="closeProjectModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal for Experience Form -->
    <div id="experience-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="experience-modal-title">Add Experience</h2>
                <button onclick="closeExperienceModal()" class="modal-close">&times;</button>
            </div>
            <form id="experience-form" onsubmit="saveExperience(event)">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" id="experience-title" required>
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" id="experience-company" required>
                </div>
                <div class="form-group">
                    <label>Date Range</label>
                    <input type="text" id="experience-date" placeholder="2020 - Present" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="experience-description" rows="3" required></textarea>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <button type="button" onclick="closeExperienceModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal for Testimonial Form -->
    <div id="testimonial-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="testimonial-modal-title">Add Testimonial</h2>
                <button onclick="closeTestimonialModal()" class="modal-close">&times;</button>
            </div>
            <form id="testimonial-form" onsubmit="saveTestimonial(event)">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" id="testimonial-name" required>
                </div>
                <div class="form-group">
                    <label>Client Role/Title</label>
                    <input type="text" id="testimonial-role" required>
                </div>
                <div class="form-group">
                    <label>Avatar URL</label>
                    <input type="url" id="testimonial-avatar" placeholder="https://..." required>
                </div>
                <div class="form-group">
                    <label>Testimonial Content</label>
                    <textarea id="testimonial-content" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>Rating</label>
                    <select id="testimonial-rating" required>
                        <option value="">Select Rating</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <button type="button" onclick="closeTestimonialModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal for Certification Form -->
    <div id="certification-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="certification-modal-title">Add Certification</h2>
                <button onclick="closeCertificationModal()" class="modal-close">&times;</button>
            </div>
            <form id="certification-form" onsubmit="saveCertification(event)">
                <div class="form-group">
                    <label>Certification Title</label>
                    <input type="text" id="certification-title" required>
                </div>
                <div class="form-group">
                    <label>Issuing Organization</label>
                    <input type="text" id="certification-issuer" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" id="certification-date" placeholder="e.g., 2023" required>
                </div>
                <div class="form-group">
                    <label>Icon Class (FontAwesome)</label>
                    <input type="text" id="certification-icon" placeholder="e.g., fa-award" required>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <button type="button" onclick="closeCertificationModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Login Panel -->
    <div class="login-container" id="login-panel">
        <div class="login-box">
            <h2><i class="fas fa-lock"></i> Admin Login</h2>
            <p>Enter your credentials to access the admin panel</p>
            <form id="login-form">
                <div class="form-group">
                    <input type="text" id="username" placeholder="Username" required>
                </div>
                <div class="form-group">
                    <input type="password" id="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <div id="login-error" class="error-message"></div>
            </form>
            <p class="login-hint">Default: admin / admin123</p>
            <a href="index.php" class="back-link"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
        </div>
    </div>

    <script src="admin.js"></script>
    
    <!-- Custom Cursor Script -->
    <script>
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth follow effect for outline
        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        }
        animateOutline();
        
        // Enlarge cursor on hover over clickable elements
        const hoverElements = document.querySelectorAll('button, a, input, textarea, select, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.width = '20px';
                cursorDot.style.height = '20px';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
            });
            element.addEventListener('mouseleave', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorOutline.style.width = '45px';
                cursorOutline.style.height = '45px';
            });
        });
    </script>
</body>
</html>
