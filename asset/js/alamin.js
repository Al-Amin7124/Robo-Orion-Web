

// Make clicked item active
document.querySelectorAll('#sidebarNav .nav-item').forEach(item => {
  item.addEventListener('click', function (e) {
    // Remove highlight from all
    document.querySelectorAll('#sidebarNav .nav-item').forEach(i => {
      i.classList.remove('active', 'text-[#EB004D]');
    });

    // Add highlight to clicked item
    this.classList.add('active', 'text-[#EB004D]');
  });
});

//resume
const buttons = document.querySelectorAll('.resume-btn');
const pages = document.querySelectorAll('.resume-page');
let currentPage = document.querySelector('.resume-page.opacity-100');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const targetPage = document.getElementById(targetId);

    if (!targetPage || targetPage === currentPage) return; // ignore if same

    // Change active button color
    buttons.forEach(b => b.classList.remove('text-[#EB004D]', 'active'));
    btn.classList.add('text-[#EB004D]', 'active');

    // Fade out current page
    currentPage.classList.remove('opacity-100');
    currentPage.classList.add('opacity-0');

    // Wait for fade-out to complete before showing new page
    setTimeout(() => {
      currentPage.classList.add('hidden');
      targetPage.classList.remove('hidden');
      requestAnimationFrame(() => {
        targetPage.classList.remove('opacity-0');
        targetPage.classList.add('opacity-100');
      });
      currentPage = targetPage;
    }, 400); // slightly less than transition duration for smoothness
  });
});

//responsive toggle button
const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('-translate-x-full')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });

    // Close menu when clicking nav item (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });