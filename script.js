document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       Mobile Navigation Toggle
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // Toggle menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* =========================================
       Header Scroll Effect
       ========================================= */
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       Set Current Year in Footer
       ========================================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       Intersection Observer for Animations
       ========================================= */
    // Select elements to animate
    const faders = document.querySelectorAll('.fade-in-up');
    
    // Observer options
    const appearOptions = {
        threshold: 0.15, // Fire when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };
    
    // Create observer
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Do nothing if not intersecting
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);
    
    // Apply observer to each animated element
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================
       Smooth Scrolling for Anchor Links
       ========================================= */
    // Select all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Find target element
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return; // Skip empty hashes

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate scroll position accounting for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll via window
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       Scroll To Top Button
       ========================================= */
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

