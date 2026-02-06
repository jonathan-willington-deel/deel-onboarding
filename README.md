# Deel Designer Onboarding

A personalized onboarding checklist web app for new designers at Deel.

## Features

- **Personalized onboarding** - Create unique links for each new joiner with their specific details
- **Progress tracking** - Checklist progress saved locally in the browser
- **Beautiful animations** - Smooth slide transitions between sections
- **Confetti celebration** - Fun confetti animation when completing all tasks
- **No backend required** - All data encoded in URL, hosted as static site

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Usage

### Admin (Creating Onboarding Links)

1. Go to the admin page (`/admin` or the root URL)
2. Fill in the new joiner's details:
   - Name, start date, job title
   - Product vertical, design group
   - Line manager, onboarding buddy
   - Optional custom welcome message
3. Add team designers and product team members
4. Click "Generate Onboarding Link"
5. Share the link with the new joiner

### New Joiner Experience

1. Click the personalized link received from your manager
2. Navigate through sections using the sidebar or Next/Previous buttons
3. Check off items as you complete them
4. Your progress is saved automatically in your browser
5. Complete all items to see the celebration!

## Tech Stack

- **Vite** - Build tool
- **React** - UI framework
- **TypeScript** - Type safety
- **HeroUI** - Component library
- **Framer Motion** - Animations
- **React Router** - Routing (hash-based for GitHub Pages)
- **canvas-confetti** - Celebration effects

## Deployment

This app is designed to be deployed to GitHub Pages.

### Automatic Deployment

Push to the `main` branch triggers automatic deployment via GitHub Actions.

### Manual Deployment

1. Create a GitHub repository named `deel-onboarding`
2. Push your code to the `main` branch
3. Go to repository Settings > Pages
4. Set Source to "GitHub Actions"
5. The workflow will automatically build and deploy

### Custom Base Path

If deploying to a different repository name, update `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Sidebar.tsx
│   ├── SectionCard.tsx
│   └── ChecklistItem.tsx
├── pages/            # Page components
│   ├── AdminPage.tsx
│   └── OnboardingPage.tsx
├── hooks/            # Custom React hooks
│   ├── useProgress.ts
│   └── useOnboardingData.ts
├── data/             # Static data and content
│   └── defaultContent.ts
├── types/            # TypeScript interfaces
│   └── index.ts
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## License

Internal use only - Deel.
