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

/* Audio Player Functionality */
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('missionAudio');
    const playButton = document.getElementById('playButton');
    const audioControls = document.getElementById('audioControls');
    const progressFill = document.getElementById('progressFill');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const playIcon = document.querySelector('.play-icon');
    const playText = document.querySelector('.play-text');

    if (!audio || !playButton) return; // Exit if elements don't exist on this page

    let isPlaying = false;

    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.textContent = '▶';
            playText.textContent = 'Play Mission Brief';
            playButton.classList.remove('playing');
            isPlaying = false;
        } else {
            audio.play().catch(e => {
                console.error('Error playing audio:', e);
                alert('Unable to play audio file. Please check if missionBrief.mp3 exists in assets/audio/');
            });
            playIcon.textContent = '⏸';
            playText.textContent = 'Pause Mission Brief';
            playButton.classList.add('playing');
            audioControls.style.display = 'block';
            isPlaying = true;
        }
    });

    // Update progress and time
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
            
            currentTimeSpan.textContent = formatTime(audio.currentTime);
            durationSpan.textContent = formatTime(audio.duration);
        }
    });

    // Handle audio end
    audio.addEventListener('ended', function() {
        playIcon.textContent = '▶';
        playText.textContent = 'Play Mission Brief';
        playButton.classList.remove('playing');
        progressFill.style.width = '0%';
        isPlaying = false;
    });

    // Click on progress bar to seek
    document.querySelector('.progress-bar')?.addEventListener('click', function(e) {
        if (audio.duration) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const clickTime = (clickX / width) * audio.duration;
            audio.currentTime = clickTime;
        }
    });

    // Format time helper function
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
});