
const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });


    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const statusEl = document.getElementById("form-status");
      statusEl.innerText = "⏳ Sending...";
      emailjs.sendForm("service_ju38v7u", "template_xptd0xm", this, "0pPC6AV7WTn72bXWt")
        .then(() => {
          document.getElementById("form-status").innerText = "✅ Message sent successfully!";
          this.reset();
        }, (error) => {
          document.getElementById("form-status").innerText = "❌ Failed to send. Try again.";
          console.error(error);
        });
    });

    



