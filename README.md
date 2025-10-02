
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
