document.addEventListener('DOMContentLoaded', () => {

  /* ==================== 1. SCROLL & DRAWER CONTROL ==================== */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const leftDrawer = document.getElementById('left-drawer');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        if (leftDrawer) leftDrawer.classList.remove('is-active');
        if (hamburgerBtn) hamburgerBtn.classList.remove('is-active');
      }
    }
  });

  /* ==================== 2. AUTOMATIC TAB SWITCHER ==================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const progressBar = document.querySelector('.timer-progress-bar');

  if (tabBtns.length > 0 && tabPanels.length > 0) {
    let currentTab = 0;
    const switchInterval = 5000; // 5 Seconds
    let autoTimer = null;
    let animTimer = null;

    function setTab(index) {
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      if (tabBtns[index]) tabBtns[index].classList.add('active');
      if (tabPanels[index]) tabPanels[index].classList.add('active');

      currentTab = index;
      startProgressBar();
    }

    function startProgressBar() {
      if (!progressBar) return;
      clearInterval(animTimer);
      progressBar.style.width = '0%';
      
      let startTime = Date.now();
      animTimer = setInterval(() => {
        let elapsed = Date.now() - startTime;
        let percent = (elapsed / switchInterval) * 100;
        if (percent >= 100) {
          percent = 100;
          clearInterval(animTimer);
        }
        progressBar.style.width = percent + '%';
      }, 50);
    }

    function startAutoCycle() {
      clearInterval(autoTimer);
      startProgressBar();

      autoTimer = setInterval(() => {
        let nextTab = (currentTab + 1) % tabBtns.length;
        setTab(nextTab);
      }, switchInterval);
    }

    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        setTab(index);
        startAutoCycle();
      });
    });

    startAutoCycle();
  }

  /* ==================== 3. SCROLL REVEAL EFFECT ==================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ==================== 4. STATS COUNTER BAR ==================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.stats-counter-bar');

  if (statsSection && statNumbers.length > 0) {
    let hasCounted = false;
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 0;
            const duration = 2000;
            const increment = target / (duration / 20);

            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.ceil(current);
              }
            }, 20);
          });
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ==================== 5. AUTOMATIC COPYRIGHT YEAR ==================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==================== 6. VISITOR COUNTER ==================== */
  const visitorCountEl = document.getElementById('visitor-count');
  if (visitorCountEl) {
    let counted = false;
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          const target = parseInt(visitorCountEl.getAttribute('data-count'), 10) || 0;
          const duration = 2200;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              visitorCountEl.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              visitorCountEl.textContent = Math.ceil(current).toLocaleString();
            }
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });

    countObserver.observe(visitorCountEl);
  }

  /* ==================== 7. TOP PROGRESS & BACK TO TOP ==================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  const topProgressBar = document.getElementById('topProgressBar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0 && topProgressBar) {
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      topProgressBar.style.width = `${scrollPercentage}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==================== 8. MAIN HEADER PARALLAX ==================== */
  const mainHeader = document.querySelector('.main-header');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (mainHeader) {
      if (scrollPosition > 50) {
        mainHeader.style.background = 'rgba(7, 13, 25, 0.95)';
        mainHeader.style.padding = '0.9rem 0';
      } else {
        mainHeader.style.background = 'rgba(7, 13, 25, 0.4)';
        mainHeader.style.padding = '1.25rem 0';
      }
    }

    if (heroContent) {
      const opacity = 1 - scrollPosition / 600;
      const translateY = scrollPosition * 0.3;

      if (opacity >= 0) {
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${translateY}px)`;
      }
    }
  });

  /* ==================== 9. 3D CARD TILT EFFECT ==================== */
  const cards = document.querySelectorAll('.vm-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ==================== 10. ACHIEVEMENTS COUNTER ==================== */
  const counters = document.querySelectorAll('.counter');
  const achievementsSection = document.querySelector('.achievements-section');
  let animated = false;

  if (achievementsSection && counters.length > 0) {
    window.addEventListener('scroll', () => {
      const sectionPos = achievementsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target') || 0;
          const speed = 200;
          const inc = target / speed;

          const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 15);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  }
  
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const leftDrawer = document.getElementById('left-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function openMenu() {
    if (leftDrawer) leftDrawer.classList.add('is-active');
    if (hamburgerBtn) hamburgerBtn.classList.add('is-active');
    if (drawerOverlay) drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Prevents background scroll when menu is open
  }

  function closeMenu() {
    if (leftDrawer) leftDrawer.classList.remove('is-active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('is-active');
    if (drawerOverlay) drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (leftDrawer && leftDrawer.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Robust Event Delegation for Hamburger Click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#hamburger-btn');
    if (btn) {
      toggleMenu(e);
      return;
    }

    // Close menu when clicking overlay or drawer link
    if (e.target.matches('#drawer-overlay') || e.target.closest('.drawer-item')) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});


  document.addEventListener('DOMContentLoaded', () => {
    // List of rotating Hero Titles and Descriptions
    const heroContent = [
      {
        title: "Welcome to Shrawani Addsbs India",
        desc: "Shrawani Addsbs India Pvt Ltd - Pioneering Polymer Manufacturing and Packaging Solutions."
      },
      {
        title: "PP & HDPE Fabric Innovation",
        desc: "Manufacturing heavy-duty woven rolls and industrial sacks engineered for extreme durability."
      },
      {
        title: "Precision BOPP Laminated Packaging",
        desc: "Delivering multi-color printed fabrics and high-barrier packaging solutions across India."
      },
      {
        title: "Leno Mesh & Agricultural Solutions",
        desc: "Supplying premium breathable mesh fabrics for perishable goods and agricultural logistics."
      }
    ];

    const titleEl = document.getElementById('typing-title');
    const descEl = document.getElementById('typing-desc');

    let contentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Speed configurations (in milliseconds)
    const typeSpeed = 50;        // Typing speed per character
    const backspaceSpeed = 25;   // Erasing speed
    const pauseDuration = 2500;  // Pause when full sentence is typed

    function typeEffect() {
      const currentObj = heroContent[contentIndex];
      const fullTitle = currentObj.title;

      if (isDeleting) {
        // Remove characters
        charIndex--;
        titleEl.textContent = fullTitle.substring(0, charIndex);
      } else {
        // Add characters
        charIndex++;
        titleEl.textContent = fullTitle.substring(0, charIndex);
      }

      // Update description once title typing finishes or starts
      if (!isDeleting && charIndex === fullTitle.length) {
        descEl.textContent = currentObj.desc;
        descEl.style.opacity = '1';
      }

      // Determine typing speed for next character
      let currentSpeed = isDeleting ? backspaceSpeed : typeSpeed;

      // Handle transitions when title finishes or erases
      if (!isDeleting && charIndex === fullTitle.length) {
        currentSpeed = pauseDuration; // Pause before erasing
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        descEl.style.opacity = '0'; // Fade out description for next item
        contentIndex = (contentIndex + 1) % heroContent.length; // Move to next item
        currentSpeed = 500; // Brief pause before typing next title
      }

      setTimeout(typeEffect, currentSpeed);
    }

    // Start the typing loop
    typeEffect();
  });


  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.pipeline-tab');
    const panels = document.querySelectorAll('.pipeline-panel');
    const progressLine = document.getElementById('tab-progress');
    let currentTab = 0;
    let autoRotateInterval;

    function switchTab(index) {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tabs[index].classList.add('active');
      panels[index].classList.add('active');

      // Update progress line position
      if (progressLine) {
        progressLine.style.left = (index * 33.33) + '%';
      }
      currentTab = index;
    }

    // Click handler
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        switchTab(index);
        resetAutoRotate();
      });
    });

    // Auto rotate every 5 seconds
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        let nextTab = (currentTab + 1) % tabs.length;
        switchTab(nextTab);
      }, 5000);
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }

    startAutoRotate();
  });


/* =================================
   SCROLL REVEAL
================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList
            .add("visible");

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =================================
   PREMIUM MOUSE PARALLAX
================================= */

document
  .querySelectorAll(".product-card")
  .forEach(card => {

    const image =
      card.querySelector(".product-image img");

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -2;

        const rotateY =
          ((x / rect.width) - .5) * 2;

        image.style.transform =
          `
          scale(1.075)
          translate(
            ${rotateY * 1.5}px,
            ${rotateX * 1.5}px
          )
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          "scale(1.01)";

      }
    );

  });

