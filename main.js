// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer first, then initialize functionality
    loadHeader().then(() => {
        initMobileMenu();
        initScrollAnimations();
        initSmoothScrolling();
        initHeaderEffects();
    });
    loadFooter();
    initContactForm();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change button icon
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.textContent = '✕';
            } else {
                mobileMenuBtn.textContent = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effects
function initHeaderEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ensure header is always visible (sticky behavior)
        header.style.transform = 'translateY(0)';
    });
}



// Form Validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Lazy Loading for Images (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Performance optimization: Debounce function
function debounce(func, wait) {
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

// Enhanced scroll handler with debouncing
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS for header scroll effects
const style = document.createElement('style');
style.textContent = `
    header {
        transition: all 0.3s ease;
    }
    
    header.scrolled {
        background: rgba(255, 255, 255, 0.99);
        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(style);

// Load Header Function
function loadHeader() {
    return new Promise((resolve, reject) => {
        const headerContainer = document.querySelector('#header-container');
        if (headerContainer) {
            fetch('header.html')
                .then(response => response.text())
                .then(data => {
                    headerContainer.innerHTML = data;
                    resolve();
                })
                .catch(error => {
                    console.error('Error loading header:', error);
                    // Fallback header if loading fails
                    headerContainer.innerHTML = `
                        <header>
                            <div class="container">
                                <div class="header-content">
                                    <a href="index.html" class="logo">Ada Software</a>
                                    <nav>
                                        <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
                                        <ul id="nav-menu">
                                            <li><a href="index.html#productos">Productos</a></li>
                                            <li><a href="index.html#about">Nosotros</a></li>
                                            <li><a href="index.html#servicios">Servicios</a></li>
                                            <li><a href="index.html#contact">Contacto</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </header>
                    `;
                    resolve();
                });
        } else {
            resolve();
        }
    });
}

// Load Footer Function
function loadFooter() {
    const footerContainer = document.querySelector('#footer-container');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer if loading fails
                footerContainer.innerHTML = `
                    <footer>
                        <div class="container">
                            <div class="footer-content">
                                <div class="footer-section">
                                    <h4>Ada Software</h4>
                                    <p>Soluciones tecnológicas especializadas que transforman la gestión bursátil y educativa.</p>
                                </div>
                                <div class="footer-section">
                                    <h4>Productos</h4>
                                    <a href="adabolsa.html">AdaBolsa</a>
                                    <a href="adacolegios.html">AdaColegios</a>
                                </div>
                                <div class="footer-section">
                                    <h4>Contacto</h4>
                                    <p>CABA, Argentina</p>
                                    <p>info@adasoftware.com.ar</p>
                                </div>
                            </div>
                            <div class="footer-bottom">
                                <p>&copy; 2024 Ada Software. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
}