# The Pets Downtown - Landing Page

A single-page landing website for The Pets Downtown pet boarding and daycare business in Wakad, Pune.

## Purpose
This landing page is designed for Google Search Ads targeting people looking for pet/dog boarding in Pune.

## Technology Stack
- Semantic HTML5
- Modern CSS (mobile-first, responsive)
- Vanilla JavaScript (minimal)
- No framework, no build tools
- Zero external dependencies

## Deployment on GitHub Pages

### Setup Instructions

1. **Create a GitHub repository**
   - Go to GitHub and create a new repository named `tpd-google-landing-page`
   - Make it public

2. **Push this project to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TPD landing page structure"
   git branch -M main
   git remote add origin https://github.com/yourusername/tpd-google-landing-page.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
   - Click Save

4. **Access your site**
   - Your site will be live at: `https://yourusername.github.io/tpd-google-landing-page/`
   - It may take a few minutes for the first deployment

### Adding Google Ads Tracking

Once your Google Ads campaign is set up:

1. Add the Google Tag (gtag.js) to the `<head>` section of `index.html`
2. Configure conversion tracking in `js/tracking.js`
3. Test conversions before launching the campaign

### Updating Content

- Edit `index.html` for content and structure
- Edit `css/style.css` for styling
- Add images to `assets/images/`
- Commit and push changes - GitHub Pages will automatically rebuild

## Project Status
✅ Project structure created  
⏳ Content pending (business information, images, pricing)  
⏳ Design pending  
⏳ Google Ads tracking pending  

## Next Steps
1. Gather business information (services, pricing, photos, reviews, contact details)
2. Design and build the landing page
3. Add actual content and images
4. Set up Google Ads tracking
5. Deploy to GitHub Pages
