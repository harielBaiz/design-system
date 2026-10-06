# Bort design system

React + TypeScript components and design tokens, documented in Storybook. Tokens are ported from the portfolio (`portfolio/css/tokens.css`, `design.md`) and cleaned up.

## Run

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/
npm run typecheck
```

Use the **Theme** switch in the Storybook toolbar: Light, Dark, or **Arcade** (the AI agent's retro look, done purely by re-mapping semantic tokens in `src/tokens/theme-arcade.css`).

## Structure

```
src/
  tokens/        tokens.css (primitives → semantic, light/dark), theme-arcade.css, base.css
  foundations/   Introduction, Colors, Typography, Spacing/radius/size (MDX)
  components/<Name>/  Name.tsx · Name.css · Name.stories.tsx   (Input also has Input.mdx)
  index.ts       public exports
```

## Components (from the portfolio inventory)

| Group | Components |
|---|---|
| Actions | Button (incl. toggle, loading), LinkButton, CopyButton, ThemeToggle, LangToggle |
| Forms | **Input** (new), ChatComposer (new, for the AI agent) |
| Labels | Chip (filled / outline / action), Badge, Code, SectionLabel |
| Content | Callout, InsightItem (win / pain), OutcomeStat, HeroFacts, Testimonial, MediaBlock, CaseRow |
| Layout | Nav, Footer, ContactSection, Tabs |
| Chat | ChatMessage, ChatComposer |
| Foundations | Icon (Lucide geometry, inline SVG) |

## Input

Sizes `xs`–`xl` (28–56px, shared `--size-*` scale with Button), types `text, password, email, number, tel, url, search, date, time, file, color, textarea`, validation `messages` (`error | warning | success | info`, each with an icon; they replace the helper text on screen), `description`, `startIcon` / `endIcon`, `prefixText` / `suffixText`, clearable search, length counter with min and max via `validate`, password reveal, `hideLabel`. Accessibility: label/id, `aria-required`, `aria-invalid`, `aria-describedby` for description + messages + counter.

## Using it in the AI agent

`portfolio-agent` is vanilla JS with no dependencies today. Two ways in:
1. **Move it to React** and import `ChatComposer`, `ChatMessage`, `Tabs`, `Chip` directly.
2. **Keep it vanilla for now**: link `tokens.css` + `theme-arcade.css` and set `data-theme="arcade"`; reuse the `.ds-input` / `.ds-btn` / `.ds-chip` markup and classes.

## Known follow-ups

- Fight-mode pieces (pixel scoreboard canvas, option buttons) are not components yet.
- Select, Checkbox, Radio, Toast and Dialog are not built; Input's guidance points to them.
- Portfolio debt fixed here: `--text-success`, win/pain icon colours and the warning/info scales now exist as tokens. Button keeps the portfolio's variants (only `text` is used on the live site today), so prune any you never use.

## Fonts

Typeset in [General Sans](https://www.fontshare.com/fonts/general-sans) by Indian Type Foundry (ITF Free Font License), loaded from Fontshare's CDN at runtime. The font files are not stored in this repo. Body text uses Lora and mono text uses DM Mono, both from Google Fonts. If General Sans can't load, the stack falls back to DM Sans.
