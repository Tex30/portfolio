// Dark mode toggle functionality

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Set initial theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
  }
  
  // Handle toggle changes
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      // Dark mode
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      // Light mode
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Listen for changes in system preference
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only change if no manual preference is set
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        // System switched to dark mode
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
      } else {
        // System switched to light mode
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
      }
    }
  });
});
