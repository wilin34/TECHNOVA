// ============================================
// TECHVNOVA SOLUTIONS - MAIN.JS
// Maneja: Menú móvil, dropdowns, animaciones scroll
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // REFERENCIAS GLOBALES
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    // ============================================
    // 1. MENÚ HAMBURGUESA (MÓVIL)
    // ============================================
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (nav.classList.contains('active') && 
                    !nav.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
    }

    function closeMobileMenu() {
        if (nav) nav.classList.remove('active');
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
        document.body.style.overflow = '';
        document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
    }

    // ============================================
    // 2. DROPDOWN DE SERVICIOS (ROBUSTO CON TIMEOUT)
    // ============================================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        let closeTimeout;

        // Al entrar al dropdown: abrir inmediatamente
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(closeTimeout);
                dropdown.classList.add('active');
            }
        });

        // Al salir del dropdown: esperar 300ms antes de cerrar
        // Esto permite mover el mouse del toggle al menú sin que se cierre
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                clearTimeout(closeTimeout);
                closeTimeout = setTimeout(() => {
                    dropdown.classList.remove('active');
                }, 300);
            }
        });

        // En móvil: click toggle
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    document.querySelectorAll('.dropdown.active').forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Cerrar dropdown al hacer click fuera (desktop)
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Cerrar dropdown con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
            if (window.innerWidth <= 768) closeMobileMenu();
        }
    });

    // ============================================
    // 3. CERRAR MENÚ AL HACER CLIC EN UN ENLACE
    // ============================================
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 768) return;
            if (window.innerWidth <= 768) closeMobileMenu();
        });
    });

    // ============================================
    // 4. MARCAR PÁGINA ACTIVA
    // ============================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        const hrefPath = href.split('#')[0];
        
        if (hrefPath === currentPath || 
            (currentPath === '' && hrefPath === 'index.html') ||
            (currentPath === 'index.html' && hrefPath === '')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // 5. ANIMACIONES AL HACER SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .value-item, .project-card, .stat, .info-item'
    );

    elementsToAnimate.forEach(el => observer.observe(el));

    // ============================================
    // 6. SMOOTH SCROLL PARA ANCLAS INTERNAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                if (window.innerWidth <= 768) closeMobileMenu();
            }
        });
    });

    // ============================================
    // 7. RESIZE HANDLER
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // ============================================
    // 8. SCROLL TO TOP SI HAY HASH
    // ============================================
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }, 300);
    }

    // ============================================
    // 9. HEADER CON EFECTO AL SCROLL
    // ============================================
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // 10. LOG DE INICIALIZACIÓN
    // ============================================
    console.log('%c🚀 TechNova Solutions', 'color: #00E6FF; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00E6FF;');
    console.log('%c✓ Sistema inicializado correctamente', 'color: #0057FF; font-size: 12px;');
    console.log('%cPágina: ' + (window.location.pathname.split('/').pop() || 'index.html'), 'color: #666; font-size: 11px;');
});