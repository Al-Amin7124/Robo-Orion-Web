// Navbar
const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });




// Enhanced toggleCard function for multiple sections
function toggleCard(cardNumber, sectionId = '') {
    // Create unique identifiers using section ID if provided
    const contentId = sectionId ? `content-${sectionId}-${cardNumber}` : `content-${cardNumber}`;
    const iconId = sectionId ? `icon-${sectionId}-${cardNumber}` : `icon-${cardNumber}`;
    
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);
    
    if (!content || !icon) {
        console.error(`Could not find elements with IDs: ${contentId} and ${iconId}`);
        return;
    }
    
    // Count how many cards are currently open in this section
    const sectionSelector = sectionId ? `[data-section="${sectionId}"] .card-content.active` : '.card-content.active';
    const openCards = document.querySelectorAll(sectionSelector);
    
    // If the clicked card is already active and there's more than one open card in this section
    if (content.classList.contains('active') && openCards.length > 1) {
        content.classList.remove('active');
        icon.classList.remove('rotate-180');
    } 
    // If the clicked card is not active
    else if (!content.classList.contains('active')) {
        // Close all other cards in this section
        const sectionCardsSelector = sectionId ? `[data-section="${sectionId}"] .card-content` : '.card-content';
        const sectionIconsSelector = sectionId ? `[data-section="${sectionId}"] .card-toggle i` : '.card-toggle i';
        
        document.querySelectorAll(sectionCardsSelector).forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll(sectionIconsSelector).forEach(item => {
            item.classList.remove('rotate-180');
        });
        
        // Open this card
        content.classList.add('active');
        icon.classList.add('rotate-180');
    }
    // If it's the only open card in this section, do nothing (prevent closing the last card)
}

// Initialize first card in each section as open
document.addEventListener('DOMContentLoaded', function() {
    // Find all sections with cards
    const cardSections = document.querySelectorAll('[data-section]');
    
    cardSections.forEach(section => {
        const sectionId = section.getAttribute('data-section');
        const firstIcon = document.getElementById(`icon-${sectionId}-1`);
        const firstContent = document.getElementById(`content-${sectionId}-1`);
        
        if (firstIcon && firstContent) {
            firstIcon.classList.add('rotate-180');
            firstContent.classList.add('active');
        }
    });
    
    // Also initialize cards without sections (for backward compatibility)
    const firstIcon = document.getElementById('icon-1');
    const firstContent = document.getElementById('content-1');
    
    if (firstIcon && firstContent && !firstIcon.classList.contains('rotate-180')) {
        firstIcon.classList.add('rotate-180');
        firstContent.classList.add('active');
    }
});