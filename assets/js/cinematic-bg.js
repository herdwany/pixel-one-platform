/**
 * PIXEL ONE — CINEMATIC BACKGROUND ENGINE
 * Creates a luxury moving gradient that follows user interaction.
 * Safe Mode: Runs in background layer, does not interfere with UI clicks.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCinematicBackground();
});

function initCinematicBackground() {
    // 1. Create the background container dynamically
    const bgContainer = document.createElement('div');
    bgContainer.id = 'pixel-cinematic-bg';
    
    // Apply styles strictly via JS to ensure they load instantly
    Object.assign(bgContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '-50', // Behind everything
        pointerEvents: 'none', // Allow clicks to pass through
        overflow: 'hidden',
        background: '#030303' // Deepest Black Base
    });

    // 2. Create the "Glow" elements
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'cinematic-glow mouse-glow';
    
    const ambientGlow = document.createElement('div');
    ambientGlow.className = 'cinematic-glow ambient-glow';

    // 3. Add Noise Texture (Film Grain) for luxury feel
    const noise = document.createElement('div');
    noise.style.cssText = `
        position: absolute; inset: 0; opacity: 0.04;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        mix-blend-mode: overlay;
    `;

    // Assemble
    bgContainer.appendChild(ambientGlow);
    bgContainer.appendChild(mouseGlow);
    bgContainer.appendChild(noise);
    document.body.prepend(bgContainer);

    // 4. Interaction Logic (Performance Optimized)
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop (Lerp)
    function animate() {
        // Slow follow effect (Lag)
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        mouseGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        
        // Ambient movement (Breathing effect)
        const time = Date.now() * 0.0005;
        const ambientX = Math.sin(time) * 50;
        const ambientY = Math.cos(time) * 50;
        ambientGlow.style.transform = `translate(calc(50vw + ${ambientX}px), calc(50vh + ${ambientY}px))`;

        requestAnimationFrame(animate);
    }
    animate();
}