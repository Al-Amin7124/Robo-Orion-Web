function openTab(evt, tabId) {
    // Hide all content
    document.querySelectorAll('.tabcontent').forEach(el => el.classList.add('hidden'));
    // Remove active style from all tabs
    document.querySelectorAll('.tablink').forEach(el => {
        el.classList.remove('text-blue-600','border-blue-600');
        el.classList.add('text-gray-600', 'border-transparent');
    });
    // Show selected tab
    document.getElementById(tabId).classList.remove('hidden');
    // Add active style to clicked tab
    evt.currentTarget.classList.remove('text-gray-600', 'border-transparent');
    evt.currentTarget.classList.add('text-blue-600','border-blue-600');
}


//image section
(function() {
    // Configuration
    const VISIBLE_THUMBNAILS = 3;
    let currentIndex = 0;
    let thumbnailOffset = 0;

    // DOM Elements
    const mainImage = document.getElementById('mainImage');
    const thumbnailTrack = document.getElementById('thumbnailTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnails = document.querySelectorAll('.product-thumbnail');

    // Initialize gallery
    function initGallery() {
        if (thumbnails.length === 0) return;

        // Set thumbnail widths
        thumbnails.forEach(thumb => {
            thumb.style.width = `calc((100% - ${(VISIBLE_THUMBNAILS - 1) * 12}px) / ${VISIBLE_THUMBNAILS})`;
        });

        // Add click event to each thumbnail
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => selectImage(index));
        });

        // Set first image as active
        updateMainImage(0);
        updateNavigationButtons();
    }

    // Update main image
    function updateMainImage(index) {
        currentIndex = index;
        const selectedThumbnail = thumbnails[index];
        const img = selectedThumbnail.querySelector('img');
        
        mainImage.src = img.src;
        mainImage.alt = img.alt;
        
        // Update thumbnail borders
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.remove('border-gray-200', 'hover:border-gray-400');
                thumb.classList.add('border-blue-500', 'ring-2', 'ring-blue-200');
            } else {
                thumb.classList.remove('border-blue-500', 'ring-2', 'ring-blue-200');
                thumb.classList.add('border-gray-200', 'hover:border-gray-400');
            }
        });
    }

    // Select image by index
    function selectImage(index) {
        updateMainImage(index);
        
        // Auto-scroll thumbnails if selected image is not visible
        if (index < thumbnailOffset) {
            thumbnailOffset = index;
            scrollThumbnails();
        } else if (index >= thumbnailOffset + VISIBLE_THUMBNAILS) {
            thumbnailOffset = index - VISIBLE_THUMBNAILS + 1;
            scrollThumbnails();
        }
        
        updateNavigationButtons();
    }

    // Scroll thumbnails
    function scrollThumbnails() {
        if (thumbnails.length === 0) return;
        
        const thumbnailWidth = thumbnails[0].offsetWidth;
        const gap = 12; // gap-3 = 12px
        const offset = -(thumbnailOffset * (thumbnailWidth + gap));
        thumbnailTrack.style.transform = `translateX(${offset}px)`;
    }

    // Navigate thumbnails left
    function navigateLeft() {
        if (thumbnailOffset > 0) {
            thumbnailOffset--;
            scrollThumbnails();
            updateNavigationButtons();
        }
    }

    // Navigate thumbnails right
    function navigateRight() {
        const maxOffset = Math.max(0, thumbnails.length - VISIBLE_THUMBNAILS);
        if (thumbnailOffset < maxOffset) {
            thumbnailOffset++;
            scrollThumbnails();
            updateNavigationButtons();
        }
    }

    // Update navigation button states
    function updateNavigationButtons() {
        const maxOffset = Math.max(0, thumbnails.length - VISIBLE_THUMBNAILS);
        
        prevBtn.disabled = thumbnailOffset === 0;
        nextBtn.disabled = thumbnailOffset >= maxOffset;
        
        // Show/hide buttons based on number of thumbnails
        if (thumbnails.length <= VISIBLE_THUMBNAILS) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', navigateLeft);
    nextBtn.addEventListener('click', navigateRight);

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();