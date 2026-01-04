// Mouse Spotlight Effect
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    const spotlight = document.getElementById('mouse-spotlight');
    
    if (hero && spotlight) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            spotlight.style.left = x + 'px';
            spotlight.style.top = y + 'px';
            spotlight.style.opacity = '1';
        });
        
        hero.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
    }
    
    // Animate progress ring for AI Detection Score (12%)
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        // Calculate: circumference = 2 * π * r = 2 * π * 36 ≈ 226.2
        // For 12%: stroke-dashoffset = 226.2 - (226.2 * 0.12) = 226.2 - 27.14 = 199
        setTimeout(() => {
            progressRing.classList.add('animated');
        }, 2000);
    }
    
    // Animate progress bar for Grammar Score (98%)
    const progressBarFill = document.getElementById('grammar-progress');
    if (progressBarFill) {
        setTimeout(() => {
            progressBarFill.classList.add('animated');
        }, 2200);
    }
    
    // Animate word count from 0 to 525
    const wordCountElement = document.getElementById('word-count');
    if (wordCountElement) {
        let count = 0;
        const target = 525;
        const duration = 2000;
        const startTime = Date.now();
        
        const animateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            count = Math.floor(easeOutCubic * target);
            
            wordCountElement.textContent = count;
            
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                wordCountElement.textContent = target;
            }
        };
        
        setTimeout(() => {
            animateCount();
        }, 2400);
    }
    
    // Animate metric values with counter effect
    const aiScoreElement = document.getElementById('ai-score');
    const grammarScoreElement = document.getElementById('grammar-score');
    
    const animateValue = (element, target, suffix = '') => {
        if (!element) return;
        let current = 0;
        const duration = 1500;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(easeOutCubic * target);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        setTimeout(() => {
            animate();
        }, 2000);
    };
    
    if (aiScoreElement) {
        animateValue(aiScoreElement, 12, '%');
    }
    
    if (grammarScoreElement) {
        animateValue(grammarScoreElement, 98, '%');
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    };
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }
    
    // Load saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, just show a success message
            if (formMessage) {
                formMessage.classList.remove('hidden');
                formMessage.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-200');
                formMessage.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
                contactForm.reset();
            }
        });
    }
    
    // Blog Modal Functionality
    const blogCards = document.querySelectorAll('.blog-card');
    const blogModal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const blogData = document.getElementById('blog-data');
    
    if (blogData && blogModal) {
        const blogs = JSON.parse(blogData.textContent);
        
        blogCards.forEach(card => {
            card.addEventListener('click', () => {
                const blogId = card.getAttribute('data-blog-id');
                if (blogs[blogId]) {
                    modalTitle.textContent = blogs[blogId].title;
                    modalContent.innerHTML = blogs[blogId].content;
                    blogModal.classList.remove('hidden');
                    blogModal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                blogModal.classList.add('hidden');
                blogModal.classList.remove('flex');
                document.body.style.overflow = '';
            });
        }
        
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.classList.add('hidden');
                blogModal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
    
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
