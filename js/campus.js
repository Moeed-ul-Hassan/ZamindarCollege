document.addEventListener('DOMContentLoaded', function() {
    // Interactive Campus Map Functionality
    const mapHotspots = document.querySelectorAll('.map-hotspot');
    const buildingInfos = document.querySelectorAll('.building-info');
    
    // Initialize by showing the first building info
    if (buildingInfos.length > 0) {
        buildingInfos[0].classList.add('active');
    }
    
    mapHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const building = this.getAttribute('data-building');
            
            // Hide all building info sections
            buildingInfos.forEach(info => {
                info.classList.remove('active');
            });
            
            // Show the selected building info
            const selectedInfo = document.getElementById(`${building}-info`);
            if (selectedInfo) {
                selectedInfo.classList.add('active');
            }
            
            // Highlight the selected hotspot
            mapHotspots.forEach(spot => {
                spot.style.background = '#9a35d1';
                spot.style.transform = 'scale(1)';
            });
            
            this.style.background = '#4e008e';
            this.style.transform = 'scale(1.2)';
        });
    });

    // Facility Cards Hover Animation
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const icon = this.querySelector('.facility-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const icon = this.querySelector('.facility-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Club Cards Hover Effects
    const clubCards = document.querySelectorAll('.club-card');
    
    clubCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.background = '#9a35d1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.background = '#4e008e';
            }
        });
    });

    // Hostel Gallery Placeholder Effects
    const hostelPlaceholders = document.querySelectorAll('.hostel-image-placeholder');
    
    hostelPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = '#9a35d1';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#4e008e';
        });
    });

    // Sports Facilities Card Animation
    const sportsCards = document.querySelectorAll('.sports-card');
    
    sportsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const icon = this.querySelector('.sports-icon i');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const icon = this.querySelector('.sports-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });

    // Safety Features Hover Effect
    const safetyFeatures = document.querySelectorAll('.safety-feature');
    
    safetyFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.background = '#f0e6f8';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '#4e008e';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = '#f9f9f9';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '#9a35d1';
            }
        });
    });

    // Interactive Tour Functionality (Virtual Tour Simulation)
    const tourMapPlaceholder = document.querySelector('.map-placeholder');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (tourMapPlaceholder && mapOverlay) {
        // Toggle map view button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-view-btn';
        toggleButton.textContent = 'Toggle Map View';
        toggleButton.style.position = 'absolute';
        toggleButton.style.bottom = '1rem';
        toggleButton.style.left = '50%';
        toggleButton.style.transform = 'translateX(-50%)';
        toggleButton.style.padding = '1rem 2rem';
        toggleButton.style.background = '#4e008e';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5rem';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.zIndex = '50';
        
        tourMapPlaceholder.appendChild(toggleButton);
        
        let mapView = false;
        
        toggleButton.addEventListener('click', function() {
            mapView = !mapView;
            
            if (mapView) {
                tourMapPlaceholder.style.opacity = '0.3';
                mapOverlay.style.opacity = '1';
                this.textContent = 'Show 3D View';
            } else {
                tourMapPlaceholder.style.opacity = '1';
                mapOverlay.style.opacity = '0.7';
                this.textContent = 'Show Map View';
            }
        });
    }

    // Student Testimonial Slider (if multiple testimonials)
    const testimonials = document.querySelectorAll('.student-testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Create navigation buttons
        const testimonialContainer = testimonials[0].parentElement;
        
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        navButtons.style.display = 'flex';
        navButtons.style.justifyContent = 'center';
        navButtons.style.marginTop = '2rem';
        navButtons.style.gap = '1rem';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'testimonial-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.style.width = '4rem';
        prevBtn.style.height = '4rem';
        prevBtn.style.borderRadius = '50%';
        prevBtn.style.background = '#4e008e';
        prevBtn.style.color = '#fff';
        prevBtn.style.border = 'none';
        prevBtn.style.cursor = 'pointer';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'testimonial-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.style.width = '4rem';
        nextBtn.style.height = '4rem';
        nextBtn.style.borderRadius = '50%';
        nextBtn.style.background = '#4e008e';
        nextBtn.style.color = '#fff';
        nextBtn.style.border = 'none';
        nextBtn.style.cursor = 'pointer';
        
        navButtons.appendChild(prevBtn);
        navButtons.appendChild(nextBtn);
        testimonialContainer.appendChild(navButtons);
        
        // Show only the first testimonial initially
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Navigation functionality
        prevBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
        
        nextBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            if (target !== '#' && document.querySelector(target)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(target);
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
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

    // Hostel application button pulsate effect
    const hostelBtn = document.querySelector('.hostel-content .btn');
    
    if (hostelBtn) {
        setInterval(() => {
            hostelBtn.classList.toggle('pulsate');
        }, 1500);
        
        // Add pulsate style
        const style = document.createElement('style');
        style.textContent = `
            .pulsate {
                animation: btnPulsate 1s;
            }
            @keyframes btnPulsate {
                0% {
                    box-shadow: 0 0 0 0 rgba(78, 0, 142, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(78, 0, 142, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(78, 0, 142, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }
});
