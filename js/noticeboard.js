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

    // Notice Category Filter
    const categorySelect = document.getElementById('notice-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            notices.forEach(notice => {
                if (selectedCategory === 'all' || notice.getAttribute('data-category') === selectedCategory) {
                    notice.style.display = 'block';
                } else {
                    notice.style.display = 'none';
                }
            });
        });
    }
    
    // Notice Search 
    const searchInput = document.getElementById('notice-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', searchNotices);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchNotices();
            }
        });
    }
    
    function searchNotices() {
        const searchTerm = searchInput.value.toLowerCase();
        
        notices.forEach(notice => {
            const noticeTitle = notice.querySelector('h4').textContent.toLowerCase();
            const noticeContent = notice.querySelector('p:not(.notice-date)').textContent.toLowerCase();
            
            if (noticeTitle.includes(searchTerm) || noticeContent.includes(searchTerm)) {
                notice.style.display = 'block';
            } else {
                notice.style.display = 'none';
            }
        });
    }
    
    // Notice Preview Functionality
    const previewBtn = document.getElementById('preview-notice');
    const previewContainer = document.getElementById('notice-preview');
    const closePreviewBtn = document.getElementById('close-preview');
    
    if (previewBtn && previewContainer) {
        previewBtn.addEventListener('click', function() {
            // Get form values
            const title = document.getElementById('notice-title').value;
            const category = document.getElementById('notice-category-input').value;
            const content = document.getElementById('notice-content').value;
            const linkUrl = document.getElementById('notice-link').value;
            const priority = document.getElementById('notice-urgent').value;
            
            // Update preview elements
            document.getElementById('preview-title').textContent = title || 'Notice Title';
            document.getElementById('preview-content').textContent = content || 'Notice content will appear here.';
            
            // Set badge text and color
            const previewBadge = document.getElementById('preview-badge');
            previewBadge.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            // Handle link
            const previewLink = document.getElementById('preview-link');
            if (linkUrl) {
                previewLink.href = linkUrl;
                previewLink.textContent = 'View More';
                previewLink.style.display = 'inline-block';
            } else {
                previewLink.style.display = 'none';
            }
            
            // Handle urgent styling
            const previewCard = document.getElementById('preview-notice-card');
            if (priority === 'urgent') {
                previewCard.classList.add('urgent');
                previewBadge.textContent = 'Urgent';
            } else {
                previewCard.classList.remove('urgent');
            }
            
            // Show preview
            previewContainer.style.display = 'block';
        });
        
        // Close preview
        if (closePreviewBtn) {
            closePreviewBtn.addEventListener('click', function() {
                previewContainer.style.display = 'none';
            });
        }
    }
    
    // Archive Filters
    const archiveMonthSelect = document.getElementById('archive-month');
    const archiveYearSelect = document.getElementById('archive-year');
    const archiveSearchBtn = document.getElementById('archive-search-btn');
    
    if (archiveSearchBtn) {
        archiveSearchBtn.addEventListener('click', function() {
            // This would typically make an AJAX request to fetch archived notices
            // For demo purposes, we'll just show an alert
            
            const month = archiveMonthSelect.value;
            const year = archiveYearSelect.value;
            
            alert(`Searching archives for ${month} ${year}. In a production environment, this would fetch archived notices from the server.`);
        });
    }
    
    // Pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real application, this would load the next page of notices
            // For demo purposes, we'll just scroll to top of notices section
            document.querySelector('.notice-board').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add Notice Form Submission
    const addNoticeForm = document.getElementById('add-notice-form');
    
    if (addNoticeForm) {
        addNoticeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would submit the form data to the server
            // For demo purposes, we'll just show an alert
            alert('Notice submitted successfully! In a production environment, this would add a new notice to the board.');
            
            // Reset the form
            this.reset();
        });
    }
    
    // Add random shadows to notices for more realistic 3D effect
    notices.forEach(notice => {
        const randomX = (Math.random() * 0.3) + 0.2; // Between 0.2 and 0.5
        const randomY = (Math.random() * 0.3) + 0.2; // Between 0.2 and 0.5
        const randomBlur = (Math.random() * 0.3) + 0.6; // Between 0.6 and 0.9
        
        notice.style.boxShadow = `${randomX}rem ${randomY}rem ${randomBlur}rem rgba(0, 0, 0, 0.2)`;
    });
});