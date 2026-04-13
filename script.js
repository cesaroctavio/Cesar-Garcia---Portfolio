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

    // 4. Scroll Status & Nav State Update
    const scrollStatus = document.getElementById('scroll-status');
    const sections = document.querySelectorAll('section');
    const hud = document.querySelector('.hud');
    const scrollTopBtn = document.getElementById('scroll-top');
    const navLinks = document.querySelectorAll('.hud-nav a');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // HUD Scrolled Background
        if (scrollY > 50) {
            hud.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            hud.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }

        let currentId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                currentId = section.getAttribute('id');
            }
        });

        if (scrollY < 100) {
            currentId = ''; // At top of page
        }

        const currentSection = currentId ? currentId.toUpperCase() : 'HERO_IDLE';

        if (scrollStatus) {
            scrollStatus.innerHTML = `<span>[OK]</span> <span>VIEWING_${currentSection}</span>`;
            
            // HUD proximity check to avoid footer overlap
            const footer = document.querySelector('.site-footer');
            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                if (footerTop < window.innerHeight - 40) {
                    scrollStatus.parentElement.style.opacity = '0';
                    scrollStatus.parentElement.style.pointerEvents = 'none';
                } else {
                    scrollStatus.parentElement.style.opacity = '1';
                    scrollStatus.parentElement.style.pointerEvents = 'auto';
                }
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentId && link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
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
});
