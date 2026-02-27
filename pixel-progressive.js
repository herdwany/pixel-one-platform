/**
 * PIXEL ONE — PROGRESSIVE ENGINE (Layer 2)
 * Handles: Scroll Reveals, Spotlights, and Mobile Detection.
 */

const PixelState = {
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    if (!PixelState.isMobile) {
        initSpotlightSystem();
    }
});

// 1. Scroll Reveal System (Staggered Animation)
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .service-card, section h2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                // Apply a subtle slide-up animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = PixelState.isMobile ? 'none' : 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.05}s`; // Stagger
        observer.observe(el);
    });
}

// 2. Spotlight System (Desktop Only)
function initSpotlightSystem() {
    const cards = document.querySelectorAll('.service-card, .bg-surface-card');
    
    document.addEventListener('mousemove', (e) => {
        // Optimization: Only run if frame allows (throttling handled by CSS transition usually, but let's be safe)
        requestAnimationFrame(() => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // Only calculate if visible in viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }
            });
        });
    });
}