/* ========================================
   MOBILE TOUCH IMPROVEMENTS - SUTIS
   Apenas melhorias touch sem afetar web
   ======================================== */

(function() {
    'use strict';
    
    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (!isMobile) return; // Sair se não for mobile
    
    // Melhorar feedback tátil para botões
    function addTouchFeedback() {
        const touchElements = document.querySelectorAll('button, .cta-button, .countdown-button, .gallery-button, .location-button, .expectations-button, .faq-question');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            });
        });
    }
    
    // Prevenir zoom duplo toque
    function preventDoubleTapZoom() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Scroll suave para links internos
    function addSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        addTouchFeedback();
        preventDoubleTapZoom();
        addSmoothScroll();
        
        // Adicionar classe mobile ao body
        document.body.classList.add('mobile-device');
    }
    
})();
