// Componente Video Hero
class VideoHero {
    constructor() {
        this.video = document.getElementById('heroVideo');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.muteBtn = document.getElementById('muteBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressFill = document.getElementById('videoProgressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.videoFallback = document.getElementById('videoFallback');
        
        this.init();
    }
    
    init() {
        if (this.video) {
            this.setupVideoEvents();
            this.setupControls();
        }
    }
    
    setupVideoEvents() {
        // Verificar se é um iframe do YouTube
        if (this.video.tagName === 'IFRAME') {
            this.setupYouTubeEvents();
        } else {
            this.setupHTML5VideoEvents();
        }
    }
    
    setupYouTubeEvents() {
        // Para YouTube, verificar se o iframe carrega
        this.video.addEventListener('load', () => {
            console.log('Vídeo YouTube carregado com sucesso');
            this.hideFallback();
        });
        
        this.video.addEventListener('error', () => {
            console.log('Vídeo YouTube não pôde ser carregado, exibindo fallback');
            this.showFallback();
        });
        
        // Timeout para verificar se o YouTube carrega em 8 segundos
        setTimeout(() => {
            if (!this.video.contentDocument) {
                console.log('YouTube não carregou em 8 segundos, exibindo fallback');
                this.showFallback();
            }
        }, 8000);
    }
    
    setupHTML5VideoEvents() {
        // Verificar se o vídeo HTML5 carrega
        this.video.addEventListener('error', () => {
            console.log('Vídeo não pôde ser carregado, exibindo fallback');
            this.showFallback();
        });
        
        this.video.addEventListener('loadeddata', () => {
            console.log('Vídeo carregado com sucesso');
            this.hideFallback();
        });
        
        // Timeout para verificar se o vídeo carrega em 5 segundos
        setTimeout(() => {
            if (this.video.readyState === 0) {
                console.log('Vídeo não carregou em 5 segundos, exibindo fallback');
                this.showFallback();
            }
        }, 5000);
    }
    
    showFallback() {
        if (this.video) {
            this.video.style.display = 'none';
        }
        if (this.videoFallback) {
            this.videoFallback.style.display = 'flex';
        }
    }
    
    hideFallback() {
        if (this.video) {
            this.video.style.display = 'block';
        }
        if (this.videoFallback) {
            this.videoFallback.style.display = 'none';
        }
    }
        this.totalTimeEl = document.getElementById('totalTime');
        this.progressBar = document.querySelector('.video-progress-bar');
        
                this.isPlaying = false;
                this.isMuted = false; // Começa com som aberto
                this.isFullscreen = false;
        
        this.init();
    }

    init() {
        if (!this.video) return;
        
        this.setupEventListeners();
        this.setupVideoDefaults();
        this.startParticleAnimations();
    }

    setupEventListeners() {
        // Controles de vídeo
        this.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());
        this.muteBtn?.addEventListener('click', () => this.toggleMute());
        this.fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());
        
        // Controle de volume
        this.volumeSlider?.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // Barra de progresso
        this.progressBar?.addEventListener('click', (e) => this.seekTo(e));
        
        // Eventos do vídeo
        this.video.addEventListener('loadedmetadata', () => this.updateDuration());
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('ended', () => this.onEnded());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Fullscreen events
        document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange());
    }

            setupVideoDefaults() {
                if (this.video) {
                    this.video.volume = 0.5; // Volume padrão 50%
                    this.video.muted = false; // Inicia com som aberto
                    this.isMuted = false; // Atualiza estado interno
                    this.updateMuteButton();
                }
            }

    togglePlayPause() {
        if (!this.video) return;
        
        if (this.isPlaying) {
            this.video.pause();
        } else {
            this.video.play();
        }
    }

    toggleMute() {
        if (!this.video) return;
        
        this.isMuted = !this.isMuted;
        this.video.muted = this.isMuted;
        this.updateMuteButton();
    }

    toggleFullscreen() {
        if (!this.video) return;
        
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const container = document.querySelector('.video-hero-container');
        if (!container) return;
        
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    setVolume(value) {
        if (!this.video) return;
        
        const volume = value / 100;
        this.video.volume = volume;
        this.isMuted = volume === 0;
        this.updateMuteButton();
    }

    seekTo(event) {
        if (!this.video || !this.progressBar) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        const newTime = percentage * this.video.duration;
        
        this.video.currentTime = newTime;
    }

    updateDuration() {
        if (!this.totalTimeEl || !this.video) return;
        
        const duration = this.video.duration;
        this.totalTimeEl.textContent = this.formatTime(duration);
    }

    updateProgress() {
        if (!this.video || !this.progressFill || !this.currentTimeEl) return;
        
        const currentTime = this.video.currentTime;
        const duration = this.video.duration;
        const percentage = (currentTime / duration) * 100;
        
        this.progressFill.style.width = `${percentage}%`;
        this.currentTimeEl.textContent = this.formatTime(currentTime);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onPlay() {
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    onPause() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    onEnded() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
        // Reiniciar o vídeo se estiver em loop
        if (this.video.loop) {
            this.video.currentTime = 0;
            this.video.play();
        }
    }

    onFullscreenChange() {
        this.isFullscreen = !!(document.fullscreenElement || 
                              document.webkitFullscreenElement || 
                              document.mozFullScreenElement || 
                              document.msFullscreenElement);
        this.updateFullscreenButton();
    }

    updatePlayPauseButton() {
        if (!this.playPauseBtn) return;
        
        if (this.isPlaying) {
            this.playPauseBtn.classList.add('playing');
        } else {
            this.playPauseBtn.classList.remove('playing');
        }
    }

    updateMuteButton() {
        if (!this.muteBtn) return;
        
        if (this.isMuted) {
            this.muteBtn.classList.add('muted');
        } else {
            this.muteBtn.classList.remove('muted');
        }
    }

    updateFullscreenButton() {
        if (!this.fullscreenBtn) return;
        
        if (this.isFullscreen) {
            this.fullscreenBtn.classList.add('fullscreen');
        } else {
            this.fullscreenBtn.classList.remove('fullscreen');
        }
    }

    handleKeyboard(e) {
        // Só responder se o vídeo estiver em foco ou se estiver em fullscreen
        if (!this.isFullscreen && e.target !== this.video) return;
        
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'KeyM':
                e.preventDefault();
                this.toggleMute();
                break;
            case 'KeyF':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.video.currentTime = Math.max(0, this.video.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.video.currentTime = Math.min(this.video.duration, this.video.currentTime + 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.setVolume(Math.min(100, parseInt(this.volumeSlider.value) + 10));
                this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 10);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.setVolume(Math.max(0, parseInt(this.volumeSlider.value) - 10));
                this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 10);
                break;
        }
    }

    startParticleAnimations() {
        // As animações CSS já estão configuradas, apenas garantir que estão ativas
        const particles = document.querySelectorAll('.video-particle');
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }

    // Métodos públicos para controle externo
    play() {
        if (this.video) this.video.play();
    }

    pause() {
        if (this.video) this.video.pause();
    }

    setCurrentTime(time) {
        if (this.video) this.video.currentTime = time;
    }

    getCurrentTime() {
        return this.video ? this.video.currentTime : 0;
    }

    getDuration() {
        return this.video ? this.video.duration : 0;
    }
}

// Componente Video Placeholder
class VideoPlaceholder {
    constructor(containerId, videoConfig) {
        this.container = document.getElementById(containerId);
        this.config = videoConfig;
        this.isPlaying = false;
        this.isHovered = false;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.setupEventListeners();
        this.startAnimations();
    }

    setupEventListeners() {
        const playButton = this.container.querySelector('.play-button, .preview-play-button');
        const videoElement = this.container.querySelector('.video-placeholder, .expectations-video-placeholder');
        
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.togglePlay();
            });
        }

        if (videoElement) {
            videoElement.addEventListener('mouseenter', () => {
                this.isHovered = true;
                this.onHover();
            });

            videoElement.addEventListener('mouseleave', () => {
                this.isHovered = false;
                this.onLeave();
            });
        }

        // Controles de vídeo
        const controlButtons = this.container.querySelectorAll('.control-button');
        controlButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleControlClick(e);
            });
        });
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const playButton = this.container.querySelector('.play-button, .preview-play-button');
        const playIcon = this.container.querySelector('.play-icon, .preview-play-icon');
        
        if (playButton && playIcon) {
            if (this.isPlaying) {
                playIcon.textContent = '⏸';
                playButton.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                this.startVideoSimulation();
            } else {
                playIcon.textContent = '▶';
                playButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
                this.stopVideoSimulation();
            }
        }
    }

    startVideoSimulation() {
        // Simular progresso do vídeo
        const progressFill = this.container.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.animation = 'progressAnimation 3s ease-in-out infinite';
        }

        // Adicionar efeitos visuais
        this.addVideoEffects();
    }

    stopVideoSimulation() {
        const progressFill = this.container.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.animation = 'none';
            progressFill.style.width = '0%';
        }

        this.removeVideoEffects();
    }

    addVideoEffects() {
        const videoElement = this.container.querySelector('.video-placeholder, .expectations-video-placeholder');
        if (videoElement) {
            videoElement.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
            videoElement.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        }
    }

    removeVideoEffects() {
        const videoElement = this.container.querySelector('.video-placeholder, .expectations-video-placeholder');
        if (videoElement) {
            videoElement.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            videoElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    }

    onHover() {
        const videoElement = this.container.querySelector('.video-placeholder, .expectations-video-placeholder');
        if (videoElement && !this.isPlaying) {
            videoElement.style.transform = 'scale(1.05)';
            videoElement.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        }
    }

    onLeave() {
        const videoElement = this.container.querySelector('.video-placeholder, .expectations-video-placeholder');
        if (videoElement && !this.isPlaying) {
            videoElement.style.transform = 'scale(1)';
            videoElement.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        }
    }

    handleControlClick(e) {
        const controlIcon = e.target.closest('.control-button').querySelector('.control-icon');
        const icon = controlIcon.textContent;

        switch (icon) {
            case '🔊':
                this.toggleSound();
                break;
            case '⏸':
                this.togglePlay();
                break;
            case '⏹':
                this.stopVideo();
                break;
        }
    }

    toggleSound() {
        const soundButton = this.container.querySelector('.control-button .control-icon');
        if (soundButton) {
            const isMuted = soundButton.textContent === '🔇';
            soundButton.textContent = isMuted ? '🔊' : '🔇';
            
            // Efeito visual
            const button = soundButton.closest('.control-button');
            button.style.background = isMuted ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)';
        }
    }

    stopVideo() {
        this.isPlaying = false;
        const playButton = this.container.querySelector('.play-button, .preview-play-button');
        const playIcon = this.container.querySelector('.play-icon, .preview-play-icon');
        
        if (playButton && playIcon) {
            playIcon.textContent = '▶';
            playButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        }

        this.stopVideoSimulation();
    }

    startAnimations() {
        // Iniciar animações de ripple
        const rippleElements = this.container.querySelectorAll('.play-ripple, .preview-ripple');
        rippleElements.forEach(ripple => {
            ripple.style.animation = 'rippleEffect 2s ease-in-out infinite';
        });
    }
}
class ExpectationsCounter {
    constructor() {
        this.count = this.loadCount();
        this.maxCount = 1000;
        this.milestones = [100, 500, 1000];
        this.streakCount = 0;
        this.streakTimer = null;
        this.streakTimeout = null;
        this.clickCount = 0;
        this.clickTimer = null;
        this.multiplier = 1;
        this.elements = {
            counter: document.getElementById('expectationsCount'),
            button: document.getElementById('expectationsBtn'),
            progressFill: document.getElementById('progressFill'),
            progressGlow: document.getElementById('progressGlow'),
            milestones: document.querySelectorAll('.milestone'),
            streakDisplay: document.getElementById('streakDisplay'),
            streakCount: document.getElementById('streakCount'),
            streakTimer: document.getElementById('streakTimer'),
            powerUps: document.querySelectorAll('.power-up'),
            commentInput: document.getElementById('commentInput'),
            commentSubmit: document.getElementById('commentSubmit'),
            commentsDisplay: document.getElementById('commentsDisplay')
        };
        this.init();
    }

    init() {
        if (!this.elements.counter) return;
        
        this.updateDisplay();
        this.updateProgress();
        this.updateMilestones();
        this.setupEventListeners();
        this.loadComments();
        this.updateStreakDisplay();
    }

    setupEventListeners() {
        this.elements.button.addEventListener('click', () => {
            this.handleClick();
        });
        
        // Event listeners para comentários
        if (this.elements.commentSubmit) {
            this.elements.commentSubmit.addEventListener('click', () => {
                this.addComment();
            });
            
            if (this.elements.commentInput) {
                this.elements.commentInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.addComment();
                    }
                });
            }
        }
    }

    handleClick() {
        this.clickCount++;
        this.incrementStreak();
        
        // Sistema de power-ups (cliques rápidos)
        clearTimeout(this.clickTimer);
        this.clickTimer = setTimeout(() => {
            if (this.clickCount >= 3) {
                this.multiplier = 3;
                this.showPowerUpEffect('tripleClick');
            } else if (this.clickCount >= 2) {
                this.multiplier = 2;
                this.showPowerUpEffect('doubleClick');
            } else {
                this.multiplier = 1;
            }
            this.clickCount = 0;
        }, 500);
        
        this.incrementCount();
    }

    incrementCount() {
        this.count += this.multiplier;
        this.saveCount();
        this.updateDisplay();
        this.updateProgress();
        this.updateMilestones();
        this.animateCounter();
        
        // Reset multiplier after use
        setTimeout(() => {
            this.multiplier = 1;
            this.clearPowerUpEffects();
        }, 1000);
    }

    incrementStreak() {
        this.streakCount++;
        this.updateStreakDisplay();
        
        // Reset streak timer
        clearTimeout(this.streakTimeout);
        this.streakTimeout = setTimeout(() => {
            this.streakCount = 0;
            this.updateStreakDisplay();
        }, 10000); // 10 segundos para manter streak
    }

    updateStreakDisplay() {
        if (this.elements.streakCount) {
            this.elements.streakCount.textContent = this.streakCount;
        }
        
        if (this.elements.streakDisplay) {
            if (this.streakCount > 0) {
                this.elements.streakDisplay.classList.add('show');
                this.startStreakTimer();
            } else {
                this.elements.streakDisplay.classList.remove('show');
            }
        }
    }

    startStreakTimer() {
        let timeLeft = 10;
        if (this.elements.streakTimer) {
            this.elements.streakTimer.textContent = `${timeLeft}s`;
            
            const timer = setInterval(() => {
                timeLeft--;
                if (this.elements.streakTimer) {
                    this.elements.streakTimer.textContent = `${timeLeft}s`;
                }
                if (timeLeft <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

    showPowerUpEffect(powerUpId) {
        const powerUp = document.getElementById(powerUpId);
        if (powerUp) {
            powerUp.classList.add('active');
        }
    }

    clearPowerUpEffects() {
        this.elements.powerUps.forEach(powerUp => {
            powerUp.classList.remove('active');
        });
    }

    addComment() {
        const commentText = this.elements.commentInput.value.trim();
        if (commentText) {
            const comment = {
                text: commentText,
                timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
            
            this.saveComment(comment);
            this.displayComment(comment);
            this.elements.commentInput.value = '';
        }
    }

    saveComment(comment) {
        const comments = this.loadComments();
        comments.unshift(comment);
        // Manter apenas os últimos 10 comentários
        if (comments.length > 10) {
            comments.splice(10);
        }
        localStorage.setItem('waves_comments', JSON.stringify(comments));
    }

    loadComments() {
        const comments = localStorage.getItem('waves_comments');
        return comments ? JSON.parse(comments) : [];
    }

    displayComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-text">${comment.text}</div>
            <div class="comment-time">${comment.timestamp}</div>
        `;
        
        if (this.elements.commentsDisplay) {
            this.elements.commentsDisplay.insertBefore(commentElement, this.elements.commentsDisplay.firstChild);
        }
    }

    loadComments() {
        const comments = this.loadComments();
        if (this.elements.commentsDisplay) {
            this.elements.commentsDisplay.innerHTML = '';
            comments.forEach(comment => {
                this.displayComment(comment);
            });
        }
    }

    updateDisplay() {
        if (this.elements.counter) {
            this.elements.counter.textContent = this.count.toLocaleString();
        }
    }

    updateProgress() {
        const percentage = Math.min((this.count / this.maxCount) * 100, 100);
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${percentage}%`;
        }
        
        if (this.elements.progressGlow) {
            this.elements.progressGlow.style.width = `${percentage}%`;
        }
    }

    updateMilestones() {
        this.elements.milestones.forEach(milestone => {
            const target = parseInt(milestone.dataset.target);
            if (this.count >= target) {
                milestone.classList.add('achieved');
            } else {
                milestone.classList.remove('achieved');
            }
        });
    }

    animateCounter() {
        if (this.elements.counter) {
            this.elements.counter.classList.add('animate');
            setTimeout(() => {
                this.elements.counter.classList.remove('animate');
            }, 600);
        }
    }

    loadCount() {
        const saved = localStorage.getItem('waves_expectationsCount');
        return saved ? parseInt(saved) : 0;
    }

    saveCount() {
        localStorage.setItem('waves_expectationsCount', this.count.toString());
    }

    createEmojiExplosion() {
        // Criar container para explosão em tela cheia
        const explosionContainer = document.createElement('div');
        explosionContainer.className = 'fullscreen-explosion';
        explosionContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        
        document.body.appendChild(explosionContainer);
        
        // Emojis temáticos para explosão
        const emojis = [
            '🌊', '🌍', '🔥', '🕊️', '📖', '⛪', '🏠', '🙏', '✨', '🌟',
            '💫', '🎆', '🎇', '💎', '👑', '🎯', '🚀', '💝', '❤️', '💖',
            '🎊', '🎉', '⭐', '🌙', '☀️', '💐', '🌺', '🌸', '🌻',
            '🎵', '🎶', '🎤', '🎧', '📱', '💻', '🎮', '🎲', '🎪', '🎨'
        ];
        
        // Criar 50 emojis com posições e animações aleatórias
        for (let i = 0; i < 50; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 3 + 2}rem;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: fullscreenExplosion ${Math.random() * 3 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            explosionContainer.appendChild(emoji);
        }
        
        // Remover container após animação
        setTimeout(() => {
            if (explosionContainer.parentNode) {
                explosionContainer.parentNode.removeChild(explosionContainer);
            }
        }, 5000);
    }
}
class CountdownTimer {
    constructor(containerId, targetDate) {
        this.container = document.getElementById(containerId);
        this.targetDate = new Date(targetDate).getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        if (!this.elements.days) return;
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.clear();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.updateElement('days', days.toString().padStart(3, '0'));
        this.updateElement('hours', hours.toString().padStart(2, '0'));
        this.updateElement('minutes', minutes.toString().padStart(2, '0'));
        this.updateElement('seconds', seconds.toString().padStart(2, '0'));
    }

    updateElement(key, value) {
        if (this.elements[key]) {
            this.elements[key].textContent = value;
        }
    }

    clear() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        Object.values(this.elements).forEach(el => {
            if (el) el.textContent = '00';
        });
    }
}

// Componente Form Validator
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.rules = {
            name: (value) => value.length >= 2,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value),
            age: (value) => value !== ''
        };
        this.init();
    }

    init() {
        if (!this.form) return;
        this.setupPhoneMask();
        this.bindEvents();
    }

    setupPhoneMask() {
        const phoneInput = this.form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                }
                if (value.length >= 10) {
                    value = value.slice(0, 10) + '-' + value.slice(10, 14);
                }
                e.target.value = value;
            });
        }
    }

    bindEvents() {
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const formGroup = input.closest('.form-group');
        const feedback = formGroup.querySelector('.form-feedback');

        let isValid = false;
        let message = '';

        if (this.rules[fieldName]) {
            isValid = this.rules[fieldName](value);
            message = this.getValidationMessage(fieldName, isValid);
        }

        this.updateFieldState(formGroup, feedback, isValid, message, value);
    }

    getValidationMessage(fieldName, isValid) {
        const messages = {
            name: isValid ? 'Nome válido' : 'Nome deve ter pelo menos 2 caracteres',
            email: isValid ? 'E-mail válido' : 'Digite um e-mail válido',
            phone: isValid ? 'Telefone válido' : 'Digite um telefone válido',
            age: isValid ? 'Idade selecionada' : 'Selecione sua faixa etária'
        };
        return messages[fieldName] || '';
    }

    updateFieldState(formGroup, feedback, isValid, message, value) {
        formGroup.classList.remove('valid', 'invalid');
        if (value !== '') {
            formGroup.classList.add(isValid ? 'valid' : 'invalid');
            feedback.textContent = message;
        }
    }
}

// Componente Parallax Controller
class ParallaxController {
    constructor() {
        this.layers = document.querySelectorAll('.parallax-layer-1, .parallax-layer-2');
        this.init();
    }

    init() {
        if (this.layers.length === 0) return;
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrolled = window.pageYOffset;
        this.layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Componente Modal Manager
class ModalManager {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }

    init() {
        if (!this.modal) return;
        this.bindEvents();
    }

    bindEvents() {
        // Fechar ao clicar fora
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open(data) {
        if (!this.modal) return;
        this.updateContent(data);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updateContent(data) {
        const elements = {
            emoji: document.getElementById('modalEmoji'),
            name: document.getElementById('modalName'),
            title: document.getElementById('modalTitle'),
            church: document.getElementById('modalChurch'),
            bio: document.getElementById('modalBio')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key] && data[key]) {
                elements[key].textContent = data[key];
            }
        });
    }
}

// Exportar componentes para uso global
window.VideoHero = VideoHero;
window.CountdownTimer = CountdownTimer;
window.ExpectationsCounter = ExpectationsCounter;

window.VideoPlaceholder = VideoPlaceholder;
window.FormValidator = FormValidator;
window.ParallaxController = ParallaxController;
window.ModalManager = ModalManager;
