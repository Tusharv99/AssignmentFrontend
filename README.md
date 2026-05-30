# Next-Gen Learning Dashboard

A futuristic education dashboard with smooth animations, built with Next.js 14, Supabase, and Framer Motion.

## Architecture Decisions

### Tech Stack
- **Next.js 14 (App Router)** - Server components for performance, client components for interactivity
- **Supabase** - PostgreSQL database for course data
- **Framer Motion** - Hardware-accelerated animations with spring physics
- **Tailwind CSS** - Styling with zero layout shifts
- **TypeScript** - Type safety

### Server/Client Component Split

**Server Components (`layout.tsx`, `page.tsx`):**
- Handle initial HTML shell and metadata
- No JavaScript sent to client

**Client Components (Dashboard tiles):**
- Required for Framer Motion animations
- Handle user interactions (hover, clicks)
- Fetch Supabase data (client-side for animation requirements)

**Why client-side data fetching?** Framer Motion animations need the client component. Trade-off: smoother UX over SEO. Added Suspense + skeleton loaders for perceived performance.

## Key Challenges & Solutions

### 1. Tailwind CSS Compatibility
**Issue:** Next.js 15 + Tailwind v4 breaking changes  
**Solution:** Downgraded to Next.js 14.2.18 and Tailwind v3.4.17

### 2. Zero Layout Shifts
**Issue:** Hover states causing content reflow  
**Solution:** Used only `transform: scale()` and `opacity` for animations

```typescript
// ✅ Good - No layout shift
whileHover={{ scale: 1.02 }}
3. Staggered Animations with Dynamic Data
Issue: Async course loading broke stagger timing
Solution: Used Framer Motion's staggerChildren with delayChildren

typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}
4. Mobile Responsive Sidebar
Issue: Desktop collapsible sidebar didn't work on mobile
Solution: Created separate mobile component with bottom navigation + slide-in drawer

5. Dynamic Icons from Database
Issue: Database stores icon names as strings
Solution: Import all Lucide icons and dynamically look up

typescript
import * as Icons from "lucide-react"
const Icon = (Icons as any)[course.icon_name] || Icons.BookOpen
6. Environment Variables Security
Issue: Accidentally committing .env.local with Supabase keys
Solution: Added to .gitignore before first commit, created .env.example

Performance Optimizations
✅ All animations use transform and opacity (GPU accelerated)

✅ Spring physics for natural motion (stiffness: 300, damping: 20)

✅ Skeleton loaders with Suspense boundaries

✅ No layout shifts on hover or animation

✅ Responsive Bento grid (4→2→1 columns)

Quick Start
bash
# Clone and install
git clone https://github.com/Tusharv99/AssignmentFrontened.git
cd AssignmentFrontened
npm install

# Setup Supabase (create free project at supabase.com)
# Run this SQL:
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Zap'),
  ('Mastering TypeScript', 45, 'Code2'),
  ('UI Animation Mastery', 92, 'Sparkles'),
  ('Backend Development', 30, 'Server');

# Add environment variables
echo "NEXT_PUBLIC_SUPABASE_URL=your_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local

# Run
npm run dev
Deployment (Vercel)
Push to GitHub

Import on Vercel

Add environment variables

Deploy

Requirements Checklist
✅ Next.js App Router with server/client components

✅ Supabase data fetching with loading/error states

✅ Framer Motion animations (staggered load, spring hover, layout animations)

✅ Zero layout shifts (transform/opacity only)

✅ Responsive Bento grid (desktop, tablet, mobile)

✅ Dark mode with glowing gradients

✅ TypeScript + modular components

✅ Semantic HTML (nav, main, article, section)

Project Structure
text
app/
├── layout.tsx (Server)
├── page.tsx (Server + Suspense)
├── loading.tsx (Skeleton)
└── error.tsx (Error boundary)

components/
├── DashboardClient.tsx (Client - main orchestrator)
├── Sidebar.tsx (Client - collapsible + mobile)
├── HeroTile.tsx (Client - animated)
├── CourseGrid.tsx (Client - dynamic)
├── CourseTile.tsx (Client - progress bar)
└── ActivityTile.tsx (Client - heatmap)

lib/supabase/ (Server + client Supabase clients)
types/ (TypeScript interfaces)
Live Demo
https://assignment-frontend-six-jet.vercel.app/

