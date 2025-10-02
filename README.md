
# Rowlly Properties Website

A modern real estate website built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
/
├── public/                 # Static assets
│   └── index.html         # HTML entry point
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   ├── pages/        # Page components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── ContactForm.tsx
│   │   ├── ImageWithFallback.tsx
│   │   └── PropertyCard.tsx
│   ├── data/             # Data and mock data
│   │   └── mockData.ts
│   ├── hooks/            # Custom React hooks
│   │   └── use-mobile.ts
│   ├── lib/              # Utility functions and libraries
│   │   └── utils.ts
│   ├── styles/           # CSS and styling
│   │   ├── globals.css
│   │   └── index.css
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## SEO Optimization

The website is fully optimized for search engines with the following features:

### Meta Tags & Structured Data
- Dynamic page-specific meta titles and descriptions
- Open Graph tags for social media sharing
- JSON-LD structured data for properties, agents, and organization
- Breadcrumb navigation schema
- Article schema for blog posts

### Technical SEO
- **Sitemap**: `/sitemap.xml` with all pages and image information
- **Robots.txt**: Proper crawling instructions for search engines
- **Canonical URLs**: Prevent duplicate content issues
- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **Accessibility**: ARIA labels, alt text, and landmark roles

### Content SEO
- Keyword-optimized page titles and descriptions
- Location-based keywords for property searches
- Rich snippets for property listings
- Image alt text with descriptive property information
- Internal linking between related pages

### Performance SEO
- Fast loading times with Vite optimization
- Responsive design for all devices
- Optimized images with fallbacks
- Minimal JavaScript for critical rendering path

### Local SEO
- Business schema markup
- Location-specific keywords
- Contact information structured data
- Service area definitions

## Features

- 🏠 Property listings and search
- 👥 Agent profiles and directory
- 📞 Contact forms
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components
- ⚡ Fast development with Vite
- 🔧 TypeScript for type safety
- 🎯 Tailwind CSS for styling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

3. Build for production:
   ```bash
   npm run build
   ```

## Build Status

✅ **Project is fully functional and ready for development!**

- ✅ All TypeScript errors resolved
- ✅ All import paths fixed
- ✅ Tailwind CSS v3.4.10 properly configured and working
- ✅ PostCSS setup completed with correct plugin versions
- ✅ Build process working successfully (1707 modules transformed)
- ✅ Development server running without issues on `http://localhost:3000`
- ✅ **Design and formatting issues completely fixed!**

### Recent Fixes (October 2025):
- Fixed Tailwind CSS v4 compatibility issues by downgrading to stable v3.4.10
- Corrected PostCSS configuration to use `tailwindcss` plugin (not `@tailwindcss/postcss`)
- Rebuilt globals.css with proper Tailwind v3 syntax and CSS custom properties
- Updated tailwind.config.js with proper color mapping for shadcn/ui components
- Cleared all corrupted caches and reinstalled dependencies cleanly

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **State Management**: React Hooks

## Component Organization

### UI Components (`src/components/ui/`)
Reusable UI components based on shadcn/ui:
- Form controls (Button, Input, Select, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Data display (Table, Badge, Avatar, etc.)

### Page Components (`src/components/pages/`)
Full page components:
- `HomePage.tsx` - Landing page with hero and featured properties
- `PropertySearchPage.tsx` - Property search and filtering
- `PropertyDetailPage.tsx` - Individual property details
- `AgentsPage.tsx` - Agent directory
- `AgentProfilePage.tsx` - Individual agent profiles
- `ContactPage.tsx` - Contact information and forms

### Layout Components (`src/components/layout/`)
- `Header.tsx` - Navigation header
- `Footer.tsx` - Site footer

## Styling

The project uses a custom design system built with Tailwind CSS and CSS custom properties defined in `globals.css`. The design supports both light and dark themes.

## Development

The codebase follows modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Component composition over inheritance
- Responsive design principles
- Accessible UI components

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Push to the `main` branch triggers automatic deployment via GitHub Actions
2. **Manual Deployment**: Run `npm run deploy` to deploy manually
3. **Build Only**: Run `npm run build` to build for production

### Deployment Configuration

- **Base Path**: `/refactored-goldfish/` (configured for GitHub Pages)
- **Output Directory**: `dist/`
- **Build Target**: ESNext

### Setup Instructions

1. Enable GitHub Pages in your repository settings
2. Set source to "GitHub Actions" 
3. Push to main branch or run `npm run deploy`
4. Your site will be available at: `https://[username].github.io/refactored-goldfish/`

### Troubleshooting Deployment

If you see a blank page:
- ✅ Check that the base path matches your repository name
- ✅ Ensure `.nojekyll` file is in the public directory
- ✅ Verify GitHub Pages is enabled and set to GitHub Actions
- ✅ Check the Actions tab for deployment logs
