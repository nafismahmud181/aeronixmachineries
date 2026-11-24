// Client-side behaviour for the whole site. Everything here is progressive:
// pages are complete HTML without it.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/* ---------------- Mega menu ---------------- */
const megaBtn = $<HTMLButtonElement>('[data-mega-toggle]');
const mega = $('#mega');
const megaBackdrop = $('[data-mega-close]');
function setMega(open: boolean) {
  if (!megaBtn || !mega || !megaBackdrop) return;
  mega.hidden = !open;
  megaBackdrop.hidden = !open;
  megaBtn.setAttribute('aria-expanded', String(open));
  megaBtn.classList.toggle('is-open', open);
}
megaBtn?.addEventListener('click', () => setMega(mega?.hidden ?? true));
megaBackdrop?.addEventListener('click', () => setMega(false));

/* ---------------- Mobile menu ---------------- */
const mnav = $('#mnav');
const mobileOpenBtn = $<HTMLButtonElement>('[data-mobile-open]');
function setMobile(open: boolean) {
  if (!mnav) return;
  mnav.hidden = !open;
  document.documentElement.style.overflow = open ? 'hidden' : '';
  mobileOpenBtn?.setAttribute('aria-expanded', String(open));
  if (open) $<HTMLElement>('[data-mobile-close]', mnav)?.focus();
  else mobileOpenBtn?.focus({ preventScroll: true });
}
mobileOpenBtn?.addEventListener('click', () => setMobile(true));
$$('[data-mobile-close]').forEach(el => el.addEventListener('click', () => setMobile(false)));

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  setMega(false);
  if (mnav && !mnav.hidden) setMobile(false);
});

/* ---------------- Hero slider ---------------- */
const hero = $('[data-hero]');
if (hero) {
  const slides = $$('.hero-slide', hero);
  const bars = $$<HTMLButtonElement>('.hero-bar', hero);
  const num = $('[data-hero-num]', hero);
  let index = 0;
  let timer: number | undefined;

  const show = (i: number) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      const active = n === index;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
      $$<HTMLElement>('a,button', s).forEach(el => (el.tabIndex = active ? 0 : -1));
    });
    bars.forEach((b, n) => b.classList.toggle('is-active', n === index));
    if (num) num.textContent = String(index + 1).padStart(2, '0');
  };
  const start = () => {
    window.clearInterval(timer);
    if (reduceMotion.matches) return;
    timer = window.setInterval(() => show(index + 1), 7000);
  };
  const go = (i: number) => { show(i); start(); };

  bars.forEach((b, n) => b.addEventListener('click', () => go(n)));
  $('[data-hero-prev]', hero)?.addEventListener('click', () => go(index - 1));
  $('[data-hero-next]', hero)?.addEventListener('click', () => go(index + 1));
  document.addEventListener('visibilitychange', () => (document.hidden ? window.clearInterval(timer) : start()));
  reduceMotion.addEventListener?.('change', start);

  // Background video: only loaded when motion is allowed. Portrait screens get the mobile cut.
  const video = $<HTMLVideoElement>('video[data-wide]', hero);
  if (video && !reduceMotion.matches) {
    const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
    const sources: [string, string][] = portrait
      ? [[video.dataset.mobile!, 'video/mp4']]
      : [[video.dataset.wideWebm!, 'video/webm'], [video.dataset.wide!, 'video/mp4']];
    if (portrait && video.dataset.posterMobile) video.poster = video.dataset.posterMobile;
    sources.forEach(([src, type]) => {
      const s = document.createElement('source');
      s.src = src; s.type = type;
      video.appendChild(s);
    });
    video.muted = true;
    video.hidden = false;
    video.load();
    video.play().catch(() => {});
  }

  show(0);
  start();
}

/* ---------------- Fade-up on scroll ---------------- */
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  document.documentElement.classList.add('has-reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------------- Catalog filters ---------------- */
const catalog = $('[data-catalog]');
if (catalog) {
  const cards = $$('[data-card]', catalog);
  const search = $<HTMLInputElement>('[data-catalog-search]', catalog);
  const count = $('[data-result-count]', catalog);
  const empty = $('[data-empty]', catalog);
  const scaleBtns = $$<HTMLButtonElement>('[data-scale-btn]', catalog);
  let scale = 'all';

  const params = new URLSearchParams(location.search);
  if (search && params.get('q')) search.value = params.get('q') || '';

  const apply = () => {
    const q = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const s = card.dataset.scale;
      const ok = (scale === 'all' || s === scale || s === 'both') && (!q || (card.dataset.search || '').includes(q));
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = `${shown} ${shown === 1 ? 'machine' : 'machines'}`;
    if (empty) empty.hidden = shown > 0;
  };
  scaleBtns.forEach(btn => btn.addEventListener('click', () => {
    scale = btn.dataset.scaleBtn || 'all';
    scaleBtns.forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    apply();
  }));
  search?.addEventListener('input', apply);
  apply();
}

/* ---------------- Quote form ---------------- */
// "Get a quote for this machine" buttons preselect the machine.
$$<HTMLAnchorElement>('[data-quote-machine]').forEach(a => a.addEventListener('click', () => {
  const select = $<HTMLSelectElement>('#qf-machine');
  if (select && a.dataset.quoteMachine) select.value = a.dataset.quoteMachine;
}));

const form = $<HTMLFormElement>('#quote-form');
if (form) {
  const errorBox = $('[data-form-error]', form);
  const done = $('[data-form-done]');
  const submitBtn = $<HTMLButtonElement>('[data-submit]', form);

  const showError = (msg: string) => { if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; } };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (errorBox) errorBox.hidden = true;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Validation
    if (!form.checkValidity()) {
      const firstInvalid = $<HTMLInputElement>(':invalid', form);
      firstInvalid?.focus();
      return showError('Please fill in your name, country and an email or WhatsApp number.');
    }
    const contact = (data.contact || '').trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const looksPhone = contact.replace(/[^\d]/g, '').length >= 7;
    if (!looksEmail && !looksPhone) {
      $<HTMLInputElement>('#qf-contact', form)?.focus();
      return showError('Please enter a valid email address or WhatsApp number.');
    }
    if (data.botcheck) return; // spam bot filled the hidden field

    const summary = [
      `Name: ${data.name}`, `Country: ${data.country}`, `Contact: ${contact}`,
      `Machine: ${data.machine}`, data.message ? `Details: ${data.message}` : '',
      data.tour ? 'Would like a live video factory tour' : ''
    ].filter(Boolean).join('\n');

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      // No email service configured yet: hand the request over to WhatsApp.
      const text = `Hello Aeronix, I would like a quote.\n\n${summary}`;
      window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      return;
    }

    submitBtn?.setAttribute('disabled', '');
    try {
      const payload: Record<string, string> = {
        ...data,
        contact,
        subject: `Quote request: ${data.machine} (${data.country})`,
        ...(looksEmail ? { email: contact } : {}),
        ...(form.dataset.accessKey ? { access_key: form.dataset.accessKey } : {})
      };
      delete payload.botcheck;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      if (done) { done.hidden = false; done.setAttribute('tabindex', '-1'); done.focus(); }
    } catch {
      showError('Sorry, your request could not be sent. Please try again, or message us on WhatsApp.');
    } finally {
      submitBtn?.removeAttribute('disabled');
    }
  });
}
