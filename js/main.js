/* =========================================================
   MURONZI INC — Main JavaScript
   Navigation, Scroll, Reveal Animations
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.nav__hamburger');
    const drawer = document.querySelector('.nav__drawer');
    const overlay = document.querySelector('.nav__overlay');

    if (hamburger && drawer && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            drawer.classList.toggle('open');
            overlay.classList.toggle('visible');
            document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            drawer.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        });

        drawer.querySelectorAll('.nav__drawer-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                drawer.classList.remove('open');
                overlay.classList.remove('visible');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Navbar Shadow on Scroll ---
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        });
    }

    // --- Scroll Reveal ---
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // --- Active Nav Link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            if (!link.classList.contains('nav__link--cta')) {
                link.classList.add('nav__link--active');
            }
        }
    });

});
