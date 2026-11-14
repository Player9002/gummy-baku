// Language switch
const langButtons = document.querySelectorAll('[data-set-lang]');
const emailInput = document.getElementById('email-input');

function setLang(lang) {
  document.body.classList.toggle('lang-en', lang === 'en');
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
  });
  if (emailInput) {
    emailInput.placeholder = lang === 'en'
      ? emailInput.getAttribute('data-placeholder-en')
      : emailInput.getAttribute('data-placeholder-zh');
  }
  try { localStorage.setItem('gummy-baku-lang', lang); } catch (e) {}
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.getAttribute('data-set-lang')));
});

try {
  const saved = localStorage.getItem('gummy-baku-lang');
  if (saved === 'en' || saved === 'zh') setLang(saved);
} catch (e) {}

document.querySelectorAll('.section-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.closest('.section');
    const isOpen = section.classList.contains('open');
    document.querySelectorAll('.section.open').forEach(s => {
      if (s !== section) {
        s.classList.remove('open');
        s.querySelector('.section-toggle').setAttribute('aria-expanded', 'false');
      }
    });
    section.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', !isOpen);
  });
});

document.getElementById('waitlist-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const section = document.getElementById('waitlist');
  section.classList.add('open');
  section.querySelector('.section-toggle').setAttribute('aria-expanded', 'true');
  section.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
