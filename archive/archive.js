const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
const sunSVG = `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <circle cx="12" cy="12" r="5"></circle> <line x1="12" y1="1" x2="12" y2="3"></line> <line x1="12" y1="21" x2="12" y2="23"></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line> <line x1="1" y1="12" x2="3" y2="12"></line> <line x1="21" y1="12" x2="23" y2="12"></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> </svg>`;
const moonSVG = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path> </svg>`;
themeToggle.innerHTML = savedTheme === 'dark' ? sunSVG : moonSVG;
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.innerHTML = next === 'dark' ? sunSVG : moonSVG;
});
const startTime = new Date('2026-08-21T22:14:00').getTime();
function updateUptime() {
    const timerEl = document.getElementById('uptime-timer');
    if (!timerEl) return;
    const now = new Date().getTime();
    const diff = now - startTime;
    if (diff < 0) {
        timerEl.textContent = "尚未开始运营";
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    timerEl.textContent = `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
}
updateUptime();
const tocLinks = document.querySelectorAll('#tocList a');
const sections = [];
tocLinks.forEach(link => {
  const id = link.getAttribute('href').substring(1);
  const el = document.getElementById(id);
  if (el) sections.push({ el, link });
});
window.addEventListener('scroll', () => {
  let current = sections[0];
  sections.forEach(({ el }) => {
    if (window.scrollY >= el.offsetTop - 120) current = { el, link: null };
  });
  const currentItem = sections.find(s => s.el === current.el);
  if (currentItem) {
    tocLinks.forEach(l => l.classList.remove('active'));
    currentItem.link.classList.add('active');
  }
});
function copyCode(btn) {
  const code = btn.closest('.code-block').querySelector('.code-content').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '已复制!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '复制';
      btn.classList.remove('copied');
    }, 2000);
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));