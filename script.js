// ============================================
// GLOBAL INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCountdown();
    initForm();
    initAnimations();
    initParallax();
    initMobileMenu();
    initMouseFollow();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================

function initCountdown() {
    // Set target date: 1er janvier 2026
    const targetDate = new Date('2026-01-01T00:00:00');
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const boxes = [
        { el: daysEl, box: daysEl.parentElement },
        { el: hoursEl, box: hoursEl.parentElement },
        { el: minutesEl, box: minutesEl.parentElement },
        { el: secondsEl, box: secondsEl.parentElement }
    ];
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Countdown finished
            boxes.forEach(({ el }) => {
                el.textContent = '00';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const values = [days, hours, minutes, seconds];
        const oldValues = boxes.map(({ el }) => parseInt(el.textContent) || 0);
        
        boxes.forEach(({ el, box }, index) => {
            const newValue = values[index];
            const oldValue = oldValues[index];
            
            if (newValue !== oldValue) {
                // Remove any existing animation classes
                el.classList.remove('flipping', 'number-changing');
                
                // Trigger flip animation
                el.classList.add('flipping');
                
                // Update number during flip (at 50% of animation)
                setTimeout(() => {
                    el.textContent = String(newValue).padStart(2, '0');
                }, 300);
                
                // Remove flip class after animation completes
                setTimeout(() => {
                    el.classList.remove('flipping');
                    el.classList.add('number-changing');
                    
                    // Remove number-changing class after slide animation
                    setTimeout(() => {
                        el.classList.remove('number-changing');
                    }, 300);
                }, 600);
            }
        });
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// ============================================
// NOTIFICATION FORM
// ============================================

function initForm() {
    const form = document.getElementById('notifyForm');
    const notifyBtn = document.getElementById('notifyBtn');
    const btnText = notifyBtn.querySelector('.btn-text');
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value.trim();
        const consent = document.getElementById('consent').checked;
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!consent) {
            showNotification('Veuillez accepter la politique de confidentialité', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }
        
        // Show loading state
        notifyBtn.classList.add('loading');
        btnText.textContent = 'Envoi en cours...';
        notifyBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            notifyBtn.classList.remove('loading');
            btnText.textContent = 'Envoyer la demande';
            notifyBtn.disabled = false;
            
            // Show success message
            showNotification('Merci ! Votre demande a été envoyée. Nous vous recontacterons rapidement.', 'success');
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                // Ne pas retirer les classes du select (il n'en a pas)
                if (input.tagName !== 'SELECT') {
                    input.classList.remove('error', 'valid');
                }
            });
            
            // Change button to success state
            notifyBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            btnText.textContent = '✓ Message envoyé';
            
            setTimeout(() => {
                notifyBtn.style.background = '';
                btnText.textContent = 'Envoyer la demande';
            }, 3000);
        }, 2000);
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error states
        field.classList.remove('error', 'valid');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email invalide';
            }
        }
        
        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 8) {
                isValid = false;
                errorMessage = 'Numéro de téléphone invalide';
            }
        }
        
        // Name validation
        if (field.id === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Le nom doit contenir au moins 2 caractères';
        }
        
        if (!isValid) {
            // Ne pas ajouter de classe de validation au select
            if (field.tagName !== 'SELECT') {
                field.classList.add('error');
            }
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = 'var(--error)';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '0.5rem';
            field.parentElement.appendChild(errorDiv);
        } else if (value && field.tagName !== 'SELECT') {
            // Ne pas ajouter de classe de validation au select
            field.classList.add('valid');
        }
        
        return isValid;
    }
}

// Simple notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'
    } text-white font-semibold`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// GSAP ANIMATIONS
// ============================================

function initAnimations() {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero-title', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.hero-subtitle', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.countdown-container', {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, '-=0.3')
            .from('.notification-form', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-image-container', {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: 'power3.out'
            }, '-=1');
        
        // Service cards animation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            // Mark card as JS-loaded
            card.classList.add('js-loaded');
            
            // Reset initial state for GSAP animation
            gsap.set(card, { opacity: 0, y: 50 });
            
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                delay: index * 0.1,
                onComplete: () => {
                    card.classList.add('visible');
                }
            });
        });
        
        // About section animation
        gsap.from('.about-content', {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%'
            }
        });
        
        gsap.from('.geometric-shape', {
            opacity: 0,
            scale: 0,
            rotation: 180,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%'
            }
        });
        
        // Section titles animation
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            gsap.from(title, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%'
                }
            });
        });
    } else {
        // Fallback: Use CSS animations if GSAP is not available
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'slide-up', 'visible');
                }
            });
        }, observerOptions);
        
        // Observe service cards and other elements
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.classList.add('js-loaded');
            observer.observe(card);
        });
        
        document.querySelectorAll('.section-title, .about-content').forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * (0.1 + index * 0.05);
            shape.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    
    function openMenu() {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.style.transform = 'translateX(0)';
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
    
    mobileMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

// ============================================
// MOUSE FOLLOW EFFECT
// ============================================

function initMouseFollow() {
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'fixed w-6 h-6 border-2 border-[#FF6B35] rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-300';
    cursorFollower.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.opacity = '0.5';
    });
    
    // Smooth follow animation
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });
    
    // Enhanced effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .countdown-box');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = '#FFB84D';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = '#FF6B35';
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(() => {
    // Parallax logic already handled in initParallax
}, 16);

window.addEventListener('scroll', throttledParallax);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #FF6B35 !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

