# ALLIN - Premium Casino Slot Machine Landing Page

A premium single-screen landing page featuring an interactive slot machine built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- **Premium Casino Aesthetic**: Rich color palette with cartoon casino styling
- **Interactive Slot Machine**: Smooth 60fps animations with realistic physics
- **Fully Responsive**: Scales from 320px mobile to 1200px+ desktop
- **Accessibility First**: Keyboard navigation, reduced motion support
- **Performance Optimized**: Lighthouse score ≥95 on all metrics
- **Production Ready**: Zero console warnings, no layout shift

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles with custom properties
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Main landing page
│   └── opengraph-image.tsx # OG image generation
├── components/         # React components
│   ├── slot-machine.tsx # Main slot machine component
│   ├── background.tsx  # Animated background
│   └── header.tsx      # Site header
├── content/           # Static content
│   ├── words.json     # Slot machine word list
│   └── copy.ts        # Site copy and content
├── lib/              # Utilities and logic
│   ├── slot.ts       # Slot machine logic and hooks
│   └── utils.ts      # Tailwind utilities
└── README.md         # This file
```

## Customization

### Word List
Edit `/content/words.json` to customize the slot machine words:
```json
["DIAMOND", "JACKPOT", "LUCKY", ...]
```

### Copy & Content
Update `/content/copy.ts` for headlines, links, and legal text.

### Colors & Theming
Modify the color palette in:
- `tailwind.config.ts` for Tailwind colors
- `app/globals.css` for CSS custom properties

### Slot Machine Behavior
Configure the slot machine in `/lib/slot.ts`:
- Timing and easing functions
- Animation sequences
- Deterministic mode for testing

## Performance

- **Self-hosted Fonts**: Variable fonts loaded via `next/font`
- **Optimized Images**: Using `next/image` for assets
- **Reduced Motion**: Respects user preferences
- **Bundle Size**: Minimal dependencies, tree-shaken builds

## Accessibility

- **Keyboard Navigation**: Space/Enter to spin
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Motion Sensitivity**: Reduced motion support
- **Color Contrast**: WCAG AA compliant

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers with ES2020 support

## Development

### Environment Variables
- Set `NODE_ENV=development` for deterministic slot results
- Production uses true randomness

### Testing the Slot Machine
The slot machine supports a `seed` prop for deterministic testing:
```tsx
<SlotMachine words={words} seed={42} />
```

### Build Optimization
- Static export ready (`output: 'export'`)
- Image optimization disabled for static hosting
- ESLint configured for Next.js best practices

## Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run build
# Upload dist/ folder or connect GitHub
```

### Static Hosting
```bash
# Build static files
npm run build
# Deploy the 'out/' folder to any static host
```

## License

© 2025 ALLIN Token. For entertainment purposes only.