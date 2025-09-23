// Aplicação principal usando componentes modulares
import { CONFIG, getConfig } from './config/Config.js';
import { debounce, throttle, createScrollObserver, AnimationManager } from './utils/Utils.js';

// Importar componentes
import './components/Components.js';

class ConferenceApp {
    constructor() {
        this.config = getConfig();
        this.components = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupPerformanceOptimizations();
        
        if (this.config.DEBUG) {
            console.log('Conference App inicializada:', this.config);
        }
    }

    setupEventListeners() {
        // Scroll otimizado com throttle
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, this.config.PERFORMANCE.THROTTLE_DELAY));

        // Resize otimizado com debounce
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, this.config.PERFORMANCE.DEBOUNCE_DELAY));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // FAQ functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-question')) {
                e.preventDefault();
                const faqItem = e.target.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Fechar todos os outros itens
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle do item clicado
                if (isActive) {
                    faqItem.classList.remove('active');
                } else {
                    faqItem.classList.add('active');
                }
            }
        });
    }

    initializeComponents() {
        // Inicializar vídeo hero
        this.components.videoHero = new VideoHero();

        // Inicializar contador regressivo
        console.log('App: Inicializando CountdownTimer com data:', this.config.CONFERENCE.DATE);
        this.components.countdown = new CountdownTimer('countdown', this.config.CONFERENCE.DATE);

        // Inicializar contador de expectativas
        this.components.expectations = new ExpectationsCounter();

        // Inicializar placeholders de vídeo
        this.components.promotionalVideo = new VideoPlaceholder('promotional-video', {
            title: 'Conferência Waves 2025',
            subtitle: 'O Tremor que Liberta',
            type: 'promotional'
        });


        // Inicializar controlador de parallax
        this.components.parallax = new ParallaxController();

        // Inicializar gerenciador de modal
        // this.components.modal = new ModalManager('speakerModal'); // Removido - seção de palestrantes removida

        // Inicializar observador de scroll para animações
        this.components.scrollObserver = createScrollObserver((element) => {
            this.animateElement(element);
        });

        // Observar elementos para animação
        this.observeElements();

        // Inicializar seção de ondas animadas
        this.initAnimatedWaves();
    }

    observeElements() {
        const elementsToObserve = document.querySelectorAll(`
            .section-title,
            .about-text,
            .about-visual,
            .feature-card,
            .inscription-text,
            .inscription-cta,
            .faq-item,
            .countdown-header,
            .countdown-timer,
            .countdown-cta,
            .expectations-counter,
            .expectations-progress,
            .expectations-button-container,
            .promotional-video-section,
            .video-hero-section
        `);

        elementsToObserve.forEach(element => {
            this.components.scrollObserver.observe(element);
        });
    }

    animateElement(element) {
        // Adicionar classe de animação baseada no tipo do elemento
        if (element.classList.contains('section-title') || element.classList.contains('countdown-title')) {
            AnimationManager.slideIn(element, 'up', this.config.ANIMATION.DURATION.NORMAL);
        } else if (element.classList.contains('feature-card') || element.classList.contains('countdown-item')) {
            AnimationManager.fadeIn(element, this.config.ANIMATION.DURATION.FAST);
        } else if (element.classList.contains('countdown-timer') || element.classList.contains('inscription-cta') || element.classList.contains('expectations-progress')) {
            AnimationManager.slideIn(element, 'up', this.config.ANIMATION.DURATION.NORMAL);
        } else if (element.classList.contains('countdown-cta') || element.classList.contains('expectations-button-container')) {
            AnimationManager.bounce(element, this.config.ANIMATION.DURATION.SLOW);
        } else if (element.classList.contains('expectations-counter')) {
            AnimationManager.fadeIn(element, this.config.ANIMATION.DURATION.NORMAL);
        } else if (element.classList.contains('promotional-video-section')) {
            AnimationManager.slideIn(element, 'up', this.config.ANIMATION.DURATION.NORMAL);
        } else if (element.classList.contains('video-hero-section')) {
            AnimationManager.fadeIn(element, this.config.ANIMATION.DURATION.SLOW);
        } else {
            AnimationManager.slideIn(element, 'up', this.config.ANIMATION.DURATION.NORMAL);
        }
    }

    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        this.setupLazyLoading();

        // Preload de recursos críticos
        this.preloadCriticalResources();

        // Otimização de animações
        this.optimizeAnimations();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    optimizeAnimations() {
        // Adicionar will-change para elementos animados
        const animatedElements = document.querySelectorAll(`
            .cta-button,
            .submit-button,
            .feature-card,
            .particle
        `);

        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    handleScroll() {
        // Atualizar progresso do scroll
        this.updateScrollProgress();

        // Atualizar parallax
        if (this.components.parallax) {
            this.components.parallax.update();
        }
    }

    updateScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress .progress-bar');
        if (!progressBar) return;

        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;

        progressBar.style.width = `${progress}%`;
    }

    handleResize() {
        // Recalcular layouts responsivos
        this.updateResponsiveLayouts();

        // Recalcular parallax
        if (this.components.parallax) {
            this.components.parallax.update();
        }
    }

    updateResponsiveLayouts() {
        const isMobile = window.innerWidth <= this.config.BREAKPOINTS.MOBILE;
        document.body.classList.toggle('mobile', isMobile);
    }

    handleKeyboard(e) {
        // Navegação por teclado
        if (e.key === 'Escape') {
            // Modal removido - não há mais modal para fechar
        }

        // Atalhos de teclado
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    this.focusSearch();
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.submitForm();
                    break;
            }
        }
    }

    focusSearch() {
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    submitForm() {
        const form = document.querySelector('.registration-form');
        if (form && this.components.formValidator) {
            if (this.components.formValidator.validateForm()) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }

    // Métodos públicos para interação
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    initAnimatedWaves() {
        const wavesSection = document.getElementById('animated-waves');
        const wavesImage = document.querySelector('.waves-image');
        
        if (!wavesSection || !wavesImage) return;

        let isAnimating = false;

        // Função para atualizar a posição da imagem baseada no scroll
        const updateWavesPosition = () => {
            const rect = wavesSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calcular o progresso do scroll na seção
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Se a seção está visível na tela
            if (sectionTop < windowHeight && sectionBottom > 0) {
                const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
                
                // Aplicar transformação baseada no progresso
                const scale = 1.2 - (progress * 0.2); // De 1.2 para 1.0
                const translateY = progress * 50; // Movimento vertical sutil
                
                wavesImage.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                
                // Adicionar classe quando a seção está em vista
                if (progress > 0.1 && !isAnimating) {
                    wavesSection.classList.add('in-view');
                    isAnimating = true;
                }
            } else {
                // Reset quando a seção não está visível
                wavesSection.classList.remove('in-view');
                isAnimating = false;
            }
        };

        // Event listener para scroll
        window.addEventListener('scroll', updateWavesPosition);
        
        // Executar uma vez no carregamento
        updateWavesPosition();
    }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.conferenceApp = new ConferenceApp();
    
    // Expor funções globais para compatibilidade
    window.scrollToSection = (id) => window.conferenceApp.scrollToSection(id);
});

// Exportar para uso em módulos
export default ConferenceApp;
