# ParxAI Mobile Responsiveness Fix

Scope: only `ParxAI.tsx`, `ParxAIChat.tsx`, `ParxAILauncher.tsx`. Desktop/tablet layouts unchanged. No changes to colors, typography, content, or chat logic.

## 1. `ParxAI.tsx` — section container
- Reduce vertical padding on mobile: `py-12 px-3 md:py-24 md:px-4`.
- Replace fixed `h-[680px]` with responsive height: `h-[calc(100svh-8rem)] max-h-[640px] md:h-[680px] md:max-h-none` so the embedded chat fits within the mobile viewport using `svh` (dynamic viewport units) and never pushes the page.
- Tighten header margin on mobile (`mb-6 md:mb-10`).

## 2. `ParxAIChat.tsx` — chat layout
Keep desktop classes as-is; add mobile overrides only.

- Root: ensure `flex flex-col h-full min-h-0` so inner scroll works.
- Header: reduce padding on mobile (`px-4 py-3 md:px-6 md:py-4`); shrink avatar to `w-9 h-9 md:w-10 md:h-10`.
- Messages area:
  - `flex-1 min-h-0 overflow-y-auto`
  - Padding: `px-4 py-5 space-y-4 md:px-6 md:py-8 md:space-y-6`
  - Remove the `min-h-[520px]` on mobile (only apply at `md:` and up) so the area shrinks to available space instead of forcing overflow.
  - Bubbles: `max-w-[88%] md:max-w-[80%]` for user, `max-w-[92%] md:max-w-[85%]` for assistant; text size `text-sm md:text-[15px]`.
- Suggested prompts (Option A — horizontal scroll on mobile):
  - Wrap chips in a container: on mobile `flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1`, on `md:` revert to `flex-wrap gap-1.5 mx-0 px-0`.
  - Add `whitespace-nowrap shrink-0` to chip buttons on mobile.
  - Add a small utility `.no-scrollbar` in `index.css` (scoped util only, no design changes) to hide the scrollbar visually.
- Input row:
  - Footer padding: `px-3 py-3 md:px-6 md:py-4`; ensure it remains the last flex child so it's anchored at the bottom of the chat container.
  - Input height: `h-11 md:h-12`, send button `h-11 w-11 md:h-12 md:w-12`, `gap-2` preserved so they never overlap.
  - Add `inputMode="text"` and `autoComplete="off"`; keep existing focus behavior, but on mobile do not auto-focus on mount (auto-focus triggers keyboard + scroll jump). Gate the mount auto-focus with a `window.matchMedia('(min-width: 768px)').matches` check.

## 3. `ParxAILauncher.tsx` — hide launcher when open / avoid overlap with section
- Hide launcher button when the drawer is open (`open === true`) so it never sits over chat UI.
- Hide the floating launcher when the user is within the `#parxai` section on mobile, using an `IntersectionObserver` on `#parxai` with a `useIsMobile()` check; on desktop keep current behavior.
- Mobile launcher position: `bottom-4 right-4 h-12 w-12 md:bottom-6 md:right-6 md:h-14 md:w-14` so it doesn't crowd small screens.
- Sheet content on mobile: keep `side="right" w-full`, add `h-[100svh]` and `flex flex-col` (already there); reduce internal padding override to `p-0` (already set). No desktop change.

## 4. Tiny CSS addition
In `src/index.css` (utilities layer), add:
```css
@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
}
```

## Verification
- Preview at 320 / 375 / 390 / 412 / 430 widths: chat fits viewport, input always visible, chips scroll horizontally, launcher hidden when section in view or drawer open.
- Desktop (≥768px) visually identical to current.

## Files touched
- `src/components/ParxAI.tsx`
- `src/components/ParxAIChat.tsx`
- `src/components/ParxAILauncher.tsx`
- `src/index.css` (single utility class only)
