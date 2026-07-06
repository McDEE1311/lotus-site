# BUILD LOG — lotus-site

Chronological record of decisions. Purpose: if something breaks, or someone
(human or LotiE) picks this up cold, they can see what was tried, what was
rejected, and why — instead of re-deciding things that are already settled.

---

## v1 — Initial build

Single-page cyberpunk-themed site. Sections: Hero, About, Services, LotiE AI,
Future Vision, Contact. Palette: neon purple / cyan / emerald on navy-black.
Fonts: Chakra Petch (display), Inter (body), IBM Plex Mono (mono/labels).

Reference images provided (stock/AI-marketplace lotus + cyberpunk cityscape
images) were used for **style direction only** — not embedded. Two of the
three had visible marketplace watermarks (Dreamstime, a Crayon generation
logo) and were not licensed for use on a live commercial site. All brand
artwork was rebuilt from scratch as inline SVG instead — zero licensing risk,
fully editable, no external image dependencies.

## v2 — Lotus artwork, attempt 1 (rejected)

First lotus mark used overlapping curved paths that read as an abstract
badge/heart shape rather than a flower. Feedback: doesn't look like a lotus.

## v3 — Lotus artwork, attempt 2 (rejected)

Rebuilt with rotated petal paths fanned from a base point — but petals were
far too narrow relative to their length (roughly 5-10:1 length-to-width).
Rendered as thin spiky blades / a starburst shape, not petals. Feedback:
looks like a leaf or a spike pattern, not a lotus.

## v4 — Lotus artwork, attempt 3 (approved)

Rebuilt petal geometry with a ~2:1 length-to-width ratio and softer, rounded
tips (cubic bezier control points pulled wide instead of narrow). This is
the current mark — 5 petals for the compact icon (nav/footer/cards/LotiE
core), 7 petals in 4 color tiers for the larger hero/About versions. One
symbol definition (`#lotusIconFilled` for colored use, `#lotusIcon` for
stroke-only use) is reused everywhere via `<use>` so the mark stays visually
consistent across the whole site. Do not redesign this again without a
specific complaint about what's wrong with it — three iterations already
happened to get here.

## v5 — Real business info integration

Replaced all placeholder content with real handoff data:
- **Location corrected**: site previously said "Winchester, TN near Tims
  Ford Lake" (wrong — that was an earlier draft assumption). Actual HQ is
  **Decherd, TN**. Winchester is now correctly listed only as one of the
  towns in the service area, not as HQ.
- Real contact info wired in: 931-308-8967, info@lotusintell.com.
- Lead intake form expanded from a basic 4-field contact form to the full
  intake field set (business name, contact name, phone, email, website, GBP
  link, service interest, biggest challenge, preferred contact method).
- Form submission implemented via client-side `mailto:` construction —
  functional today with zero backend and zero third-party account. Upgrade
  path if lead volume grows: swap in Formspree or a Cloudflare Pages
  Function without changing the form markup.
- Services grid cut from 6 cards down to the 4 actually-deliverable
  categories (GBP, Website Dev, Social Media, Business Monitoring). AI
  Business Assistants and Agent Hosting were pulled out of the sellable grid
  — not deliverable yet, don't sell them yet (Rule #9: every service needs a
  defined delivery process before it's offered).
- Future Vision / Coming Soon timeline updated to the exact item list from
  the business handoff, so the site doesn't imply anything is available that
  isn't.

## v6 — Pricing model correction

**Removed fixed pricing** ($150 GBP / $500 website / $50-mo monitoring) that
had been added in v5. Reasoning: those numbers were guesses with no track
record behind them. Real risk — GBP setup might take 2 hours (fine at $150)
while a website might take 25 hours (not fine at $500), and monitoring might
turn into de facto support (not fine at $50/mo). Locking in pricing before
knowing actual time-to-deliver is a decision made from the wrong side of the
information.

**Current policy: every service is listed as "Custom Quote."** After 3-5
real client engagements, revisit this log, look at actual hours/effort per
job, and set real pricing then — with a documented justification, per the
company's own purchase/pricing decision rules.

Also added a "Why Lotus Intelligence" section — reframes the pitch in buyer
language (more calls, more leads, better visibility, less time wasted)
rather than leading with "AI," since local business owners buy outcomes, not
technology.

---

## Open items / things not to re-litigate without new info

- Pricing stays "Custom Quote" until there's real client data. Don't add
  numbers back in on a hunch.
- The lotus mark geometry (v4) is settled. If it needs to change, the
  complaint should be specific ("too many petals," "too pink," etc.), not
  "make it more like a lotus" — that's what the last two rejected rounds
  were, and vague feedback costs a full rebuild cycle each time.
- Street address is deliberately omitted from the public site until the LLC
  is finalized and there's a decision about whether a home address goes
  online permanently.
- Contact form is `mailto:`-based by design, not a bug — don't "fix" it into
  a backend integration without a reason (rising lead volume, or a specific
  failure mode observed in the wild).
