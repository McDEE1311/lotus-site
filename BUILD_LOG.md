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

## v7 — Free Business Audit intake form

Replaced the lightweight contact/lead form with a full intake form matching
the "Form 1: Free Business Audit" spec developed with GPT (business info,
online presence links, challenge checkboxes, goals, consent). Built directly
into the site rather than as a separate PDF or third-party form tool
(Jotform/Typeform) — consistent with the existing single-file, zero-monthly-
cost architecture. GPT's own conclusion on this question ("Option 1: build
it into the website") matched what was already true of this site, so no new
tooling was introduced.

**Friction tradeoff, deliberately made**: only Business Name, Owner Name,
Email, Phone, and Consent are marked `required`. Everything else (address,
industry, employee count, years in business, all 6 social/profile URLs,
challenge checkboxes, goals) is optional. A 20+ field mandatory form on a
*free* top-of-funnel offer would tank completion rate; making the extras
optional keeps the full data-capture value for people willing to give it
without blocking a fast submit for people who aren't.

**Consent & liability language**: added a Tennessee-specific disclaimer
(informational-only audit, no guarantee of results, no client relationship
created by form submission, liability limited to the extent Tennessee law
allows). This is boilerplate, not attorney-drafted — GPT's original note
still stands and applies here too: **have a Tennessee business attorney
review and expand this before it's load-bearing for anything beyond lead
qualification** (arbitration/venue clauses, a real service agreement,
data/privacy language, and electronic signature provisions if you want the
consent checkbox to carry more legal weight than "the customer clicked a
box").

**Print fallback**: added a "Print This Form" button (`window.print()`) plus
`@media print` CSS that hides everything except the form itself and shows a
signature/date line for a physical signature. Satisfies "if they want a hard
copy they can print it" without maintaining a separate PDF file — one source
of truth (the HTML form) instead of two things that can drift out of sync.

**Submission**: still `mailto:`-based, extended to include all new fields
(checkbox selections joined with commas, sectioned plain-text body). No new
backend, no new account.

**Not done in this pass, deliberately**: the other five forms GPT scoped
(GBP intake, website build intake, Cloudflare/domain handoff, managed
services agreement, change request form) were not built. Per the company's
own sequencing rule — customers before infrastructure — those forms don't
earn their build time until there's a client past the audit stage who
actually needs one. Build them when the first real prospect reaches that
stage, not preemptively.

**Logo asset — decision made**: keep the animated SVG lotus mark on the live
site (no change). The PNG logo (lotus mark + "Lotus Intelligence LLC — Smart
Solutions. Real Results." wordmark) is reserved for client-facing documents
generated per real job — audit reports, quotes, onboarding paperwork — not
for the website. When those document templates get built, use the PNG there.

## v8 — Form submission fixed: mailto → Formspree

Real-world testing found the `mailto:`-based submission (built in v5) silently
failed on a real machine — clicking submit did nothing visible, no error, no
mail client opened. Root cause: `mailto:` links only work if the visitor's
device has a *desktop* mail application registered as the default handler.
Most people today use Gmail/Yahoo/Outlook entirely in-browser with no desktop
client configured, so this would have silently failed for an unknown
fraction of real prospects — unacceptable for a form a stranger fills out
once and won't retry.

**Fix**: switched to Formspree (free tier, no server needed). The form now:
- Submits via `fetch()` to a Formspree endpoint, with a native `action=`/
  `method="POST"` on the `<form>` tag itself as a fallback if JavaScript is
  disabled or fails.
- Shows a real inline success/error message based on the actual HTTP
  response, instead of assuming success the moment the button is clicked.
- On failure, tells the visitor to call or text directly rather than leaving
  them wondering whether anything happened.

**Formspree endpoint is live**: `https://formspree.io/f/mqevnjey`, notifications
route to info@lotusintell.com. No placeholder remaining — this is wired and
ready to test end-to-end.

---

## 2026-09-16 — Harmony Hub pricing/trial copy corrected for ad launch

Standardized across `/harmony`, `/products/harmony-hub`, `/products/`:
"7 days free, then $25/year. Renews annually at $25 unless canceled."
Monthly stays $5.99/month. Removed all "for the first year" / lifetime-lock
language — the annual price is the ongoing recurring price, not a
first-year-only rate. Added "Existing lifetime-access households keep their
access. Sign in below." reassurance line on both Harmony pages.

This replaced earlier "free early access / no card / checkout not live yet"
copy that had gone stale relative to the app: `harmony-hub-core` (read-only
review, no edits made there) already runs a real, unconditional Stripe
checkout after registration for any non-comp household — both plans get the
same 7-day trial, and the 10,000-household founding cap is a real enforced
count, not just marketing copy. Existing lifetime-free (`beta_comp`)
households and the access-code exemption mechanism were untouched.

**Stripe Price object confirmed directly by CJ** (its actual recurring
configuration lives outside this repo's visibility — nothing in
`billing.py`/`entitlements.py` schedules a price change after checkout, but
that's as far as the code alone can confirm; the $25/year-with-no-scheduled-
increase claim rests on his direct confirmation, not on independent
verification from this repo).

Shipped as PR #2 (main copy correction) + PR #3 (a missed nav CTA on
`products/harmony-hub.html` still reading "Start free", caught in post-merge
live verification). Both merged and confirmed live on production.

---

## 2026-09-19 — /harmony replaced with ad-matched landing page (v2 creative)

Replaced the `/harmony` page with a new single-CTA landing page matching the
paid-ad creative: hero copy, a 15-second self-contained demo video, and one
primary action, deliberately with no competing button or nav. Both the logo
and demo video are embedded as base64 data URIs — no external asset
dependency, nothing to break if a CDN or image host goes down.

**The file as originally supplied was not launch-safe.** Its only
call-to-action was `href="#"` — a dead link; the string "register" did not
appear anywhere in the file, so no visitor could have actually reached
signup. It also had zero `<script>` tags, meaning no UTM/campaign-attribution
forwarding on the exact page paid ad traffic lands on first, and it was
missing meta description, canonical link, and OG/Twitter tags entirely.
Fixed before anything went live: CTA now points to
`https://app.lotusintell.com/register`, the shared UTM-forwarding script is
included, and canonical/OG/Twitter tags were added (reusing the existing
`harmony-hub-og.png` asset rather than inventing a new one).

**Follow-up refinement pass**, same day:
- Button text on the teal CTA changed from white to dark (`var(--bg)`) —
  measured contrast ratio was 1.8:1 (a real WCAG failure) before, 10.24:1
  after.
- CTA-adjacent copy standardized to: "7 days free, then $25/year. Renews
  annually at $25 unless canceled. Card required to start your trial."
- Added "One household. Up to 12 members." — this page hadn't stated the
  member cap anywhere, unlike every other Harmony page on the site.
- Removed a quoted testimonial that was never separately confirmed as an
  actual statement (see Open Items below) — the household and video footage
  behind it are verified genuine (a pulled video frame shows real app UI
  under the household name "MCDONALD'S HOUSE," using the same family names,
  Lotus and CJ, that appear in phone-mock demos elsewhere on the site), but
  the quoted sentence itself wasn't, so it came out.
- Lifetime-access line, register link, UTM forwarding, and canonical/OG tags
  from the first pass were preserved and re-verified.

**Verification before and after merge**: hash of the received file matched
independently; logo confirmed as a valid PNG; video confirmed as a valid
1080×1920 H.264 MP4, re-extracted and byte-for-byte identical on production
to what was originally supplied (untouched by the copy edits around it);
mobile layout checked via CSS (single-column by design, no fixed widths that
would overflow); all copy, links, and tags confirmed live on production
after merge.

Shipped as PR #4 (three commits: as-received, dead-link/attribution fixes,
copy refinement). Merged and confirmed live.

---

## 2026-09-19 — /harmony: demo label fix + second post-video CTA

Two small corrections after visual review of the live page (PR #4):

- "See it in 20 seconds" corrected to "Watch the 15-second demo" — the
  embedded video is 15.2 seconds (`ffprobe`-confirmed both times this page
  has been touched), not 20.
- Added a second "Start Free 7-Day Trial" button plus the same trial/
  pricing disclosure line directly below the video, so a visitor doesn't
  have to scroll back to the top after watching the demo to convert. Uses
  the same register URL as the top button, so it's automatically covered by
  the existing UTM-forwarding script (matches by href prefix, not by a
  specific element) — no new wiring needed for campaign-parameter
  preservation.

Verified on the Cloudflare preview and again on production after merge:
both buttons present and pointing at the correct register URL, pricing
disclosure appears correctly on both, UTM params forward from both, member-
cap and lifetime-access lines unaffected, logo/video re-extracted from
production and confirmed byte-identical to the file originally supplied for
PR #4 (still untouched by any of these copy edits).

Shipped as PR #5. Merged and confirmed live.

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
- Contact form is Formspree-based (v8) — don't revert to `mailto:`. That was
  tried, tested on a real machine, and failed silently because it depends on
  the visitor having a desktop mail client configured. Don't re-introduce it.
- Harmony Hub's founding annual price is $25/year as the *ongoing* recurring
  price, not a first-year-only teaser — confirmed by CJ directly against the
  Stripe Price object (2026-09-16). Don't revert to "$25 for the first year"
  or add year-two-increase language without new info from him.
- The `/harmony` testimonial quote was deliberately removed (2026-09-19) —
  the household and demo video are verified real, but the exact quoted
  sentence was never separately confirmed as actually said. Don't add a
  testimonial back without that confirmation, whoever writes it.
