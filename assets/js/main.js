/* Vamsi Ambati — Minimal Vanilla JS */
(function () {
  'use strict';

  // --- Typing animation ---
  const phrases = [
    'Software Engineer',
    'Full Stack Developer',
    'Angular Architect',
    'Azure Certified Developer',
    'UI Engineer',
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

    // Close on link click
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // --- Nav scroll style ---
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // --- Back to top ---
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  // --- Fade in on scroll ---
  var fadeEls = document.querySelectorAll(
    '.timeline-item, .skill-category, .cert-card, .project-card, .stat-card, .achievement-item, .contact-card'
  );

  function checkFade() {
    var triggerBottom = window.innerHeight * 0.88;
    fadeEls.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('fade-in', 'visible');
      }
    });
  }

  // Initial class
  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  window.addEventListener('scroll', checkFade);
  window.addEventListener('load', checkFade);
})();
