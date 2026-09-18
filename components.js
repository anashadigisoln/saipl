// Function to load external HTML into placeholders
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const htmlContent = await response.text();
      document.getElementById(elementId).innerHTML = htmlContent;

      // Update dynamic elements after content is injected
      if (elementId === 'footer-placeholder') {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
          yearElement.textContent = new Date().getFullYear();
        }
      }
    } else {
      console.error(`Failed to load ${filePath}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// Load Navbar and Footer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', 'navbar.html');
  loadComponent('footer-placeholder', 'footer.html');
});

    
document.addEventListener('DOMContentLoaded', () => {
      const header = document.getElementById('header');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const leftDrawer = document.getElementById('left-drawer');
      const drawerOverlay = document.getElementById('drawer-overlay');
      const topProgressBar = document.getElementById('topProgressBar');

      // 1. Scroll Effect (Morph to floating pill on left)
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Reading Progress Bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && topProgressBar) {
          topProgressBar.style.width = (currentScrollY / docHeight) * 100 + '%';
        }

        // Toggle 'scrolled' class after 80px scroll
        if (currentScrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // 2. Open / Close Navigation Drawer
      function openMenu() {
        leftDrawer.classList.add('is-active');
        hamburgerBtn.classList.add('is-active');
        drawerOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        leftDrawer.classList.remove('is-active');
        hamburgerBtn.classList.remove('is-active');
        drawerOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }

      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (leftDrawer.classList.contains('is-active')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      drawerOverlay.addEventListener('click', closeMenu);

      // Close drawer on clicking links
      document.querySelectorAll('.drawer-item').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Close drawer on Pressing ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    });