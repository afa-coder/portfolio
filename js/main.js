// Project data
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A comprehensive online shopping platform built with React and Node.js. Features include product catalog, shopping cart, user authentication, payment processing, and order management.",
        challenges: "Implementing real-time inventory updates and optimizing database queries for large product catalogs.",
        solutions: "Used Socket.io for real-time updates and implemented database indexing and caching strategies.",
        features: [
            "User authentication and profiles",
            "Product search and filtering",
            "Shopping cart and wishlist",
            "Secure payment processing",
            "Order tracking and history",
            "Admin dashboard for inventory management"
        ],
        technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API", "AWS S3"]
    },
    // ... other projects data
];

// Gallery data
const galleryData = [
    {
        title: "Coding Session",
        description: "Working on a complex algorithm for a client project."
    },
    // ... other gallery data
];

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const skillBars = document.querySelectorAll('.skill-progress');
const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
const projectModal = document.getElementById('project-modal');
const projectModalContent = document.getElementById('project-modal-content');
const modalClose = document.querySelector('.modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('section');
const fadeElements = document.querySelectorAll('.fade-in');
const typingText = document.getElementById('typing-text');

// Theme toggle functionality
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Scroll effects
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightCurrentSection();
    animateOnScroll();
});

// Gallery lightbox functionality
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(index);
    });
});

// Contact form submission
contactForm.addEventListener('submit', handleContactFormSubmit);

// Initialize animations
window.addEventListener('load', () => {
    window.dispatchEvent(new Event('scroll'));
    setTimeout(animateSkillBars, 500);
    setTimeout(typeText, 1000);
});

// Utility functions
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.add('py-3');
        navbar.classList.remove('py-2');
    }
}

function highlightCurrentSection() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    updateNavigationHighlight(currentSection);
}

function updateNavigationHighlight(currentSection) {
    [navLinks, mobileNavLinks].forEach(links => {
        links.forEach(link => {
            link.classList.remove('text-primary-600', 'dark:text-primary-400');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-primary-600', 'dark:text-primary-400');
            }
        });
    });
}

function animateOnScroll() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!validateForm(name, email, message)) return;
    
    submitForm(name, email, message);
}

function validateForm(name, email, message) {
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function submitForm(name, email, message) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 1500);
}
