import GameStatusClient from './gameStatusClient.js';

/* In-game event hooks */
const client = new GameStatusClient();

/* Event listener for a generic status update */
client.addEventListener('status_update', (e) => {
    /* TO DO */
});

/* Event listener for a hint increase */
client.addEventListener('hint_increase', (e) => {
    /* TO DO */
});

/* Event listener for a failed attempt */
client.addEventListener('failed_attempt', (e) => {
    /* TO DO */
});

/* Event listeners for time warnings */
client.addEventListener('50_percent_time_passed', (e) => {
    /* TO DO */
});

client.addEventListener('5_minutes_remaining', (e) => {
    /* TO DO */
});

client.addEventListener('60_seconds_remaining', (e) => {
    /* TO DO */
});

/* Connect to the server */
client.connect();

/* Handle potential page navigation or refresh */
window.addEventListener('beforeunload', () => {
    client.disconnect();
});

/* Typewriter Effect */
document.addEventListener('DOMContentLoaded', function() {
    const typewriterText = document.getElementById('typewriter-text');
    const cursor = document.getElementById('cursor');
    
    if (!typewriterText) return; // Exit if elements don't exist on this page
    
    const missionText = `
    One of our agents has sent us an image of what we beleive to be the perpetrator's phone.
    We need you to identify the location of the phone and bring it in for analysis.
    `;

    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 50; // milliseconds between characters
    const paragraphDelay = 800; // delay between paragraphs

    function typeWriter() {
        if (textIndex < missionText.length) {
            const currentChar = missionText[textIndex];
            
            // Remove cursor temporarily
            cursor.remove();
            
            // Add character
            typewriterText.insertAdjacentText('beforeend', currentChar);
            
            // Add cursor back
            typewriterText.appendChild(cursor);
            
            textIndex++;
            
            // Add delay for new lines
            const delay = currentChar === '\n' ? paragraphDelay : typingSpeed;
            setTimeout(typeWriter, delay);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
});