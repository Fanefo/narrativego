/**
 * NARRATIVEGO — PERSONAL BRAND INTERACTIONS & ROI SIMULATOR
 * Krisztina Hegedűs — SEO Strategy
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initMetricCounters();
  initSmoothScroll();
  initRoiCalculator();
  initCookieConsent();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ Accordion with accessible ARIA
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Counter Animations via IntersectionObserver
function initMetricCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(eased * target);

          el.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

// Smooth scroll with offset for sticky header
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 82;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Interactive SEO Growth & ROI Simulator
function initRoiCalculator() {
  const trafficInput = document.getElementById('calcTraffic');
  const orderValInput = document.getElementById('calcOrderVal');
  const trafficDisplay = document.getElementById('valTraffic');
  const orderValDisplay = document.getElementById('valOrderVal');
  const revenueDisplay = document.getElementById('calcRevenueOutput');
  const newVisitsDisplay = document.getElementById('calcNewVisits');
  const newOrdersDisplay = document.getElementById('calcNewOrders');

  if (!trafficInput || !orderValInput || !revenueDisplay) return;

  function calculate() {
    const traffic = parseInt(trafficInput.value, 10);
    const orderVal = parseInt(orderValInput.value, 10);

    // Formatted inputs
    if (trafficDisplay) trafficDisplay.textContent = traffic.toLocaleString('ro-RO') + ' vizitatori';
    if (orderValDisplay) orderValDisplay.textContent = orderVal + ' €';

    // Model: Realistic +160% organic traffic gain via narrativeGO strategy over 6 months
    const growthRate = 1.6;
    const additionalTraffic = Math.round(traffic * growthRate);
    
    // Conservative conversion rate: 1.8%
    const conversionRate = 0.018;
    const additionalOrders = Math.round(additionalTraffic * conversionRate);
    const additionalMonthlyRevenue = Math.round(additionalOrders * orderVal);

    if (newVisitsDisplay) newVisitsDisplay.textContent = '+' + additionalTraffic.toLocaleString('ro-RO');
    if (newOrdersDisplay) newOrdersDisplay.textContent = '+' + additionalOrders.toLocaleString('ro-RO');
    revenueDisplay.textContent = '+' + additionalMonthlyRevenue.toLocaleString('ro-RO') + ' € / lună';
  }

  trafficInput.addEventListener('input', calculate);
  orderValInput.addEventListener('input', calculate);
  calculate();
}

// Discreet Cookie Consent
function initCookieConsent() {
  if (localStorage.getItem('narrativego_cookie_accepted')) return;

  const pill = document.createElement('div');
  pill.className = 'cookie-pill';
  pill.id = 'cookiePill';
  pill.innerHTML = `
    <span>Acest site folosește cookie-uri esențiale pentru performanță și securitate.</span>
    <button class="cookie-btn-accept" id="btnAcceptCookie">De acord</button>
  `;
  document.body.appendChild(pill);

  setTimeout(() => {
    pill.classList.add('show');
  }, 1200);

  document.getElementById('btnAcceptCookie')?.addEventListener('click', () => {
    localStorage.setItem('narrativego_cookie_accepted', 'true');
    pill.classList.remove('show');
    setTimeout(() => pill.remove(), 400);
  });
}
