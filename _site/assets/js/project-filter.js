// Project filtering functionality

document.addEventListener('DOMContentLoaded', function() {
  // Get all unique categories from projects
  const allCategories = new Set();
  document.querySelectorAll('.project-card').forEach(project => {
    const categories = project.dataset.categories.split(',');
    categories.forEach(category => {
      if (category.trim()) {
        allCategories.add(category.trim());
      }
    });
  });
  
  // Build filter buttons
  const filterContainer = document.getElementById('project-filters');
  
  if (filterContainer) {
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All Projects';
    allButton.classList.add('filter-btn', 'active');
    allButton.dataset.filter = 'all';
    filterContainer.appendChild(allButton);
    
    // Add category buttons
    allCategories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.classList.add('filter-btn');
      button.dataset.filter = category;
      filterContainer.appendChild(button);
    });
    
    // Add click event to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Show/hide projects based on filter
        document.querySelectorAll('.project-card').forEach(project => {
          if (filter === 'all') {
            project.style.display = 'block';
          } else {
            const projectCategories = project.dataset.categories.split(',').map(c => c.trim());
            if (projectCategories.includes(filter)) {
              project.style.display = 'block';
            } else {
              project.style.display = 'none';
            }
          }
        });
        
        // Trigger layout adjustment (for CSS grid/flexbox)
        window.dispatchEvent(new Event('resize'));
        
        // Track filter usage if analytics is available
        if (window.plausible) {
          window.plausible('Filter Used', {
            props: {
              category: this.textContent.trim()
            }
          });
        }
      });
    });
  }
});
