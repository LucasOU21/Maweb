/**
 * AUM Healing Center - Main JavaScript
 * Features: Scroll animations, header effects, smooth navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initScrollAnimations();
    initHeaderEffect();
    initSmoothScroll();
    initMobileMenu();
    initHeroParallax();
    initMobileEventsAccordion();
    initMobileStickyCta();
});

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Header scroll effect
 */
function initHeaderEffect() {
    const header = document.getElementById('header') || document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when past 50px
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.getElementById('header') || document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            // Toggle mobile menu styles
            if (nav.style.display === 'flex') {
                nav.style.display = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.width = '';
                nav.style.background = '';
                nav.style.flexDirection = '';
                nav.style.padding = '';
                menuBtn.classList.remove('active');
            } else {
                nav.style.display = 'flex';
                nav.style.position = 'fixed';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'rgba(250, 248, 244, 0.98)';
                nav.style.flexDirection = 'column';
                nav.style.padding = '2rem';
                nav.style.gap = '1.5rem';
                menuBtn.classList.add('active');
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.style.display = '';
                nav.style.position = '';
                menuBtn.classList.remove('active');
            });
        });
    }
}

/**
 * Optional: Add parallax effect to hero
 */
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            ticking = false;
        });
    });
}

/**
 * Mobile accordion behavior for events list page
 */
function initMobileEventsAccordion() {
    const eventItems = document.querySelectorAll('.events-list .event-list-item');
    if (eventItems.length === 0) return;

    eventItems.forEach((item) => {
        const content = item.querySelector('.event-list-content');
        const title = content ? content.querySelector('h3') : null;
        if (!content || !title || content.querySelector('.event-list-details')) return;

        const details = document.createElement('div');
        details.className = 'event-list-details';

        const siblings = Array.from(content.children).filter((node) => node !== title);
        siblings.forEach((node) => details.appendChild(node));
        content.appendChild(details);

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'event-mobile-toggle';
        toggleBtn.textContent = 'View Details';
        toggleBtn.setAttribute('aria-expanded', 'false');
        title.insertAdjacentElement('afterend', toggleBtn);

        toggleBtn.addEventListener('click', () => {
            const isCollapsed = item.classList.toggle('is-collapsed');
            const expanded = !isCollapsed;
            toggleBtn.textContent = expanded ? 'Hide Details' : 'View Details';
            toggleBtn.setAttribute('aria-expanded', String(expanded));
        });
    });

    const syncAccordionState = () => {
        const isMobile = window.innerWidth <= 768;
        eventItems.forEach((item) => {
            const toggleBtn = item.querySelector('.event-mobile-toggle');
            if (!toggleBtn) return;

            if (isMobile) {
                item.classList.add('is-collapsed');
                toggleBtn.textContent = 'View Details';
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.remove('is-collapsed');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        });
    };

    syncAccordionState();
    window.addEventListener('resize', syncAccordionState);
}

/**
 * Sticky mobile CTA for quick contact actions
 */
function initMobileStickyCta() {
    if (document.querySelector('.mobile-sticky-cta')) return;

    const cta = document.createElement('div');
    cta.className = 'mobile-sticky-cta';
    cta.innerHTML = `
        <a class="primary" href="contact.html">Book Session</a>
        <a class="secondary" href="tel:6173209442">Call Now</a>
    `;

    document.body.appendChild(cta);
    document.body.classList.add('has-mobile-cta');
}

