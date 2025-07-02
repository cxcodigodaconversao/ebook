// =================================================
// CONFIGURAÇÕES GLOBAIS E VARIÁVEIS
// =================================================
let currentWorld = 0;
let introSkipped = false;
let achievementShown = false;
let isLoading = true;
let isMobile = window.innerWidth <= 1024;
let loadingProgress = 0;

// Elementos DOM
const elements = {
    loadingScreen: null,
    loadingProgress: null,
    cinemaIntro: null,
    mobileNav: null,
    mobileNavToggle: null,
    mobileNavMenu: null,
    desktopNav: null,
    navPlanets: null,
    mobileNavItems: null,
    progressFill: null,
    currentChapterSpan: null,
    progressPercentSpan: null,
    worlds: null,
    achievementModal: null,
    scrollTopBtn: null,
    cursor: null
};

// Dados dos capítulos
const chapters = [
    { name: 'Início', id: 'world-0' },
    { name: '1º Erro', id: 'world-1' },
    { name: '2º Erro', id: 'world-2' },
    { name: '3º Erro', id: 'world-3' },
    { name: '4º Erro', id: 'world-4' },
    { name: '5º Erro', id: 'world-5' },
    { name: '6º Erro', id: 'world-6' },
    { name: '7º Erro', id: 'world-7' },
    { name: 'Final', id: 'world-8' }
];

// =================================================
// UTILITÁRIOS
// =================================================
const utils = {
    // Throttle para performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Debounce para eventos
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Animação suave para scroll
    easeInOutQuad: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },

    // Scroll suave customizado
    smoothScrollTo: (target, duration = 1000) => {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = utils.easeInOutQuad(timeElapsed / duration) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
};

// =================================================
// INICIALIZAÇÃO
// =================================================
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    detectDevice();
    startLoadingSequence();
    setupEventListeners();
    initializeAnimations();
});

function initializeElements() {
    // Cache de elementos DOM para performance
    elements.loadingScreen = document.getElementById('loadingScreen');
    elements.loadingProgress = document.getElementById('loadingProgress');
    elements.cinemaIntro = document.getElementById('cinemaIntro');
    elements.mobileNav = document.getElementById('mobileNav');
    elements.mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    elements.mobileNavMenu = document.querySelector('.mobile-nav-menu');
    elements.desktopNav = document.querySelector('.desktop-nav');
    elements.navPlanets = document.querySelectorAll('.nav-planet');
    elements.mobileNavItems = document.querySelectorAll('.nav-item');
    elements.progressFill = document.getElementById('progressFill');
    elements.currentChapterSpan = document.getElementById('currentChapter');
    elements.progressPercentSpan = document.getElementById('progressPercent');
    elements.worlds = document.querySelectorAll('.story-scene');
    elements.achievementModal = document.getElementById('achievementModal');
    elements.scrollTopBtn = document.getElementById('scrollTop');
    elements.cursor = document.getElementById('cursor');
}

function detectDevice() {
    isMobile = window.innerWidth <= 1024;
    
    // Atualizar variáveis CSS para mobile
    document.documentElement.style.setProperty('--is-mobile', isMobile ? '1' : '0');
    
    // Disable cursor customizado no mobile
    if (isMobile && elements.cursor) {
        elements.cursor.style.display = 'none';
    }
}

// =================================================
// LOADING SEQUENCE
// =================================================
function startLoadingSequence() {
    let progress = 0;
    const duration = 2000; // 2 segundos
    const interval = 50; // Update a cada 50ms
    const increment = (interval / duration) * 100;

    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (elements.loadingProgress) {
            elements.loadingProgress.style.width = Math.min(progress, 100) + '%';
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                finishLoading();
            }, 500);
        }
    }, interval);
}

function finishLoading() {
    isLoading = false;
    
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 1000);
    }

    // Mostrar intro cinematográfica
    setTimeout(() => {
        if (!introSkipped) {
            startCinemaIntro();
        }
    }, 500);
}

// =================================================
// INTRO CINEMATOGRÁFICA
// =================================================
function startCinemaIntro() {
    // Auto-skip intro após 8 segundos
    setTimeout(() => {
        if (!introSkipped) {
            skipIntro();
        }
    }, 8000);
}

function skipIntro() {
    introSkipped = true;
    if (elements.cinemaIntro) {
        elements.cinemaIntro.classList.add('hidden');
        setTimeout(() => {
            elements.cinemaIntro.style.display = 'none';
        }, 2000);
    }
    startInteractivity();
}

// Função global para botão skip
window.skipIntro = skipIntro;

// =================================================
// NAVEGAÇÃO
// =================================================
function setupNavigation() {
    // Navegação desktop
    if (elements.navPlanets) {
        elements.navPlanets.forEach((planet, index) => {
            planet.addEventListener('click', () => {
                navigateToWorld(index);
            });
        });
    }

    // Navegação mobile
    if (elements.mobileNavItems) {
        elements.mobileNavItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                navigateToWorld(index);
                closeMobileNav();
            });
        });
    }
}

function toggleMobileNav() {
    if (!elements.mobileNavToggle || !elements.mobileNavMenu) return;

    const isOpen = elements.mobileNavMenu.classList.contains('open');
    
    if (isOpen) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

function openMobileNav() {
    if (elements.mobileNavToggle && elements.mobileNavMenu) {
        elements.mobileNavToggle.classList.add('active');
        elements.mobileNavMenu.classList.add('open');
    }
}

function closeMobileNav() {
    if (elements.mobileNavToggle && elements.mobileNavMenu) {
        elements.mobileNavToggle.classList.remove('active');
        elements.mobileNavMenu.classList.remove('open');
    }
}

function navigateToWorld(worldIndex) {
    if (worldIndex < 0 || worldIndex >= chapters.length) return;

    currentWorld = worldIndex;
    const targetWorld = document.getElementById(chapters[worldIndex].id);
    
    if (targetWorld) {
        utils.smoothScrollTo(targetWorld, 1000);
        updateNavigation();
        updateMobileProgress();
    }
}

function updateNavigation() {
    // Update desktop navigation
    if (elements.navPlanets) {
        elements.navPlanets.forEach((planet, index) => {
            planet.classList.remove('active');
            if (index === currentWorld) {
                planet.classList.add('active');
            }
        });
    }

    // Update mobile navigation
    if (elements.mobileNavItems) {
        elements.mobileNavItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentWorld) {
                item.classList.add('active');
            }
        });
    }
}

// Funções globais para navegação
window.toggleMobileNav = toggleMobileNav;
window.startJourney = () => navigateToWorld(1);

// =================================================
// SCROLL E PROGRESSO
// =================================================
function setupScrollHandling() {
    const scrollHandler = utils.throttle(() => {
        updateProgress();
        updateCurrentSection();
        updateScrollTopButton();
        checkAchievement();
    }, 16); // ~60fps

    window.addEventListener('scroll', scrollHandler, { passive: true });
}

function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / docHeight) * 100, 100);
    
    if (elements.progressFill) {
        elements.progressFill.style.width = progress + '%';
    }
    
    updateMobileProgress(progress);
}

function updateMobileProgress(progress = null) {
    if (progress === null) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        progress = Math.min((scrollTop / docHeight) * 100, 100);
    }

    if (elements.currentChapterSpan && chapters[currentWorld]) {
        elements.currentChapterSpan.textContent = chapters[currentWorld].name;
    }
    
    if (elements.progressPercentSpan) {
        elements.progressPercentSpan.textContent = Math.round(progress) + '%';
    }
}

function updateCurrentSection() {
    if (!elements.worlds) return;

    let newCurrentSection = currentWorld;
    const windowCenter = window.innerHeight / 2;

    elements.worlds.forEach((world, index) => {
        const rect = world.getBoundingClientRect();
        if (rect.top <= windowCenter && rect.bottom > windowCenter) {
            newCurrentSection = index;
        }
    });

    if (newCurrentSection !== currentWorld) {
        currentWorld = newCurrentSection;
        updateNavigation();
        updateMobileProgress();
    }
}

function updateScrollTopButton() {
    if (!elements.scrollTopBtn) return;

    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
        elements.scrollTopBtn.classList.add('visible');
    } else {
        elements.scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    utils.smoothScrollTo(document.body, 800);
}

// Função global para scroll to top
window.scrollToTop = scrollToTop;

// =================================================
// INTERSECTION OBSERVER PARA REVELAÇÕES
// =================================================
function setupIntersectionObserver() {
    // Observer para revelação de conteúdo
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    });

    // Observer para seções principais
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const worldIndex = parseInt(entry.target.id.split('-')[1]);
                if (worldIndex !== currentWorld && !isNaN(worldIndex)) {
                    currentWorld = worldIndex;
                    updateNavigation();
                    updateMobileProgress();
                }
            }
        });
    }, {
        threshold: isMobile ? 0.2 : 0.4,
        rootMargin: isMobile ? '0px 0px -200px 0px' : '0px 0px -100px 0px'
    });

    // Observar elementos de revelação
    document.querySelectorAll('.revelation-block').forEach(block => {
        revealObserver.observe(block);
    });

    // Observar seções principais
    if (elements.worlds) {
        elements.worlds.forEach(world => {
            sectionObserver.observe(world);
        });
    }
}

// =================================================
// CURSOR CUSTOMIZADO (APENAS DESKTOP)
// =================================================
function setupCustomCursor() {
    if (isMobile || !elements.cursor) return;

    const trails = [];
    const trailCount = 8;

    // Criar rastros do cursor
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: rgba(202, 180, 133, ${0.6 - (i * 0.1)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    // Mouse move handler
    const mouseMoveHandler = utils.throttle((e) => {
        elements.cursor.style.left = e.clientX + 'px';
        elements.cursor.style.top = e.clientY + 'px';

        // Atualizar rastros
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.x = e.clientX;
                trail.y = e.clientY;
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
            }, index * 20);
        });
    }, 16);

    document.addEventListener('mousemove', mouseMoveHandler);

    // Hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('.error-number, .journey-btn, .social-portal, .nav-planet')) {
            elements.cursor.style.transform = 'scale(2)';
        } else if (e.target.matches('button, a, .neural-item')) {
            elements.cursor.style.transform = 'scale(1.5)';
        } else {
            elements.cursor.style.transform = 'scale(1)';
        }
    });
}

// =================================================
// ACHIEVEMENT SYSTEM
// =================================================
function checkAchievement() {
    if (achievementShown) return;

    const scrollPercentage = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 90 && currentWorld === 8) {
        achievementShown = true;
        setTimeout(() => {
            showAchievement();
        }, 1000);
    }
}

function showAchievement() {
    if (elements.achievementModal) {
        elements.achievementModal.classList.add('show');
        
        // Auto-close após 10 segundos
        setTimeout(() => {
            if (elements.achievementModal.classList.contains('show')) {
                closeAchievement();
            }
        }, 10000);
    }
}

function closeAchievement() {
    if (elements.achievementModal) {
        elements.achievementModal.classList.remove('show');
    }
}

// Função global para fechar achievement
window.closeAchievement = closeAchievement;

// =================================================
// EFEITOS VISUAIS E ANIMAÇÕES
// =================================================
function initializeAnimations() {
    // Criar partículas flutuantes
    if (!isMobile) {
        createFloatingParticles();
    }

    // Setup hover effects
    setupHoverEffects();
}

function createFloatingParticles() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: #cab485;
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            z-index: 1;
        `;
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: 'translateY(0px) rotate(0deg)', 
                opacity: 0 
            },
            { 
                transform: 'translateY(-50px) rotate(180deg)', 
                opacity: 0.3 
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: Math.random() * 15000 + 10000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // Criar partículas periodicamente
    setInterval(createParticle, 4000);
}

function setupHoverEffects() {
    // Error numbers flip effect
    document.querySelectorAll('.error-number').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!isMobile) {
                element.style.transform = 'rotateY(180deg) scale(1.1)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'rotateY(0deg) scale(1)';
        });
    });

    // Neural items hover effect
    document.querySelectorAll('.neural-item').forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'translateX(15px) scale(1.02)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        });
    });
}

// =================================================
// EASTER EGGS
// =================================================
function setupEasterEggs() {
    // Código Konami
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.add('konami-activated');
                setTimeout(() => {
                    document.body.classList.remove('konami-activated');
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Secret click areas
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        if (e.target.matches('.error-number')) {
            clickCount++;
            if (clickCount >= 7) {
                // Special animation for clicking all error numbers
                document.querySelectorAll('.error-number').forEach((el, i) => {
                    setTimeout(() => {
                        el.style.animation = 'celebration 1s ease-in-out';
                    }, i * 100);
                });
                clickCount = 0;
            }
        }
    });
}

// =================================================
// PERFORMANCE E OTIMIZAÇÕES
// =================================================
function setupPerformanceOptimizations() {
    // Lazy loading para imagens (se houver)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload próximas seções
    const preloadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Preload content or trigger animations for next section
                const nextSection = entry.target.nextElementSibling;
                if (nextSection) {
                    nextSection.style.willChange = 'transform, opacity';
                }
            }
        });
    });

    document.querySelectorAll('.story-scene').forEach(section => {
        preloadObserver.observe(section);
    });
}

// =================================================
// RESPONSIVE E RESIZE HANDLER
// =================================================
function setupResizeHandler() {
    const resizeHandler = utils.debounce(() => {
        const wasOnMobile = isMobile;
        detectDevice();
        
        // Se mudou de mobile para desktop ou vice-versa
        if (wasOnMobile !== isMobile) {
            // Reinicializar cursor se necessário
            if (!isMobile && elements.cursor) {
                elements.cursor.style.display = 'block';
                setupCustomCursor();
            } else if (isMobile && elements.cursor) {
                elements.cursor.style.display = 'none';
            }
            
            // Reconfigurar observers
            setupIntersectionObserver();
        }
        
        // Recalcular posições
        updateProgress();
        updateCurrentSection();
    }, 250);

    window.addEventListener('resize', resizeHandler);
}

// =================================================
// EVENT LISTENERS PRINCIPAIS
// =================================================
function setupEventListeners() {
    // Navegação
    setupNavigation();
    
    // Scroll handling
    setupScrollHandling();
    
    // Resize handling
    setupResizeHandler();
    
    // Mobile nav toggle
    if (elements.mobileNavToggle) {
        elements.mobileNavToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Fechar mobile nav ao clicar fora
    document.addEventListener('click', (e) => {
        if (elements.mobileNavMenu && 
            elements.mobileNavMenu.classList.contains('open') &&
            !elements.mobileNav.contains(e.target)) {
            closeMobileNav();
        }
    });
    
    // Scroll top button
    if (elements.scrollTopBtn) {
        elements.scrollTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Achievement modal
    if (elements.achievementModal) {
        elements.achievementModal.addEventListener('click', (e) => {
            if (e.target === elements.achievementModal) {
                closeAchievement();
            }
        });
    }
    
    // Prevent zoom on mobile
    if (isMobile) {
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// =================================================
// INICIALIZAÇÃO PRINCIPAL
// =================================================
function startInteractivity() {
    setupIntersectionObserver();
    setupCustomCursor();
    setupPerformanceOptimizations();
    setupEasterEggs();
    
    // Trigger inicial para definir estado correto
    updateProgress();
    updateCurrentSection();
    updateNavigation();
    
    console.log('🎯 Experiência interativa iniciada!');
}

// =================================================
// ANALYTICS E TRACKING (PLACEHOLDER)
// =================================================
function trackEvent(eventName, properties = {}) {
    // Placeholder para analytics
    console.log('📊 Event:', eventName, properties);
    
    // Aqui você pode adicionar seu código de analytics:
    // gtag('event', eventName, properties);
    // fbq('track', eventName, properties);
}

// Tracking de progresso
function trackProgress() {
    const progressPercent = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (progressPercent >= 25 && !window.tracked25) {
        trackEvent('progress_25');
        window.tracked25 = true;
    }
    
    if (progressPercent >= 50 && !window.tracked50) {
        trackEvent('progress_50');
        window.tracked50 = true;
    }
    
    if (progressPercent >= 75 && !window.tracked75) {
        trackEvent('progress_75');
        window.tracked75 = true;
    }
    
    if (progressPercent >= 90 && !window.tracked90) {
        trackEvent('progress_90');
        window.tracked90 = true;
    }
}

// Adicionar tracking ao scroll
window.addEventListener('scroll', utils.throttle(trackProgress, 1000));

// =================================================
// SERVICE WORKER PARA PWA (OPCIONAL)
// =================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// =================================================
// EXPORT PARA TESTES (SE NECESSÁRIO)
// =================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        navigateToWorld,
        skipIntro,
        toggleMobileNav,
        closeAchievement,
        trackEvent
    };
}
