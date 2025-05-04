document.addEventListener('DOMContentLoaded', function() {
    // Notice Board Pin Hover Effect
    const pins = document.querySelectorAll('.notice-pin');
    pins.forEach(pin => {
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) translateY(-3px) rotate(-10deg)';
            this.style.color = '#ff0000';
        });
        
        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%)';
            this.style.color = '#cc0000';
        });
    });

    // Simulate paper noise effect on notice hover
    const notices = document.querySelectorAll('.notice');
    notices.forEach(notice => {
        notice.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Automatically rotate notices slightly on page load for a more natural look
    notices.forEach(notice => {
        const randomRotation = (Math.random() * 2 - 1) * 2; // Between -2 and 2 degrees
        const currentTransform = notice.style.transform || '';
        if (currentTransform.includes('rotate')) {
            const regex = /rotate\(([^)]+)\)/;
            const match = currentTransform.match(regex);
            if (match) {
                const currentRotation = parseFloat(match[1]);
                const newRotation = currentRotation + randomRotation;
                notice.style.transform = currentTransform.replace(regex, `rotate(${newRotation}deg)`);
            }
        } else {
            notice.style.transform += ` rotate(${randomRotation}deg)`;
        }
    });
    
    // Department Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected department filter
            const selectedFilter = this.getAttribute('data-filter');
            
            // Filter faculty cards
            facultyCards.forEach(card => {
                if (selectedFilter === 'all' || card.getAttribute('data-department') === selectedFilter) {
                    fadeIn(card, 500);
                    card.style.display = 'flex';
                } else {
                    fadeOut(card, 500);
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Faculty Card hover effects
    facultyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
        });
    });

    // Department Card hover effects
    const departmentCards = document.querySelectorAll('.department-card');
    
    departmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const icon = this.querySelector('.department-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const icon = this.querySelector('.department-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Achievement Cards flip animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = '#4e008e';
            
            // Change text and icon color to white
            this.querySelectorAll('h3, p').forEach(element => {
                element.style.color = '#fff';
            });
            
            this.querySelector('.achievement-icon i').style.color = '#fff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#f9f9f9';
            
            // Revert text and icon color
            this.querySelectorAll('h3').forEach(element => {
                element.style.color = '#13131a';
            });
            
            this.querySelectorAll('p').forEach(element => {
                element.style.color = '#666';
            });
            
            this.querySelector('.achievement-icon i').style.color = '#4e008e';
        });
    });

    // Faculty Search Functionality
    const searchInput = document.getElementById('search-box');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            facultyCards.forEach(card => {
                const facultyName = card.querySelector('h3').textContent.toLowerCase();
                const facultyDepartment = card.getAttribute('data-department').toLowerCase();
                const facultyDesignation = card.querySelector('.designation').textContent.toLowerCase();
                
                if (facultyName.includes(searchTerm) || 
                    facultyDepartment.includes(searchTerm) || 
                    facultyDesignation.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Faculty Profile Modal (if needed)
    const viewProfileButtons = document.querySelectorAll('.view-profile-btn');
    
    if (viewProfileButtons.length > 0) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'faculty-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeButton = document.createElement('span');
        closeButton.className = 'close-modal';
        closeButton.innerHTML = '&times;';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add styles for modal
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .faculty-modal {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                overflow-y: auto;
            }
            .modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 3rem;
                border-radius: 1rem;
                width: 80%;
                max-width: 80rem;
                position: relative;
                animation: modalFadeIn 0.5s;
            }
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 2rem;
                color: #aaa;
                font-size: 3rem;
                font-weight: bold;
                cursor: pointer;
            }
            .close-modal:hover {
                color: #4e008e;
            }
            .modal-body {
                margin-top: 2rem;
            }
            @keyframes modalFadeIn {
                from {opacity: 0; transform: translateY(-50px);}
                to {opacity: 1; transform: translateY(0);}
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Modal functionality
        viewProfileButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const facultyCard = this.closest('.faculty-card');
                const facultyName = facultyCard.querySelector('h3').textContent;
                const designation = facultyCard.querySelector('.designation').textContent;
                const qualification = facultyCard.querySelector('.qualification').textContent;
                const experience = facultyCard.querySelector('.experience').textContent;
                
                modalBody.innerHTML = `
                    <h2>${facultyName}</h2>
                    <p class="modal-designation">${designation}</p>
                    <div class="modal-details">
                        <p><strong>Qualification:</strong> ${qualification}</p>
                        <p><strong>Experience:</strong> ${experience}</p>
                        <h3>Areas of Expertise</h3>
                        <ul>
                            <li>Research Methodology</li>
                            <li>Advanced Teaching Techniques</li>
                            <li>Academic Publishing</li>
                        </ul>
                        <h3>Publications</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc ultrices nunc, eget euismod nisl nisi eget nisl.</p>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Helper functions for animations
    function fadeIn(element, duration) {
        element.style.opacity = 0;
        element.style.display = 'flex';
        
        let opacity = 0;
        const interval = 10;
        const gap = interval / duration;
        
        function animate() {
            opacity += gap;
            element.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }
        
        const fadeInInterval = setInterval(animate, interval);
    }
    
    function fadeOut(element, duration) {
        let opacity = 1;
        const interval = 10;
        const gap = interval / duration;
        
        function animate() {
            opacity -= gap;
            element.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(fadeOutInterval);
            }
        }
        
        const fadeOutInterval = setInterval(animate, interval);
    }

    // Counter animation for faculty statistics
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        let counted = false;
        
        function startCounting() {
            if (counted) return;
            
            const stats = document.querySelector('.faculty-stats');
            const position = stats.getBoundingClientRect().top;
            
            if (position < window.innerHeight - 100) {
                counted = true;
                
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const duration = 2000; // ms
                    const interval = 10; // ms
                    const increment = target / (duration / interval);
                    
                    const updateCount = setInterval(() => {
                        count += increment;
                        counter.innerText = Math.floor(count);
                        
                        if (count >= target) {
                            counter.innerText = target;
                            clearInterval(updateCount);
                        }
                    }, interval);
                });
            }
        }
        
        window.addEventListener('scroll', startCounting);
    }
});
