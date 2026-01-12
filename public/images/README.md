# Images Directory

This directory is for storing real images for the website.

## Recommended Image Files

Place your images in this directory with the following naming convention:

### Hero Image
- `hero-physiotherapy.jpg` or `hero-physiotherapy.png` - Main hero image (recommended: 1200x800px)

### Gallery Images  
- `gallery-elderly-care.jpg` - Elderly patient care (recommended: 800x600px)
- `gallery-rehabilitation.jpg` - Rehabilitation exercises (recommended: 800x600px)  
- `gallery-home-session.jpg` - Home physiotherapy session (recommended: 800x600px)
- `gallery-balance.jpg` - Balance and falls prevention (recommended: 800x600px)
- `gallery-post-op.jpg` - Post-operative rehabilitation (recommended: 800x600px)
- `gallery-neurological.jpg` - Neurological physiotherapy (recommended: 800x600px)

## Image Guidelines

1. **Format**: Use JPEG for photographs, PNG for graphics with transparency
2. **Size**: Optimize images before uploading (use tools like TinyPNG or ImageOptim)
3. **Quality**: Use high quality (80-90%) but optimize file size
4. **Aspect Ratio**: Maintain consistent aspect ratios for grid layouts
5. **File Size**: Keep individual images under 500KB for faster loading

## Using Local Images

Once you add images to this folder, update the image paths in `pages.tsx`:
- Change from: `https://images.unsplash.com/...`
- Change to: `/images/your-image-name.jpg`

Example:
```tsx
<img src="/images/hero-physiotherapy.jpg" alt="Professional physiotherapy session" />
```
