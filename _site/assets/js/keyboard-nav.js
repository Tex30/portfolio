// Keyboard navigation functionality

document.addEventListener('DOMContentLoaded', function() {
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Only trigger if no modifier keys are pressed and not in an input
    const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    
    if (!e.ctrlKey && !e.metaKey && !e.altKey && !isInput) {
      // Navigate with shortcuts
      switch(e.key) {
        case 'h': // Home
          window.location.href = '/';
          break;
        case 'p': // Projects
          window.location.href = '/#projects';
          break;
        case 'b': // Blog
          window.location.href = '/blog/';
          break;
        case 'c': // Contact
          window.location.href = '/pages/contact/';
          break;
        case 's': // Search
          window.location.href = '/search/';
          break;
        case 't': // Toggle theme
          const themeToggle = document.getElementById('theme-toggle');
          if (themeToggle) {
            themeToggle.checked = !themeToggle.checked;
            themeToggle.dispatchEvent(new Event('change'));
          }
          break;
        case '/': // Focus search
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            e.preventDefault();
            searchInput.focus();
          }
          break;
        case 'ArrowUp': // Scroll to top (only on pages, not when browsing content)
          if (window.scrollY > 300 && document.activeElement === document.body) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
        case '?': // Show keyboard help
          const modal = document.getElementById('keyboard-help-modal');
          if (modal) {
            modal.style.display = 'block';
          }
          break;
      }
    }
    
    // Close keyboard help modal with Escape
    if (e.key === 'Escape') {
      const modal = document.getElementById('keyboard-help-modal');
      if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    }
  });
});
