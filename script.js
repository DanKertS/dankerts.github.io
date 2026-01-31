document.addEventListener('DOMContentLoaded', () => {
    const content = {
        en: {
            profileName: "DanKert",
            profileTagline: "Cool professional developer",
            contactBtn: "Contact Me",
            projectsTitle: "My Projects",
            galleryTitle: "Cool Gallery",
            socialLinks: [
                { name: "Telegram", icon: "fab fa-telegram", url: "https://t.me/dankert" },
                { name: "Twitter", icon: "fab fa-x", url: "https://x.com/DanKert26" },
                { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@dan_kert" },
                { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com/@dan_kert" },
                { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv/dan_kert_" },
                { name: "SoundCloud", icon: "fab fa-soundcloud", url: "https://soundcloud.com/" },
                { name: "Spotify", icon: "fab fa-spotify", url: "https://open.spotify.com/" },
                { name: "Pinterest", icon: "fab fa-pinterest", url: "https://pinterest.com/dankert26" },
                { name: "Reddit", icon: "fab fa-reddit", url: "https://www.reddit.com/user/Dan_Kert" },
                { name: "GitHub", icon: "fab fa-github", url: "https://github.com/dan-kert" }
            ],
            projects: [] /* loaded from data/projects.json at runtime */
        },
        ru: {
            profileName: "DanKert",
            profileTagline: "Крутой профессиональный разработчик",
            contactBtn: "Связаться со мной",
            projectsTitle: "Мои проекты",
            galleryTitle: "Крутая Галерея",
            socialLinks: [
                { name: "Telegram", icon: "fab fa-telegram", url: "https://t.me/dankert" },
                { name: "Twitter", icon: "fab fa-x", url: "https://x.com/DanKert26" },
                { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@dan_kert" },
                { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com/@dan_kert" },
                { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv/dan_kert_" },
                { name: "SoundCloud", icon: "fab fa-soundcloud", url: "https://soundcloud.com/" },
                { name: "Spotify", icon: "fab fa-spotify", url: "https://open.spotify.com/" },
                { name: "Pinterest", icon: "fab fa-pinterest", url: "https://pinterest.com/dankert26" },
                { name: "Reddit", icon: "fab fa-reddit", url: "https://www.reddit.com/user/Dan_Kert" },
                { name: "GitHub", icon: "fab fa-github", url: "https://github.com/dan-kert" }
            ],
            projects: []
        }
    };

    let currentLang = 'en';

    // Элементы
    const profileNameEl = document.getElementById('profile-name');
    const profileTaglineEl = document.getElementById('profile-tagline');
    const socialLinksGridEl = document.getElementById('social-links-grid');
    const contactBtnEl = document.getElementById('contact-btn');
    const projectsTitleEl = document.getElementById('projects-title');
    const projectsGridEl = document.getElementById('projects-grid');
    const galleryTitleEl = document.getElementById('gallery-title');
    const galleryGridEl = document.getElementById('gallery-grid');
    const langToggleBtn = document.getElementById('lang-toggle');

    function renderSocialLinks(lang) {
        socialLinksGridEl.innerHTML = '';
        // render links from content and ensure safe attributes
        content[lang].socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className = "social-btn";
            a.innerHTML = `<i class="${link.icon}"></i> <span>${link.name}</span>`;
            socialLinksGridEl.appendChild(a);
        });
    }

    function renderProjects(lang) {
        projectsGridEl.innerHTML = '';
        content[lang].projects.forEach(project => {
            const article = document.createElement('article');
            article.className = "project-card";

            const iconSrc = project.icon || project.image || '';
            const iconHtml = iconSrc ? `<img src="${iconSrc}" class="project-icon" alt="">` : '';
            const techHtml = project.technologies ? `<div class="project-techs">${project.technologies.toUpperCase()}</div>` : '';

            const descText = (lang === 'en') ? (project.description_en || project.description || project.description_ru || '') : (project.description_ru || project.description || project.description_en || '');
            const openLabel = (lang === 'en') ? (project.open_label_en || project.open_label || 'Open Project') : (project.open_label_ru || project.open_label || 'Открыть проект');

            // actions (render buttons or coming-soon disabled items)
            let actionsHtml = '';
            if (project.actions && project.actions.length) {
                actionsHtml = '<div class="project-actions">';
                project.actions.forEach(action => {
                    const label = (lang === 'en') ? (action.label_en || action.label || '') : (action.label_ru || action.label || action.label_en || '');
                    const url = action.url || '';
                    const developing = action.developing === true || !url || url.trim() === '';
                    if (developing) {
                        const csText = (lang === 'en') ? 'Coming soon' : 'В разработке';
                        actionsHtml += `<button class="project-action coming-soon" disabled>${label || csText}</button>`;
                    } else {
                        actionsHtml += `<a class="project-action" href="${url}" target="_blank" rel="noopener noreferrer">${label || (lang === 'en' ? 'Open' : 'Открыть')}</a>`;
                    }
                });
                actionsHtml += '</div>';
            } else {
                // fallback single project link
                const linkHref = project.link || '#';
                const targetAttr = project.link ? ' target="_blank" rel="noopener noreferrer"' : '';
                actionsHtml = `<div class="project-actions"><a class="project-action" href="${linkHref}"${targetAttr}>${openLabel}</a></div>`;
            }

            article.innerHTML = `
                <div class="project-icon-wrap">${iconHtml}</div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    ${techHtml}
                    <p class="project-description">${descText}</p>
                    ${actionsHtml}
                </div>
            `;

            projectsGridEl.appendChild(article);
        });
    }

    function updateContent(lang) {
        // enforce fixed display name
        profileNameEl.textContent = 'DanKert';
        profileTaglineEl.textContent = content[lang].profileTagline;
        contactBtnEl.innerHTML = `<i class="fas fa-envelope" style="margin-right: 10px;"></i>${content[lang].contactBtn}`;
        projectsTitleEl.textContent = content[lang].projectsTitle;
        // gallery title + render
        if (galleryTitleEl) galleryTitleEl.textContent = content[lang].galleryTitle || 'Gallery';
        renderSocialLinks(lang);
        renderProjects(lang);
        renderGallery(lang);
    }

    // single toggle button for language
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ru' : 'en';
            langToggleBtn.textContent = currentLang.toUpperCase();
            langToggleBtn.setAttribute('aria-pressed', currentLang === 'ru');
            updateContent(currentLang);
        });
    }

    // Avatar interactions moved to avatar/avatar.js

    // Старт: determine language and load projects data before rendering
    const browserLang = navigator.language && navigator.language.startsWith && navigator.language.startsWith('ru') ? 'ru' : 'en';
    currentLang = browserLang;
    if (langToggleBtn) {
        langToggleBtn.textContent = currentLang.toUpperCase();
        langToggleBtn.setAttribute('aria-pressed', currentLang === 'ru');
    }

    // Load projects from vendor/assets/projects/projects.json (prefer), fallback to data/projects.json. Support both array and {en,ru} formats.
    function loadProjects() {
        const vendorPath = 'vendor/assets/projects/projects.json';
        const dataPath = 'data/projects.json';

        function applyData(data) {
            if (!data) return;
            if (Array.isArray(data)) {
                content.en.projects = data;
                content.ru.projects = data;
            } else {
                if (data && data.en) content.en.projects = data.en;
                if (data && data.ru) content.ru.projects = data.ru;
            }
        }

        return fetch(vendorPath).then(resp => {
            if (!resp.ok) throw new Error('vendor projects not found');
            return resp.json();
        }).then(data => applyData(data)).catch(() => {
            // try fallback to data/projects.json
            return fetch(dataPath).then(resp => {
                if (!resp.ok) throw new Error('data projects not found');
                return resp.json();
            }).then(data => applyData(data)).catch(err => {
                console.warn('Projects load skipped:', err && err.message);
            });
        });
    }

    // Load gallery JSON similar to projects (vendor first)
    function loadGallery() {
        const vendorPath = 'vendor/assets/gallery/gallery.json';
        const dataPath = 'data/gallery.json';
        function applyData(data) {
            if (!data) return;
            if (Array.isArray(data)) {
                content.en.gallery = data;
                content.ru.gallery = data;
            } else {
                if (data && data.en) content.en.gallery = data.en;
                if (data && data.ru) content.ru.gallery = data.ru;
            }
        }
        return fetch(vendorPath).then(resp => {
            if (!resp.ok) throw new Error('vendor gallery not found');
            return resp.json();
        }).then(data => applyData(data)).catch(() => {
            return fetch(dataPath).then(resp => {
                if (!resp.ok) throw new Error('data gallery not found');
                return resp.json();
            }).then(data => applyData(data)).catch(err => {
                console.warn('Gallery load skipped:', err && err.message);
            });
        });
    }

    function renderGallery(lang) {
        if (!galleryGridEl) return;
        galleryGridEl.innerHTML = '';
        const arr = content[lang].gallery || [];
        arr.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            el.setAttribute('data-index', idx);
            el.setAttribute('data-src', item.src);
            el.setAttribute('data-type', item.type || 'image');
            const caption = (lang === 'en' ? (item.caption_en || item.title || '') : (item.caption_ru || item.title || ''));
            el.setAttribute('data-caption', caption);
            if ((item.type || 'image') === 'video') {
                el.innerHTML = `<video src="${item.src}" preload="metadata"></video><div class="video-overlay"><div class="play-icon"><i class="fas fa-play"></i></div></div>`;
            } else {
                el.innerHTML = `<img src="${item.src}" alt="${item.title || ''}">`;
            }
            galleryGridEl.appendChild(el);
        });
    }

    // load both projects and gallery, then render content once
    Promise.all([loadProjects(), loadGallery()]).then(() => updateContent(currentLang));


    // Project expansion observer moved to `sections/projects/projects.js`

    // Word swarm generator: inject many tiny words into background for texture
    function initWordSwarm() {
        const swarm = document.getElementById('word-swarm');
        if (!swarm) return;

        const words = (window.WORD_SWARM_WORDS || []).filter(Boolean);
        if (!words.length) return;

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        // Adaptive count by viewport size
        const count = (vw > 1400) ? 140 : (vw > 1100 ? 110 : (vw > 900 ? 90 : (vw > 600 ? 60 : 36)));
        const frag = document.createDocumentFragment();

        // Shuffle words to reduce repeated same words close together
        const shuffled = words.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const placed = [];
        const minDistForSize = (size) => Math.max(36, size * 3.2);

        // Place words with collision detection using bounding boxes (append->measure->retry)
        const placedRects = []; // store {left,top,right,bottom}
        const heroEl = document.querySelector('.hero-wrapper');
        const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;

        for (let i = 0; i < count; i++) {
            const w = document.createElement('span');
            w.className = 'word';
            w.textContent = shuffled[i % shuffled.length];

            const size = 9 + Math.random() * 8; // px
            w.style.fontSize = `${size}px`;
            w.style.position = 'absolute';
            w.style.visibility = 'hidden';

            const maxAttempts = 200;
            const gap = Math.max(8, size * 0.6);
            let attempts = 0;
            let placedOK = false;
            let rect;

            while (attempts < maxAttempts && !placedOK) {
                const left = Math.random() * (vw - 40);
                const top = Math.random() * (vh - 40);
                w.style.left = `${left}px`;
                w.style.top = `${top}px`;

                // append hidden to measure
                swarm.appendChild(w);
                rect = w.getBoundingClientRect();

                // avoid overlapping the hero area
                if (heroRect) {
                    const overlapHero = !(rect.right + gap < heroRect.left || rect.left - gap > heroRect.right || rect.bottom + gap < heroRect.top || rect.top - gap > heroRect.bottom);
                    if (overlapHero) {
                        attempts++; swarm.removeChild(w); continue;
                    }
                }

                // check overlap with placed rects
                const overlap = placedRects.some(p => !(rect.right + gap < p.left || rect.left - gap > p.right || rect.bottom + gap < p.top || rect.top - gap > p.bottom));
                if (!overlap) {
                    placedOK = true;
                    // keep element (already appended)
                    w.style.visibility = '';
                    // set random durations
                    const dur = 24 + Math.random() * 36; // 24..60s
                    const delay = Math.random() * 10;
                    w.style.animationDuration = `${dur}s, ${dur/2}s`;
                    w.style.animationDelay = `${delay}s, ${delay/2}s`;

                    // push measured rect
                    placedRects.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
                } else {
                    // too close, remove and retry
                    swarm.removeChild(w);
                    attempts++;
                }
            }

            if (!placedOK) {
                // fallback: place somewhere even if collisions (last measured rect may exist)
                const left = Math.random() * (vw - 40);
                const top = Math.random() * (vh - 40);
                w.style.left = `${left}px`;
                w.style.top = `${top}px`;
                w.style.visibility = '';
                const dur = 24 + Math.random() * 36;
                const delay = Math.random() * 10;
                w.style.animationDuration = `${dur}s, ${dur/2}s`;
                w.style.animationDelay = `${delay}s, ${delay/2}s`;
                swarm.appendChild(w);
                rect = w.getBoundingClientRect();
                placedRects.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
            }
        }

        // ensure initial appearance to avoid flash: set inline color/opacity for each created word
        const wordsEls = Array.from(swarm.querySelectorAll('.word'));
        wordsEls.forEach(el => {
            el.style.color = 'rgba(230,230,230,0.22)';
            el.style.opacity = '0.22';
            el.style.filter = 'brightness(1)';
            el.style.setProperty('--ws', '1');
        });

        // proximity highlight state (with translation targets)
        const STATES = wordsEls.map(el => ({ el, cx: 0, cy: 0, cur: 0, target: 0, tx: 0, ty: 0, ttx: 0, tty: 0 }));

        const HOVER_RADIUS = 140; // px (slightly larger)
        const SMOOTH = 0.14;
        const MAX_MOVE = 20; // px max translation toward cursor

        function updateCenters() {
            STATES.forEach(s => {
                const r = s.el.getBoundingClientRect();
                s.cx = r.left + r.width / 2;
                s.cy = r.top + r.height / 2;
            });
        }

        // compute centers once and on resize
        updateCenters();
        let centerResizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(centerResizeTimeout);
            centerResizeTimeout = setTimeout(updateCenters, 120);
        });

        function onMouseMove(e) {
            const mx = e.clientX; const my = e.clientY;
            STATES.forEach(s => {
                const dx = mx - s.cx;
                const dy = my - s.cy;
                const d = Math.hypot(dx, dy);
                if (d < HOVER_RADIUS) {
                    const strength = Math.pow((1 - d / HOVER_RADIUS), 1.1);
                    s.target = Math.max(s.target, strength);
                    // translation toward cursor (smaller multiplier)
                    const rawX = dx * 0.08 * strength;
                    const rawY = dy * 0.08 * strength;
                    s.ttx = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, rawX));
                    s.tty = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, rawY));
                } else {
                    s.target = Math.min(s.target, 0);
                    s.ttx = 0;
                    s.tty = 0;
                }
            });
        }

        // smooth RAF loop to apply visual changes
        function rafLoop() {
            STATES.forEach(s => {
                s.cur += (s.target - s.cur) * SMOOTH;
                // smooth translation
                s.tx += (s.ttx - s.tx) * SMOOTH;
                s.ty += (s.tty - s.ty) * SMOOTH;

                // Visual: opacity and brightness and subtle scale and translation
                const opacity = Math.min(1, (0.22 + 0.6 * s.cur)).toFixed(3);
                const brightness = (1 + 0.9 * s.cur).toFixed(3);
                const scale = (1 + 0.08 * s.cur).toFixed(3);
                const colorAlpha = Math.min(1, (0.22 + 0.6 * s.cur)).toFixed(3);

                s.el.style.opacity = opacity;
                s.el.style.filter = `brightness(${brightness})`;
                s.el.style.setProperty('--ws', scale);
                s.el.style.setProperty('--tx', `${s.tx.toFixed(2)}px`);
                s.el.style.setProperty('--ty', `${s.ty.toFixed(2)}px`);
                s.el.style.color = `rgba(255,255,255,${colorAlpha})`;

                // decay target slowly so highlight fades when cursor moves
                s.target *= 0.96;
                s.ttx *= 0.96;
                s.tty *= 0.96;
            });
            requestAnimationFrame(rafLoop);
        }

        document.addEventListener('mousemove', onMouseMove);
        rafLoop();

        // Reposition on resize (re-generate to maintain spacing)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                swarm.innerHTML = '';
                initWordSwarm();
            }, 200);
        });
    }

    // CUSTOM CURSOR: dot + orbiting dots when hovering interactive elements
    (function initCustomCursor(){
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return; // disable on touch devices
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        // 8 orbit dots evenly spaced
        cursor.innerHTML = '<div class="core"></div><div class="orbit"><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div><div class="orbit-dot"></div></div>';
        document.body.appendChild(cursor);

        let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
        let curX = mouseX, curY = mouseY;
        const speed = 0.18;

        function onMove(e){ mouseX = e.clientX; mouseY = e.clientY; }
        document.addEventListener('mousemove', onMove);

        function raf(){
            curX += (mouseX - curX) * speed;
            curY += (mouseY - curY) * speed;
            cursor.style.transform = `translate(${curX}px, ${curY}px)`;
            requestAnimationFrame(raf);
        }
        raf();

        // Show active orbit when hovering interactive elements (delegated)
        const interactive = 'a, button, .gallery-item, .project-card, .project-action, .social-btn, .lang-btn, .email-btn, .projects-section h2, .gallery-section h2';
        // make core visible by default and hide native cursor
        cursor.classList.add('visible');
        document.body.classList.add('hide-native-cursor');

        function activateCursor(){ cursor.classList.add('active'); }
        function deactivateCursor(){ cursor.classList.remove('active'); }

        document.addEventListener('mouseover', (e) => {
            const t = e.target.closest && e.target.closest(interactive);
            if (t) { activateCursor(); }
        });
        document.addEventListener('mouseout', (e) => {
            const t = e.target.closest && e.target.closest(interactive);
            const to = e.relatedTarget;
            if (t) {
                if (!to || !to.closest || !to.closest(interactive)) {
                    deactivateCursor();
                }
            }
        });

        // allow clicking through cursor
        cursor.style.pointerEvents = 'none';
    })();

    initWordSwarm();
});