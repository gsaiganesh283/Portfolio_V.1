# Portfolio Website

An **ultra-advanced**, cutting-edge portfolio website with unique features not commonly found elsewhere. Built with modern web technologies including Three.js, GSAP, Chart.js, Node.js backend, and MongoDB database.

## 🚀 Advanced Features

### **Visual Excellence**
- **3D Interactive Background** - WebGL-powered particle system with Three.js
- **Custom Magnetic Cursor** - Smooth cursor with trailing effect and magnetic buttons
- **Glitch Text Effects** - Matrix-style text animations on hover
- **Text Scramble Effect** - Dynamic character morphing
- **Parallax Scrolling** - Multi-layer depth with GSAP ScrollTrigger
- **Reading Progress Bar** - Visual indicator of page scroll progress
- **Glassmorphism Design** - Modern frosted glass aesthetic
- **Morphing Background Shapes** - Animated floating gradients

### **Interactive Elements**
- **Magnetic Buttons** - Buttons that follow your cursor
- **Skills Radar Chart** - Visual skill representation with Chart.js
- **Advanced Project Filters** - Smooth category filtering with animations
- **Scroll Reveal Animations** - Elements fade and slide in with GSAP
- **Counter Animations** - Statistics count up on scroll
- **Smooth Scroll Behavior** - Enhanced scrolling experience
- **Scroll Indicator** - Animated mouse wheel guide

### **User Experience**
- **Dark/Light Mode Toggle** - Seamless theme switching
- **Scroll to Top Button** - Quick navigation
- **Testimonials Slider** - Client reviews with ratings
- **Certifications Showcase** - Achievement display with icons
- **Custom Scrollbar** - Branded design matching theme
- **Mobile Hamburger Menu** - Smooth animated navigation

### **Database & Backend**
- **MongoDB Integration** - Cloud-based data persistence with MongoDB Atlas
- **Express.js Backend** - RESTful API for portfolio data operations
- **Real-time Sync** - Admin changes sync instantly to database
- **Secure API** - Environment variable protection and CORS security

## 📚 Public Portfolio (index.php)
- **Hero Section**: Eye-catching introduction with your name and tagline
- **About Section**: Personal information, professional title, and statistics
- **Skills Section**: Showcase your skills with progress bars
- **Projects Section**: Display your portfolio projects with images and links
- **Experience Section**: Timeline view of your work experience
- **Contact Section**: Contact information and social media links
- **Responsive Design**: Works perfectly on all devices

### Admin Panel (admin.php)
- **Secure Login**: Protected admin area (default: admin/admin123)
- **Easy Content Management**: Update all sections through intuitive forms
- **Real-time Updates**: Changes reflect immediately on the public page
- **Skills Management**: Add, edit, or delete skills
- **Projects Management**: Manage your portfolio projects
- **Experience Management**: Update your work history
- **Contact Info**: Update contact details and social links

## Getting Started

### 1. View Your Portfolio
Simply open `index.html` in your web browser to see your portfolio.

### 2. Access Admin Panel
1. Click the "Admin" button in the navigation or open `admin.html`
2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### 3. Customize Your Portfolio
Once logged in, you can:
- Update your personal information
- Add/edit/delete skills, projects, and experience
- Change contact information and social links
- All changes are saved automatically and appear on the public page

## File Structure

```
Portfolio_V.1/
├── index.html          # Public portfolio with advanced features
├── admin.html          # Admin panel for content management
├── styles.css          # Complete styling with animations
├── script.js           # Core portfolio functionality
├── advanced.js         # Advanced features (3D, GSAP, cursor)
├── admin.js            # Admin panel functionality
└── README.md           # Documentation
```

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Advanced styling with animations and transitions
- **JavaScript (ES6+)** - Modern interactive features
- **Three.js** - 3D graphics and WebGL rendering
- **GSAP (GreenSock)** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animation library
- **Chart.js** - Interactive data visualizations
- **Particles.js** - Particle effects system
- **LocalStorage API** - Client-side data persistence
- **Font Awesome** - Icon library

## 🎯 What Makes This Portfolio Unique

1. **3D WebGL Background** - Most portfolios use static backgrounds; this one has interactive 3D particles
2. **Custom Cursor System** - Unique magnetic cursor that enhances UX
3. **Terminal Boot Sequence** - Memorable first impression with developer aesthetic
4. **Advanced GSAP Animations** - Professional-grade scroll animations
5. **Skills Radar Chart** - Visual skill representation vs boring lists
6. **Magnetic Interactions** - Buttons that react to cursor proximity
7. **Text Effects Library** - Glitch and scramble effects for dynamic text
8. **Theme System** - Complete dark/light mode with smooth transitions
9. **Project Filtering** - Advanced categorization with smooth animations
10. **Performance Optimized** - Despite all features, highly performant

## File Structure

### Changing Admin Credentials
Edit the `ADMIN_CREDENTIALS` object in `admin.js`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    password: 'your-password'
};
```

### Styling
All colors and styles can be customized in `styles.css`. Look for CSS variables at the top:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* etc. */
}
```

## Browser Compatibility

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

1. **Images**: Use high-quality images for your profile and projects
2. **Content**: Keep descriptions concise and impactful
3. **Social Links**: Add all your professional social media profiles
4. **Projects**: Include live demos and GitHub links when possible
5. **Regular Updates**: Keep your portfolio fresh with new projects and skills

## Deployment

To deploy your portfolio online:

1. **GitHub Pages** (Free):
   - Create a GitHub repository
   - Push these files to the repository
   - Enable GitHub Pages in repository settings

2. **Netlify/Vercel** (Free):
   - Drag and drop the folder to Netlify or Vercel
   - Your site will be live instantly

3. **Traditional Web Hosting**:
   - Upload all files to your hosting via FTP
   - Ensure index.html is in the root directory

## Support

For issues or questions, feel free to modify the code as needed. The structure is straightforward and well-commented.

## License

Free to use and modify for your personal portfolio.

---

**Note**: This portfolio uses localStorage for data storage, which means data is stored in your browser. For a production portfolio with user accounts, consider implementing a backend with a database.
