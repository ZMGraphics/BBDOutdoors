// =============================================
// BBD Outdoors - 2026 Interactive JS
// =============================================

// ---- Loading Screen ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 1200);
  }
});

// ---- Mobile Navigation Toggle ----
const toggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Smooth Scrolling (same-page hash links only) ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = document.getElementById('header').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ---- Auto-hide Header on Scroll ----
const header = document.getElementById('header');
let lastScrollY = 0;
let ticking = false;

function updateHeader() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

if (header) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// ---- Scroll Progress Bar ----
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ---- Subtle Parallax on Hero Background (home page only) ----
const heroBg = document.getElementById('heroBg');

if (heroBg) {
  function updateParallax() {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateParallax);
  });
}

// ---- Scroll Reveal (IntersectionObserver) with stagger ----
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find siblings for stagger effect
      const parent = entry.target.parentElement;
      const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [];
      const index = siblings.indexOf(entry.target);

      if (index > 0) {
        entry.target.style.transitionDelay = (index * 0.05) + 's';
      }

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ---- Email Subscribe Handler ----
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  const originalText = btn.textContent;
  input.value = '';

  btn.textContent = 'Joined!';
  btn.style.background = '#4a7c2e';
  btn.style.borderColor = '#4a7c2e';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.borderColor = '';
  }, 3000);
}

// ---- Cursor Spotlight ----
const spotlight = document.querySelector('.cursor-spotlight');

if (spotlight) {
  let mouseX = 0;
  let mouseY = 0;
  let rafId = null;

  function updateSpotlight() {
    spotlight.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(196, 149, 58, 0.04), transparent 60%)`;
    rafId = null;
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!spotlight.classList.contains('active')) {
      spotlight.classList.add('active');
    }

    if (!rafId) {
      rafId = requestAnimationFrame(updateSpotlight);
    }
  });

  document.addEventListener('mouseleave', () => {
    spotlight.classList.remove('active');
  });
}

// ---- Section title ::after width animation on reveal ----
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      titleObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

sectionTitles.forEach(el => titleObserver.observe(el));
