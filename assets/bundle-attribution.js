// Preserve campaign tags through the Etsy checkout link. Etsy purchase attribution
// is not implied; use platform reports or buyer-confirmed source for sales.
const query = new URLSearchParams(location.search);
for (const anchor of document.querySelectorAll('a.etsy')) {
  const url = new URL(anchor.href);
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value = query.get(key);
    if (value && value.length <= 160) url.searchParams.set(key, value);
  }
  anchor.href = url.href;
}
