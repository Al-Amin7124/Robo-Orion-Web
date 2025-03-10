document.querySelectorAll('.filter-tope-group button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-tope-group button').forEach(btn => {
            btn.classList.remove('how-active1');
        });
        
        // Add active class to clicked button
        this.classList.add('how-active1');
    });
});


/*==================================================================
    [ Filter / Search product ]*/
$('.filter-tope-group button').on('click', function () {
    let filterValue = $(this).attr('data-filter');
    $('.product-item').hide(); // Hide all products
    if (filterValue === '*') {
        $('.product-item').fadeIn(400); // Show all products smoothly
    } else {
        $(filterValue).fadeIn(400); // Show only filtered items smoothly
    }

    // Recalculate layout to avoid excessive spacing issues
    setTimeout(function () {
        $('.row.px-xl-5').css('display', 'flex').css('flex-wrap', 'wrap');
    }, 100);
});

