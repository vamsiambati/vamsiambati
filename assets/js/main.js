/* Vamsi Ambati — Portfolio JS */
(function () {
  'use strict';

  // --- Typing animation ---
  const phrases = [
    'Senior Software Engineer',
    'Full Stack Architect',
    'AI & GenAI Engineer',
    'Azure Certified Professional'
  ];

  const typedEl = document.getElementById('typedText');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      typedEl.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    } else {
      charIdx++;
      typedEl.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 80);
    }
  }

  if (typedEl) {
    setTimeout(type, 600);
  }

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // --- Nav scroll style ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // --- Back to top ---
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  // --- Scroll reveal with IntersectionObserver ---
  // Assign reveal classes dynamically based on element type
  const revealConfig = [
    { sel: '.stat-card', dir: 'reveal-scale', stagger: true },
    { sel: '.timeline-item', dir: 'reveal-left' },
    { sel: '.skill-category', dir: 'reveal-up', stagger: true },
    { sel: '.cert-card', dir: 'reveal-up', stagger: true },
    { sel: '.project-card', dir: 'reveal-up', stagger: true },
    { sel: '.achievement-item', dir: 'reveal-right' },
    { sel: '.contact-card', dir: 'reveal-up', stagger: true },
    { sel: '.about-text', dir: 'reveal-left' },
    { sel: '.about-details', dir: 'reveal-right' },
    { sel: '.section-title', dir: 'reveal-up' },
  ];

  revealConfig.forEach(function (cfg) {
    const els = document.querySelectorAll(cfg.sel);
    const parent = els.length > 0 && cfg.stagger ? els[0].parentElement : null;
    if (parent && cfg.stagger) {
      parent.classList.add('stagger-children');
    }
    els.forEach(function (el) {
      el.classList.add('reveal', cfg.dir);
    });
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Section title underline animation ---
  const titleObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          titleObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.section-title').forEach(function (el) {
    titleObserver.observe(el);
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Counter animation for stat numbers ---
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1500;
    const start = performance.now();
    const suffix = el.textContent.replace(/[0-9]/g, '');

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
