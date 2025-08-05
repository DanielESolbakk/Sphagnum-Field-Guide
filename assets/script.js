// Progressive Image Loading for Sphagnum Field Guide
document.addEventListener('DOMContentLoaded', function() {
    
    // Add lazy loading to all images
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        // Add loading="lazy" attribute for native browser lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Handle the fade-in effect when image loads
        if (img.complete && img.naturalHeight !== 0) {
            // Image already loaded
            img.classList.add('loaded');
        } else {
            // Image still loading
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
            
            // Handle load errors gracefully
            img.addEventListener('error', function() {
                img.classList.add('loaded');
                console.warn('Failed to load image:', img.src);
            });
        }
    });
    
    // Intersection Observer for advanced lazy loading (fallback for older browsers)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If image has data-src, load it
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            // Start loading when image is 50px away from viewport
            rootMargin: '50px'
        });
        
        // Observe images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical images (first few images on page)
    const criticalImages = Array.from(images).slice(0, 3);
    criticalImages.forEach(function(img) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });
});
