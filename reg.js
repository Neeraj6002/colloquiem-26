// ============================================================
// REGISTRATION PAGE JAVASCRIPT
// Handles event selection from event.html and payment integration
// ============================================================

let submitted = false;

// UPI Payment Details
const UPI_ID = "your-upi-id@paytm"; // Replace with your actual UPI ID
const MERCHANT_NAME = "Colloquium 2026"; // Replace with your merchant name

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
    
    // If event data exists, populate the form
    if (selectedEvent && eventPrice) {
        if (eventField) {
            eventField.value = selectedEvent;
        }
        
        if (payAmount) {
            payAmount.textContent = `₹${eventPrice}`;
        }
        
        // Update payment links with initial data
        updatePaymentLink();
    } else {
        // No event selected, redirect back to events page
        alert('Please select an event first');
        window.location.href = 'event.html';
    }
    
    // Detect device type and show appropriate payment method
    detectDeviceAndShowPayment();
});

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
// UPDATE PAYMENT LINK (Called when name is entered)
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
    
    // Generate QR code URL (using Google Charts API)
    if (qrCode) {
        const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(upiUrl)}&chs=200x200&choe=UTF-8`;
        qrCode.src = qrUrl;
    }
}

// ============================================================
// SHOW SUCCESS MODAL AFTER FORM SUBMISSION
// ============================================================
function showSuccessModal() {
    // Clear sessionStorage
    sessionStorage.removeItem('selectedEvent');
    sessionStorage.removeItem('eventPrice');
    
    // Show success message
    alert('Registration Successful! 🎉\n\nYour registration has been submitted. You will receive a confirmation email shortly.\n\nThank you for registering!');
    
    // Redirect to events page or home
    setTimeout(() => {
        window.location.href = 'event.html';
    }, 2000);
}

// ============================================================
// FORM VALIDATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const fullName = document.getElementById('fullName');
            const eventField = document.getElementById('eventField');
            
            // Validate name
            if (fullName && fullName.value.trim().length < 3) {
                e.preventDefault();
                alert('Please enter a valid full name');
                fullName.focus();
                return false;
            }
            
            // Validate event selection
            if (eventField && !eventField.value) {
                e.preventDefault();
                alert('Please select an event first from the events page');
                return false;
            }
            
            // Set submitted flag
            submitted = true;
        });
    }
});

// ============================================================
// HANDLE BACK BUTTON - CLEAR SESSION STORAGE
// ============================================================
window.addEventListener('beforeunload', function() {
    // Only clear if form wasn't submitted
    if (!submitted) {
        // Keep the event data so user can come back
        // sessionStorage data will persist for this session
    }
});

// ============================================================
// MOBILE RESPONSIVE ADJUSTMENTS
// ============================================================
window.addEventListener('resize', function() {
    detectDeviceAndShowPayment();
});