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



    // ---------- Image Modal / Carousel ----------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("modalCaption");
    const counterText = document.getElementById("modalCounter");
    const closeBtn = document.querySelector(".modal__close");
    const prevBtn = document.querySelector(".modal__nav--prev");
    const nextBtn = document.querySelector(".modal__nav--next");
    const galleryImages = document.querySelectorAll(".gallery-card__image");
    const talkGallerySets = document.querySelectorAll("[data-talk-gallery-set]");
    const talkGalleryTriggers = document.querySelectorAll("[data-talk-gallery]");

    if (modal && modalImg && captionText && counterText && closeBtn && prevBtn && nextBtn) {
        let activeItems = [];
        let activeIndex = 0;
        let lastTrigger = null;

        const renderModalItem = () => {
            const item = activeItems[activeIndex];
            if (!item) return;

            modalImg.src = item.src;
            modalImg.alt = item.alt;
            captionText.textContent = item.caption || "";

            const showCarouselControls = activeItems.length > 1;
            prevBtn.hidden = !showCarouselControls;
            nextBtn.hidden = !showCarouselControls;
            counterText.hidden = !showCarouselControls;
            counterText.textContent = showCarouselControls
                ? `${activeIndex + 1} / ${activeItems.length}`
                : "";
        };

        const openModal = (items, startIndex = 0, trigger = null) => {
            if (!items.length) return;
            activeItems = items;
            activeIndex = startIndex;
            lastTrigger = trigger;
            renderModalItem();
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
            closeBtn.focus();
        };

        const closeModal = () => {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
            modalImg.removeAttribute("src");
            modalImg.alt = "";
            captionText.textContent = "";
            counterText.textContent = "";
            activeItems = [];
            activeIndex = 0;

            if (lastTrigger && typeof lastTrigger.focus === "function") {
                lastTrigger.focus();
            }
        };

        const showNext = () => {
            if (activeItems.length < 2) return;
            activeIndex = (activeIndex + 1) % activeItems.length;
            renderModalItem();
        };

        const showPrevious = () => {
            if (activeItems.length < 2) return;
            activeIndex = (activeIndex - 1 + activeItems.length) % activeItems.length;
            renderModalItem();
        };

        galleryImages.forEach(img => {
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", `Open image: ${img.alt}`);

            const singleImageSet = [{
                src: img.src,
                alt: img.alt,
                caption: img.alt
            }];

            img.addEventListener("click", () => openModal(singleImageSet, 0, img));
            img.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openModal(singleImageSet, 0, img);
                }
            });
        });

        talkGalleryTriggers.forEach(trigger => {
            const galleryId = trigger.getAttribute("data-talk-gallery");
            const gallerySet = Array.from(talkGallerySets).find(set =>
                set.getAttribute("data-talk-gallery-set") === galleryId
            );

            if (!gallerySet) return;

            const galleryItems = Array.from(gallerySet.querySelectorAll("a[href]")).map(link => ({
                src: link.getAttribute("href"),
                alt: link.dataset.alt || link.dataset.caption || "Talk photo",
                caption: link.dataset.caption || ""
            }));

            if (!galleryItems.length) return;

            trigger.hidden = false;
            trigger.addEventListener("click", () => openModal(galleryItems, 0, trigger));
        });

        closeBtn.addEventListener("click", closeModal);
        prevBtn.addEventListener("click", showPrevious);
        nextBtn.addEventListener("click", showNext);

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!modal.classList.contains("show")) return;

            if (event.key === "Escape") {
                closeModal();
            } else if (event.key === "ArrowLeft") {
                showPrevious();
            } else if (event.key === "ArrowRight") {
                showNext();
            }
        });
    }

    // ---------- Initial call ----------
    highlightNav();
});
