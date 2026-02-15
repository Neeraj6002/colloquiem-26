// ============================================================
// REGISTRATION PAGE WITH FIREBASE INTEGRATION
// ============================================================

// Import Firebase functions
import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

let submitted = false;

// UPI Payment Details
const UPI_ID = "9207796593@paytm"; // Replace with your actual UPI ID
const MERCHANT_NAME = "Colloquium 2026";


// ============================================================
// PAGE LOADER SCRIPT
// Add this to your script.js file at the TOP
// ============================================================

/**
 * Hide page loader when content is ready
 * This runs automatically on page load
 */
(function initPageLoader() {
    
    // Function to hide the loader
    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            console.log('Loader hidden');
        }
    }
    
    // Hide loader when page fully loads
    window.addEventListener('load', function() {
        console.log('Page loaded, hiding loader in 1.5s');
        setTimeout(hideLoader, 1500); // Show for 1.5 seconds after page load
    });
    
    // Fallback: Hide loader after maximum time
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader && !loader.classList.contains('hidden')) {
            console.log('Fallback: Force hiding loader after 5s');
            hideLoader();
        }
    }, 5000); // Max 5 seconds
    
    // Hide loader if DOM is already loaded (fast page load)
    if (document.readyState === 'complete') {
        console.log('Page already loaded, hiding loader immediately');
        setTimeout(hideLoader, 500);
    }
    
})();

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPageLoader };
}
// ============================================================
// LOAD EVENT DATA ON PAGE LOAD
// ============================================================
window.addEventListener('DOMContentLoaded', function() {
    // Get event data from sessionStorage
    const selectedEvent = sessionStorage.getItem('selectedEvent');
    const eventPrice = sessionStorage.getItem('eventPrice');
    
    // Get form elements
    const eventField = document.getElementById('eventField');
    const payAmount = document.getElementById('payAmount');
    const paymentSection = document.getElementById('paymentSection');
    
    // If event data exists, populate the form
    if (selectedEvent && eventPrice) {
        if (eventField) {
            eventField.value = selectedEvent;
            // Show payment section when event is pre-selected
            if (paymentSection) {
                paymentSection.classList.remove('hidden');
            }
        }
        
        if (payAmount) {
            payAmount.textContent = `₹${eventPrice}`;
        }
        
        // Update payment links with initial data
        updatePaymentLink();
    }
    
    // Add event listener for event selection
    if (eventField) {
        eventField.addEventListener('change', handleEventChange);
    }
    
    // Add event listeners for name changes to update payment link
    const fullName = document.getElementById('fullName');
    if (fullName) {
        fullName.addEventListener('input', updatePaymentLink);
    }
    
    // Detect device type and show appropriate payment method
    detectDeviceAndShowPayment();
});

// ============================================================
// HANDLE EVENT SELECTION CHANGE
// ============================================================
function handleEventChange() {
    const eventField = document.getElementById('eventField');
    const paymentSection = document.getElementById('paymentSection');
    const payAmount = document.getElementById('payAmount');
    
    if (!eventField || !paymentSection) return;
    
    const selectedOption = eventField.options[eventField.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    
    if (price) {
        // Show payment section
        paymentSection.classList.remove('hidden');
        
        // Update amount
        if (payAmount) {
            payAmount.textContent = `₹${price}`;
        }
        
        // Update payment link
        updatePaymentLink();
    }
}

// ============================================================
// DETECT DEVICE AND SHOW PAYMENT METHOD
// ============================================================
function detectDeviceAndShowPayment() {
    const mobilePayment = document.getElementById('mobile-payment');
    const desktopPayment = document.getElementById('desktop-payment');
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && mobilePayment && desktopPayment) {
        mobilePayment.style.display = 'block';
        desktopPayment.style.display = 'none';
    } else if (desktopPayment && mobilePayment) {
        desktopPayment.style.display = 'block';
        mobilePayment.style.display = 'none';
    }
}

// ============================================================
// UPDATE PAYMENT LINK
// ============================================================
function updatePaymentLink() {
    const fullName = document.getElementById('fullName');
    const eventField = document.getElementById('eventField');
    const payAmount = document.getElementById('payAmount');
    const upiLink = document.getElementById('upiLink');
    const qrCode = document.getElementById('qrCode');
    
    if (!fullName || !eventField || !payAmount) return;
    
    const name = fullName.value || 'User';
    const event = eventField.value || 'Event';
    const amountText = payAmount.textContent || '₹0';
    const amount = amountText.replace('₹', '').trim();
    
    // Create UPI payment link
    const note = `${event} - ${name}`;
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    // Update UPI link
    if (upiLink) {
        upiLink.href = upiUrl;
    }
    
    // Generate QR code URL using Google Charts API
    if (qrCode) {
        const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(upiUrl)}&chs=200x200&choe=UTF-8`;
        qrCode.src = qrUrl;
    }
}

// Make updatePaymentLink available globally
window.updatePaymentLink = updatePaymentLink;

// ============================================================
// FORM SUBMISSION TO FIREBASE
// ============================================================
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const college = document.getElementById('college').value.trim();
        const department = document.getElementById('department').value.trim();
        const year = document.getElementById('year').value;
        const eventField = document.getElementById('eventField').value;
        const transactionId = document.getElementById('transactionId').value.trim();
        
        // Validation checks
        if (fullName.length < 3) {
            showError('Please enter a valid full name (at least 3 characters)');
            return;
        }
        
        if (!email.includes('@')) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (phone.length < 10) {
            showError('Please enter a valid phone number');
            return;
        }
        
        if (!eventField) {
            showError('Please select an event');
            return;
        }
        
        if (transactionId.length < 6) {
            showError('Please enter a valid transaction ID (UTR)');
            return;
        }
        
        // Show loading spinner
        showLoading();
        
        // Get form data
        const formData = {
            fullName: fullName,
            email: email,
            phone: phone,
            college: college,
            department: department,
            year: year,
            event: eventField,
            teamDetails: document.getElementById('teamDetails').value || 'N/A',
            transactionId: transactionId,
            registrationFee: document.getElementById('payAmount').textContent,
            timestamp: serverTimestamp(),
            status: 'pending' // You can update this after payment verification
        };
        
        try {
            // Add document to Firestore
            const docRef = await addDoc(collection(db, 'registrations'), formData);
            
            console.log('Document written with ID: ', docRef.id);
            
            // Hide loading
            hideLoading();
            
            // Set submitted flag
            submitted = true;
            
            // Clear session storage
            sessionStorage.removeItem('selectedEvent');
            sessionStorage.removeItem('eventPrice');
            
            // Reset form
            registrationForm.reset();
            
            // Hide payment section
            const paymentSection = document.getElementById('paymentSection');
            if (paymentSection) {
                paymentSection.classList.add('hidden');
            }
            
            // Show success modal
            showSuccess();
            
        } catch (error) {
            console.error('Error adding document: ', error);
            hideLoading();
            showError('Registration failed. Please try again. Error: ' + error.message);
        }
    });
}

// ============================================================
// MODAL FUNCTIONS
// ============================================================
function showLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showSuccess() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

window.closeSuccessModal = function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    // Redirect to events page or home
    window.location.href = 'events.html';
}

function showError(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    
    if (errorModal && errorMessage) {
        errorMessage.textContent = message;
        errorModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        alert(message);
    }
}

window.closeErrorModal = function() {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
        errorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============================================================
// BACKGROUND CANVAS ANIMATION
// ============================================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.color = Math.random() > 0.8 ? '#C5A059' : '#ffffff';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    initParticles();
    animateParticles();
}

// ============================================================
// MOBILE RESPONSIVE ADJUSTMENTS
// ============================================================
window.addEventListener('resize', function() {
    detectDeviceAndShowPayment();
});