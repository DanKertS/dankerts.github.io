// Projects section: IntersectionObserver toggles expanded class
(function(){
    const projectsSection = document.getElementById('projects-section');
    if (!projectsSection) return;

    function onEntries(entries) {
        entries.forEach(entry => {
            // When heading reaches near the top, expand; otherwise keep compact
            if (entry.isIntersecting && entry.boundingClientRect.top <= 140) {
                projectsSection.classList.add('expanded');
            } else {
                projectsSection.classList.remove('expanded');
            }
        });
    }

    const io = new IntersectionObserver(onEntries, { threshold: 0 });
    io.observe(projectsSection);
})();