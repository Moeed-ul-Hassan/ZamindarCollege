document.addEventListener('DOMContentLoaded', function() {
    // Modal Handling
    const openSubmissionFormBtn = document.getElementById('open-submission-form');
    const photoSubmissionModal = document.getElementById('photo-submission-modal');
    const modalClose = document.querySelector('.modal-close');
    const photoSubmissionForm = document.getElementById('photo-submission-form');
    const fileUploadBox = document.getElementById('file-upload-box');
    const photoFileInput = document.getElementById('photo-file');
    const selectedFilePreview = document.getElementById('selected-file-preview');
    
    // Open submission modal
    if (openSubmissionFormBtn && photoSubmissionModal) {
        openSubmissionFormBtn.addEventListener('click', function() {
            photoSubmissionModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close submission modal
    if (modalClose && photoSubmissionModal) {
        modalClose.addEventListener('click', function() {
            photoSubmissionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside the modal content
        photoSubmissionModal.addEventListener('click', function(e) {
            if (e.target === photoSubmissionModal) {
                photoSubmissionModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // File upload preview
    if (photoFileInput && fileUploadBox && selectedFilePreview) {
        // Click on box to trigger file input
        fileUploadBox.addEventListener('click', function() {
            photoFileInput.click();
        });
        
        // Display file preview when selected
        photoFileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Please select a valid image file (JPG, JPEG, or PNG)');
                    this.value = '';
                    return;
                }
                
                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File is too large. Maximum size is 5MB.');
                    this.value = '';
                    return;
                }
                
                // Create and display preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    selectedFilePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" class="preview-image">
                        <div class="file-info">
                            <p><strong>File:</strong> ${file.name}</p>
                            <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    `;
                    selectedFilePreview.classList.add('active');
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadBox.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadBox.addEventListener(eventName, function() {
                fileUploadBox.style.borderColor = 'var(--secondary-color)';
                fileUploadBox.style.backgroundColor = '#f0f0f0';
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadBox.addEventListener(eventName, function() {
                fileUploadBox.style.borderColor = 'var(--main-color)';
                fileUploadBox.style.backgroundColor = '#f9f9f9';
            }, false);
        });
        
        fileUploadBox.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Please select a valid image file (JPG, JPEG, or PNG)');
                    return;
                }
                
                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File is too large. Maximum size is 5MB.');
                    return;
                }
                
                // Set the file input value (for form submission)
                photoFileInput.files = dt.files;
                
                // Create and display preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    selectedFilePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" class="preview-image">
                        <div class="file-info">
                            <p><strong>File:</strong> ${file.name}</p>
                            <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    `;
                    selectedFilePreview.classList.add('active');
                };
                reader.readAsDataURL(file);
            }
        }, false);
    }
    
    // Form submission
    if (photoSubmissionForm) {
        photoSubmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create FormData object
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Submit the form data via fetch API
            fetch('/api/submit-photo', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Create success message
                    const successHTML = `
                        <div class="submission-success active">
                            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                            <h2 class="success-message">Photo Submitted Successfully!</h2>
                            <p class="success-details">
                                Thank you for sharing your photo with Zamindar College. 
                                Your submission will be reviewed by our team before being published to the gallery.
                            </p>
                            <button type="button" class="btn close-success-btn">Close</button>
                        </div>
                    `;
                    
                    // Replace form with success message
                    photoSubmissionForm.innerHTML = successHTML;
                    
                    // Add event listener to close button
                    document.querySelector('.close-success-btn').addEventListener('click', function() {
                        photoSubmissionModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Reset form after closing (for next submission)
                        setTimeout(() => {
                            photoSubmissionForm.reset();
                            if (selectedFilePreview) {
                                selectedFilePreview.innerHTML = '';
                                selectedFilePreview.classList.remove('active');
                            }
                            photoSubmissionForm.innerHTML = originalFormHTML;
                            setupFormEventListeners(); // Re-setup event listeners
                        }, 500);
                    });
                    
                } else {
                    // Show error
                    alert('Error: ' + data.message);
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting your photo. Please try again later.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
        
        // Store original form HTML for reset
        const originalFormHTML = photoSubmissionForm.innerHTML;
        
        // Function to setup event listeners after form reset
        function setupFormEventListeners() {
            // Recreate references to new DOM elements
            const newFileUploadBox = document.getElementById('file-upload-box');
            const newPhotoFileInput = document.getElementById('photo-file');
            const newSelectedFilePreview = document.getElementById('selected-file-preview');
            
            // Re-attach event listeners
            if (newFileUploadBox && newPhotoFileInput) {
                newFileUploadBox.addEventListener('click', function() {
                    newPhotoFileInput.click();
                });
                
                // Other event listeners would be reattached here
                // ...
            }
        }
    }
    
    // Gallery Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected filter category
            const selectedFilter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedFilter === 'all' || itemCategory === selectedFilter) {
                    // Show the item with a fade-in animation
                    item.style.opacity = '0';
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    // Hide the item with a fade-out animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Gallery Items Hover Effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            // Show overlay with animation
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.bottom = '0';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            // Hide overlay with animation
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.bottom = '-100%';
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxPlaceholder = document.querySelector('.lightbox-placeholder');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Array to store gallery items for lightbox navigation
    let galleryArray = [];
    let currentIndex = 0;
    
    // Initialize gallery array
    galleryItems.forEach(item => {
        const title = item.querySelector('.overlay-content h3')?.textContent || '';
        const description = item.querySelector('.overlay-content p')?.textContent || '';
        const imagePlaceholder = item.querySelector('.gallery-image-placeholder');
        
        galleryArray.push({
            title: title,
            description: description,
            element: imagePlaceholder.cloneNode(true)
        });
    });
    
    // Click event for full view icons
    document.querySelectorAll('.view-full').forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(index);
        });
    });
    
    // Open lightbox with selected image
    function openLightbox(index) {
        if (index >= 0 && index < galleryArray.length) {
            currentIndex = index;
            
            // Update lightbox content
            updateLightboxContent();
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Update lightbox content based on current index
    function updateLightboxContent() {
        const current = galleryArray[currentIndex];
        
        // Clear previous content
        lightboxPlaceholder.innerHTML = '';
        
        // Clone the image placeholder
        const clonedElement = current.element.cloneNode(true);
        clonedElement.style.height = '100%';
        clonedElement.style.width = '100%';
        lightboxPlaceholder.appendChild(clonedElement);
        
        // Update caption
        lightboxCaption.textContent = `${current.title} - ${current.description}`;
    }
    
    // Close lightbox when clicking the close button
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigate to previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
            updateLightboxContent();
        });
    }
    
    // Navigate to next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryArray.length;
            updateLightboxContent();
        });
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
            updateLightboxContent();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryArray.length;
            updateLightboxContent();
        }
    });

    // Video Gallery Item Hover Animation
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
            
            const icon = this.querySelector('.video-placeholder i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
            
            const icon = this.querySelector('.video-placeholder i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Video play functionality (placeholder)
        item.addEventListener('click', function() {
            const title = this.querySelector('.video-info h3').textContent;
            alert(`Video would play: ${title}`);
        });
    });

    // Submission Steps Hover Effects
    const submissionSteps = document.querySelectorAll('.step');
    
    submissionSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 1rem 2rem rgba(0, 0, 0, .15)';
            
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.background = '#9a35d1';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0.3rem 0.5rem rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.background = '#4e008e';
            }
        });
    });

    // Masonry Layout for Gallery (simplified version)
    function initMasonryLayout() {
        const galleryContainer = document.querySelector('.gallery-container');
        if (!galleryContainer) return;
        
        const columns = getComputedStyle(galleryItems[0]).gridColumnEnd;
        
        if (columns === 'auto' || columns === 'span 1') {
            // If CSS Grid is not handling the layout, apply masonry manually
            const itemWidth = galleryItems[0].offsetWidth;
            const containerWidth = galleryContainer.offsetWidth;
            const columnsCount = Math.floor(containerWidth / itemWidth);
            
            if (columnsCount > 1) {
                const columnHeights = Array(columnsCount).fill(0);
                
                galleryItems.forEach(item => {
                    // Find the column with the minimum height
                    const minHeightColumn = columnHeights.indexOf(Math.min(...columnHeights));
                    
                    // Position the item
                    item.style.position = 'absolute';
                    item.style.top = columnHeights[minHeightColumn] + 'px';
                    item.style.left = (minHeightColumn * itemWidth) + 'px';
                    item.style.width = itemWidth + 'px';
                    
                    // Update the column height
                    columnHeights[minHeightColumn] += item.offsetHeight + 20; // 20px for margin
                });
                
                // Set container height
                galleryContainer.style.height = Math.max(...columnHeights) + 'px';
            }
        }
    }
    
    // Initialize layout after images load
    window.addEventListener('load', initMasonryLayout);
    window.addEventListener('resize', initMasonryLayout);

    // Load more gallery items button (if needed)
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would load more items in a real implementation
            this.textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.textContent = 'No More Items';
                this.disabled = true;
                this.style.background = '#999';
                this.style.cursor = 'default';
            }, 1500);
        });
    }
    
    // Function to fetch and display user submitted photos
    function fetchUserSubmittedPhotos() {
        fetch('/api/get-gallery-photos')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.photos && data.photos.length > 0) {
                    // Get the gallery container
                    const galleryContainer = document.querySelector('.gallery-container');
                    
                    // Create a container for user submitted photos
                    const userPhotoSection = document.createElement('div');
                    userPhotoSection.className = 'user-photos-section';
                    
                    // Add a heading for user submitted photos
                    const userPhotoHeading = document.createElement('h3');
                    userPhotoHeading.className = 'user-photos-heading';
                    userPhotoHeading.textContent = 'Community Submitted Photos';
                    userPhotoHeading.style.marginTop = '3rem';
                    userPhotoHeading.style.fontSize = '2.5rem';
                    userPhotoHeading.style.color = 'var(--main-color)';
                    userPhotoHeading.style.textAlign = 'center';
                    
                    // Add the heading to the gallery before user photos
                    galleryContainer.appendChild(userPhotoHeading);
                    
                    // Add each user photo to the gallery
                    data.photos.forEach(photo => {
                        const photoItem = createGalleryItem(photo);
                        galleryContainer.appendChild(photoItem);
                    });
                    
                    // Re-initialize gallery effects
                    initializeGalleryEffects();
                }
            })
            .catch(error => {
                console.error('Error fetching user submitted photos:', error);
            });
    }
    
    // Create a gallery item from photo data
    function createGalleryItem(photo) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', photo.category || 'user');
        galleryItem.setAttribute('data-aos', 'zoom-in');
        
        // Create gallery image container
        const galleryImage = document.createElement('div');
        galleryImage.className = 'gallery-image';
        
        // Create image element
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.loading = 'lazy';
        
        // Create overlay
        const galleryOverlay = document.createElement('div');
        galleryOverlay.className = 'gallery-overlay';
        
        // Create overlay content
        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';
        
        const title = document.createElement('h3');
        title.textContent = photo.title;
        
        const description = document.createElement('p');
        description.textContent = photo.description;
        
        const submitter = document.createElement('p');
        submitter.className = 'submitter-info';
        submitter.innerHTML = `<em>Submitted by: ${photo.submitter_name}</em>`;
        
        // Create overlay icons
        const overlayIcons = document.createElement('div');
        overlayIcons.className = 'overlay-icons';
        
        const viewFullBtn = document.createElement('span');
        viewFullBtn.className = 'view-full';
        viewFullBtn.innerHTML = '<i class="fas fa-expand"></i>';
        
        // Assemble the elements
        overlayContent.appendChild(title);
        overlayContent.appendChild(description);
        overlayContent.appendChild(submitter);
        
        overlayIcons.appendChild(viewFullBtn);
        
        galleryOverlay.appendChild(overlayContent);
        galleryOverlay.appendChild(overlayIcons);
        
        galleryImage.appendChild(img);
        
        galleryItem.appendChild(galleryImage);
        galleryItem.appendChild(galleryOverlay);
        
        return galleryItem;
    }
    
    // Function to reinitialize gallery effects after adding new items
    function initializeGalleryEffects() {
        // Re-select all gallery items
        const allGalleryItems = document.querySelectorAll('.gallery-item');
        const viewFullBtns = document.querySelectorAll('.view-full');
        
        // Recreate gallery array for lightbox
        let galleryArray = [];
        allGalleryItems.forEach(item => {
            const title = item.querySelector('.overlay-content h3')?.textContent || '';
            const description = item.querySelector('.overlay-content p')?.textContent || '';
            const img = item.querySelector('.gallery-image img');
            
            if (img) {
                galleryArray.push({
                    title: title,
                    description: description,
                    src: img.src
                });
            } else {
                const imagePlaceholder = item.querySelector('.gallery-image-placeholder');
                galleryArray.push({
                    title: title,
                    description: description,
                    element: imagePlaceholder ? imagePlaceholder.cloneNode(true) : null
                });
            }
        });
        
        // Hover effects for new items
        allGalleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
                
                // Show overlay with animation
                const overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.bottom = '0';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
                
                // Hide overlay with animation
                const overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.bottom = '-100%';
                }
            });
        });
        
        // Set up lightbox for all images
        viewFullBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Create our own simplified lightbox opening functionality
                const lightbox = document.getElementById('gallery-lightbox');
                const lightboxCaption = document.querySelector('.lightbox-caption');
                const lightboxPlaceholder = document.querySelector('.lightbox-placeholder');
                
                if (lightbox && lightboxPlaceholder) {
                    // Get the gallery item associated with this button
                    const item = allGalleryItems[index];
                    const title = item.querySelector('.overlay-content h3')?.textContent || '';
                    const description = item.querySelector('.overlay-content p')?.textContent || '';
                    
                    // Clear previous content
                    lightboxPlaceholder.innerHTML = '';
                    
                    // Add image to lightbox if it exists
                    const img = item.querySelector('.gallery-image img');
                    if (img) {
                        const lightboxImg = document.createElement('img');
                        lightboxImg.src = img.src;
                        lightboxImg.alt = title;
                        lightboxImg.style.maxWidth = '100%';
                        lightboxImg.style.maxHeight = '100%';
                        lightboxPlaceholder.appendChild(lightboxImg);
                    } else {
                        // Otherwise try to use the placeholder
                        const imagePlaceholder = item.querySelector('.gallery-image-placeholder');
                        if (imagePlaceholder) {
                            const clonedElement = imagePlaceholder.cloneNode(true);
                            clonedElement.style.height = '100%';
                            clonedElement.style.width = '100%';
                            lightboxPlaceholder.appendChild(clonedElement);
                        }
                    }
                    
                    // Update caption
                    if (lightboxCaption) {
                        lightboxCaption.textContent = `${title} - ${description}`;
                    }
                    
                    // Show lightbox
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Fetch user submitted photos after a short delay
    setTimeout(fetchUserSubmittedPhotos, 1000);
});
