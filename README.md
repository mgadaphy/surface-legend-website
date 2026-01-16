# Surface Legend - Professional Painting Services Website

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Professional bilingual (English/French) website for Surface Legend, a premium painting and coating services company based in Cameroon.

## 🎨 Features

### Core Services
- **13 Complete Service Pages** with detailed information, benefits, processes, and professional imagery
  - Residential & Commercial Painting
  - Interior & Exterior Painting
  - Specialized Services (Waterproofing, Metal, Roof, Epoxy)
  - Industrial Services (Steel Structures, High-Rise, Protective Coatings, Mold-Resistant)

### Design & UX
- **Craftsmanship Modernism Design System**
  - Charcoal, Terracotta & Cream color palette
  - Professional typography (Playfair Display, Lato, Montserrat)
  - Responsive across all devices
  - Optimized user experience

### Internationalization
- **Full Bilingual Support** (English & French)
  - Complete translations for all pages
  - Dynamic language switching
  - SEO-optimized for both languages

### Pages
- Home - Hero, services overview, testimonials
- About - Company story, founder profile, team gallery
- Services - 13 detailed service sub-pages
- Portfolio - Project gallery with filtering
- Paint Products - Product catalog
- Art Academy - Training programs
- Contact - Multi-channel contact options

### Media Assets
- **29 Professional Service Images** (3 per service)
- Founder and team photography
- Video content integration
- Optimized image paths and formats

## 🚀 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Routing**: Wouter
- **Internationalization**: react-i18next
- **SEO**: react-helmet-async
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mgadaphy/surface-legend-website.git

# Navigate to project directory
cd surface-legend-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Setup

No environment variables required for basic functionality. The site is fully static and can be deployed to any hosting platform.

## 📁 Project Structure

```
surface-legend-website/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── services/ (29 images)
│       │   └── team/
│       └── videos/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── ServiceDetail.tsx
│   │   └── ui/ (shadcn components)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   ├── PaintProducts.tsx
│   │   ├── ArtAcademy.tsx
│   │   └── services/ (13 service pages)
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── fr/translation.json
│   ├── lib/
│   │   └── i18n.ts
│   └── index.css
└── README.md
```

## 🎯 Key Components

### ServiceDetail Component
Reusable component for all service detail pages with:
- Hero section
- Overview & benefits
- Process steps
- Why choose us
- Image gallery
- FAQ section
- Call-to-action

### Navigation Component
- Responsive mobile menu
- Language switcher (EN/FR)
- Active page highlighting
- Smooth scrolling

### SEO Component
- Dynamic meta tags
- Open Graph support
- Per-page customization

## 🌍 Deployment

### Recommended Platforms
- **Netlify** - Automatic deployments from GitHub
- **Vercel** - Zero-config deployment
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Enterprise solution

### Build Command
```bash
npm run build
```

Output directory: `dist/`

## 📱 Contact Integration

The website includes direct integration with:
- WhatsApp Business (2 numbers)
- Phone calling
- Multiple location support (Douala, Yaoundé, Bamenda, Buea, Limbe)

## 🎨 Design System

### Colors
- Primary: Charcoal (#2C3E50)
- Accent: Terracotta (#D4764A)
- Secondary: Cream (#F5F0E8)

### Typography
- Headers: Playfair Display
- Body: Lato
- Accents: Montserrat

## 📝 License

MIT License - feel free to use this as a template for similar projects.

## 👨‍💼 Credits

**Developed for**: Surface Legend Painting Services
**Location**: Cameroon (Douala, Yaoundé, Bamenda, Buea, Limbe)
**Industry**: Professional Painting & Coating Services

## 🔄 Version History

### v1.0.0 (January 2026)
- Initial release
- 13 complete service pages
- Full bilingual support (EN/FR)
- 29 professional service images
- Responsive design across all devices
- SEO optimization
- Complete translation coverage

## 🚧 Future Enhancements

- Service-specific FAQ sections
- Customer testimonials integration
- Blog/resources section
- Project cost calculator
- Online booking system
- Live chat support

---

**Built with ❤️ for Surface Legend**
