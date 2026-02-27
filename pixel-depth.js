/**
 * PIXEL ONE — DEPTH ENGINE (Layer 3)
 * Handles: 3D Tilt, Magnetic Buttons, Parallax.
 * DISABLED ON MOBILE for performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Kill switch for mobile
    if (window.matchMedia('(max-width: 768px)').matches) return;

    init3DTilt();
    initMagneticButtons();
});

// 1. 3D Tilt Effect (Micro-interaction)
function init3DTilt() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate rotation (Limit to +/- 3 degrees for subtlety)
            const rotateX = ((mouseY - height / 2) / height) * -3; 
            const rotateY = ((mouseX - width / 2) / width) * 3;

            // Apply transform using requestAnimationFrame
            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// 2. Magnetic Buttons
function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-primary, .bg-brand, #hero-cta');

    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull factor (0.3 is decent strength)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}