const root = document.documentElement;
const themeButton = document.querySelector('#theme');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101719' : '#f4f3ed';
}
try { const saved = localStorage.getItem('portfolio-theme'); if (saved === 'light' || saved === 'dark') setTheme(saved); } catch {}
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch {}
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('r.justinliu@gmail.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'You can copy r.justinliu@gmail.com or select the email link to open your email app.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const links = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      links.forEach(link => {
        const selected = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-15% 0px -60% 0px',threshold:0});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
