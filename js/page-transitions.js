document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transition effects
    initPageTransitions();
});

function initPageTransitions() {
    // Add the transition-container to the body if it doesn't exist
    if (!document.querySelector('.transition-container')) {
        const transitionContainer = document.createElement('div');
        transitionContainer.className = 'transition-container';
        document.body.appendChild(transitionContainer);
    }

    // Get all links that lead to internal pages
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="contact.html"], a[href^="academics.html"], a[href^="admissions.html"], a[href^="student_resources.html"], a[href^="news_events.html"], a[href^="gallery.html"]');
    
    // Add click event listeners to all internal links
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal navigation
            if (this.href.indexOf(window.location.hostname) > -1 || this.href.startsWith('/') || this.href.startsWith('./') || this.href.startsWith('../')) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                
                // Trigger page out animation
                document.body.classList.add('page-transitioning-out');
                
                // After animation completes, navigate to the new page
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500); // This should match the CSS animation duration
            }
        });
    });

    // Check if this is a fresh page load
    if (sessionStorage.getItem('pageTransitioning') === 'true') {
        // Reset the flag
        sessionStorage.setItem('pageTransitioning', 'false');
        
        // Apply page in animation
        document.body.classList.add('page-transitioning-in');
        
        // Remove the class after animation completes
        setTimeout(() => {
            document.body.classList.remove('page-transitioning-in');
        }, 500); // This should match the CSS animation duration
    } else {
        // First visit, set the flag for next navigation
        sessionStorage.setItem('pageTransitioning', 'true');
    }
}

// When navigating back/forward through history
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (back/forward button)
        document.body.classList.remove('page-transitioning-out');
        document.body.classList.add('page-transitioning-in');
        
        setTimeout(() => {
            document.body.classList.remove('page-transitioning-in');
        }, 500);
    }
});