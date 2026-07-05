# DEPLOYMENT — lotus-site

## Recommended setup: Git-connected Cloudflare Pages (not manual upload)

Manual "upload assets" works for a one-time deploy, but every future edit
means re-uploading by hand. Connecting the GitHub repo directly to Cloudflare
Pages means **every `git push` to `main` auto-deploys** — that's the real
version of the "push and it updates" workflow, and it's the same effort to
set up once.

### One-time setup

1. Create the repo on GitHub under McDEE1311 (if not already done):
   ```bash
   cd /path/to/lotus-site-repo
   git init
   git add .
   git commit -m "Initial site build"
   git branch -M main
   git remote add origin https://github.com/McDEE1311/lotus-site.git
   git push -u origin main
   ```
   (Run this wherever your GitHub auth already lives — likely the rig, since
   that's where the taoscout repo's credentials are already configured. This
   is a normal git push you run by hand; it is not LotiE executing anything.)

2. In Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**
3. Select the `lotus-site` repo, branch `main`.
4. Build settings: **none needed** — this is a static file, no build command,
   output directory `/`.
5. Deploy. Cloudflare gives you a `*.pages.dev` URL immediately.
6. In the Pages project's **Custom domains** tab, add `lotusintell.com`.
   Since the domain's DNS is already on Cloudflare, this is a couple of
   clicks — no manual DNS record editing needed.

### After setup — the ongoing workflow

```
Edit index.html (locally, via Claude, or however)
   → git add . && git commit -m "describe the change"
   → git push
   → Cloudflare Pages auto-deploys within ~30-60 seconds
   → verify: curl -sI https://lotusintell.com | head -1
```

Every deploy is logged in the Cloudflare Pages dashboard (Deployments tab)
with the exact commit it came from — that's your rollback point if a push
breaks something. To roll back: find the last good deployment in that tab
and hit "Rollback to this deployment." No need to revert git history under
pressure.

## Email routing verification

Once the domain resolves:
1. Send a test email from any outside account to `info@lotusintell.com`.
2. Confirm it lands in `corey.mcdonald11@yahoo.com` within a few minutes.
3. If it doesn't arrive, check Cloudflare → your domain → **Email → Email
   Routing** for the MX/TXT record status. "Pending" means DNS hasn't fully
   propagated yet (can take up to 24h, usually much faster on Cloudflare).

## Where LotiE fits (rig-side, not hosting-side)

The website is hosted on Cloudflare Pages regardless of rig status — that's
the point of this split. LotiE's role, once scoped, is operational:

- **Monitoring**: a heartbeat-style check hitting `https://lotusintell.com`
  and confirming 200 status + checking the contact form still renders.
  Same pattern as her existing `heartbeat-snapshot.py` for TaoScout — pushed
  data, not LotiE reaching out and pulling it herself, consistent with her
  existing push-not-pull architecture.
- **Deploy assistance**: reviewing a diff and recommending whether to push,
  not pushing autonomously — unless a scoped, repo-limited deploy credential
  is deliberately issued (see the note on this in the main chat). Her
  current tool config denies `write`/`edit`/`group:fs` for good reason
  (wallet-adjacent risk surface); don't loosen that globally just to cover
  this one repo.
- **Future**: `api.lotusintell.com` and `dashboard.lotusintell.com` are
  reasonable future subdomains for rig-hosted backend/dashboard work, once
  there's a paying client that needs one. Not before.
