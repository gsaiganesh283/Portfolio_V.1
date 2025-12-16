# Portfolio Website

A modern, responsive portfolio website with an admin panel for easy content management.

## Features

### Public Portfolio (index.html)
- **Hero Section**: Eye-catching introduction with your name and tagline
- **About Section**: Personal information, professional title, and statistics
- **Skills Section**: Showcase your skills with progress bars
- **Projects Section**: Display your portfolio projects with images and links
- **Experience Section**: Timeline view of your work experience
- **Contact Section**: Contact information and social media links
- **Responsive Design**: Works perfectly on all devices

### Admin Panel (admin.html)
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
├── index.html          # Public portfolio page
├── admin.html          # Admin panel for content management
├── styles.css          # All styling for both pages
├── script.js           # Public page functionality
├── admin.js            # Admin panel functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript**: Dynamic content loading and management
- **LocalStorage**: Data persistence without a backend
- **Font Awesome**: Icons for a polished look

## Customization

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
