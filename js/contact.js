// contact.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate fields
            if (!name || !email || !subject || !message) {
                alert('Please fill all required fields');
                return;
            }

            // Open Gmail in new tab
            const gmailUrl = `https://mail.google.com/mail/?view=cm&to=roboorion.services@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${name}\n${email}\n\n${message}`)}`;
            window.open(gmailUrl, '_blank');

            // Set success flag for index.html
            sessionStorage.setItem('showSuccessPopup', 'true');

            // Redirect after 100ms (ensure storage is set)
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 10);
        });
    }
});