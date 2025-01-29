// index.js
document.addEventListener('DOMContentLoaded', () => {
    // Check for success flag
    if (sessionStorage.getItem('showSuccessPopup') === 'true') {
        // Show modal
        const modal = new bootstrap.Modal('#successModal');
        modal.show();
        
        // Clear the flag
        sessionStorage.removeItem('showSuccessPopup');
    }
});