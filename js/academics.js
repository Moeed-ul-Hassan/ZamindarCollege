document.addEventListener('DOMContentLoaded', function() {
    // Program card hover animation
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
        });
    });

    // Calendar card flip animation
    const calendarCards = document.querySelectorAll('.calendar-card');
    
    calendarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Resources card hover effect with color change
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = '#4e008e';
            this.style.transform = 'translateY(-10px)';
            
            // Change text and icon color to white
            this.querySelectorAll('h3, p').forEach(element => {
                element.style.color = '#fff';
            });
            
            this.querySelector('.resource-icon i').style.color = '#fff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '#f9f9f9';
            this.style.transform = 'translateY(0)';
            
            // Revert text and icon color
            this.querySelectorAll('h3').forEach(element => {
                element.style.color = '#13131a';
            });
            
            this.querySelectorAll('p').forEach(element => {
                element.style.color = '#666';
            });
            
            this.querySelector('.resource-icon i').style.color = '#4e008e';
        });
    });

    // Program search filter
    const searchInput = document.getElementById('search-box');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            programCards.forEach(card => {
                const programTitle = card.querySelector('h3').textContent.toLowerCase();
                const programItems = Array.from(card.querySelectorAll('li')).map(item => item.textContent.toLowerCase());
                
                const isVisible = programTitle.includes(searchTerm) || programItems.some(item => item.includes(searchTerm));
                
                card.style.display = isVisible ? 'block' : 'none';
            });
        });
    }

    // Smooth scroll to programs section when clicking on relevant links
    const programLinks = document.querySelectorAll('a[href="#programs"]');
    
    programLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const programsSection = document.querySelector('.programs');
            
            if (programsSection) {
                window.scrollTo({
                    top: programsSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Academic Resources counter animation
    const resourceSection = document.querySelector('.resources');
    
    if (resourceSection) {
        const resourceStats = [
            { selector: '.library .resource-icon i', targetNumber: 50000, suffix: '+' },
            { selector: '.laboratories .resource-icon i', targetNumber: 15, suffix: '+' },
            { selector: '.computer-labs .resource-icon i', targetNumber: 100, suffix: '+' }
        ];
        
        let animated = false;
        
        window.addEventListener('scroll', function() {
            if (animated) return;
            
            const sectionTop = resourceSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                animated = true;
                
                resourceStats.forEach(stat => {
                    const element = document.querySelector(stat.selector);
                    if (element) {
                        countUp(element, stat.targetNumber, 2000, stat.suffix);
                    }
                });
            }
        });
    }

    // Helper function for counting up numbers with suffix
    function countUp(element, targetNumber, duration, suffix = '') {
        let startTimestamp = null;
        const startNumber = 0;
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentNumber = Math.floor(progress * (targetNumber - startNumber) + startNumber);
            
            element.setAttribute('data-count', currentNumber + suffix);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }

    // Toggle FAQ answers for mobile view if needed
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Smooth navigation through section links
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navbar');
                const menuBar = document.querySelector('#menu-bars');
                
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuBar.classList.remove('fa-times');
                }
            }
        });
    });
});
