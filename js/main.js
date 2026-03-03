/**
 * SMDC Tagaytay — Main JavaScript
 * Handles: navbar scroll effect, back-to-top, property filter,
 *          form validation, smooth scroll, carousel settings
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR SCROLL EFFECT
     ============================================================ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run on load
  }

  /* ============================================================
     2. BACK-TO-TOP BUTTON
     ============================================================ */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // account for sticky navbar
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     4. PROPERTY FILTER (properties.html)
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card-wrapper');

  if (filterBtns.length && propertyCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;

        propertyCards.forEach(card => {
          const tags = (card.dataset.tags || '').split(',').map(t => t.trim());
          if (filter === 'all' || tags.includes(filter)) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ============================================================
     5. FORM VALIDATION
     ============================================================ */
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.preventDefault();
        // Show success message
        const successAlert = document.getElementById('formSuccess');
        if (successAlert) {
          successAlert.classList.remove('d-none');
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          form.reset();
          form.classList.remove('was-validated');
          setTimeout(() => successAlert.classList.add('d-none'), 6000);
        }
      }
      form.classList.add('was-validated');
    });
  });

  /* ============================================================
     6. TESTIMONIAL / MAIN CAROUSEL AUTO-PLAY
     ============================================================ */
  const testimonialCarousel = document.getElementById('testimonialCarousel');
  if (testimonialCarousel && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      ride: 'carousel',
      wrap: true
    });
  }

  /* ============================================================
     7. SCROLL REVEAL — add class when element enters viewport
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     8. COUNTER ANIMATION (about.html)
     ============================================================ */
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          const update = () => {
            current += step;
            if (current >= target) {
              el.textContent = el.dataset.suffix
                ? target + el.dataset.suffix
                : target + '+';
            } else {
              el.textContent = el.dataset.suffix
                ? current + el.dataset.suffix
                : current + '+';
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ============================================================
     9. ACTIVE NAV LINK based on current page
     ============================================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
