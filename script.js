document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL HIGHLIGHT LOGIC ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();


    // --- 2. ELASTIC CURSOR LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        
        // Variables to track position and velocity
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        // Configuration
        const speed = 0.15; // How fast the circle follows (0.1 = slow, 0.5 = fast)
        const squeeze = 0.15; // How much it stretches (0.1 = stiff, 0.5 = jelly)

        // 1. Listen for mouse movement
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move the small dot instantly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // 2. Animate the outline (Game Loop)
        const animate = () => {
            // Calculate distance to target (mouse)
            const distX = mouseX - outlineX;
            const distY = mouseY - outlineY;

            // Move position towards target (Smooth Lerp)
            outlineX += distX * speed;
            outlineY += distY * speed;

            // Calculate Angle (so it points where it's going)
            const angle = Math.atan2(distY, distX);

            // Calculate Velocity (how fast is it moving?)
            const vel = Math.sqrt(distX ** 2 + distY ** 2);
            
            // Calculate Scale (Stretch based on velocity)
            // We cap the stretch at 0.5 to prevent it from getting too thin
            const stretch = Math.min(vel * squeeze * 0.01, 0.5);
            const scaleX = 1 + stretch; // Stretch along axis
            const scaleY = 1 - stretch; // Squash perpendicular axis

            // Apply the transformation
            cursorOutline.style.transform = `
                translate(${outlineX}px, ${outlineY}px) 
                rotate(${angle}rad) 
                scale(${scaleX}, ${scaleY})
            `;

            requestAnimationFrame(animate);
        };

        animate();

        // 3. Hover States (Optional: Expand on clickable items)
        document.querySelectorAll('a, button, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});
