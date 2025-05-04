// AOS (Animate on Scroll) Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        mirror: false
    });

    // Header scroll effect
    let header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.padding = '1rem 9%';
        } else {
            header.style.background = '#fff';
            header.style.padding = '1.5rem 9%';
        }
    });

    // Menu bar toggle
    let menuBar = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menuBar.addEventListener('click', function() {
        menuBar.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickOnMenuBar = menuBar.contains(event.target);
        
        if (!isClickInsideNavbar && !isClickOnMenuBar && navbar.classList.contains('active')) {
            menuBar.classList.remove('fa-times');
            navbar.classList.remove('active');
        }
    });

    // Search form toggle
    let searchIcon = document.querySelector('#search-icon');
    let searchForm = document.querySelector('.search-form');

    searchIcon.addEventListener('click', function() {
        searchForm.classList.toggle('active');
    });

    // Close search form when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSearchForm = searchForm.contains(event.target);
        const isClickOnSearchIcon = searchIcon.contains(event.target);
        
        if (!isClickInsideSearchForm && !isClickOnSearchIcon && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
        }
    });

    // Reset menu and search form on window resize
    window.addEventListener('resize', function() {
        menuBar.classList.remove('fa-times');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    });

    // Button hover animation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Preloader
window.addEventListener('load', function() {
    if (document.querySelector('.preloader')) {
        document.querySelector('.preloader').classList.add('hide-preloader');
    }
});

// Common animation functions that can be used across different pages

// Fade in element
function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animation(currentTime) {
        if (!start) start = currentTime;
        const progress = currentTime - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animation);
        }
    }
    
    window.requestAnimationFrame(animation);
}

// Fade out element
function fadeOut(element, duration = 500) {
    element.style.opacity = 1;
    
    let start = null;
    
    function animation(currentTime) {
        if (!start) start = currentTime;
        const progress = currentTime - start;
        const opacity = 1 - Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animation);
        } else {
            element.style.display = 'none';
        }
    }
    
    window.requestAnimationFrame(animation);
}

// Slide down animation
function slideDown(element, duration = 500) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const targetHeight = element.scrollHeight;
    
    let start = null;
    
    function animation(currentTime) {
        if (!start) start = currentTime;
        const progress = currentTime - start;
        const height = Math.min((progress / duration) * targetHeight, targetHeight);
        
        element.style.height = height + 'px';
        
        if (progress < duration) {
            window.requestAnimationFrame(animation);
        } else {
            element.style.height = 'auto';
        }
    }
    
    window.requestAnimationFrame(animation);
}

// Slide up animation
function slideUp(element, duration = 500) {
    const startHeight = element.offsetHeight;
    element.style.overflow = 'hidden';
    
    let start = null;
    
    function animation(currentTime) {
        if (!start) start = currentTime;
        const progress = currentTime - start;
        const height = startHeight - Math.min((progress / duration) * startHeight, startHeight);
        
        element.style.height = height + 'px';
        
        if (progress < duration) {
            window.requestAnimationFrame(animation);
        } else {
            element.style.display = 'none';
        }
    }
    
    window.requestAnimationFrame(animation);
}

// Scroll to section smoothly
function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 100, // Adjust for header
            behavior: 'smooth'
        });
    }
}

// Create a floating element animation
function floatingAnimation(element, duration = 2000, distance = 15) {
    let start = null;
    let direction = 1;
    const initialPosition = element.getBoundingClientRect().top;
    
    function animate(currentTime) {
        if (!start) start = currentTime;
        const progress = (currentTime - start) % duration / duration;
        
        // Create a sine wave pattern for smooth floating
        const offset = Math.sin(progress * Math.PI * 2) * distance;
        element.style.transform = `translateY(${offset}px)`;
        
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
}

// Apply a typing animation to text
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Count up animation for numbers
function countUp(element, targetNumber, duration = 2000) {
    let start = null;
    const startNumber = parseInt(element.textContent) || 0;
    
    function animate(currentTime) {
        if (!start) start = currentTime;
        const progress = Math.min((currentTime - start) / duration, 1);
        const currentValue = Math.floor(startNumber + (targetNumber - startNumber) * progress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(animate);
        } else {
            element.textContent = targetNumber;
        }
    }
    
    window.requestAnimationFrame(animate);
}
