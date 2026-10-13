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
  initSpotlightCards();
  initContentContrastSwitch();
  initCaseStudyMilestones();
  initEditorialScrollReveal();
  initScrollProgressBar();
  initScrollRotatingBadges();
  initLiveGrowthChart();
  init3DTiltCards();
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
    if (trafficDisplay) trafficDisplay.textContent = traffic.toLocaleString('en-US') + ' visitors';
    if (orderValDisplay) orderValDisplay.textContent = '€' + orderVal;

    // Model: Realistic +160% organic traffic gain via narrativeGO strategy over 6 months
    const growthRate = 1.6;
    const additionalTraffic = Math.round(traffic * growthRate);
    
    // Conservative conversion rate: 1.8%
    const conversionRate = 0.018;
    const additionalOrders = Math.round(additionalTraffic * conversionRate);
    const additionalMonthlyRevenue = Math.round(additionalOrders * orderVal);

    if (newVisitsDisplay) newVisitsDisplay.textContent = '+' + additionalTraffic.toLocaleString('en-US');
    if (newOrdersDisplay) newOrdersDisplay.textContent = '+' + additionalOrders.toLocaleString('en-US');
    revenueDisplay.textContent = '+' + additionalMonthlyRevenue.toLocaleString('en-US') + ' € / month';
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
    <span>This site uses essential cookies for performance and security.</span>
    <button class="cookie-btn-accept" id="btnAcceptCookie">Accept</button>
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

// 1. Dynamic Cursor Spotlight Effect on Interactive Cards
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 2. Interactive "Generic AI vs narrativeGO" Contrast Switch
function initContentContrastSwitch() {
  const btnAi = document.getElementById('contrastBtnAi');
  const btnHuman = document.getElementById('contrastBtnHuman');
  const previewPanel = document.getElementById('contrastPreviewPanel');
  const badgeStatus = document.getElementById('contrastBadgeStatus');
  const contrastTitle = document.getElementById('contrastTitle');
  const contrastBody = document.getElementById('contrastBody');
  const dwellTime = document.getElementById('contrastDwellTime');
  const bounceRate = document.getElementById('contrastBounceRate');
  const eeatScore = document.getElementById('contrastEeatScore');
  const convRate = document.getElementById('contrastConvRate');
  const verdictText = document.getElementById('contrastVerdict');

  if (!btnAi || !btnHuman || !previewPanel) return;

  const data = {
    ai: {
      isAi: true,
      badgeClass: 'badge-status-bad',
      badgeText: '⚠️ Generic AI Content (What Search Engines Downgrade)',
      title: '“10 Tips for Effective SEO in 2026 That You Need to Know Today”',
      body: '“In today’s fast-paced digital ecosystem, search engine optimization is more critical than ever before. Many businesses struggle with online visibility. Therefore, optimizing keywords and utilizing key phrases ensures your brand remains competitive across search engines. In conclusion, SEO is a journey, not a destination...”',
      dwell: '14 seconds',
      dwellClass: 'val-bad',
      bounce: '86.4%',
      bounceClass: 'val-bad',
      eeat: 'Critical / Low',
      eeatClass: 'val-bad',
      conv: '0.0%',
      convClass: 'val-bad',
      verdict: 'Zero original perspective. Flagged by modern retrieval models as duplicate fluff. High bounce rate signals poor user satisfaction and damages whole-site authority.'
    },
    human: {
      isAi: false,
      badgeClass: 'badge-status-good',
      badgeText: '✦ narrativeGO System (What Google & Buyers Reward)',
      title: '“Why Real E-E-A-T Signals Outweigh Word Count: Lessons from Scaling 40+ Brands”',
      body: '“When our retail client scaled organic search revenue by +164%, we didn’t publish 50 thin glossaries. We pruned 140 cannibalizing legacy pages, fixed 3 render-blocking LCP scripts, and built 4 authoritative narrative hubs authored by their in-house biochemist. Here is the exact empirical roadmap...”',
      dwell: '4m 18s',
      dwellClass: 'val-good',
      bounce: '28.2%',
      bounceClass: 'val-good',
      eeat: 'High Authority (Verified)',
      eeatClass: 'val-good',
      conv: '18.4%',
      convClass: 'val-good',
      verdict: 'Original empirical testing data, authentic author voice, and direct answers to nuanced buyer queries. Captures top rankings, Google AI Overviews citations, and direct client inquiries.'
    }
  };

  function setMode(mode) {
    const d = data[mode];
    if (mode === 'ai') {
      btnAi.classList.add('active', 'is-ai');
      btnHuman.classList.remove('active');
      previewPanel.className = 'contrast-preview-panel panel-ai';
    } else {
      btnHuman.classList.add('active');
      btnAi.classList.remove('active', 'is-ai');
      previewPanel.className = 'contrast-preview-panel panel-human';
    }

    badgeStatus.className = 'contrast-badge-status ' + d.badgeClass;
    badgeStatus.textContent = d.badgeText;
    contrastTitle.textContent = d.title;
    contrastBody.textContent = d.body;

    dwellTime.textContent = d.dwell;
    dwellTime.className = 'meta-chip-val ' + d.dwellClass;

    bounceRate.textContent = d.bounce;
    bounceRate.className = 'meta-chip-val ' + d.bounceClass;

    eeatScore.textContent = d.eeat;
    eeatScore.className = 'meta-chip-val ' + d.eeatClass;

    convRate.textContent = d.conv;
    convRate.className = 'meta-chip-val ' + d.convClass;

    if (verdictText) verdictText.textContent = d.verdict;
  }

  btnAi.addEventListener('click', () => setMode('ai'));
  btnHuman.addEventListener('click', () => setMode('human'));
}

// 3. Interactive Case Study Milestones Explorer
function initCaseStudyMilestones() {
  const buttons = document.querySelectorAll('.milestone-btn');
  const panels = document.querySelectorAll('.milestone-panel');
  if (!buttons.length || !panels.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-milestone');
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

// 4. Silky Editorial Scroll Reveal
function initEditorialScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

// 5. Scroll Reading Progress Bar
function initScrollProgressBar() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.pageYOffset / totalHeight) * 100;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

// 6. Scroll-Driven Rotating Seals and Elements
function initScrollRotatingBadges() {
  const seal = document.getElementById('heroScrollSeal');
  const spinCw = document.querySelectorAll('.scroll-spin-cw');
  const spinCcw = document.querySelectorAll('.scroll-spin-ccw');

  if (!seal && !spinCw.length && !spinCcw.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (seal) {
      seal.style.transform = `rotate(${scrollY * 0.28}deg)`;
    }
    spinCw.forEach(el => {
      el.style.transform = `rotate(${scrollY * 0.18}deg)`;
    });
    spinCcw.forEach(el => {
      el.style.transform = `rotate(${-scrollY * 0.18}deg)`;
    });
  }, { passive: true });
}

// 7. Live Interactive SEO Growth Terminal & Chart
function initLiveGrowthChart() {
  const chartPath = document.getElementById('chartLinePath');
  const terminal = document.getElementById('seoLiveTerminal');
  if (!chartPath || !terminal) return;

  try {
    const length = chartPath.getTotalLength ? chartPath.getTotalLength() : 500;
    chartPath.style.strokeDasharray = `${length}`;
    chartPath.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chartPath.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1)';
          chartPath.style.strokeDashoffset = '0';
          observer.unobserve(terminal);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(terminal);
  } catch (e) {
    chartPath.style.strokeDashoffset = '0';
  }

  // Interactive Nodes Tooltip / Click
  const nodes = terminal.querySelectorAll('.chart-node');
  const timelinePill = terminal.querySelector('.chart-timeline-pill');

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const tip = node.getAttribute('data-tip');
      if (tip && timelinePill) {
        timelinePill.textContent = tip;
        timelinePill.style.borderColor = 'var(--orange-accent)';
        timelinePill.style.color = '#FFFFFF';
      }
    });
    node.addEventListener('mouseleave', () => {
      if (timelinePill) {
        timelinePill.textContent = '7-Month Compounding Curve';
        timelinePill.style.borderColor = 'rgba(255, 255, 255, 0.14)';
        timelinePill.style.color = 'rgba(255, 255, 255, 0.75)';
      }
    });
  });
}

// 8. 3D Card Perspective Tilt on Hover
function init3DTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltCards = document.querySelectorAll('.service-card, .metric-card, .quote-box, .keyword-item-chip');
  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 4.5;
      const rotateY = (x / (rect.width / 2)) * 4.5;
      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}
