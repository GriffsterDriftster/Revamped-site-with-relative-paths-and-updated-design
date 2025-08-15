// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Current year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Formspree enhanced submit (prevents full page redirect, shows messages)
const form = document.getElementById('contact-form');
if (form) {
  const statusEl = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending…';
    statusEl.className = 'status';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! We’ll be in touch within 1 business day.';
        statusEl.classList.add('ok');
      } else {
        const err = await res.json().catch(() => ({}));
        statusEl.textContent = err?.error || 'Something went wrong. Please email us directly.';
        statusEl.classList.add('bad');
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Check your connection and try again.';
      statusEl.classList.add('bad');
    }
  });
}