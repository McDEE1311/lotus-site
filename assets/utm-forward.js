// Preserve an allowlisted set of UTM params across the signup funnel.
// Applies to any link straight to the app AND any internal link marked
// js-utm-forward (the hops a visitor takes before reaching the app),
// so ad/campaign attribution survives Products -> Harmony -> Register.
(function () {
  var allow = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var params = new URLSearchParams(window.location.search);
  var kept = new URLSearchParams();
  allow.forEach(function (k) {
    if (params.has(k)) kept.set(k, params.get(k));
  });
  var qs = kept.toString();
  if (!qs) return;
  document.querySelectorAll('a[href^="https://app.lotusintell.com"], a.js-utm-forward').forEach(function (a) {
    var sep = a.href.indexOf('?') > -1 ? '&' : '?';
    a.href = a.href + sep + qs;
  });
})();
