
const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm("service_my9uedr", "template_2tesibu", this)
        .then(() => {
          document.getElementById("form-status").innerText = "✅ Message sent successfully!";
          this.reset();
        }, (error) => {
          document.getElementById("form-status").innerText = "❌ Failed to send. Try again.";
          console.error(error);
        });
    });