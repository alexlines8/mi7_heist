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