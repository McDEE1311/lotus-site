// Lotus Intelligence — shared behavior for / and /partners/.
// Everything here is progressive enhancement: with JS off, the nav lists every
// link inline and the connected-business section renders fully complete.
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  // ---- Mobile navigation ----
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
      }
    });
  }

  // ---- Connected business experience ----
  var section = document.getElementById('connected');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (section && 'IntersectionObserver' in window && !reduce.matches) {
    section.classList.add('anim');
    var steps = Array.prototype.slice.call(section.querySelectorAll('.step'));
    var groups = {};
    section.querySelectorAll('[data-conn]').forEach(function (g) { groups[g.getAttribute('data-conn')] = g; });

    var travel = function (g) {
      var path = g.querySelector('.link');
      var spark = g.querySelector('.spark');
      if (!path || !spark || !path.getTotalLength) return;
      var len = path.getTotalLength(), start = null, dur = 1100;
      var frame = function (t) {
        if (start === null) start = t;
        var k = Math.min((t - start) / dur, 1);
        var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in-out
        var p = path.getPointAtLength(len * e);
        spark.setAttribute('cx', p.x); spark.setAttribute('cy', p.y);
        spark.style.opacity = k < 0.85 ? 1 : (1 - k) / 0.15;
        if (k < 1) requestAnimationFrame(frame); // stops itself; nothing runs after arrival
        else spark.style.opacity = 0;
      };
      requestAnimationFrame(frame);
    };

    var activate = function (i) {
      for (var j = 0; j <= i; j++) {
        var s = steps[j];
        if (s.classList.contains('is-on')) continue;
        s.classList.add('is-on');
        var g = groups[s.getAttribute('data-step')];
        if (g) { g.classList.add('is-on'); if (j === i) travel(g); }
      }
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { activate(steps.indexOf(en.target)); io.unobserve(en.target); }
      });
    }, { rootMargin: '-35% 0px -35% 0px' });
    steps.forEach(function (s) { io.observe(s); });

    // If the visitor turns on reduced motion mid-visit, show everything complete.
    var settle = function () { if (reduce.matches) section.classList.remove('anim'); };
    if (reduce.addEventListener) reduce.addEventListener('change', settle);
  }

  // ---- Free Business Audit form -> Formspree (same endpoint, fields, and behavior as v8) ----
  var form = document.getElementById('leadForm');
  if (form && window.fetch && window.FormData) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      var note = f.querySelector('.field-note');
      var btn = f.querySelector('button[type="submit"]');
      var data = new FormData(f);
      var challenges = data.getAll('challenge').join(', ') || 'n/a';
      // human-readable summary fields, so the Formspree notification email is easy to read
      data.append('_subject', 'Free Business Audit Request: ' + (data.get('business') || data.get('owner')));
      data.append('Challenges Selected', challenges);

      note.className = 'field-note is-busy';
      note.textContent = 'Sending…';
      if (btn) btn.disabled = true;

      fetch(f.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (response) {
          if (response.ok) {
            f.reset();
            note.className = 'field-note is-ok';
            note.textContent = "Thanks — your audit request was sent. We'll be in touch within one business day.";
          } else {
            throw new Error('submission failed');
          }
        })
        .catch(function () {
          note.className = 'field-note is-err';
          note.textContent = "That didn't go through — please call or text 931-308-8967, or email info@lotusintell.com directly.";
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  }
})();
