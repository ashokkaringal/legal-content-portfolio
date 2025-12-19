// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeroAnimations();
    initModals();
    initContactForm();
    initScrollEffects();
    initParallax();
    initMouseSpotlight();
});

// ============================================
// Navigation Functions
// ============================================
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    
    // Header shrink on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                    }
                }
            }
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// Hero Section Animations
// ============================================
function initHeroAnimations() {
    // Animate word count counter
    animateCounter('word-count', 0, 527, 2000);
    
    // Animate AI detection progress ring
    setTimeout(() => {
        const progressCircle = document.querySelector('.progress-ring-circle');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 36; // radius = 36
            const percentage = 12; // 12%
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.transition = 'stroke-dashoffset 2s ease';
        }
    }, 500);
    
    // Animate grammar progress bar
    setTimeout(() => {
        const progressBar = document.getElementById('grammar-progress');
        if (progressBar) {
            progressBar.style.width = '98%';
        }
    }, 500);
    
    // Fade in metrics cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });
}

// Counter animation function
function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easeOut));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============================================
// Modal Functions
// ============================================
function initModals() {
    const modal = document.getElementById('blog-modal');
    const modalClose = document.getElementById('modal-close');
    const blogButtons = document.querySelectorAll('.blog-read-btn');
    const blogData = JSON.parse(document.getElementById('blog-data').textContent);
    
    // Open modal
    blogButtons.forEach(button => {
        button.addEventListener('click', () => {
            const blogId = button.getAttribute('data-blog');
            const blog = blogData[blogId];
            
            if (blog) {
                document.getElementById('modal-title').textContent = blog.title;
                document.getElementById('modal-content').innerHTML = `
                    <p class="text-gray-600 mb-4">${blog.location}</p>
                    ${blog.content}
                `;
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const firm = document.getElementById('firm').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !firm || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            showFormMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            form.reset();
            
            // In production, you would send the data to your backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, firm, phone, message })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormMessage('Thank you! Your message has been sent.', 'success');
            //     form.reset();
            // })
            // .catch(error => {
            //     showFormMessage('Something went wrong. Please try again.', 'error');
            // });
        });
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = type;
        formMessage.classList.remove('hidden');
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    // Scroll indicator fade out
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Fade in sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

// ============================================
// Parallax Effects
// ============================================
function initParallax() {
    const hero = document.getElementById('hero');
    const heroMesh = document.querySelector('.hero-mesh');
    const metricCards = document.querySelectorAll('.metric-card');
    
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;
                
                if (scrolled < heroHeight) {
                    // Parallax for background mesh
                    if (heroMesh) {
                        const parallaxSpeed = 0.5;
                        heroMesh.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    }
                    
                    // Parallax for metric cards
                    metricCards.forEach((card, index) => {
                        const speed = 0.1 + (index * 0.05);
                        const offset = scrolled * speed;
                        // Preserve rotation based on card class
                        let rotation = '0deg';
                        if (card.classList.contains('card-1')) rotation = '-2deg';
                        else if (card.classList.contains('card-2')) rotation = '2deg';
                        else if (card.classList.contains('card-3')) rotation = '-1deg';
                        card.style.transform = `translateY(${offset}px) rotate(${rotation})`;
                    });
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ============================================
// Mouse Spotlight Effect
// ============================================
function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    const hero = document.getElementById('hero');
    
    if (!spotlight || !hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let spotlightX = 0;
    let spotlightY = 0;
    
    hero.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        spotlight.classList.add('active');
    });
    
    hero.addEventListener('mouseleave', () => {
        spotlight.classList.remove('active');
    });
    
    // Smooth follow animation
    function animateSpotlight() {
        spotlightX += (mouseX - spotlightX) * 0.1;
        spotlightY += (mouseY - spotlightY) * 0.1;
        
        spotlight.style.left = `${spotlightX}px`;
        spotlight.style.top = `${spotlightY}px`;
        
        requestAnimationFrame(animateSpotlight);
    }
    
    animateSpotlight();
}

// ============================================
// Card Parallax on Mouse Move
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (!heroVisual) return;
    
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        metricCards.forEach((card, index) => {
            const offsetX = (x - centerX) * (0.02 + index * 0.01);
            const offsetY = (y - centerY) * (0.02 + index * 0.01);
            
            // Preserve rotation based on card class
            let rotation = '0deg';
            if (card.classList.contains('card-1')) rotation = '-2deg';
            else if (card.classList.contains('card-2')) rotation = '2deg';
            else if (card.classList.contains('card-3')) rotation = '-1deg';
            
            card.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation})`;
        });
    });
    
    heroVisual.addEventListener('mouseleave', () => {
        metricCards.forEach(card => {
            // Restore rotation based on card class
            let rotation = '0deg';
            if (card.classList.contains('card-1')) rotation = '-2deg';
            else if (card.classList.contains('card-2')) rotation = '2deg';
            else if (card.classList.contains('card-3')) rotation = '-1deg';
            card.style.transform = `rotate(${rotation})`;
        });
    });
});

// ============================================
// Performance Optimization
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

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Scroll-dependent functions are already optimized with requestAnimationFrame
}, 16);

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark mode if saved preference exists, otherwise use system preference
    if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
    }
    
    // Toggle function
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    }
    
    // Desktop toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Mobile toggle
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }
}

// Initialize dark mode on page load
initDarkMode();

