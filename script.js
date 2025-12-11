// ============================================
// NAVBAR & NAVIGATION
// ============================================

// Smooth scroll untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeMenu();
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// ============================================
// SCROLL TO SECTION FUNCTION
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// GALERI FILTER
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galeriItems = document.querySelectorAll('.galeri-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class dari semua button
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class ke button yang diklik
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter galeri items
        galeriItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ============================================
// FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        // Validasi
        if (!name || !email || !subject || !message) {
            showNotification('Mohon isi semua field!', 'error');
            return;
        }

        // Validasi email
        if (!isValidEmail(email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }

        // Simulasi pengiriman form
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        if (!isValidEmail(email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards dan items
document.querySelectorAll('.jenis-card, .pelestarian-card, .galeri-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h4');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const tentangStats = document.querySelector('.tentang-stats');
if (tentangStats) {
    statsObserver.observe(tentangStats);
}

// ============================================
// DARK MODE TOGGLE (OPTIONAL)
// ============================================

function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Cek localStorage atau preference sistem
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon();
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            updateDarkModeIcon();

            // Simpan preferensi ke localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Deteksi perubahan preferensi sistem
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
                updateDarkModeIcon();
            }
        });
    }
}

function updateDarkModeIcon() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.className = 'fas fa-sun';
    } else {
        darkModeToggle.className = 'fas fa-moon';
    }
}

initDarkMode();

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// MODAL/LIGHTBOX UNTUK GALERI
// ============================================

function initGaleriLightbox() {
    const galeriItems = document.querySelectorAll('.galeri-item');

    galeriItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.galeri-overlay h4').textContent;
            
            openLightbox(img.src, title);
        });
    });
}

function openLightbox(imageSrc, title) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">×</button>
            <img src="${imageSrc}" alt="${title}">
            <p class="lightbox-title">${title}</p>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Trigger animation
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);

    // Close lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.lightbox')) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
}

// Initialize lightbox
initGaleriLightbox();

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

initScrollToTop();

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            element.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

initParallax();

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K untuk search (optional)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implementasi search jika diperlukan
    }

    // Ctrl/Cmd + / untuk help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showNotification('Gunakan menu navigasi untuk menjelajahi website', 'info');
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        }, 0);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Jaranan Nusantara Website Loaded Successfully');
    
    // Initialize all components
    initDarkMode();
    initGaleriLightbox();
    initScrollToTop();
    initParallax();
});

// ============================================
// RESPONSIVE MENU
// ============================================

function handleResponsiveMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth <= 768) {
        if (!hamburger.classList.contains('responsive')) {
            hamburger.classList.add('responsive');
        }
    } else {
        hamburger.classList.remove('responsive');
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResponsiveMenu);
handleResponsiveMenu();

// ============================================
// SMOOTH SCROLL POLYFILL
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    function smoothScroll(element) {
        const startPosition = window.pageYOffset;
        const endPosition = element.offsetTop;
        const distance = endPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollBy(0, easeInOutQuad(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        });
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}
