document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }

    // Search Toggle
    let searchIcon = document.querySelector('#search-icon');
    let searchForm = document.querySelector('.search-form');

    searchIcon.onclick = () => {
        searchForm.classList.toggle('active');
    }

    // Close menu and search when scrolling
    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    }

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
        const currentTransform = notice.style.transform;
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

    // Animate stats counter
    const statBoxes = document.querySelectorAll('.stat-box h4');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animateCount(element) {
        const target = parseInt(element.textContent.replace(/,/g, '').replace(/\+/g, ''));
        let count = 0;
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const countIncrement = Math.ceil(target / totalFrames);
        
        const timer = setInterval(() => {
            count += countIncrement;
            
            if (count >= target) {
                element.textContent = target.toLocaleString() + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = count.toLocaleString();
            }
        }, frameDuration);
    }
    
    let animated = false;
    
    function checkAndAnimate() {
        if (!animated && isInViewport(document.querySelector('.about-stats'))) {
            statBoxes.forEach(box => {
                animateCount(box);
            });
            animated = true;
        }
    }
    
    // Check on load and scroll
    window.addEventListener('scroll', checkAndAnimate);
    checkAndAnimate(); // Check on page load
});