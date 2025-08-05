document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img, index) {
        if (index >= 3) {
            // Only lazy load images after the first 3
            img.setAttribute('loading', 'lazy');
        }
        
        // Handle fade-in effect
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                img.classList.add('loaded');
            });
        }
    });
});