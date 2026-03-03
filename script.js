/* ==============================================
   Script — Thodoris Tsilivis Academic Site
   Smooth scroll, reveals, nav, particle canvas
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Navigation ----------
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    const navAnchors = document.querySelectorAll('.nav__links a');
    const sections = document.querySelectorAll('.section');

    // Scroll state for nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        nav.classList.toggle('scrolled', current > 50);
        lastScroll = current;
        highlightNav();
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navAnchors.forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Active nav highlighting
    function highlightNav() {
        let currentSection = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                currentSection = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${currentSection}`) {
                a.classList.add('active');
            }
        });
    }

    // ---------- Scroll Reveal ----------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));



    // ---------- Image Modal ----------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".modal__close");
    const galleryImages = document.querySelectorAll(".gallery-card__image");

    if (modal && modalImg && closeBtn && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener("click", function () {
                modal.classList.add("show");
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });

        closeBtn.addEventListener("click", function () {
            modal.classList.remove("show");
        });

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

    // ---------- Initial call ----------
    highlightNav();
});
