export function campaignLink(source, content) {
  const url = new URL('https://lotusintell.com/products/business-kit');
  url.search = new URLSearchParams({utm_source:source,utm_medium:'organic_social',utm_campaign:'business_kit',utm_content:content}).toString();
  return url.href;
}
export function metrics(rows) {
  const total = rows.reduce((a,r) => {for (const k of ['views','clicks','orders','revenue','spend']) a[k] += Number(r[k]) || 0; return a;}, {views:0,clicks:0,orders:0,revenue:0,spend:0});
  return {...total,ctr:total.views?total.clicks/total.views:null,cac:total.orders?total.spend/total.orders:null};
}
export function validRow(row) {
  return typeof row.id === 'string' && row.id.length <= 100 && ['facebook','youtube'].includes(row.source) && typeof row.hook === 'string' && row.hook.length <= 500 && ['draft','posted','reviewed'].includes(row.status) && ['views','clicks','orders','revenue','spend'].every(k => Number.isFinite(row[k]) && row[k]>=0) && typeof row.evidence === 'string' && row.evidence.length<=500;
}
