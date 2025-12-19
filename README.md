# Legal Content Writer Portfolio Website

A professional, single-page portfolio website for a legal content writer specializing in AI-resistant blog writing for law firms.

## Features

- **Premium Hero Section**: Animated gradient mesh background with floating orbs, glassmorphic metrics dashboard, and smooth animations
- **Fully Responsive**: Mobile-first design that works on all devices (320px to 1440px+)
- **Interactive Portfolio**: 6 blog sample cards with modal popups
- **Contact Form**: Client-side validation with success/error messages
- **Smooth Animations**: GPU-accelerated animations for optimal performance
- **SEO Optimized**: Proper meta tags, semantic HTML, and Open Graph tags
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support

## File Structure

```
legal-content-portfolio/
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS and animations
├── script.js       # JavaScript interactions
└── README.md       # This file
```

## Setup Instructions

### Local Development

1. **Clone or download** this repository to your local machine

2. **Open the project** in your preferred code editor

3. **Open `index.html`** in a web browser:
   - Simply double-click the file, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then visit `http://localhost:8000` in your browser

4. **Customize the content**:
   - Replace `[Your Name]` with your actual name
   - Update `your@email.com` with your email address
   - Replace `[Your City, State]` with your location
   - Add your actual blog content to the blog data in `index.html`

## Customization Guide

### Personal Information

Search and replace these placeholders in `index.html`:

- `[Your Name]` → Your actual name (appears in header, footer, and meta tags)
- `your@email.com` → Your email address (in contact section)
- `[Your City, State]` → Your location (in contact section)

### Blog Content

The blog samples are stored in a JSON script tag at the bottom of `index.html`. To add your actual blog content:

1. Find the `<script type="application/json" id="blog-data">` tag
2. Replace the placeholder content in each blog object's `content` field
3. Keep the HTML structure (use `<p>` tags for paragraphs)

Example:
```json
{
    "1": {
        "title": "Top 5 Tips for Choosing the Right Personal Injury Lawyer",
        "location": "Van Nuys, CA",
        "content": "<p>Your actual blog content here...</p><p>More paragraphs...</p>"
    }
}
```

### Colors

Edit CSS variables in `styles.css` (at the top of the file):

```css
:root {
    --color-primary: #1e40af;        /* Main blue */
    --color-primary-light: #3b82f6;  /* Light blue */
    --color-secondary: #8b5cf6;      /* Purple */
    --color-accent: #10b981;          /* Green */
    --color-cyan: #06b6d4;            /* Cyan */
    --color-dark-navy: #0a0f1e;       /* Hero background */
}
```

### Pricing

Update pricing in the Pricing section of `index.html`:

- Search for "Single Blog" section
- Update the dollar amounts and features as needed

## Deployment

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/legal-content-portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch and "/ (root)"
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io/legal-content-portfolio`

### Option 2: Netlify (Free)

1. **Drag and drop deployment**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop your project folder to the deploy area
   - Your site will be live instantly!

2. **Git-based deployment** (recommended):
   - Connect your GitHub repository to Netlify
   - Netlify will auto-deploy on every push

### Option 3: Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Your site will be live instantly!

### Option 4: Traditional Web Hosting

1. **Upload files** via FTP/SFTP:
   - Upload all files (`index.html`, `styles.css`, `script.js`) to your web server's root directory (usually `public_html` or `www`)
   - Ensure `index.html` is in the root directory
   - Your site will be live at `https://yourdomain.com`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external dependencies** except Tailwind CDN (loaded from CDN)
- **Optimized animations** using GPU acceleration
- **Lazy loading** ready for images (if you add any)
- **Fast initial paint** (<1 second on good connections)

## SEO Checklist

Before going live, ensure:

- [ ] All `[Your Name]` placeholders are replaced
- [ ] Meta description is updated
- [ ] Open Graph tags are customized
- [ ] Contact email and location are updated
- [ ] Blog content is added (or placeholders are acceptable)
- [ ] Google Analytics is set up (if desired)
- [ ] Social media links are added (if applicable)

## Adding Google Analytics

1. Get your Google Analytics Measurement ID (format: `G-XXXXXXXXXX`)

2. In `index.html`, find the commented Google Analytics section in the `<head>`

3. Uncomment it and replace `GA_MEASUREMENT_ID` with your actual ID:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## Contact Form Backend

Currently, the contact form shows a success message but doesn't actually send emails. To add backend functionality:

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms

If deploying on Netlify, add `netlify` attribute to the form:
```html
<form id="contact-form" netlify>
```

### Option 3: Custom Backend

Update the `initContactForm()` function in `script.js` to send data to your API endpoint.

## Troubleshooting

### Animations not working
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded (check Network tab)
- Verify browser supports CSS animations

### Styles not applying
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `styles.css` is linked correctly in `index.html`
- Verify Tailwind CDN is loading

### Mobile menu not working
- Check that `script.js` is loaded
- Verify no JavaScript errors in console
- Ensure viewport meta tag is present

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all files are in the same directory
3. Ensure you're using a modern browser

## License

This project is open source and available for personal and commercial use.

## Credits

- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Inter font family
- **Design Inspiration**: Modern portfolio design patterns

---

**Last Updated**: 2024

