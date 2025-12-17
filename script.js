document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to handle highlighting the active link
    const handleScroll = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 150px offset to trigger highlight a bit before the section hits top
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

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load to highlight the correct section if refreshing page
    handleScroll();
});