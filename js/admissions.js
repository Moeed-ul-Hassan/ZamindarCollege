document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formSections = document.querySelectorAll('.admission-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all form sections
            formSections.forEach(section => section.classList.remove('active-form'));
            formSections.forEach(section => section.style.display = 'none');
            
            // Show the selected form section
            const targetId = this.getAttribute('data-target');
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.style.display = 'block';
                setTimeout(() => {
                    targetForm.classList.add('active-form');
                }, 50);
            }
        });
    });
    
    // Info card hover animation
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, .2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 .5rem 1.5rem rgba(0, 0, 0, .1)';
        });
    });

    // Scholarship card hover effect with color change
    const scholarshipCards = document.querySelectorAll('.scholarship-card');
    
    scholarshipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = '#4e008e';
            this.style.transform = 'translateY(-10px)';
            
            // Change text and icon color to white
            this.querySelectorAll('h3, p').forEach(element => {
                element.style.color = '#fff';
            });
            
            this.querySelector('.scholarship-icon i').style.color = '#fff';
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
            
            this.querySelector('.scholarship-icon i').style.color = '#4e008e';
        });
    });

    // Form validation and dynamic fields
    // Intermediate form percentage calculation
    const intMatricMarksInput = document.getElementById('int-matricMarks');
    const intMatricTotalInput = document.getElementById('int-matricTotal');
    const intMatricPercentageInput = document.getElementById('int-matricPercentage');
    
    // BS form percentage calculation
    const bsIntermediateMarksInput = document.getElementById('bs-intermediateMarks');
    const bsIntermediateTotalInput = document.getElementById('bs-intermediateTotal');
    const bsIntermediatePercentageInput = document.getElementById('bs-intermediatePercentage');
    
    // Function to calculate percentage
    function calculatePercentage(marksInput, totalInput, percentageInput) {
        const marks = parseFloat(marksInput.value) || 0;
        const total = parseFloat(totalInput.value) || 1;
        
        if (marks > 0 && total > 0) {
            const percentage = (marks / total * 100).toFixed(2);
            percentageInput.value = percentage + '%';
        } else {
            percentageInput.value = '';
        }
    }
    
    // Add event listeners for Intermediate form marks inputs
    if (intMatricMarksInput && intMatricTotalInput && intMatricPercentageInput) {
        intMatricMarksInput.addEventListener('input', function() {
            calculatePercentage(intMatricMarksInput, intMatricTotalInput, intMatricPercentageInput);
        });
        
        intMatricTotalInput.addEventListener('input', function() {
            calculatePercentage(intMatricMarksInput, intMatricTotalInput, intMatricPercentageInput);
        });
    }
    
    // Add event listeners for BS form marks inputs
    if (bsIntermediateMarksInput && bsIntermediateTotalInput && bsIntermediatePercentageInput) {
        bsIntermediateMarksInput.addEventListener('input', function() {
            calculatePercentage(bsIntermediateMarksInput, bsIntermediateTotalInput, bsIntermediatePercentageInput);
        });
        
        bsIntermediateTotalInput.addEventListener('input', function() {
            calculatePercentage(bsIntermediateMarksInput, bsIntermediateTotalInput, bsIntermediatePercentageInput);
        });
    }
    
    // Format CNIC inputs
    const cnicInputs = document.querySelectorAll('input[id$="-cnic"], input[id$="-fatherCnic"]');
    cnicInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            let formattedValue = '';
            
            if (value.length <= 5) {
                formattedValue = value;
            } else if (value.length <= 12) {
                formattedValue = value.slice(0, 5) + '-' + value.slice(5);
            } else {
                formattedValue = value.slice(0, 5) + '-' + value.slice(5, 12) + '-' + value.slice(12, 13);
            }
            
            e.target.value = formattedValue;
        });
    });
    
    // Add automatic uppercase transformation for name fields
    const uppercaseInputs = document.querySelectorAll('input[id$="-fullname"], input[id$="-fathername"]');
    uppercaseInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    });
    
    // Custom file upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const fileNameElement = document.getElementById(input.id + 'Name');
        const fileUploadParent = input.closest('.file-upload');
        
        input.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                if (fileNameElement) {
                    fileNameElement.textContent = fileName;
                }
                
                if (fileUploadParent) {
                    fileUploadParent.classList.add('has-file');
                }
            } else {
                if (fileNameElement) {
                    fileNameElement.textContent = '';
                }
                
                if (fileUploadParent) {
                    fileUploadParent.classList.remove('has-file');
                }
            }
        });
    });
    
    // Program level selection handling
    const programLevelSelect = document.getElementById('programLevel');
    const intermediatePrograms = document.getElementById('intermediate-programs');
    const bachelorPrograms = document.getElementById('bachelor-programs');
    const feeReceiptLabel = document.querySelector('label[for="paymentReceipt"]');
    
    if (programLevelSelect) {
        programLevelSelect.addEventListener('change', function() {
            // Hide all program groups first
            const programGroups = document.querySelectorAll('.program-group');
            programGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            // Show the selected program group
            if (this.value === 'intermediate') {
                if (intermediatePrograms) {
                    intermediatePrograms.style.display = 'block';
                }
                if (feeReceiptLabel) {
                    feeReceiptLabel.textContent = 'Fee Payment Receipt (4000 Rs)';
                }
            } else if (this.value === 'bachelor') {
                if (bachelorPrograms) {
                    bachelorPrograms.style.display = 'block';
                }
                if (feeReceiptLabel) {
                    feeReceiptLabel.textContent = 'Fee Payment Receipt (6000 Rs)';
                }
            }
        });
    }
    
    // Update required fields based on program level
    const updateRequiredFields = () => {
        const programLevel = programLevelSelect.value;
        
        // Get all intermediate and bachelor program fields
        const intermediateFields = document.querySelectorAll('#intermediate-programs select');
        const bachelorFields = document.querySelectorAll('#bachelor-programs select, #bachelor-programs input');
        
        // Remove required attribute from all program-specific fields
        intermediateFields.forEach(field => {
            field.removeAttribute('required');
        });
        
        bachelorFields.forEach(field => {
            field.removeAttribute('required');
        });
        
        // Add required attribute to the fields of the selected program level
        if (programLevel === 'intermediate') {
            document.getElementById('intermediateProgram').setAttribute('required', '');
            document.getElementById('intermediateGroup').setAttribute('required', '');
        } else if (programLevel === 'bachelor') {
            document.getElementById('bachelorProgram').setAttribute('required', '');
            document.getElementById('bachelorSemester').setAttribute('required', '');
            document.getElementById('bachelorYear').setAttribute('required', '');
        }
    };
    
    if (programLevelSelect) {
        programLevelSelect.addEventListener('change', updateRequiredFields);
    }
    const admissionForm = document.querySelector('form');
    const studentDetails = document.getElementById('student-details');
    const participantType = document.getElementById('participant-type');
    
    // Show/hide student details based on participant type
    if (participantType && studentDetails) {
        participantType.addEventListener('change', function() {
            if (this.value === 'student') {
                studentDetails.style.display = 'block';
            } else {
                studentDetails.style.display = 'none';
            }
        });
    }
    
    // Utility function to show notifications
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
        
        return notification;
    }
    
    // Helper function to collect form data
    function collectFormData(form) {
        const formData = {};
        
        // Get regular inputs
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type !== 'file' && input.type !== 'submit') {
                formData[input.name || input.id] = input.value;
            }
        });
        
        // Get radio buttons
        const radioGroups = {};
        form.querySelectorAll('input[type="radio"]').forEach(radio => {
            if (!radioGroups[radio.name]) {
                radioGroups[radio.name] = form.querySelector(`input[name="${radio.name}"]:checked`);
            }
        });
        
        Object.keys(radioGroups).forEach(name => {
            if (radioGroups[name]) {
                formData[name] = radioGroups[name].value;
            }
        });
        
        // Get checkboxes as array
        const checkboxGroups = {};
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (!checkboxGroups[checkbox.name]) {
                checkboxGroups[checkbox.name] = [];
            }
            if (checkbox.checked) {
                checkboxGroups[checkbox.name].push(checkbox.value);
            }
        });
        
        Object.keys(checkboxGroups).forEach(name => {
            formData[name] = checkboxGroups[name];
        });
        
        // Add information about document uploads
        const documents = [];
        form.querySelectorAll('input[type="file"]').forEach(fileInput => {
            if (fileInput.files && fileInput.files.length > 0) {
                const fieldName = fileInput.name || fileInput.id;
                documents.push(fieldName);
            }
        });
        formData.documents = documents;
        
        return formData;
    }
    
    // Function to submit form data to server
    function submitFormToServer(formData, formType) {
        // Show loading state
        const loadingNotification = showNotification('Submitting your application...', 'info');
        
        // Add program level based on form type
        formData.programLevel = formType === 'intermediate' ? 'intermediate' : 'bachelor';
        
        // Send the data to the server
        fetch('/api/submit-admission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification(`${formType === 'intermediate' ? 'Intermediate' : 'BS program'} application submitted successfully! Your submission ID is: ${data.submission_id}`, 'success');
            } else {
                showNotification(`Error: ${data.message}`, 'error');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showNotification('An error occurred while submitting your application. Please try again later.', 'error');
        });
    }
    
    // Form validation before submission - Intermediate Form
    const intermediateForm = document.getElementById('intermediate-admission-form');
    if (intermediateForm) {
        intermediateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = intermediateForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#eee';
                }
            });
            
            if (isValid) {
                // Collect form data
                const formData = collectFormData(intermediateForm);
                
                // Submit data to server
                submitFormToServer(formData, 'intermediate');
                
                // Reset form
                intermediateForm.reset();
                
                // Reset file upload indicators
                const fileUploads = intermediateForm.querySelectorAll('.file-upload');
                fileUploads.forEach(upload => {
                    upload.classList.remove('has-file');
                    const fileName = upload.querySelector('.file-name');
                    if (fileName) fileName.textContent = '';
                });
            } else {
                // Show error message
                showNotification('Please fill all required fields correctly.', 'error');
            }
        });
    }
    
    // Form validation before submission - BS Form
    const bsForm = document.getElementById('bs-admission-form');
    if (bsForm) {
        bsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = bsForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#eee';
                }
            });
            
            if (isValid) {
                // Collect form data
                const formData = collectFormData(bsForm);
                
                // Submit data to server
                submitFormToServer(formData, 'bachelor');
                
                // Reset form
                bsForm.reset();
                
                // Reset file upload indicators
                const fileUploads = bsForm.querySelectorAll('.file-upload');
                fileUploads.forEach(upload => {
                    upload.classList.remove('has-file');
                    const fileName = upload.querySelector('.file-name');
                    if (fileName) fileName.textContent = '';
                });
            } else {
                // Show error message
                showNotification('Please fill all required fields correctly.', 'error');
            }
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Fee calculator
    const feeCalculator = document.getElementById('fee-calculator');
    const programSelect = document.getElementById('program');
    const feeResult = document.getElementById('fee-result');
    
    if (feeCalculator && programSelect && feeResult) {
        const fees = {
            'fsc-premedical': { admission: 15000, semester: 25000, lab: 5000 },
            'fsc-preengineering': { admission: 15000, semester: 25000, lab: 5000 },
            'ics': { admission: 15000, semester: 25000, lab: 5000 },
            'icom': { admission: 15000, semester: 25000, lab: 3000 },
            'fa': { admission: 15000, semester: 25000, lab: 2000 },
            'bs-cs': { admission: 20000, semester: 35000, lab: 7000 },
            'bs-math': { admission: 20000, semester: 35000, lab: 5000 },
            'bs-physics': { admission: 20000, semester: 35000, lab: 7000 },
            'bs-chemistry': { admission: 20000, semester: 35000, lab: 8000 },
            'bs-botany': { admission: 20000, semester: 35000, lab: 7000 },
            'bs-zoology': { admission: 20000, semester: 35000, lab: 7000 },
            'bs-english': { admission: 20000, semester: 35000, lab: 3000 },
            'msc-physics': { admission: 25000, semester: 45000, lab: 8000 },
            'msc-chemistry': { admission: 25000, semester: 45000, lab: 9000 },
            'msc-math': { admission: 25000, semester: 45000, lab: 6000 },
            'msc-botany': { admission: 25000, semester: 45000, lab: 8000 },
            'msc-zoology': { admission: 25000, semester: 45000, lab: 8000 },
            'ma-english': { admission: 25000, semester: 45000, lab: 4000 },
            'ma-economics': { admission: 25000, semester: 45000, lab: 4000 }
        };
        
        feeCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedProgram = programSelect.value;
            
            if (selectedProgram && fees[selectedProgram]) {
                const fee = fees[selectedProgram];
                const total = fee.admission + fee.semester + fee.lab;
                
                feeResult.textContent = `Total fee for first semester: Rs. ${total}`;
                feeResult.style.display = 'block';
            }
        });
    }

    // Smooth scroll to form when "Apply Now" button is clicked
    const applyNowBtn = document.querySelector('.banner-content .btn');
    
    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const formSection = document.getElementById('admission-forms-tabs');
            
            if (formSection) {
                window.scrollTo({
                    top: formSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add notification styles
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
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        .notification.show {
            top: 20px;
        }
        .notification.success {
            background-color: #4CAF50;
        }
        .notification.error {
            background-color: #F44336;
        }
    `;
    document.head.appendChild(style);

    // Pulsate animation for Apply Now button
    const pulsateButton = document.querySelector('.pulsate');
    
    if (pulsateButton) {
        setInterval(() => {
            pulsateButton.classList.toggle('pulse-animation');
        }, 2000);
    }
});
