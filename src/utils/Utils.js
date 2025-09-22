// Utilitários ES6+ para o projeto

// Debounce function para otimizar performance
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function para limitar execuções
export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Animações com Intersection Observer
export const createScrollObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
            }
        });
    }, observerOptions);
};

// Validação de formulário com regras customizáveis
export const createFormValidator = (formSelector, rules = {}) => {
    const form = document.querySelector(formSelector);
    if (!form) return null;

    const defaultRules = {
        name: (value) => value.length >= 2,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value),
        age: (value) => value !== ''
    };

    const validationRules = { ...defaultRules, ...rules };

    const validateField = (input) => {
        const fieldName = input.name;
        const value = input.value.trim();
        const formGroup = input.closest('.form-group');
        const feedback = formGroup.querySelector('.form-feedback');

        if (!validationRules[fieldName]) return true;

        const isValid = validationRules[fieldName](value);
        const message = getValidationMessage(fieldName, isValid);

        updateFieldState(formGroup, feedback, isValid, message, value);
        return isValid;
    };

    const getValidationMessage = (fieldName, isValid) => {
        const messages = {
            name: isValid ? 'Nome válido' : 'Nome deve ter pelo menos 2 caracteres',
            email: isValid ? 'E-mail válido' : 'Digite um e-mail válido',
            phone: isValid ? 'Telefone válido' : 'Digite um telefone válido',
            age: isValid ? 'Idade selecionada' : 'Selecione sua faixa etária'
        };
        return messages[fieldName] || '';
    };

    const updateFieldState = (formGroup, feedback, isValid, message, value) => {
        formGroup.classList.remove('valid', 'invalid');
        if (value !== '') {
            formGroup.classList.add(isValid ? 'valid' : 'invalid');
            feedback.textContent = message;
        }
    };

    const bindEvents = () => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(() => validateField(input), 300));
            input.addEventListener('blur', () => validateField(input));
        });
    };

    const validateForm = () => {
        const inputs = form.querySelectorAll('input[required], select[required]');
        return Array.from(inputs).every(input => validateField(input));
    };

    bindEvents();

    return {
        validateForm,
        validateField,
        form
    };
};

// Gerenciador de animações
export const AnimationManager = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    },

    fadeOut: (element, duration = 300) => {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    slideIn: (element, direction = 'up', duration = 300) => {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };

        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `all ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        });
    },

    bounce: (element, duration = 600) => {
        element.style.animation = `bounce ${duration}ms ease`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
};

// Utilitário para localStorage com fallback
export const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage não disponível');
        }
    },

    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Erro ao acessar localStorage');
            return defaultValue;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Erro ao remover do localStorage');
        }
    }
};

// Utilitário para requisições HTTP
export const HttpRequest = {
    async get(url, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição GET:', error);
            throw error;
        }
    },

    async post(url, data, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: JSON.stringify(data),
                ...options
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição POST:', error);
            throw error;
        }
    }
};

// Utilitário para detectar dispositivo
export const DeviceDetector = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024,
    isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

// Utilitário para performance
export const PerformanceMonitor = {
    measureTime: (name, fn) => {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} executado em ${end - start}ms`);
        return result;
    },

    measureAsync: async (name, fn) => {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        console.log(`${name} executado em ${end - start}ms`);
        return result;
    }
};
