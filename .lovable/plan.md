## Goal
Reposition Paras Bindra from "Full Stack Developer" to **Applied AI Engineer** with a premium, OpenAI/Anthropic/Perplexity-grade dark UI — without breaking the existing EmailJS contact form, social links, or Vercel deployment.

## Design System (update `src/index.css` + `tailwind.config.ts`)
- Background: deep navy/charcoal (`hsl(225 25% 6%)`), elevated surfaces with subtle glass blur.
- Accents: electric violet `hsl(265 90% 65%)`, soft cyan `hsl(190 95% 60%)`, intelligent blue `hsl(220 95% 62%)`.
- Replace neon-purple/cyan tokens with refined `ai-violet / ai-cyan / ai-blue` semantic tokens (HSL only).
- Glass card utility (`.glass-card`), subtle gradient borders, restrained glow shadows.
- Typography: Inter for body, Space Grotesk for display headings (Google Fonts via index.html).

## Structure (`src/pages/Index.tsx`)
Sections in order: Navigation → Hero → About → Capabilities → FeaturedProjects → ParxAI → FutureSystems → Contact → Footer.

## Components

**Navigation.tsx (edit)**
- Items: Home, About, Capabilities, Projects, ParxAI, Future AI Systems, Contact.
- Sticky, blur, refined gradient CTA.

**Hero.tsx (edit, keep profile image)**
- Headline: "Paras Bindra" / eyebrow "Applied AI Engineer".
- Statement + supporting line per brief.
- CTAs: View Projects, Download Resume (`/resume.pdf` placeholder), Contact Me, Try ParxAI (scrolls to ParxAI section).
- Profile photo: clean ring + soft ambient violet/cyan glow, no neon overload.

**About.tsx (edit)**
- Concise applied-AI intro; chips for B.Tech CSE, CGPA 8.5, Expected 2026.
- Focus areas: ML, GenAI, Retrieval, CV, AI Products.

**Capabilities.tsx (new, replaces Skills.tsx usage)**
- 4 glass cards: Machine Learning, Data Science, Generative AI & NLP, Engineering & Tools — each with chip list per brief.
- Old `Skills.tsx` removed from page (file kept or deleted).

**FeaturedProjects.tsx (new, replaces Projects.tsx)**
- Order: Mobile Usage Trend Analysis (featured, full-width hero card), NeuroRAG, Age Prediction Pipeline, TripMate AI.
- Each card: title, description, tech chips, GitHub link → `https://github.com/IIpxaxsII`, hover lift + gradient border.

**ParxAI.tsx (new)**
- Dedicated section, not a project card. Premium chat UI.
- Hardcoded keyword router in `src/lib/parxai.ts` (knowledge base: bio, education, projects, skills, AI interests, goals, contact).
- Suggested prompt chips per brief; typing indicator; messages list with user/assistant bubbles; architecture leaves room for future RAG (single `answer(query)` function).

**FutureSystems.tsx (new)**
- Roadmap cards labeled "Currently Exploring": Agentic Memory, Hybrid Retrieval, AI Workflow Automation, Multi-Agent Systems, Knowledge Retrieval Platforms, RAG Applications, AI Orchestration, Intelligent AI Pipelines.

**Contact.tsx (minimal edits)**
- Preserve EmailJS call, credentials, validation, toasts exactly as-is.
- Restyle to match new tokens; keep LinkedIn + GitHub buttons; add mailto Email button alongside.
- Add gentle fade-in/slide-up animations.

**Footer.tsx (edit)**
- "Paras Bindra — Applied AI Engineer", quick links (GitHub, LinkedIn, Email), copyright.

**AnimatedBackground.tsx (edit)**
- Tone down: subtle violet/cyan radial gradients, slow drift, no heavy particles.

## Animations
Framer Motion fade-in + slide-up on section entry, hover lift on cards, subtle gradient shimmer on featured project. No parallax.

## Preserved (untouched logic)
- EmailJS service/template/public key and submit flow in `Contact.tsx`.
- Social URLs (LinkedIn `bparas22`, GitHub `IIpxaxsII`).
- Routing in `App.tsx`, Vercel build config, package scripts.

## Technical notes
- Resume button points to `/resume.pdf` (user uploads to `public/` later); if missing, link still safe.
- ParxAI is fully client-side; `parxai.ts` exports `answer(q: string): string` with keyword map — easy to swap for RAG later.
- All colors via semantic HSL tokens; no raw hex in components.

## Files
- Edit: `src/index.css`, `tailwind.config.ts`, `index.html`, `src/pages/Index.tsx`, `src/components/Navigation.tsx`, `src/components/Hero.tsx`, `src/components/About.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/components/AnimatedBackground.tsx`.
- Create: `src/components/Capabilities.tsx`, `src/components/FeaturedProjects.tsx`, `src/components/ParxAI.tsx`, `src/components/FutureSystems.tsx`, `src/lib/parxai.ts`.
- Remove from page (keep file or delete): `src/components/Skills.tsx`, `src/components/Projects.tsx`.
