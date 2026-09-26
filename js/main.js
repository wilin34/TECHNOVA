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
            
            // Bloquear scroll del body cuando el menú está abierto
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic FUERA (en móvil)
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

    // Función auxiliar para cerrar el menú móvil
    function closeMobileMenu() {
        if (nav) {
            nav.classList.remove('active');
        }
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
        document.body.style.overflow = '';
        
        // Cerrar todos los dropdowns
        document.querySelectorAll('.dropdown.active').forEach(d => {
            d.classList.remove('active');
        });
    }

    // ============================================
    // 2. DROPDOWN DE SERVICIOS
    // ============================================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // En móvil: toggle del dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = toggle.closest('.dropdown');
                if (dropdown) {
                    // Cerrar otros dropdowns abiertos
                    document.querySelectorAll('.dropdown.active').forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // Cerrar dropdown al hacer clic fuera (desktop)
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Cerrar dropdown al presionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        }
    });

    // ============================================
    // 3. CERRAR MENÚ AL HACER CLIC EN UN ENLACE
    // ============================================
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            // No cerrar si es un dropdown toggle en móvil
            if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
                return;
            }

            // En móvil, cerrar menú
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // ============================================
    // 4. MARCAR PÁGINA ACTIVA EN EL MENÚ
    // ============================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Ignorar anclas puras
        if (href.startsWith('#')) return;

        // Comparar rutas (ignorar anclas #)
        const hrefPath = href.split('#')[0];
        
        if (hrefPath === currentPath || 
            (currentPath === '' && hrefPath === 'index.html') ||
            (currentPath === 'index.html' && hrefPath === '')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // 5. ANIMACIONES AL HACER SCROLL (Intersection Observer)
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

    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .value-item, .project-card, .stat, .info-item'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 6. SMOOTH SCROLL PARA ANCLAS INTERNAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignorar si es solo "#"
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Offset para el header fijo
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        });
    });

    // ============================================
    // 7. RESIZE HANDLER (resetear menú al cambiar tamaño)
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Si pasa de móvil a desktop, cerrar menú móvil
            if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // ============================================
    // 8. SCROLL TO TOP SUAVE AL CARGAR CON HASH
    // ============================================
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }

    // ============================================
    // 9. HEADER CON EFECTO AL HACER SCROLL
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
    console.log('%cPágina actual: ' + (window.location.pathname.split('/').pop() || 'index.html'), 'color: #666; font-size: 11px;');
});