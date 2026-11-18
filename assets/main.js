/* Shared script for khromey.com — plain JavaScript, no dependencies. */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    var setMenu = function (open) {
      navLinks.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById('yr');
  if (yr) { yr.textContent = String(new Date().getFullYear()); }

  /* ---- Web3Forms contact form ----
     The access key is a public client-side key (not a secret); it only
     lets a form post to Nataliya's Web3Forms inbox. */
  var WEB3FORMS_KEY = '4968598a-98ec-446c-96e6-68d47a54badb';

  function bindForm(formId, statusId, successMsg) {
    var form = document.getElementById(formId);
    if (!form) { return; }
    var status = document.getElementById(statusId);
    var keyInput = form.querySelector('input[name="access_key"]');
    if (keyInput && !keyInput.value) { keyInput.value = WEB3FORMS_KEY; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (status) { status.textContent = ''; status.className = 'form-status'; }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success) {
            form.reset();
            if (status) { status.textContent = successMsg; status.className = 'form-status ok'; }
          } else {
            if (status) {
              status.textContent = ((json && json.message) || 'Something went wrong.') + ' Please try again.';
              status.className = 'form-status err';
            }
          }
        })
        .catch(function () {
          if (status) { status.textContent = 'Network error — please try again.'; status.className = 'form-status err'; }
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  }

  bindForm('contactForm', 'contactStatus',
    "Thank you — your message has been sent. I'll be in touch within 1–2 working days.");
  bindForm('orgForm', 'orgStatus',
    "Thank you — your enquiry has been sent. I'll be in touch within 1–2 working days.");

  /* ---- Pre-select enquiry type from ?type= (used by CTA links) ---- */
  var sel = document.getElementById('ctype');
  if (sel) {
    var params = new URLSearchParams(window.location.search);
    var t = params.get('type');
    if (t) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.value === t || o.textContent === t) { sel.value = o.value; }
      });
    }
  }
})();
