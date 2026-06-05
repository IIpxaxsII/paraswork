Remove the direct email icon/link from the footer while preserving everything else.

1. Edit `src/components/Footer.tsx`
   - Remove the `Mail` import from `lucide-react`.
   - Remove the mailto `<a>` element that displays the email icon.
   - Leave the GitHub and LinkedIn links untouched (same icons, styling, hover effects, spacing, alignment, animations).