# LOTIE ACCESS POLICY — Lotus Intelligence LLC

Defines what LotiE (rig-based operations agent) can see, can draft, and
cannot do without a human approving it first. Written so this doesn't drift
or get re-litigated by accident six months from now.

**Role title: Ops, not COO.** The Claude Project handling business strategy,
pricing, and website content is the COO function. LotiE is Operations —
monitoring, drafting, flagging. Two agents with the same title and no
defined boundary is how context bleeds between systems; one title each,
no overlap.

---

## Read Access

What LotiE can see via her existing memory-index pipeline
(`~/.openclaw/workspace/knowledge/lotus-site/` + `openclaw memory index --force`):

| Item | Status |
|---|---|
| Website repo (README, BUILD_LOG, DEPLOYMENT) | Live now |
| Build logs | Live now |
| Client intake forms | Add when built |
| Sales documents | Add when they exist |
| Audit templates | Add when built |
| Marketing plans | Add when written |
| Business roadmap | Add when written |
| SOPs | **Does not exist yet — needs to be written first** |
| Meeting notes | **Does not exist yet — needs a capture habit first** |
| Customer feedback | **Does not exist yet — needs a capture habit first** |
| Public analytics | Add once there's a real analytics source (site traffic, form submissions) |

Read access is cheap and low-risk — it's just feeding her more accurate
context. The bottleneck is that several of these documents don't exist yet,
not that she lacks permission to read them.

## Write Access — how it actually works

LotiE's tool config denies `write`, `edit`, `apply_patch`, and `group:fs`
globally. That boundary exists to protect the wallet-adjacent trading
systems on the same box and should not be loosened just to cover this list.

Instead, "write access" here means: **LotiE drafts, a human persists.**

| Item | Mechanism |
|---|---|
| Draft documents | She writes it in chat/TUI response → human copies to file |
| Build reports | Same |
| Audit reports | Same |
| Suggested website updates | Same — proposed change described in chat, reviewed, then applied by human or Claude-COO |
| Marketing content | Same |
| Improvement recommendations | Same |
| Internal knowledge base | Same, until volume justifies automation |
| Task tracking | **Exception** — needs an actual live update mechanism. Use the same allowlisted approval-runner pattern already built for trading (`approval-runner.py`): human approves a specific, scoped, low-risk action via the existing inbox-file mechanism before it writes. |

No new filesystem permissions are granted anywhere on this list.

## Human Approval Required — no exceptions

- Git pushes to production
- DNS changes
- Domain purchases
- Client billing
- Contracts
- Hiring decisions
- Financial commitments
- Cloudflare changes
- Email routing changes
- **Any public-facing pricing change** (added — this build already had one
  pricing set go live and get pulled; treat every price change as a business
  decision requiring sign-off, not a content edit)
- **Any change to location/contact info shown publicly** (added — this
  build had a real location error, Winchester vs. Decherd, live on the site
  for several rounds before being caught)

LotiE never executes any of the above. She can flag that one might be
needed and describe what she'd recommend; a human decides and acts.

---

## Implementation sequence

1. **Now**: reindex her memory with the docs that already exist
   (README/BUILD_LOG/DEPLOYMENT). Already done as of this writing.
2. **Next**: write the missing SOP / roadmap / feedback-capture documents so
   there's something real for her read access to cover. Don't grant read
   access to documents that don't exist — write the documents first.
3. **As needed**: if "LotiE drafts, human persists" becomes a real bottleneck
   (i.e., it's happening daily and manual copy-paste is genuinely slow),
   revisit whether task-tracking needs the approval-runner extension. Don't
   build that automation preemptively — Rule #4: automate proven processes,
   not hypothetical ones.
