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

    // Handle "Back to Top" link in footer
    const backToTopLink = document.querySelector('.footer-links a[href="#"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Scroll to the top of the page smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            console.log('Back to top link clicked');
        });
    }

    // Initialize back-to-top button functionality
    const initBackToTopButton = function() {
        // Check if button already exists in HTML
        let backToTopBtn = document.getElementById('backToTopBtn');

        // If button doesn't exist, create it dynamically
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('div');
            backToTopBtn.id = 'backToTopBtn';
            backToTopBtn.className = 'back-to-top-btn';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(backToTopBtn);
        }

        // Show or hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Back to top button clicked');
        });
    };

    // Call the function to initialize the button
    initBackToTopButton();
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark mode toggle initializing...');

    // Create the dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    // Check if dark mode preference is stored in localStorage
    const storedDarkMode = localStorage.getItem('darkMode');

    // Function to enable dark mode
    function enableDarkMode() {
        document.documentElement.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
        console.log('Dark mode enabled');
    }

    // Function to disable dark mode
    function disableDarkMode() {
        document.documentElement.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'false');
        console.log('Dark mode disabled');
    }

    // Set initial mode based on localStorage or system preference
    if (storedDarkMode === 'true') {
        // User has explicitly chosen dark mode
        enableDarkMode();
    } else if (storedDarkMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // No preference saved, but system is set to dark mode
        enableDarkMode();
    } else if (storedDarkMode === 'false') {
        // User has explicitly chosen light mode
        disableDarkMode();
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Listen for system preference changes (only if user hasn't set a preference)
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const userPreference = localStorage.getItem('darkMode');
            // Only auto-switch if user hasn't set a manual preference
            if (userPreference === null) {
                if (event.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }

    console.log('Dark mode toggle button created and listeners attached');
});

// Google Analytics Enhanced Event Tracking
document.addEventListener('DOMContentLoaded', function() {
    console.log('GA event tracking initialized');

    // Track CV/Resume downloads
    const cvDownloadLinks = document.querySelectorAll('a[href*="CV"], a[download*="CV"], a[href*="resume"], a[download*="resume"]');
    cvDownloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('download') || this.href.split('/').pop();
            gtag('event', 'file_download', {
                'event_category': 'Downloads',
                'event_label': 'CV Downloaded: ' + fileName,
                'value': 5
            });
            console.log('CV download tracked:', fileName);
        });
    });

    // Track project "View Project" clicks
    const projectViewLinks = document.querySelectorAll('.project-links a:not([target="_blank"])');
    projectViewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard ? projectCard.querySelector('h3').textContent : 'Unknown Project';
            gtag('event', 'project_view', {
                'event_category': 'Projects',
                'event_label': 'View Project: ' + projectName,
                'value': 3
            });
            console.log('Project view tracked:', projectName);
        });
    });

    // Track project GitHub code links
    const githubProjectLinks = document.querySelectorAll('.project-links a[target="_blank"][href*="github"]');
    githubProjectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard ? projectCard.querySelector('h3').textContent : 'Unknown Project';
            gtag('event', 'github_code_view', {
                'event_category': 'Projects',
                'event_label': 'GitHub Code: ' + projectName,
                'value': 2
            });
            console.log('GitHub code view tracked:', projectName);
        });
    });

    // Track external social links (LinkedIn, GitHub profile)
    const socialLinks = document.querySelectorAll('.social-links a, .social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            let platform = 'Unknown';
            if (this.href.includes('linkedin')) platform = 'LinkedIn';
            else if (this.href.includes('github')) platform = 'GitHub Profile';
            else if (this.href.includes('tex30.github.io')) platform = 'Portfolio Website';

            gtag('event', 'social_click', {
                'event_category': 'Social',
                'event_label': platform,
                'value': 2
            });
            console.log('Social link tracked:', platform);
        });
    });

    // Track certificate verification clicks
    const certLinks = document.querySelectorAll('.verify-link, a[href*="coursera.org/share"], a[href*="microsoft.com/api/credentials"]');
    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const certCard = this.closest('.cert-item');
            const certName = certCard ? certCard.querySelector('h4').textContent : 'Unknown Certificate';
            gtag('event', 'certificate_verify', {
                'event_category': 'Certifications',
                'event_label': 'Verify: ' + certName,
                'value': 1
            });
            console.log('Certificate verification tracked:', certName);
        });
    });

    // Track certificate badge clicks
    const certBadgeLinks = document.querySelectorAll('.cert-link');
    certBadgeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const certCard = this.closest('.cert-item');
            const certName = certCard ? certCard.querySelector('h4').textContent : 'Unknown Certificate';
            gtag('event', 'certificate_badge_click', {
                'event_category': 'Certifications',
                'event_label': 'Badge Click: ' + certName,
                'value': 1
            });
            console.log('Certificate badge click tracked:', certName);
        });
    });

    // Track email link clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': 'Email Link Clicked',
                'value': 3
            });
            console.log('Email link tracked');
        });
    });

    // Track navigation section clicks (to understand user journey)
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.getAttribute('href').replace('#', '');
            gtag('event', 'navigation', {
                'event_category': 'Navigation',
                'event_label': 'Navigate to: ' + section,
                'value': 0
            });
            console.log('Navigation tracked:', section);
        });
    });

    // Track "View All Projects" button
    const viewAllProjectsBtn = document.querySelector('.projects-cta a');
    if (viewAllProjectsBtn) {
        viewAllProjectsBtn.addEventListener('click', function(e) {
            gtag('event', 'view_all_projects', {
                'event_category': 'Projects',
                'event_label': 'View All Projects Button',
                'value': 2
            });
            console.log('View All Projects tracked');
        });
    }

    // Track scroll depth (25%, 50%, 75%, 100%)
    let scrollDepths = {25: false, 50: false, 75: false, 100: false};
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

        Object.keys(scrollDepths).forEach(depth => {
            if (scrollPercent >= depth && !scrollDepths[depth]) {
                scrollDepths[depth] = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'Engagement',
                    'event_label': 'Scroll ' + depth + '%',
                    'value': 0
                });
                console.log('Scroll depth tracked:', depth + '%');
            }
        });
    });

    console.log('All GA event tracking initialized successfully');
});