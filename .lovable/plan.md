# Portfolio Refinement Plan

Scope: polish only. No redesign. Preserve EmailJS, GitHub/LinkedIn links, content, sections.

## 1. Initial Scroll Fix
- In `src/pages/Index.tsx`, on mount: `window.history.scrollRestoration = "manual"` and `window.scrollTo(0,0)`.
- Audit for any auto-`scrollIntoView` on first render (none expected, but verify ParxAI/Contact effects).

## 2. Hero Cleanup + Typing Effect
- `Hero.tsx`: remove the "B.Tech CSE · CGPA 8.5" pill beneath the photo. Keep only the image inside the gradient ring.
- Replace static "Applied AI Engineer" subtitle with a typewriter component that rotates:
  - Applied AI Engineer
  - Building Intelligent Systems
  - RAG & Retrieval Systems
  - Machine Learning Engineer
  - AI Product Builder
  - Data Science Practitioner
- Implementation: small inline hook (no new dependency). Fixed min-height to prevent layout shift. Blinking cursor via CSS.
- Name "Paras Bindra" stays static.

## 3. Equalize Projects
- `FeaturedProjects.tsx`: drop the flagship hero card. Render all 4 projects (Mobile Usage Trend Analysis, NeuroRAG, Age Prediction Pipeline, TripMate AI) in one equal grid (`md:grid-cols-2 lg:grid-cols-2` or `lg:grid-cols-4`). Same card style, same size. Keep descriptions, tech chips, GitHub links unchanged.
- Section label can stay "Selected Work / Featured Projects".

## 4. Expand ParxAI (ChatGPT-style)
- `ParxAI.tsx`: increase container max-width (`max-w-4xl`), chat area `min-h-[560px]` / `max-h-[70vh]`, larger padding, bigger message bubbles, more generous spacing.
- Remove "Hardcoded answers" / "v1" subtitle. Replace with "Ask anything about Paras's work".
- Slightly larger input (h-12), better placeholder, send button with icon.
- Keep keyword logic in `src/lib/parxai.ts` (no functional change).

## 5. Floating ParxAI Launcher
- New `src/components/ParxAILauncher.tsx`: fixed bottom-right circular button with subtle glow, ParxAI branding (Bot icon + label on hover).
- Click → opens a Sheet/Drawer (use existing `components/ui/sheet.tsx`, right side, full-height on mobile) containing a reusable `<ParxAIChat/>` body.
- Refactor: extract chat UI from `ParxAI.tsx` into `ParxAIChat.tsx` so both the section and the drawer reuse it. Section stays on page.
- Mount launcher in `Index.tsx` (or `App.tsx`) so it shows on all routes.

## 6. Global Ambient AI Background
- `AnimatedBackground.tsx`: enhance current radial glows into slow aurora mesh:
  - 3–4 large blurred conic/radial gradient blobs with very slow `animate-drift` (60–80s), low opacity.
  - Add a soft moving linear gradient overlay (8–12% opacity).
  - Keep grid texture subtle; keep vignette.
- Remains `fixed inset-0 -z-10`, already global via `Index.tsx`. Verify it visually covers all sections.
- Reduce per-section local glow intensity slightly so global layer reads through.

## 7. Contact Cleanup
- `Contact.tsx`: remove direct email / mailto button + mail icon. Keep LinkedIn + GitHub buttons. Keep the EmailJS-powered form fully intact.

## 8. Remove "Hardcoded" Language
- Search and remove any "hardcoded", "demo", "mock" wording in ParxAI UI and labels.

## 9. UX Polish Pass
- Consistent hover lift (`hover:-translate-y-0.5`, soft glow) on project cards, capability cards, buttons.
- Smoother section padding rhythm (`py-24` standard, ensure consistent).
- Verify mobile responsiveness for new ParxAI size and floating launcher (safe-area bottom inset).

## Files
- Edit: `src/pages/Index.tsx`, `src/components/Hero.tsx`, `src/components/FeaturedProjects.tsx`, `src/components/ParxAI.tsx`, `src/components/AnimatedBackground.tsx`, `src/components/Contact.tsx`
- Create: `src/components/ParxAIChat.tsx`, `src/components/ParxAILauncher.tsx`, `src/components/Typewriter.tsx` (or inline hook)

## Preserved (untouched)
- EmailJS service, template, public key, validation, toasts
- GitHub URL `https://github.com/IIpxaxsII` on all projects
- LinkedIn link
- `src/lib/parxai.ts` knowledge base logic
- Color tokens / visual identity / section structure