document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const messageContainer = document.getElementById('messageContainer');
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validation
    if (!Object.values(formData).every(field => field)) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.status === 'success') {
            showMessage(result.message, 'success');
            document.getElementById('contactForm').reset();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('An error occurred while sending the message', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const container = document.getElementById('messageContainer');
    container.className = `${type}-message`;
    container.textContent = message;
    container.classList.remove('hidden');
    
    setTimeout(() => {
        container.classList.add('hidden');
    }, 5000);
}