// Google Analytics Tracking Function
function trackButtonClick(buttonName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'button',
            event_label: buttonName
        });
    }
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button interactions with analytics tracking
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Track specific buttons
        const href = this.getAttribute('href');
        const buttonText = this.textContent.trim();
        
        if (href === 'https://www.linkedin.com/in/renatocancino') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'linkedin_click', {
                    event_category: 'engagement',
                    event_label: 'LinkedIn Profile Visit'
                });
            }
        } else if (href && href.startsWith('mailto:')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'send_email_click', {
                    event_category: 'engagement',
                    event_label: 'Send Email Button'
                });
            }
        } else if (href && href.includes('resume') && href.includes('.pdf')) {
            // Track resume download with detailed engagement metrics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_download', {
                    event_category: 'engagement',
                    event_label: 'Resume PDF Download'
                });
            }
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        // Add hover effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Form validation
const contactForm = document.querySelector('.contact-input');
if (contactForm) {
    contactForm.addEventListener('blur', function() {
        const email = this.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (email && !isValid) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
}

// Mobile menu toggle (if needed)
let menuOpen = false;

// Add class to body for animations
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// // Header sticky behavior
// let lastScrollTop = 0;
// const header = document.querySelector('.profile-header');

// if (header) {
//     window.addEventListener('scroll', () => {
//         let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
//         if (scrollTop > lastScrollTop) {
//             // Scrolling Down
//             header.style.transform = 'translateY(-100%)';
//         } else {
//             // Scrolling Up
//             header.style.transform = 'translateY(0)';
//         }
        
//         header.style.transition = 'transform 0.3s ease';
//         lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
//     });
// }

// Gallery image lazy loading
const images = document.querySelectorAll('.gallery-item img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Images already loaded, but can add loading state here if needed
            imageObserver.unobserve(entry.target);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add keyboard accessibility
document.querySelectorAll('.btn, .project-link, .social-link').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            element.click();
        }
    });
});

// Social Links Analytics Tracking
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const text = this.textContent.trim();
        
        if (text === 'LinkedIn') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_media_click', {
                    event_category: 'engagement',
                    event_label: 'LinkedIn Social Link'
                });
            }
        } else if (text === 'GitHub') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_media_click', {
                    event_category: 'engagement',
                    event_label: 'GitHub Social Link'
                });
            }
        } else if (text === 'Instagram') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_media_click', {
                    event_category: 'engagement',
                    event_label: 'Instagram Social Link'
                });
            }
        } else if (text === 'Viber') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_media_click', {
                    event_category: 'engagement',
                    event_label: 'Viber Contact'
                });
            }
        }
    });
});

// Theme toggle (optional - for dark mode if needed)
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
    // Optional: Add dark mode styling
    console.log('Dark mode preference detected');
}

// Copy email to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const alert = document.createElement('div');
        alert.textContent = 'Copied to clipboard!';
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.background = '#10b981';
        alert.style.color = 'white';
        alert.style.padding = '12px 20px';
        alert.style.borderRadius = '6px';
        alert.style.zIndex = '9999';
        alert.style.animation = 'slideIn 0.3s ease';
        
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 2000);
    });
}

// Add to style dynamically for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Gallery Navigation
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    if (galleryGrid && galleryPrev && galleryNext) {
        const scrollAmount = 300;

        galleryPrev.addEventListener('click', () => {
            galleryGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        galleryNext.addEventListener('click', () => {
            galleryGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

// Gallery Navigation - Carousel Feature
const galleryGrid = document.querySelector('.gallery-grid');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');

if (galleryGrid && galleryPrev && galleryNext) {
    const scrollAmount = 240; // Width of one item + gap
    
    galleryPrev.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    galleryNext.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Certification Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certModal');
    const certCards = document.querySelectorAll('.certification-card, .certification-item');
    const modalClose = document.querySelector('.modal-close');
    const modalLink = document.getElementById('modalLink');

    if (certCards.length > 0) {
        certCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                const title = this.getAttribute('data-cert-title') || 'Certification';
                const issuer = this.getAttribute('data-cert-issuer') || 'Issuer';
                const image = this.getAttribute('data-cert-image') || '';
                const link = this.getAttribute('data-cert-link') || '#';

                // Update modal content
                const modalTitle = document.getElementById('modalTitle');
                const modalIssuer = document.getElementById('modalIssuer');
                const modalImage = document.getElementById('modalImage');

                if (modalTitle) modalTitle.textContent = title;
                if (modalIssuer) modalIssuer.textContent = issuer;
                
                if (modalImage) {
                    modalImage.src = image;
                    modalImage.onerror = function() {
                        this.src = 'https://via.placeholder.com/600x400?text=Certification';
                    };
                }

                // Set the link with proper attributes
                if (modalLink) {
                    modalLink.href = link;
                    modalLink.setAttribute('href', link);
                    modalLink.onclick = function(e) {
                        e.preventDefault();
                        window.open(link, '_blank');
                        return false;
                    };
                }

                // Show modal
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal when X is clicked
        if (modalClose) {
            modalClose.addEventListener('click', function(e) {
                e.preventDefault();
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Close modal when clicking outside the modal content
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.createElement('div');
galleryModal.id = 'galleryModal';
galleryModal.className = 'modal';
galleryModal.innerHTML = `
    <div class="modal-content gallery-modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body gallery-modal-body">
            <img id="galleryModalImage" src="" alt="Gallery Image" class="modal-image">
        </div>
    </div>
`;
document.body.appendChild(galleryModal);

galleryItems.forEach((item) => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        document.getElementById('galleryModalImage').src = imgSrc;
        document.getElementById('galleryModalImage').alt = imgAlt;
        galleryModal.classList.add('active');
    });
});

// Close gallery modal
const closeGalleryModal = galleryModal.querySelector('.modal-close');
closeGalleryModal.addEventListener('click', function() {
    galleryModal.classList.remove('active');
});

galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
    }
});

// ===== CONTACT FORM HANDLER (Simple & Reliable with reCAPTCHA) =====

// Rate limiting - prevent spam
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 10000; // 10 seconds

// Helper function to show status modal
function showStatusModal(title, message, isSuccess = true) {
    const statusModal = document.getElementById('statusModal');
    const statusMessage = document.getElementById('statusMessage');
    
    if (isSuccess) {
        statusMessage.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
        statusMessage.style.color = '#10b981';
    } else {
        statusMessage.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
        statusMessage.style.color = '#ef4444';
    }
    
    statusModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        statusModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 5000);
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Rate limiting check
            const now = Date.now();
            if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
                const secondsLeft = Math.ceil((SUBMIT_COOLDOWN - (now - lastSubmitTime)) / 1000);
                showStatusModal('Please Wait', `You can send another message in ${secondsLeft} seconds.`, false);
                return;
            }
            
            // Validate inputs before submitting
            const visitorEmail = document.getElementById('visitorEmail').value.trim();
            const contactMessage = document.getElementById('contactMessage').value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(visitorEmail)) {
                showStatusModal('Invalid Email', 'Please enter a valid email address.', false);
                return;
            }
            
            if (!contactMessage) {
                showStatusModal('Message Required', 'Please enter your message.', false);
                return;
            }
            
            if (contactMessage.length < 10) {
                showStatusModal('Message Too Short', 'Please enter at least 10 characters.', false);
                return;
            }
            
            // Show loading state
            sendBtn.disabled = true;
            const originalText = sendBtn.textContent;
            sendBtn.textContent = 'Sending...';
            
            try {
                // Get reCAPTCHA token
                if (typeof grecaptcha !== 'undefined') {
                    const token = await grecaptcha.execute('6Lfa8dksAAAAAE4stgZiYDtVGyNRi7VyNK4BJ29c', { action: 'submit' });
                    document.getElementById('recaptchaToken').value = token;
                } else {
                    console.warn('reCAPTCHA not loaded');
                }
                
                // Mark submit time for rate limiting
                lastSubmitTime = now;
                
                // Track event
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submitted', {
                        event_category: 'engagement',
                        event_label: 'Contact Form Submission'
                    });
                }
                
                // Submit form (Formspree will validate reCAPTCHA on the backend)
                setTimeout(() => {
                    contactForm.submit();
                    showStatusModal('Message Sent!', 'Thank you! I will get back to you soon.', true);
                    contactForm.reset();
                    sendBtn.disabled = false;
                    sendBtn.textContent = originalText;
                }, 1000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                showStatusModal('Error', 'Failed to submit form. Please try again.', false);
                sendBtn.disabled = false;
                sendBtn.textContent = originalText;
            }
        });
        
        // Email validation on blur
        const emailInput = document.getElementById('visitorEmail');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email && !emailRegex.test(email)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
});
