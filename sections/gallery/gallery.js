(function(){
    const gallerySection = document.getElementById('gallery-section');
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const mediaWrap = document.querySelector('#gallery-media');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const captionEl = document.getElementById('gallery-caption');

    if (!gallerySection || !galleryGrid || !modal) return;

    // expand behavior like projects
    function onEntries(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.boundingClientRect.top <= 140) {
                gallerySection.classList.add('expanded');
            } else {
                gallerySection.classList.remove('expanded');
            }
        });
    }
    const io = new IntersectionObserver(onEntries, { threshold: 0 });
    io.observe(gallerySection);

    let currentIndex = -1;

    function openModal(index) {
        const item = galleryGrid.querySelector(`.gallery-item[data-index="${index}"]`);
        if (!item) return;
        const src = item.getAttribute('data-src');
        const type = item.getAttribute('data-type');
        const caption = item.getAttribute('data-caption') || '';

        mediaWrap.innerHTML = '';
        if (type === 'video') {
            const v = document.createElement('video');
            v.src = src;
            v.controls = true;
            v.autoplay = true;
            v.playsInline = true;
            v.style.maxWidth = '92vw';
            v.style.maxHeight = '82vh';
            mediaWrap.appendChild(v);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption || '';
            mediaWrap.appendChild(img);
        }

        captionEl.textContent = caption;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        currentIndex = parseInt(index, 10);
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        mediaWrap.innerHTML = '';
        currentIndex = -1;
    }

    function showPrev() { if (currentIndex > 0) openModal(currentIndex - 1); }
    function showNext() {
        const max = galleryGrid.querySelectorAll('.gallery-item').length - 1;
        if (currentIndex < max) openModal(currentIndex + 1);
    }

    // delegate click on thumbnails
    galleryGrid.addEventListener('click', (e) => {
        let el = e.target;
        while (el && !el.classList.contains('gallery-item')) el = el.parentElement;
        if (!el) return;
        const idx = el.getAttribute('data-index');
        if (idx !== null) openModal(idx);
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('open')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
})();
