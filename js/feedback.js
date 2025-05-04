document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };

    // Search Toggle
    let searchIcon = document.querySelector('#search-icon');
    let searchForm = document.querySelector('.search-form');

    searchIcon.onclick = () => {
        searchForm.classList.toggle('active');
    };

    // Close menu and search when scrolling
    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };

    // Emoji Rating Functionality
    const emojiRatings = document.querySelectorAll('.emoji-rating');
    const ratingValues = {
        'teaching-rating': 0,
        'course-rating': 0,
        'facilities-rating': 0,
        'support-rating': 0,
        'overall-rating': 0
    };

    // Initialize emoji ratings
    emojiRatings.forEach(rating => {
        const emojiOptions = rating.querySelectorAll('.emoji-option');
        const ratingId = rating.id;
        const hiddenInput = document.getElementById(`${ratingId}-value`);
        
        emojiOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options in this rating
                emojiOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to this option
                this.classList.add('selected');
                
                // Get the value of this option and update hidden input
                const value = this.getAttribute('data-value');
                hiddenInput.value = value;
                ratingValues[ratingId] = parseInt(value);
                
                // Update the rating summary
                updateRatingSummary();
                
                // Apply a pulse animation to the selected emoji
                const emoji = this.querySelector('.emoji');
                emoji.style.animation = 'none';
                setTimeout(() => {
                    emoji.style.animation = 'pulse 0.5s';
                }, 10);
            });
            
            // Add hover effects
            option.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'translateY(-5px)';
                    this.querySelector('.emoji').style.transform = 'scale(1.2)';
                }
            });
            
            option.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'translateY(0)';
                    this.querySelector('.emoji').style.transform = 'scale(1)';
                }
            });
        });
    });
    
    // Update the rating summary section
    function updateRatingSummary() {
        const summaryContent = document.querySelector('.summary-content');
        
        // Check if all ratings are selected
        const allRated = Object.values(ratingValues).every(value => value > 0);
        
        if (allRated) {
            // Calculate average rating
            const sum = Object.values(ratingValues).reduce((total, value) => total + value, 0);
            const average = sum / Object.keys(ratingValues).length;
            
            // Create HTML for the summary
            let summaryHTML = '';
            
            // Add individual ratings
            for (const [key, value] of Object.entries(ratingValues)) {
                const label = key.replace('-rating', '').split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                let emojiDisplay;
                switch (value) {
                    case 1: emojiDisplay = '😡'; break;
                    case 2: emojiDisplay = '😕'; break;
                    case 3: emojiDisplay = '😐'; break;
                    case 4: emojiDisplay = '🙂'; break;
                    case 5: emojiDisplay = '😍'; break;
                    default: emojiDisplay = '❓';
                }
                
                summaryHTML += `
                    <div class="summary-item">
                        <span class="summary-emoji">${emojiDisplay}</span>
                        <span class="summary-text">${label}: ${getRatingLabel(value)}</span>
                    </div>
                `;
            }
            
            // Add average rating
            const avgEmojiDisplay = getAverageEmoji(average);
            summaryHTML += `
                <div class="summary-item" style="background: #f0f8ff; border-top: 3px solid var(--main-color); margin-top: 1rem; width: 100%; justify-content: center;">
                    <span class="summary-emoji">${avgEmojiDisplay}</span>
                    <span class="summary-text" style="font-weight: 600;">Average Rating: ${average.toFixed(1)}</span>
                </div>
            `;
            
            summaryContent.innerHTML = summaryHTML;
        } else {
            summaryContent.innerHTML = '<p>Please select ratings for all categories above.</p>';
        }
    }
    
    // Helper functions for the emoji ratings
    function getRatingLabel(value) {
        switch (value) {
            case 1: return 'Poor';
            case 2: return 'Fair';
            case 3: return 'Okay';
            case 4: return 'Good';
            case 5: return 'Excellent';
            default: return 'Not Rated';
        }
    }
    
    function getAverageEmoji(average) {
        if (average < 1.5) return '😡';
        else if (average < 2.5) return '😕';
        else if (average < 3.5) return '😐';
        else if (average < 4.5) return '🙂';
        else return '😍';
    }
    
    // Form Validation and Submission
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const submitAnotherBtn = document.getElementById('submit-another');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Perform validation
            if (validateForm()) {
                // In a real application, this would submit data to a server
                // For demo, show thank you message
                feedbackForm.style.opacity = '0';
                setTimeout(() => {
                    feedbackForm.style.display = 'none';
                    thankYouMessage.style.display = 'flex';
                    setTimeout(() => {
                        thankYouMessage.style.opacity = '1';
                    }, 50);
                }, 500);
            }
        });
    }
    
    // Form reset functionality
    const resetFormBtn = document.getElementById('reset-form');
    
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            // Clear form fields
            feedbackForm.reset();
            
            // Reset emoji ratings
            emojiRatings.forEach(rating => {
                const options = rating.querySelectorAll('.emoji-option');
                options.forEach(opt => opt.classList.remove('selected'));
                
                const ratingId = rating.id;
                document.getElementById(`${ratingId}-value`).value = '';
                ratingValues[ratingId] = 0;
            });
            
            // Reset rating summary
            document.querySelector('.summary-content').innerHTML = '<p>Please select ratings for all categories above.</p>';
            
            // Clear error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
        });
    }
    
    // Submit another response
    if (submitAnotherBtn) {
        submitAnotherBtn.addEventListener('click', function() {
            thankYouMessage.style.opacity = '0';
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
                feedbackForm.reset();
                
                // Reset emoji ratings
                emojiRatings.forEach(rating => {
                    const options = rating.querySelectorAll('.emoji-option');
                    options.forEach(opt => opt.classList.remove('selected'));
                    
                    const ratingId = rating.id;
                    document.getElementById(`${ratingId}-value`).value = '';
                    ratingValues[ratingId] = 0;
                });
                
                // Reset rating summary
                document.querySelector('.summary-content').innerHTML = '<p>Please select ratings for all categories above.</p>';
                
                feedbackForm.style.display = 'block';
                setTimeout(() => {
                    feedbackForm.style.opacity = '1';
                }, 50);
            }, 500);
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'roll-number', 'program', 'semester'];
        const requiredRatings = ['teaching-rating-value', 'course-rating-value', 'facilities-rating-value', 'support-rating-value', 'overall-rating-value'];
        
        // Validate required fields
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            const errorElement = input.nextElementSibling;
            
            if (!input.value.trim()) {
                errorElement.textContent = 'This field is required';
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                errorElement.textContent = '';
                input.style.borderColor = '#ddd';
            }
        });
        
        // Validate ratings
        requiredRatings.forEach(rating => {
            const input = document.getElementById(rating);
            const errorElement = input.nextElementSibling;
            
            if (!input.value) {
                errorElement.textContent = 'Please select a rating';
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        });
        
        return isValid;
    }
    
    // Form field interaction effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--main-color)';
            this.style.boxShadow = '0 0 0.5rem rgba(78, 0, 142, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add pulse animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
});