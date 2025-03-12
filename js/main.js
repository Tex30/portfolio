// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js is loaded and running!');
    
    // Get references to common elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll event for header style change
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navLinks) {
        console.log('Hamburger and navLinks elements found');
        hamburger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Stop propagation to prevent immediate closing
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Menu toggled. Active:', navLinks.classList.contains('active'));
        });
    } else {
        console.error('Hamburger or navLinks elements not found');
        console.log('hamburger:', hamburger);
        console.log('navLinks:', navLinks);
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                console.log('Menu closed by nav item click');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navLinks && 
            !navLinks.contains(event.target) && 
            !hamburger.contains(event.target) && 
            navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            console.log('Menu closed by outside click');
        }
    });
    
    // -------------- Smooth scrolling for anchor links --------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't do anything if it's just a "#" link
            if (this.getAttribute('href') === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height to offset scroll position
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // -------------- Form validation and submission --------------
    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Only do client-side validation, don't prevent form submission
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
        
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                e.preventDefault();
                return;
            }
        
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                e.preventDefault();
                return;
            }
        
            // Form will submit to Formspree if validation passes
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // -------------- Project page navigation --------------
    const projectNavLinks = document.querySelectorAll('.project-nav a');
    
    if (projectNavLinks.length > 0) {
        // Highlight active section in project navigation
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.project-section');
            const scrollPosition = window.scrollY + header.offsetHeight + 50;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    projectNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // -------------- Projects Page Filter --------------
    const projectFilterButtons = document.querySelectorAll('.projects-filter li');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectFilterButtons.length > 0) {
        projectFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                projectFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    // Get all categories this project belongs to
                    const categories = card.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // -------------- Animation on scroll --------------
    // Add fade-in animation for elements as they come into view
    const animatedElements = document.querySelectorAll('.project-card, .about-image, .skill-category');
    
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            appearOnScroll.observe(element);
        });
    }
    
    // -------------- Make project card images clickable to their project page --------------
    // This handles the project cards on the home page
    const projectCardImages = document.querySelectorAll('.project-card .project-image img');
    
    projectCardImages.forEach(img => {
        // Find the parent project card
        const projectCard = img.closest('.project-card');
        
        if (projectCard) {
            // Find the "View Project" link in this card
            const viewProjectLink = projectCard.querySelector('.project-links a:first-child');
            
            if (viewProjectLink) {
                const projectUrl = viewProjectLink.getAttribute('href');
                
                // Make the image clickable to the same URL
                img.style.cursor = 'pointer';
                img.title = "Click to view project details";
                
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Project image clicked, navigating to:', projectUrl);
                    window.location.href = projectUrl;
                });
            }
        }
    });
    
    // -------------- Image lightbox functionality --------------
    // Select all images that should have lightbox functionality
    // Exclude project card images which we've already handled above
    const lightboxImages = document.querySelectorAll('.project-image-container img, .project-section img');
    
    if (lightboxImages.length > 0) {
        console.log(`Lightbox initialized for ${lightboxImages.length} images`);
        
        // Create lightbox element once and append to body (we'll reuse it)
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Reference elements we'll need to update
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        // Add click event to each image
        lightboxImages.forEach(img => {
            // Skip if this image is already part of a project card
            if (img.closest('.project-card')) {
                return;
            }
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get caption if it exists
                let caption = '';
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('image-caption')) {
                    caption = this.nextElementSibling.textContent;
                }
                
                // Update lightbox content
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxCaption.textContent = caption;
                
                // Show lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                console.log('Lightbox opened for image:', this.src);
            });
            
            // Add cursor pointer to show images are clickable
            img.style.cursor = 'pointer';
        });
        
        // Close lightbox when clicking close button
        lightboxClose.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Clear src after transition to prevent memory issues
            setTimeout(() => {
                lightboxImg.src = '';
            }, 300);
            
            console.log('Lightbox closed');
        });
        
        // Close lightbox when clicking background
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                
                // Clear src after transition to prevent memory issues
                setTimeout(() => {
                    lightboxImg.src = '';
                }, 300);
                
                console.log('Lightbox closed by background click');
            }
        });
        
        // Handle escape key to close lightbox
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                
                // Clear src after transition to prevent memory issues
                setTimeout(() => {
                    lightboxImg.src = '';
                }, 300);
                
                console.log('Lightbox closed by escape key');
            }
        });
    }
    
    // -------------- Dark mode toggle (optional) --------------
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle dark mode when checkbox changes
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});