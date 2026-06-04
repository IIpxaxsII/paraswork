# Add Light/Dark Theme Toggle

Scope: theming infrastructure + a polished light palette + a toggle in the navbar. No content, layout, or functionality changes.

## 1. Tailwind dark-mode setup
- `tailwind.config.ts` already has `darkMode: ["class"]`. Keep it.
- Strategy: define the **light** palette under `:root` and the **dark** palette under `.dark`. Add `class="dark"` to `<html>` by default to preserve the current dark experience.

## 2. `src/index.css` — dual palettes
- Move current dark token block from `:root` into `.dark { ... }` unchanged (so today's dark theme is byte-identical).
- Add a new `:root { ... }` block with a premium light palette built on the same token names so every component themes automatically:
  - `--background: 220 30% 98%` (soft ivory)
  - `--foreground: 225 30% 12%` (deep slate)
  - `--card: 0 0% 100%`, `--card-foreground: 225 30% 12%`
  - `--popover` same as card
  - `--muted: 220 20% 94%`, `--muted-foreground: 225 15% 40%`
  - `--border: 220 18% 88%`, `--input: 220 18% 92%`
  - `--primary: 265 80% 58%` (violet stays the brand), `--primary-foreground: 0 0% 100%`
  - `--secondary: 220 90% 55%`, `--accent: 190 85% 45%`
  - `--ring: 265 80% 58%`
  - AI palette (`--ai-violet`, `--ai-blue`, `--ai-cyan`) kept at the same hues but slightly deeper saturation for contrast on light surfaces.
  - `--surface: 220 25% 96%`, `--surface-elevated: 0 0% 100%`, `--darker-bg: 220 25% 94%`
  - Sidebar tokens mirrored.
- Add smooth transitions globally:
  ```css
  body { transition: background-color .4s ease, color .4s ease; }
  *, *::before, *::after {
    transition-property: background-color, border-color, color, fill, stroke, box-shadow;
    transition-duration: .3s;
    transition-timing-function: ease;
  }
  ```
  (No transition on `transform`/`opacity` to avoid interfering with Framer Motion.)
- Tweak `.glass-card` so the light variant uses brighter surfaces with softer shadow and a subtle border — single rule using tokens, so no per-mode override needed. Same for `.ai-glow` (reduce shadow alpha when on light bg by tying it to `--ai-violet` opacity which already works).
- Adjust `AnimatedBackground` blob opacities so they don't wash out the light theme: change blur layers to use Tailwind's `dark:` variants (e.g., `bg-ai-violet/10 dark:bg-ai-violet/25`) and dim the grid texture (`opacity-[0.06] dark:opacity-[0.04]`). Pure additive class changes, no structural edits.

## 3. Theme provider
- Create `src/hooks/use-theme.tsx` exporting `ThemeProvider` (context) + `useTheme()`:
  - State: `"light" | "dark"`.
  - On mount: read `localStorage.getItem("paras-theme")`; if missing, default to `"dark"` (preserves current default; no system-pref switching to avoid surprise).
  - Effect: toggle `document.documentElement.classList` between `dark` and persists to `localStorage`.
  - Set `<meta name="color-scheme">` accordingly.
- Wrap `<App />` in `src/App.tsx` (or `main.tsx`) with `<ThemeProvider>`.
- Add an inline pre-hydration script in `index.html` `<head>` to set the class before paint (prevents flash):
  ```html
  <script>
    (function(){try{var t=localStorage.getItem('paras-theme')||'dark';
    document.documentElement.classList.toggle('dark',t==='dark');}catch(e){
    document.documentElement.classList.add('dark');}})();
  </script>
  ```

## 4. Toggle component
- New `src/components/ThemeToggle.tsx`: circular icon button (Sun/Moon from lucide-react) with smooth rotate/scale crossfade between icons. Uses `useTheme()`. ARIA label + `title`.
- Inserted in `Navigation.tsx`:
  - Desktop: between the nav item list and the "Hire Me" button.
  - Mobile: next to the hamburger button (visible at all times, not only when menu open) so users can switch theme on small screens.
- Styling: `h-9 w-9 rounded-full border border-border bg-surface/60 hover:border-ai-violet/50 hover:text-ai-violet`. Matches existing design language.

## 5. Verification
- Toggle in nav switches palette site-wide (Hero, About, Capabilities, Projects, ParxAI, ParxAILauncher, Contact, Footer) — all already use semantic tokens, so they update automatically.
- Refresh persists choice. No flash on reload.
- Mobile (`390px`) nav still fits with the extra toggle button.
- Dark mode visually unchanged from current.

## Files touched
- `index.html` (pre-hydration script)
- `src/index.css` (split palettes, transitions)
- `src/App.tsx` (wrap with ThemeProvider)
- `src/components/Navigation.tsx` (mount toggle, desktop + mobile)
- `src/components/AnimatedBackground.tsx` (light-mode opacities via `dark:` variants)
- New: `src/hooks/use-theme.tsx`
- New: `src/components/ThemeToggle.tsx`

Not touched: ParxAI logic, EmailJS, GitHub/LinkedIn links, routing, content, structure.
