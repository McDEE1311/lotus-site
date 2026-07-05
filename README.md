# lotus-site

Public marketing website for **Lotus Intelligence LLC** — a single self-contained HTML file (no build step, no framework, no dependencies beyond Google Fonts served over CDN).

**Live at:** lotusintell.com (once deployed — see DEPLOYMENT.md)

## What this is

One file: `index.html`. All CSS and JS are inline. No npm install, no build process. You can open it directly in a browser to preview, or drop it straight into a static host.

## Sections

Hero → About → Services → Why Lotus Intelligence → LotiE AI → Future Vision (Coming Soon roadmap) → Contact (lead intake form)

## Tech notes

- Fonts: Chakra Petch (headings), Inter (body), IBM Plex Mono (labels/data) — loaded via Google Fonts.
- All brand artwork (the lotus mark) is hand-built inline SVG, reused via `<symbol>`/`<use>` — no external image assets, no licensing risk.
- Contact form submits via `mailto:` construction in JS (see `#leadForm` handler at bottom of file) — zero backend, zero third-party account required. Opens the visitor's mail client with the lead data pre-filled, addressed to `info@lotusintell.com`.
- Fully responsive — grid layouts collapse at 900px/860px/720px/600px/520px breakpoints.
- Respects `prefers-reduced-motion`.

## Company reference info (for consistency across future edits)

- **Name:** Lotus Intelligence LLC
- **Location:** Decherd, Tennessee
- **Service area:** Franklin County, Middle Tennessee, remote nationwide
- **Phone:** 931-308-8967
- **Email:** info@lotusintell.com / support@lotusintell.com / sales@lotusintell.com
- **Domain:** lotusintell.com (Cloudflare-managed DNS)

## Pricing policy (as of this build)

All services are listed as **Custom Quote** — deliberately, not a placeholder. Fixed pricing gets set after 3-5 real client engagements establish actual time-to-deliver. See BUILD_LOG.md for the reasoning; don't hardcode prices back in without updating that log with the justification.

## Related docs in this repo

- `BUILD_LOG.md` — chronological record of what was built and why, including the artwork iterations and the pricing-model decision. Read this before making design changes so you don't re-litigate settled decisions.
- `DEPLOYMENT.md` — how to actually get this live on Cloudflare Pages, and how the update/push workflow should work going forward.
