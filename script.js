/**
 * Professional Business Portfolio - JavaScript
 * Smooth animations, scroll effects, and interactive functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Trigger counter animation for stat cards
                const statNumbers = entry.target.querySelectorAll('.stat-card-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, observerOptions);

    // Observe all scroll-animated elements
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
        scrollObserver.observe(el);
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounter(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';

        const target = parseInt(element.dataset.target);
        const suffix = element.dataset.suffix || '+';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, duration / steps);
    }

    // Observe stat cards for counter animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-card-number');
                if (statNumber) {
                    animateCounter(statNumber);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statObserver.observe(card);
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            // Show loading state
            btnText.style.display = 'none';
            btnIcon.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                    btnText.style.display = 'inline';
                    btnIcon.style.display = 'inline-block';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    const subscribeSuccess = document.getElementById('subscribeSuccess');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const input = newsletterForm.querySelector('input');

            if (input.value) {
                newsletterForm.style.display = 'none';
                subscribeSuccess.style.display = 'block';

                setTimeout(() => {
                    input.value = '';
                    newsletterForm.style.display = 'flex';
                    subscribeSuccess.style.display = 'none';
                }, 3000);
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT (Subtle)
    // ============================================
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.shape, .orbit-container');

        parallaxElements.forEach(el => {
            const speed = el.classList.contains('shape') ? 0.2 : 0.1;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only enable parallax on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // ============================================
    // PORTFOLIO CARD HOVER EFFECTS
    // ============================================
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });

    // ============================================
    // SERVICE CARD TILT EFFECT
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) rotate(0deg)';
        });

        card.addEventListener('mouseleave', function () {
            const index = Array.from(serviceCards).indexOf(this);
            const rotations = [-1, 0.5, -0.5, 1, -0.5, 0.5];
            this.style.transform = `rotate(${rotations[index]}deg)`;
        });
    });

    // ============================================
    // NAV TOGGLE ANIMATION
    // ============================================
    navToggle.addEventListener('click', function () {
        const spans = this.querySelectorAll('span');

        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // ============================================
    // ACTIVE NAV LINK
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    function setActiveNavLink() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');

            // Highlight based on current page
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    }

    function scrollHighlight() {
        // Only run scroll highlight on index.html if it has sections
        if (currentPath !== 'index.html' && currentPath !== '') return;

        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `index.html#${sectionId}`) {
                        link.classList.remove('active');
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initialize active link
    setActiveNavLink();

    // Add scroll listener for index page sections
    window.addEventListener('scroll', scrollHighlight, { passive: true });

    // ============================================
    // PRELOADER (Optional - can be added)
    // ============================================
    // Add loading class to body
    document.body.classList.add('loaded');

    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    document.addEventListener('keydown', function (e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ============================================
    // FOCUS MANAGEMENT FOR ACCESSIBILITY
    // ============================================
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(el => {
        el.addEventListener('focus', function () {
            this.style.outline = 'none';
            this.style.boxShadow = '0 0 0 3px rgba(107, 30, 42, 0.3)';
        });

        el.addEventListener('blur', function () {
            this.style.boxShadow = '';
        });
    });

    // ============================================
    // PERFORMANCE: Debounce resize events
    // ============================================
    let resizeTimer;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }, 250);
    });

    console.log('Portfolio website loaded successfully!');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}
