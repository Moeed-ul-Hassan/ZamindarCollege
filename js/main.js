document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize navbar behavior
    initNavbar();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize animations for elements
    initAnimations();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize magazine viewer
    initMagazineViewer();
    
    // Add year to copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Initialize navbar behavior
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Add active class to current page link
    const currentLocation = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html') {
            link.classList.add('active');
        } else if (currentLocation === '/' && (linkPath === '/' || linkPath === '/index.html')) {
            link.classList.add('active');
        }
        
        // Close mobile menu on link click
        link.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize animations for elements
function initAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const fadeElements = document.querySelectorAll('.animate-fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const fadeElements = document.querySelectorAll('.animate-fade-in');
        fadeElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (slider && slides.length > 0) {
        let currentSlide = 0;
        
        // Function to go to slide
        const goToSlide = (slideIndex) => {
            // Ensure slideIndex is within bounds
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            
            // Update currentSlide
            currentSlide = slideIndex;
            
            // Move slider to show current slide
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        };
        
        // Event listeners for next/prev buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Auto-slide every 5 seconds
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Magazine Viewer Functions
function initMagazineViewer() {
    // Initialize with first page active
    if (document.getElementById('page1')) {
        document.getElementById('page1').classList.add('active');
        const prevBtn = document.getElementById('prevPage');
        if (prevBtn) {
            prevBtn.disabled = true;
        }
    }
}

function openMagazine() {
    // Redirect to Google Drive PDF viewer
    const pdfUrl = "https://drive.google.com/file/d/1DFpKQ6KsZbpBVL4uODtBCuvRsFHlkOt2/view?usp=sharing";
    window.open(pdfUrl, '_blank');
}

function closeMagazine() {
    const modal = document.getElementById('magazineModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function changePage(pageNum) {
    const pages = document.querySelectorAll('.magazine-page');
    const totalPages = pages.length;
    const pageCounter = document.getElementById('pageCounter');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    // Remove all classes
    pages.forEach(page => {
        page.classList.remove('active', 'prev', 'next', 'flipping');
    });
    
    // Add appropriate classes
    if (pageNum > 1) {
        pages[pageNum - 2].classList.add('prev');
    }
    
    pages[pageNum - 1].classList.add('active');
    
    if (pageNum < totalPages) {
        pages[pageNum].classList.add('next');
    }
    
    // Update counter
    if (pageCounter) {
        pageCounter.textContent = `Page ${pageNum} of ${totalPages}`;
    }
    
    // Update button states
    if (prevButton) {
        prevButton.disabled = pageNum === 1;
    }
    
    if (nextButton) {
        nextButton.disabled = pageNum === totalPages;
    }
    
    // Set current page in data attribute for navigation
    const magazinePages = document.getElementById('magazinePages');
    if (magazinePages) {
        magazinePages.dataset.currentPage = pageNum;
    }
}

function nextPage() {
    const magazinePages = document.getElementById('magazinePages');
    if (magazinePages) {
        const currentPage = parseInt(magazinePages.dataset.currentPage || 1);
        const totalPages = document.querySelectorAll('.magazine-page').length;
        
        if (currentPage < totalPages) {
            // Add flipping animation to current page
            const currentPageEl = document.getElementById(`page${currentPage}`);
            if (currentPageEl) {
                currentPageEl.classList.add('flipping');
                
                // Change page after animation
                setTimeout(() => {
                    changePage(currentPage + 1);
                }, 300);
            }
        }
    }
}

function prevPage() {
    const magazinePages = document.getElementById('magazinePages');
    if (magazinePages) {
        const currentPage = parseInt(magazinePages.dataset.currentPage || 1);
        
        if (currentPage > 1) {
            // Get the previous page and remove flipping class if it has it
            const prevPageEl = document.getElementById(`page${currentPage - 1}`);
            if (prevPageEl) {
                prevPageEl.classList.remove('flipping');
                changePage(currentPage - 1);
            }
        }
    }
}

function changeMagazine(edition, season) {
    const magazineCover = document.getElementById('current-magazine');
    if (magazineCover) {
        // Update title and year
        const titleEl = magazineCover.querySelector('.magazine-title');
        const yearEl = magazineCover.querySelector('.magazine-year');
        
        if (titleEl && yearEl) {
            titleEl.textContent = 'Zamindar Chronicle';
            yearEl.textContent = edition;
        }
        
        // Change magazine cover style based on season
        if (season === 'Winter') {
            magazineCover.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        } else if (season === 'Fall') {
            magazineCover.style.background = 'linear-gradient(45deg, #e67e22, #d35400)';
        } else if (season === 'Summer') {
            magazineCover.style.background = 'linear-gradient(45deg, #f1c40f, #f39c12)';
        } else {
            // Spring (default)
            magazineCover.style.background = 'linear-gradient(45deg, var(--accent-color), var(--accent-color2))';
        }
        
        // Add a little animation
        magazineCover.animate(
            [
                { transform: 'scale(0.95)', opacity: 0.9 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            {
                duration: 500,
                easing: 'ease-out'
            }
        );
        
        // Update the Read Now button to open a different PDF based on the edition
        const button = magazineCover.querySelector('.btn-read-magazine');
        if (button) {
            button.onclick = function() {
                let pdfUrl = "https://drive.google.com/file/d/1DFpKQ6KsZbpBVL4uODtBCuvRsFHlkOt2/view?usp=sharing"; // Default Spring 2023
                
                if (season === 'Winter') {
                    pdfUrl = "https://drive.google.com/file/d/19sI0ZwJyKJeYAiH9RxXnDqGxI3qUSXOE/view?usp=sharing";
                } else if (season === 'Fall') {
                    pdfUrl = "https://drive.google.com/file/d/1n62Zw8K1vzLnB9xOFQRNYHl0oB1C0wLM/view?usp=sharing";
                } else if (season === 'Summer') {
                    pdfUrl = "https://drive.google.com/file/d/1EtWZJPRdVr6b7xyzIUhwl1HQOWNiVUjg/view?usp=sharing";
                }
                
                window.open(pdfUrl, '_blank');
            };
        }
    }
}