# Business kit campaign tools

Buyer page: `/products/business-kit` • Owner workspace: `/campaigns/`

The workspace is a browser-local tool, not a connected private analytics service.
It collects no visitor events, sets no tracking cookies, sends no metrics to a
server, and does not connect to social accounts or Etsy. No API keys are needed.
Its page is public; its records are local to each browser profile. Do not store
customer information. Export JSON backups frequently.

## Start a test
1. Open the owner workspace and create a unique ID for a post.
2. Save to generate a tagged buyer-page link. Use that link in the post.
3. Record a real workbook demo with fictional sample business information.
   Keep text readable on a phone. Do not claim illustrative graphics are real UI.
4. Post to the supplied Trend Forge channel and Lotus Facebook page yourself.
   The tool does not publish posts. Use a different ID for each placement.
5. Enter views and reported outbound link clicks from platform reports, with a
   date range. A video's view count is not a listing visit count.
6. Attribute an order only with evidence (platform attribution, a genuinely
   campaign-specific coupon, or buyer-confirmed source). UTM parameters do not
   automatically identify an Etsy purchase. Leave unknown sales unattributed.
7. Export a backup. Review after seven days. Compare posts on the same platform
   with similar age; small counts are directional, not proof of a winner.

Use the six hooks supplied in the workspace. Each promises a demonstration,
not income. Avoid unverified customer quotes, fake scarcity, guaranteed leads,
or a claim that the product is in Etsy's top percentage.

No prices, sales, Etsy listings or ad settings are changed. Keep the existing
$1/day five-day ad test separate. Do not stack a coupon on the existing sale
without checking the final checkout price and margin.

## Deployment and verification
This uses the existing static Cloudflare Pages deployment. No build step or
new server is required. Review the branch preview, then merge to main to publish.
Test: `node --test tests/*.test.mjs`.
Check buyer CTAs, campaign parameter forwarding, narrow-screen layout, save/edit,
backup/restore and clipboard fallback. The source modules have no dependencies.

Future automatic analytics requires a separately configured collection backend,
bot filtering, retention policy and authentication for reports. Etsy purchase
attribution still needs a supported integration or reconciled sales data; adding
an event counter will not solve that limitation.
