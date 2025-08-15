// Location Services JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Handle iframe loading
    const iframe = document.querySelector('iframe');
    
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('what3words map loaded successfully');
        });
        
        iframe.addEventListener('error', function() {
            console.error('Failed to load what3words map');
        });
    }
    
    // Log location access for mission tracking
    console.log('[MISSION LOG] Location services accessed at:', new Date().toISOString());
});
