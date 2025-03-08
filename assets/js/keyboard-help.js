// Keyboard shortcuts help modal

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('keyboard-help-modal');
  const btn = document.getElementById('keyboard-help-button');
  const closeBtn = document.querySelector('.close-modal');
  
  if (modal && btn && closeBtn) {
    // Show modal
    btn.addEventListener('click', function() {
      modal.style.display = 'block';
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
