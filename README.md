# Nexus Portfolio

A high-impact, modern, and clean portfolio website for a Freelance Web Developer.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (Radix primitives)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Form Handling:** React Hook Form + Zod
- **Theme:** next-themes (Dark/Light mode)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with ThemeProvider
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   ├── sections/          # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   └── contact.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── language-switcher.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn)
├── tailwind.config.ts     # Tailwind configuration
├── next.config.mjs        # Next.js configuration
└── components.json        # Shadcn/ui configuration
```

## Features

- 🌓 Dark/Light mode toggle
- 🌐 i18n-ready structure (EN/IT)
- ✨ Smooth Framer Motion animations
- 📱 Fully responsive design
- 🎨 Glassmorphism effects
- 📝 Form validation with Zod
- 🚀 Optimized for performance
- ♿ Accessible components (Radix UI)

## Customization

### Colors

Edit the CSS variables in `app/globals.css` to change the color scheme:

```css
:root {
  --primary: 225 73% 57%; /* Electric Blue */
  /* ... other colors */
}
```

### Content

Update the content in each section component:

- `components/sections/hero.tsx` - Main headline and CTAs
- `components/sections/about.tsx` - About information and tech stack
- `components/sections/services.tsx` - Service offerings
- `components/sections/contact.tsx` - Contact form

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

Or deploy directly from GitHub to Vercel.

## License

MIT
