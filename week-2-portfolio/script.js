const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Parallax: layers move at different speeds on scroll
if (!reduceMotion) {
  const layers = document.querySelectorAll('.layer');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        layers.forEach(el => {
          el.style.transform = `translateY(${window.scrollY * el.dataset.speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // 3D tilt on cards (mouse only)
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form validation
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name) { status.textContent = 'Please enter your name.'; return; }
  if (!emailOk) { status.textContent = 'Please enter a valid email.'; return; }
  if (message.length < 10) { status.textContent = 'Message must be at least 10 characters.'; return; }

  status.textContent = 'Thanks! Your message looks good. (Demo form: connect a service like Formspree to send it.)';
  form.reset();
});