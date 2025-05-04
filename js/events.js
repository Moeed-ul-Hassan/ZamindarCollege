document.addEventListener('DOMContentLoaded', function() {
    // Event cards hover effect
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
        });
    });

    // Calendar navigation
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const currentMonthDisplay = document.querySelector('.current-month');
    
    if (prevMonthBtn && nextMonthBtn && currentMonthDisplay) {
        // Date information
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        
        // Update calendar display
        function updateCalendar() {
            currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
            
            // Logic to update calendar days would go here in a real implementation
            // This is a simplified version
        }
        
        updateCalendar();
        
        // Previous month button click
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
        
        // Next month button click
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
        
        // Calendar day event tooltips
        const eventDays = document.querySelectorAll('.event-day');
        const eventTooltip = document.getElementById('event-tooltip');
        
        if (eventDays.length > 0 && eventTooltip) {
            eventDays.forEach(day => {
                day.addEventListener('mouseenter', function(e) {
                    const eventName = this.getAttribute('data-event');
                    if (eventName) {
                        const tooltipContent = eventTooltip.querySelector('.tooltip-content');
                        tooltipContent.textContent = eventName;
                        
                        // Position tooltip
                        const rect = this.getBoundingClientRect();
                        eventTooltip.style.left = rect.left + 'px';
                        eventTooltip.style.top = (rect.top + rect.height + 10) + 'px';
                        eventTooltip.style.display = 'block';
                    }
                });
                
                day.addEventListener('mouseleave', function() {
                    eventTooltip.style.display = 'none';
                });
            });
        }
    }

    // Past events hover animation
    const pastEvents = document.querySelectorAll('.past-event');
    
    pastEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
        });
    });

    // Annual Event Cards Animation
    const annualEventCards = document.querySelectorAll('.annual-event-card');
    
    annualEventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const icon = this.querySelector('.annual-event-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const icon = this.querySelector('.annual-event-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Event Registration Form Validation
    const eventForm = document.getElementById('event-registration-form');
    const participantType = document.getElementById('participant-type');
    const studentDetails = document.getElementById('student-details');
    
    if (eventForm && participantType && studentDetails) {
        // Toggle student details based on participant type
        participantType.addEventListener('change', function() {
            if (this.value === 'student') {
                studentDetails.style.display = 'block';
                slideDown(studentDetails, 500);
            } else {
                slideUp(studentDetails, 500);
            }
        });
        
        // Form validation
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightField(field, true);
                } else {
                    highlightField(field, false);
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    highlightField(emailField, true);
                }
            }
            
            if (isValid) {
                // Success notification
                showNotification('Registration successful! We will contact you with further details.', 'success');
                this.reset();
            } else {
                // Error notification
                showNotification('Please fill all required fields correctly.', 'error');
            }
        });
        
        // Helper function to highlight invalid fields
        function highlightField(field, isError) {
            if (isError) {
                field.style.borderColor = 'red';
                field.style.backgroundColor = '#fff0f0';
            } else {
                field.style.borderColor = '#eee';
                field.style.backgroundColor = '#fff';
            }
        }
        
        // Helper function for slide animations
        function slideDown(element, duration) {
            element.style.display = 'block';
            element.style.overflow = 'hidden';
            element.style.height = '0px';
            
            const targetHeight = element.scrollHeight;
            let progress = 0;
            const interval = 10;
            const increment = interval / duration;
            
            const timer = setInterval(function() {
                progress += increment;
                element.style.height = (progress * targetHeight) + 'px';
                
                if (progress >= 1) {
                    clearInterval(timer);
                    element.style.height = 'auto';
                }
            }, interval);
        }
        
        function slideUp(element, duration) {
            element.style.overflow = 'hidden';
            const height = element.offsetHeight;
            
            let progress = 1;
            const interval = 10;
            const decrement = interval / duration;
            
            const timer = setInterval(function() {
                progress -= decrement;
                element.style.height = (progress * height) + 'px';
                
                if (progress <= 0) {
                    clearInterval(timer);
                    element.style.display = 'none';
                }
            }, interval);
        }
        
        // Notification function
        function showNotification(message, type) {
            // Create notification element if it doesn't exist
            let notification = document.querySelector('.notification');
            
            if (!notification) {
                notification = document.createElement('div');
                notification.className = 'notification';
                document.body.appendChild(notification);
                
                // Add styles
                const style = document.createElement('style');
                style.textContent = `
                    .notification {
                        position: fixed;
                        top: -100px;
                        left: 50%;
                        transform: translateX(-50%);
                        padding: 1.5rem 3rem;
                        border-radius: 5px;
                        color: white;
                        font-size: 1.6rem;
                        z-index: 9999;
                        transition: top 0.5s ease;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                    }
                    .notification.success {
                        background-color: #4CAF50;
                    }
                    .notification.error {
                        background-color: #F44336;
                    }
                    .notification.show {
                        top: 20px;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Set notification content and type
            notification.textContent = message;
            notification.className = `notification ${type}`;
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Hide notification after delay
            setTimeout(() => {
                notification.classList.remove('show');
                
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 5000);
        }
    }

    // Featured event pulsating effect
    const featuredEvent = document.querySelector('.event-card.featured');
    
    if (featuredEvent) {
        setInterval(() => {
            featuredEvent.classList.toggle('pulse');
        }, 2000);
        
        // Add pulse animation style
        const style = document.createElement('style');
        style.textContent = `
            .event-card.featured.pulse {
                box-shadow: 0 0 0 rgba(154, 53, 209, 0.4);
                animation: featuredPulse 2s infinite;
            }
            @keyframes featuredPulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(154, 53, 209, 0.4);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(154, 53, 209, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(154, 53, 209, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Gallery placeholder hover effect
    const galleryPlaceholders = document.querySelectorAll('.gallery-placeholder');
    
    galleryPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.background = '#d1d1d1';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '#666';
            }
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.background = '#eee';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '#999';
            }
        });
    });

    // Countdown timer for upcoming events (if needed)
    const countdownElements = document.querySelectorAll('.event-countdown');
    
    if (countdownElements.length > 0) {
        countdownElements.forEach(countdown => {
            const targetDate = new Date(countdown.getAttribute('data-date')).getTime();
            
            const countdownInterval = setInterval(function() {
                const now = new Date().getTime();
                const distance = targetDate - now;
                
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    countdown.innerHTML = "Event has started!";
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                countdown.innerHTML = `
                    <span>${days}d</span> 
                    <span>${hours}h</span> 
                    <span>${minutes}m</span> 
                    <span>${seconds}s</span>
                `;
            }, 1000);
        });
    }
});
