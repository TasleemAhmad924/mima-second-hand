# MiMa Second Hand — Design System

Visual source of truth for the public frontend. Agents and humans should treat this file as binding. If a generic design skill conflicts with this document, this document wins.

## 1. Visual theme and atmosphere

MiMa is an indoor second-hand shop and shelf-rental concept. The site should feel like a small, well-run concept store: warm paper, careful type, real objects, quiet confidence.

It is **not** a SaaS product, marketplace dashboard, or experimental portfolio.

**Mood:** editorial, warm, understated, precise, expensive, human.

**Density:** gallery-like. Leave air. Do not fill every gap.

**Variance:** enough asymmetry to feel composed, never chaotic.

**Motion:** present and shared. Opacity and small translation only. No bounce, no parallax, no scroll hijack.

## 2. Brand that must not change

- The MiMa wordmark as supplied. Never redraw it. Do not crop chat screenshots into a production logo.
- Warm off-white / cream world. Never convert the site to dark mode.
- Charcoal and warm-brown ink. Sage and beige from the client CI stay spare.
- Serif display (Playfair Display) + sans utility (Montserrat). This pairing is the client CI.
- Holiday script is a reserved accent for occasional single words only, and is not embedded until usage rights are confirmed.
- Existing information architecture and German copy voice.
- Dark charcoal footer as the one committed contrast close.

Do not import Apple, Notion, or Mastercard colors, fonts, pills, or components. Extract only principles: photography before chrome, warm paper instead of sterile white, generous measure, hairline structure.

## 3. Color

| Token | Hex | Role |
|---|---|---|
| warm | `#F7F5F1` | Page canvas (client off-white) |
| cream | `#ece6dc` | Alternate band, quieter plate |
| cream-deep / taupe | `#CEBBA9` | Warm beige, inset surfaces |
| taupe-ink / ink | `#4A3A32` | Eyebrows, italic emphasis, hover |
| sage | `#8C9A83` | Spare CI green; selection, rare hover |
| charcoal | `#292725` | Primary text, primary buttons, footer |
| muted | `#5c534c` | Secondary text |
| line | `rgba(41,39,37,0.14)` | Hairlines |
| line-strong | `rgba(41,39,37,0.28)` | Stronger rules, inputs |

No gradients. No glow. No neon. No second accent. The public floor plan is an explorer: wood hatch for shelves, no green/red availability, no occupancy colours.

## 4. Typography

- Display: Playfair Display, weight 400. Tight tracking on large sizes (`-0.018em` to `-0.022em`).
- Utility: Montserrat, weight 500 for labels, 400 for body.
- Headlines use `text-wrap: balance`. Body uses `text-wrap: pretty`.
- No hyphenation on headings. German display words must stay intact.
- Reading measure: about 38–65 characters. `max-w-md` / `max-w-xl` for prose.
- Eyebrows are rare. Maximum one eyebrow per three homepage sections. Page-level headers may keep a single eyebrow.
- Do not number marketing section titles (`01 / Capabilities`). Numbering is reserved for process steps, values, and the mobile menu.
- Buttons: small caps, tracked, never wrap on desktop.
- Prices and dates: `font-variant-numeric: tabular-nums`.

Fluid roles:

| Role | Treatment |
|---|---|
| Display / H1 | `.display` — `clamp(2rem, 0.88rem + 4.6vw, 4.15rem)` / 1.04. Hero overrides smaller so “Lieblingsstücke.” never clips. |
| Headline / H2 | `.headline` — `clamp(1.6rem, 1.12rem + 1.55vw, 2.65rem)` / 1.08 |
| Body | 16–18px, line-height 1.55–1.65, muted |
| Eyebrow | 11px, uppercase, tracking `0.18em`, taupe-ink |
| Nav | 11–12px, uppercase, tracking `0.14em` |

## 5. Layout and grid

- Shared gutter: `px-6 sm:px-8 lg:px-12 xl:px-16`
- Content measure: `max-w-[82rem]`
- Narrow reading: `max-w-[44rem]`
- Images may bleed the right or left edge when that improves the composition (hero, story).
- Do not give every section the same vertical padding. Compose rhythm:

```
quiet entry
large visual moment
compact information
generous air
editorial block
conversion
```

- Optical alignment over mathematical centering. A column may sit slightly off-grid.
- No three or four equal feature cards. Lists, rows, and numbered statements only.
- Radius is almost zero (`2–3px`). Images are square-cornered.

## 6. Components

**Buttons.** Charcoal fill, warm type. Hover to taupe-ink. Secondary is a hairline, not a ghost glass pill. Active: `translateY(1px)`. Minimum height 44px.

**Links.** Underline draws from left. Arrow moves 4–5px. No bounce.

**Images.** Clip in a frame. Enter from scale `1.04–1.06` to `1` over ~1.1s. Hover zoom `1.03–1.04`. No shadows. No pills on photos.

**Accordion.** 300ms height + opacity. Plus becomes a minus. No bounce.

**Forms.** Label above, error below, underline fields. No boxed SaaS inputs on marketing pages.

**Floor plan.** Architectural drawing, not a game board. Thin walls, aisle space, entrance gap, checkout as a counter. Monochrome states.

**Booking summary.** Receipt, not a card. Sticky on desktop. Compact bar on mobile, never a giant black slab.

## 7. Motion

Shared easing:

- Editorial out: `cubic-bezier(0.16, 1, 0.3, 1)`
- Menu in-out: `cubic-bezier(0.76, 0, 0.24, 1)`

| Kind | Spec |
|---|---|
| Reveal | opacity 0→1, y 16–24→0, 650–850ms |
| Image | scale 1.06→1, 900–1200ms |
| Hover | 300–420ms, listed properties only |
| Page | opacity, 200–350ms |
| Menu surface | clip + 500–650ms |
| Menu items | stagger 50–70ms |
| Accordion | 250–350ms |

Animate only `transform` and `opacity`. Honor `prefers-reduced-motion`. Content must remain readable without JavaScript animation.

## 8. Navigation

**Closed mobile header:** logo left, two-line menu control right. No booking button.

**Open menu:** full-viewport warm layer. Numbered editorial links. Secondary links. Booking CTA last. Then store contact. Lock scroll. Escape, focus trap, `aria-expanded`.

**Laptop (to 1279px):** same closed treatment as mobile. Desktop nav and booking button begin at 1280px so five German labels never crowd.

**Desktop header:** text links + one booking button. Height under 80px. Single row.

## 9. Responsive

Design 320, 375, 390, 430, 768, 1024, 1280, 1440 independently.

- Mobile headlines stay elegant, not viewport-filling.
- `/entdecken` is one column until the image and title can breathe, then two, then three.
- Touch targets ≥ 44px.
- Safe-area insets on sticky bars and the menu.

## 10. Do

- Let photography and type carry the page.
- Vary section rhythm.
- Keep German copy warm and short.
- Mark unknown business facts as placeholders in `src/config`.

## 11. Do not

- Glass, glow, grain overlays, gradient meshes, blobs, bento, floating pills.
- Fake stats, testimonials, dashboards, invented addresses.
- Springy or bouncy motion.
- Dark cinematic mid-page bands (footer is the only dark surface).
- Inter, generic icon sets, equal card grids, SaaS pricing towers.
- Rewrite the brand into Apple, Notion, or Mastercard.

## 12. Temporary imagery

Classify every stock image so real store photography can replace it without a layout change.

| Asset | Status | Role |
|---|---|---|
| `store-interior.jpg` | CURRENT HERO FALLBACK | Temporary interior until the real Laden photo arrives. |
| `mima-store-hero.jpg` | [!] NOT SUPPLIED | Intended hero/About photograph of the real Second-Hand-Laden. |
| `miriam-regal.jpg` | REAL CLIENT PHOTO | Miriam with a MiMa shelf. About / “Ein Wohlfühlort”. |
| `store-wall.jpg` | REPLACE LATER WITH REAL STORE PHOTO | Sell side, process. Wooden shelves. |
| `product-ceramics.jpg` / `product-cups.jpg` | REPLACE LATER | Home objects in the mix. |
| Fashion product stills | REPLACE LATER | Catalogue only. |
| `rack-minimal.jpg` | OPTIONAL | Unused in this pass. Too fashion-editorial. |

Do not add more stock. Prefer fewer strong frames.
