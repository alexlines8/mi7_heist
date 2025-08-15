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
    
    const missionText = `Welcome Team X.

We have called you here for an urgent mission to protect the country.

The CEO of MI7, Charlie Sutton,  has had his personal laptop stolen from his office, if the laptop gets in to the wrong hands it could cause the single largest breach of the UK's national security that the country has ever faced.

It is up to your team to investigate the crime and identify the perpetrator.

At the approximate time of the attack, our network engineers identified some suspicious activity, it seems that a mobile phone was sending data to an external file server, we beleive this server belongs to the thief. In your command center you will see a connection to this server, however it has been protected by a password that we have been unable to crack.

Due to technical issues, our CCTV systems are mostly non-operational, on your right side panel we have provided you with the only CCTV footage we could recover at this time.

We are counting on you Team X, please protect our country.

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