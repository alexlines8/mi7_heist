// Auto-generate filename captions from the image src, unless a custom caption is provided.
document.addEventListener('DOMContentLoaded', function() {
    const figures = document.querySelectorAll('#gallery figure');

    figures.forEach(figure => {
        const img = figure.querySelector('img');
        const cap = figure.querySelector('.filename');

        // If developer set a custom caption, use it
        const custom = img.getAttribute('data-caption');
        if (custom) {
            cap.textContent = custom;
            return;
        }

        // Otherwise, pull the filename from src
        try {
            const url = new URL(img.getAttribute('src'), window.location.href);
            const base = url.pathname.split('/').pop();
            cap.textContent = base || 'image';
        } catch (e) {
            // Fallback for older browsers or odd paths
            const path = img.getAttribute('src') || '';
            cap.textContent = path.split('/').pop() || 'image';
        }
    });
});
