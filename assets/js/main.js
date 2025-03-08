// Main JavaScript file for the portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-active');
      
      if (sidebar.classList.contains('mobile-active')) {
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);
      
      if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('mobile-active')) {
        sidebar.classList.remove('mobile-active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('mobile-active');
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Add focus outlines for keyboard navigation
  function handleFirstTab(e) {
    if (e.keyCode === 9) { // Tab key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
  
  // Activate current nav item based on URL
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    
    // Check if the href matches the current path or if the current path starts with the href
    // (for sub-pages of a section)
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      item.classList.add('active');
      
      // If it's in a dropdown, expand the dropdown
      const dropdown = item.closest('.nav-dropdown');
      if (dropdown) {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
      }
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
        
        // Update URL hash
        history.pushState(null, null, targetId);
      }
    });
  });
});
