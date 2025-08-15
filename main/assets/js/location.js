// Location functionality
document.addEventListener('DOMContentLoaded', function() {
    const locationFrame = document.getElementById('locationFrame');
    
    // Console mission briefing
    console.log('🌍 LOCATION MODULE INITIALIZED');
    console.log('📍 what3words mapping system active');
    
    // Handle iframe load events
    if (locationFrame) {
        locationFrame.addEventListener('load', function() {
            console.log('🗺️ Location map loaded successfully');
        });
        
        locationFrame.addEventListener('error', function() {
            console.log('⚠️ Location map failed to load');
        });
    }
});
