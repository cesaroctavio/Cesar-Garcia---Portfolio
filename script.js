document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Set Current Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Scan Line Animation
    const scanLine = document.querySelector('.scan-line');
    if (scanLine) {
        scanLine.animate([
            { top: '0%', opacity: 0 },
            { top: '50%', opacity: 1 },
            { top: '100%', opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-in-out',
            iterations: 1
        });
    }

    // 3. Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 4. HUD Status Update
    const scrollStatus = document.getElementById('scroll-status');
    const sections = document.querySelectorAll('section');
    const hud = document.querySelector('.hud');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        // HUD Scroll State
        if (window.pageYOffset > 50) {
            hud.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            hud.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }

        let currentSection = 'IDLE';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 250)) {
                currentSection = section.getAttribute('id').toUpperCase();
            }
        });

        if (scrollStatus) {
            scrollStatus.innerHTML = `<span>[OK]</span> <span>VIEWING_${currentSection}</span>`;
        }
    });

    // 5. Scroll To Top Click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Smooth Scroll for HUD Links
    document.querySelectorAll('.hud-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Active Nav State
    const navLinks = document.querySelectorAll('.hud-nav a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
