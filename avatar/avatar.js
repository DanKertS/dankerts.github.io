// Avatar interactions (moved from script.js)
// Adds proximity-based parallax effect with smoothing: icons move towards the cursor smoothly when it is near the avatar

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-wrapper');
    const icons = Array.from(document.querySelectorAll('.tech-icon'));

    const THRESHOLD = 240; // px, radius around avatar that triggers attraction (increased)
    const MAX_OFFSET = 30; // max pixels icons can move (increased slightly)
    const SMOOTH = 0.12; // lerp factor for smoothing (0..1)

    // per-icon state for smooth interpolation
    const state = icons.map(icon => ({ icon, tx: 0, ty: 0, cx: 0, cy: 0 }));

    function handleMouse(e) {
        if (!hero) return;
        const heroRect = hero.getBoundingClientRect();
        const cx = heroRect.left + heroRect.width / 2;
        const cy = heroRect.top + heroRect.height / 2;

        const dxHero = e.clientX - cx;
        const dyHero = e.clientY - cy;
        const dist = Math.hypot(dxHero, dyHero);

        state.forEach(s => {
            const rect = s.icon.getBoundingClientRect();
            const ix = rect.left + rect.width / 2;
            const iy = rect.top + rect.height / 2;

            if (dist < THRESHOLD) {
                // make attraction slightly stronger near the center with mild easing
                const strength = Math.pow((1 - dist / THRESHOLD), 1.15);
                const rawX = (e.clientX - ix) * 0.12 * strength; // stronger multiplier
                const rawY = (e.clientY - iy) * 0.12 * strength;

                s.tx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, rawX));
                s.ty = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, rawY));
            } else {
                s.tx = 0;
                s.ty = 0;
            }
        });
    }

    // Smoothly interpolate current offsets to target offsets each frame
    function raf() {
        state.forEach(s => {
            s.cx += (s.tx - s.cx) * SMOOTH;
            s.cy += (s.ty - s.cy) * SMOOTH;
            s.icon.style.setProperty('--px', `${s.cx.toFixed(2)}px`);
            s.icon.style.setProperty('--py', `${s.cy.toFixed(2)}px`);
        });
        requestAnimationFrame(raf);
    }

    document.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', () => {
        state.forEach(s => { s.tx = 0; s.ty = 0; });
    });

    raf();
});