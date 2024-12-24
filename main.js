// Constants and Configuration
const CONFIG = {
    PHONE_FORMAT: /^\(\d{3}\) \d{3}-\d{4}$/,
    EMAIL_FORMAT: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    SWIPER_OPTIONS: {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    }
};

// Utility Functions
const debounce = (func, wait) => {
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

// Form Validation Utilities
const ValidationUtils = {
    isValidEmail: email => CONFIG.EMAIL_FORMAT.test(email),
    isValidPhone: phone => CONFIG.PHONE_FORMAT.test(phone),
    formatPhoneNumber: value => {
        const digitsOnly = value.replace(/\D/g, '').substring(0, 10);
        if (digitsOnly.length >= 10) {
            return digitsOnly.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
        }
        return digitsOnly;
    }
};

// Project Gallery Handler
class ProjectGallery {
    constructor() {
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.thumbnailWidth = 96; // Width of each thumbnail
        this.initialize();
    }

    initialize() {
        // Initialize project image arrays
        this.projectImages = {
            // Project 1 - Modern Kitchen Transformation
            1: ['./Images/projects/project_1/IMG_9501.jpg',
                './Images/projects/project_1/IMG_9503.jpg',
                './Images/projects/project_1/IMG_9504.jpg',
                './Images/projects/project_1/IMG_9505.jpg',
                './Images/projects/project_1/IMG_9506.jpg',
                './Images/projects/project_1/IMG_9507.jpg',
                './Images/projects/project_1/IMG_9508.jpg',
                './Images/projects/project_1/IMG_9509.jpg',
                './Images/projects/project_1/IMG_9510.jpg',
                './Images/projects/project_1/IMG_9603.jpg',
                './Images/projects/project_1/IMG_9605.jpg',
                './Images/projects/project_1/IMG_9606.jpg',
                './Images/projects/project_1/IMG_9612.jpg',
                './Images/projects/project_1/IMG_9613.jpg',
                './Images/projects/project_1/IMG_9614.jpg',
                './Images/projects/project_1/IMG_9615.jpg',
                './Images/projects/project_1/IMG_9619.jpg',
                './Images/projects/project_1/IMG_0018.jpg',
                './Images/projects/project_1/IMG_0019.jpg',
                './Images/projects/project_1/IMG_0020.jpg',
                './Images/projects/project_1/IMG_0021.jpg',
                './Images/projects/project_1/IMG_0022.jpg',
                './Images/projects/project_1/IMG_0023.jpg',
                './Images/projects/project_1/IMG_0024.jpg',
                './Images/projects/project_1/IMG_0026.jpg',
                './Images/projects/project_1/IMG_0027.jpg',
                './Images/projects/project_1/IMG_0043.jpg'
            ],
            // Project 2 - Contemporary Living Space
            2: [
                './Images/projects/project_2/IMG_8856.jpg',
                './Images/projects/project_2/IMG_8858.jpg',
                './Images/projects/project_2/IMG_8892.jpg',
                './Images/projects/project_2/IMG_8893.jpg',
                './Images/projects/project_2/IMG_8895.jpg',
                './Images/projects/project_2/IMG_8920.jpg',
                './Images/projects/project_2/IMG_8922.jpg',
                './Images/projects/project_2/IMG_8923.jpg',
                './Images/projects/project_2/IMG_8924.jpg',
                './Images/projects/project_2/IMG_8925.jpg',
            ],
            // Project 3 - Luxury Bathroom Remodel
            3: [
                './Images/projects/project_3/IMG_9650.jpg',
                './Images/projects/project_3/IMG_9649.jpg',
                './Images/projects/project_3/IMG_9651.jpg',
                './Images/projects/project_3/IMG_9652.jpg',
                './Images/projects/project_3/IMG_9970.jpg',
                './Images/projects/project_3/IMG_9971.jpg',
                './Images/projects/project_3/IMG_0001.jpg',
                './Images/projects/project_3/IMG_0002.jpg',
                './Images/projects/project_3/IMG_0003.jpg',
                './Images/projects/project_3/IMG_9990.jpg',
                './Images/projects/project_3/IMG_9997.jpg',
                './Images/projects/project_3/IMG_0023_2.jpg',
                './Images/projects/project_3/IMG_0025.jpg',
                './Images/projects/project_3/IMG_0026_2.jpg',
                './Images/projects/project_3/IMG_0027_2.jpg',
                './Images/projects/project_3/IMG_0031_2.jpg',
                './Images/projects/project_3/IMG_0034_2.jpg',

            ],
            // Project 4 - Complete Home Exterior
            4: [
                './Images/projects/project_4/IMG_3892.jpg',
                './Images/projects/project_4/IMG_3893.jpg',
                './Images/projects/project_4/IMG_3894.jpg',
                './Images/projects/project_4/IMG_3895.jpg',
                './Images/projects/project_4/IMG_9379.jpg',
                './Images/projects/project_4/IMG_9380.jpg',
                './Images/projects/project_4/IMG_9381.jpg',
                './Images/projects/project_4/IMG_9382.jpg',
                './Images/projects/project_4/IMG_9473.jpg',
                './Images/projects/project_4/IMG_9474.jpg',
                './Images/projects/project_4/IMG_9475.jpg',
                './Images/projects/project_4/IMG_9476.jpg',
                './Images/projects/project_4/IMG_9477.jpg',
                './Images/projects/project_4/IMG_9479.jpg',
            ],
            // Project 5 - Basement Renovation
            5: [
                './Images/projects/project_5/IMG_8519.jpg',
                './Images/projects/project_5/IMG_8521.jpg',
                './Images/projects/project_5/IMG_8524.jpg',
                './Images/projects/project_5/IMG_8526.jpg',
                './Images/projects/project_5/IMG_8529.jpg',
                './Images/projects/project_5/IMG_8548.jpg',
                './Images/projects/project_5/IMG_8549.jpg',
                './Images/projects/project_5/IMG_8550.jpg',
                './Images/projects/project_5/IMG_8551.jpg',
            ],
            // Project 6 - Modern Kitchen Design ASK GIO FOR BEFORE PICS
            6: [
                './Images/projects/project_6/image000004_2.jpg',
                './Images/projects/project_6/image000005.jpg',
                './Images/projects/project_6/image000006.jpg',
                './Images/projects/project_6/image000007.jpg',
                './Images/projects/project_6/IMG_8799.jpg',
                './Images/projects/project_6/IMG_8800.jpg',
                './Images/projects/project_6/IMG_8801.jpg',
            ],
/*            // Project 7 - Master Suite Renovation
            7: [
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg'
            ],
            // Project 8 - Outdoor Living Space
            8: [
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg'
            ],
            // Project 9 - Commercial Renovation
            9: [
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg',
                './Images/projects/project_1/.jpg'
            ],
            // Project 10 - Custom Dining Space
            10: [
                "https://tse4.mm.bing.net/th?id=OIP.ZRGKpoC2HwI0-U5JpSzRxQHaHa&pid=Api",
                "https://tse4.mm.bing.net/th?id=OIP.BctKROOEYOuPZOq55eh3TwHaJU&pid=Api",
                "https://tse4.mm.bing.net/th?id=OIP.XN30O3TaEf4Kkh-5odd3eAHaHa&pid=Api",
                "https://tse3.mm.bing.net/th?id=OIP.DAXJ_k-c0gX7u12912sdQgHaFI&pid=Api",
                "https://tse1.mm.bing.net/th?id=OIP.K-Kyk_qaxvet6v1AoVyIEwHaJQ&pid=Api",
                "https://tse2.mm.bing.net/th?id=OIP.EOGxoXrHGKG1dBQb9NcozgHaFi&pid=Api",
                "https://tse4.mm.bing.net/th?id=OIP.BSO9DDK5MdCCoAHeOvkaoAHaHZ&pid=Api",
                "https://tse1.mm.bing.net/th?id=OIP.X5bk7rvttOMA-aaoUp5aJQHaHa&pid=Api",
                "https://tse1.mm.bing.net/th?id=OIP.Z2zJl2MRwnCaBfVI0yKANQHaLH&pid=Api",
                "https://tse2.mm.bing.net/th?id=OIP.3zrJee9O7CiUA_g15GISiAHaKX&pid=Api"
            ]
                */
        };

        // Set up event listeners
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleProjectClick(e));
        });

        document.getElementById('prev-image').addEventListener('click', () => this.navigateGallery(-1));
        document.getElementById('next-image').addEventListener('click', () => this.navigateGallery(1));
    }

    handleProjectClick(e) {
        const projectCard = e.currentTarget;
        const projectId = projectCard.dataset.project;
        const gallery = document.getElementById('expanded-gallery');
        
        if (this.currentProject === projectId && gallery.classList.contains('block')) {
            return;
        }

        this.currentProject = projectId;
        this.currentImageIndex = 0;
        
        gallery.classList.remove('hidden');
        gallery.classList.add('block');

        const offset = 100;
        const galleryPosition = gallery.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: galleryPosition,
            behavior: 'smooth'
        });

        this.updateFeaturedImage();
        this.updateThumbnails();
    }

    updateThumbnails() {
        const gallery = document.getElementById('thumbnail-gallery');
        gallery.innerHTML = '';
        
        this.projectImages[this.currentProject].forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `flex-shrink-0 w-24 h-24 cursor-pointer transition-all duration-300 ${
                index === this.currentImageIndex ? 'ring-2 ring-white scale-105' : ''
            }`;
            thumb.style.backgroundImage = `url(${image})`;
            thumb.style.backgroundSize = 'cover';
            thumb.style.backgroundPosition = 'center';
            
            thumb.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateFeaturedImage();
                this.updateThumbnails();
                this.scrollToThumbnail(index);
            });
            
            gallery.appendChild(thumb);
        });

        this.scrollToThumbnail(this.currentImageIndex);
    }

    scrollToThumbnail(index) {
        const gallery = document.getElementById('thumbnail-gallery');
        const thumbnails = gallery.children;
        
        if (thumbnails[index]) {
            const thumbnail = thumbnails[index];
            const galleryRect = gallery.getBoundingClientRect();
            const thumbnailRect = thumbnail.getBoundingClientRect();
            
            const scrollLeft = thumbnail.offsetLeft - (galleryRect.width / 2) + (thumbnailRect.width / 2);
            
            gallery.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }

    navigateGallery(direction) {
        const totalImages = this.projectImages[this.currentProject].length;
        this.currentImageIndex = (this.currentImageIndex + direction + totalImages) % totalImages;
        this.updateFeaturedImage();
        this.updateThumbnails();
    }

    updateFeaturedImage() {
        const featuredImage = document.getElementById('featured-image');
        const imageUrl = this.projectImages[this.currentProject][this.currentImageIndex];
        
        featuredImage.style.transition = 'all 0.3s ease-in-out';
        
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            
            if (aspectRatio < 1) {
                featuredImage.style.width = '40%';
                featuredImage.style.margin = '0 auto';
                featuredImage.style.height = '75vh';
                featuredImage.classList.add('portrait-view');
            } else {
                featuredImage.style.width = '100%';
                featuredImage.style.margin = '0';
                featuredImage.style.height = '600px';
                featuredImage.classList.remove('portrait-view');
            }
            
            featuredImage.style.backgroundImage = `url(${imageUrl})`;
            featuredImage.style.backgroundSize = 'contain';
            featuredImage.style.backgroundPosition = 'center';
            featuredImage.style.backgroundRepeat = 'no-repeat';
            featuredImage.style.cursor = 'pointer';
        };
    }
}

// Form Handler Class
class FormHandler {
    constructor(formSelector = 'form') {
        this.form = document.querySelector(formSelector);
        this.fields = {
            name: this.form?.querySelector('input[name="name"]'),
            email: this.form?.querySelector('input[name="email"]'),
            phone: this.form?.querySelector('input[name="phone"]'),
            message: this.form?.querySelector('textarea')
        };
        this.initialize();
    }

    initialize() {
        if (!this.form) return;
    
        if (this.fields.phone) {
            this.fields.phone.addEventListener('input', debounce(e => {
                e.target.value = ValidationUtils.formatPhoneNumber(e.target.value);
            }, 100));
        }
    
        this.form.addEventListener('submit', e => this.handleSubmit(e));
    }

    validateFields() {
        const errors = [];
        
        Object.entries(this.fields).forEach(([fieldName, field]) => {
            if (!field?.value) errors.push(`${fieldName} is required`);
        });

        if (this.fields.email?.value && !ValidationUtils.isValidEmail(this.fields.email.value)) {
            errors.push('Please enter a valid email address');
        }
        if (this.fields.phone?.value && !ValidationUtils.isValidPhone(this.fields.phone.value)) {
            errors.push('Please enter a valid phone number');
        }

        return errors;
    }

    async handleSubmit(e) {
        const errors = this.validateFields();

        if (errors.length > 0) {
            alert(errors.join('\n'));
            e.preventDefault();
            return;
        }
    }
}

// Smooth Scroll Handler
class SmoothScroll {
    constructor(selector = 'a[href^="#"]') {
        this.links = document.querySelectorAll(selector);
        this.initialize();
    }

    initialize() {
        this.links.forEach(link => {
            link.addEventListener('click', e => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Initialize existing functionality
    const gallery = new ProjectGallery();
    const form = new FormHandler();
    const scroll = new SmoothScroll();

    // Optimize Swiper initialization
    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer && typeof Swiper !== 'undefined') {
        new Swiper('.swiper-container', {
            loop: true,
            effect: 'fade',
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        });
    }
});