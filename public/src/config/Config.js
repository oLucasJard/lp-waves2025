// Configuração do projeto
export const CONFIG = {
    // Configurações da conferência
    CONFERENCE: {
        NAME: 'WAVES 2K25',
        SLOGAN: 'O Tremor que Liberta',
        DATE: '2025-10-24T19:00:00',
        LOCATION: {
            NAME: 'Igreja de Cristo - MANT Paraíso',
            ADDRESS: 'Rua L10, N 269, St. Interlagos, Paraíso do Tocantins'
        },
        REGISTRATION_URL: 'https://inchur.ch/tTU5w'
    },

    // Configurações de animação
    ANIMATION: {
        DURATION: {
            FAST: 200,
            NORMAL: 300,
            SLOW: 500
        },
        EASING: {
            EASE: 'ease',
            EASE_IN: 'ease-in',
            EASE_OUT: 'ease-out',
            EASE_IN_OUT: 'ease-in-out'
        }
    },

    // Configurações de validação
    VALIDATION: {
        RULES: {
            NAME_MIN_LENGTH: 2,
            EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            PHONE_REGEX: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
        },
        MESSAGES: {
            REQUIRED: 'Este campo é obrigatório',
            INVALID_EMAIL: 'Digite um e-mail válido',
            INVALID_PHONE: 'Digite um telefone válido',
            MIN_LENGTH: 'Mínimo de caracteres não atingido'
        }
    },

    // Configurações de API
    API: {
        BASE_URL: 'https://api.conferenciawaves.com',
        ENDPOINTS: {
            REGISTRATION: '/registration',
            SPEAKERS: '/speakers',
            FAQ: '/faq'
        },
        TIMEOUT: 10000
    },

    // Configurações de performance
    PERFORMANCE: {
        DEBOUNCE_DELAY: 300,
        THROTTLE_DELAY: 100,
        LAZY_LOAD_OFFSET: 50
    },

    // Configurações de breakpoints
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200
    },

    // Configurações de tema
    THEME: {
        COLORS: {
            PRIMARY: '#667eea',
            SECONDARY: '#764ba2',
            SUCCESS: '#28a745',
            ERROR: '#dc3545',
            WARNING: '#ffc107',
            INFO: '#17a2b8'
        },
        GRADIENTS: {
            PRIMARY: 'linear-gradient(45deg, #667eea, #764ba2)',
            HERO: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            CTA: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
        }
    },

    // Configurações de storage
    STORAGE: {
        KEYS: {
            FORM_DATA: 'conference_form_data',
            USER_PREFERENCES: 'user_preferences',
            LAST_VISIT: 'last_visit'
        },
        EXPIRY: {
            FORM_DATA: 24 * 60 * 60 * 1000, // 24 horas
            USER_PREFERENCES: 30 * 24 * 60 * 60 * 1000 // 30 dias
        }
    }
};

// Configurações específicas para desenvolvimento
export const DEV_CONFIG = {
    DEBUG: true,
    LOG_LEVEL: 'info',
    MOCK_API: true,
    PERFORMANCE_MONITORING: true
};

// Configurações específicas para produção
export const PROD_CONFIG = {
    DEBUG: false,
    LOG_LEVEL: 'error',
    MOCK_API: false,
    PERFORMANCE_MONITORING: false
};

// Detectar ambiente
export const isDevelopment = () => {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
};

// Exportar configuração baseada no ambiente
export const getConfig = () => {
    return isDevelopment() ? { ...CONFIG, ...DEV_CONFIG } : { ...CONFIG, ...PROD_CONFIG };
};
