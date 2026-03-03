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

    // ---------- Particle Canvas Background ----------
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 12000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    alpha: Math.random() * 0.5 + 0.1,
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(42, 161, 152, ${p.alpha})`;
                ctx.fill();

                // Draw connecting lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(42, 161, 152, ${0.12 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        // Pause animation when not visible
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            },
            { threshold: 0 }
        );

        heroObserver.observe(canvas.parentElement);
    }

    // ---------- Initial call ----------
    highlightNav();
});
