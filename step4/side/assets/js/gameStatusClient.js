/**
 * A client class for consuming an escape game status WebSocket endpoint.
 * It extends EventTarget to provide a clean API for event handling.
 * * It listens for status updates and dispatches custom events for:
 * - 'hint_increase': When the hint count goes up.
 * - 'failed_attempt': When the failed attempt count goes up.
 * - '50_percent_time_passed': When half the level duration has elapsed.
 * - '5_minutes_remaining': When 5 minutes or less remain.
 * - '60_seconds_remaining': When 60 seconds or less remain.
 * - 'status_update': A generic event with the latest status data.
 */
class GameStatusClient extends EventTarget {

    constructor() {
        super();
        this.url = "https://dis-game.scc.lancs.ac.uk/ws/v1/ingame/status/";
        this.ws = null;
        this.lastStatus = {};
        this.timerInterval = null;
        this.timeWarnings = {
            '50_percent_time_passed': false,
            '5_minutes_remaining': false,
            '60_seconds_remaining': false,
        };
    }

    /**
     * Connects to the WebSocket endpoint.
     */
    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.warn("WebSocket is already connected.");
            return;
        }

        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
            console.log("WebSocket connection established.");
            this.dispatchEvent(new CustomEvent('connected'));
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if(!data)
                    return
                this._processStatus(data);
                
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        this.ws.onclose = (event) => {
            console.log("WebSocket connection closed:", event.code, event.reason);
            this.dispatchEvent(new CustomEvent('disconnected'));
            this._stopTimer();
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.dispatchEvent(new CustomEvent('error', { detail: error }));
        };
    }

    /**
     * Disconnects from the WebSocket endpoint.
     */
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * Processes the incoming status data and dispatches events.
     * @param {object} newStatus The latest status data from the server.
     * @private
     */
    _processStatus(newStatus) {
        // Dispatch a generic status update event for UI updates
        this.dispatchEvent(new CustomEvent('status_update', { detail: newStatus }));

        // Check for hint count increase
        if (newStatus.hint_count > this.lastStatus.hint_count) {
            this.dispatchEvent(new CustomEvent('hint_increase', { detail: { newCount: newStatus.hint_count } }));
        }

        // Check for failed attempt count increase
        if (newStatus.failed_attempt_count > this.lastStatus.failed_attempt_count) {
            this.dispatchEvent(new CustomEvent('failed_attempt', { detail: { newCount: newStatus.failed_attempt_count } }));
        }

        // Update the last known status
        this.lastStatus = newStatus;

        // Start the timer if it's not already running
        if (newStatus.start_time && newStatus.duration && !this.timerInterval) {
            this._startTimer(newStatus.start_time, newStatus.duration);
        }
    }

    /**
     * Starts a timer to check for time-based warnings.
     * @param {number} startTime Unix timestamp in seconds.
     * @param {number} duration Duration of the level in seconds.
     * @private
     */
    _startTimer(startTime, duration) {
        this._stopTimer(); // Clear any existing timer
        this.timerInterval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const elapsedTime = currentTime - startTime;
            const remainingTime = duration - elapsedTime;

            if (remainingTime > 0) {
                // 50% time passed check
                if (elapsedTime >= duration / 2 && !this.timeWarnings['50_percent_time_passed']) {
                    this.timeWarnings['50_percent_time_passed'] = true;
                    this.dispatchEvent(new CustomEvent('50_percent_time_passed', { detail: { remainingTime } }));
                }
                
                // 5 minutes remaining check (300 seconds)
                if (remainingTime <= 300 && !this.timeWarnings['5_minutes_remaining']) {
                    this.timeWarnings['5_minutes_remaining'] = true;
                    this.dispatchEvent(new CustomEvent('5_minutes_remaining', { detail: { remainingTime } }));
                }

                // 60 seconds remaining check
                if (remainingTime <= 60 && !this.timeWarnings['60_seconds_remaining']) {
                    this.timeWarnings['60_seconds_remaining'] = true;
                    this.dispatchEvent(new CustomEvent('60_seconds_remaining', { detail: { remainingTime } }));
                }
            } else {
                // Game time has elapsed
                this._stopTimer();
            }
        }, 1000); // Check every second
    }

    /**
     * Stops the timer interval.
     * @private
     */
    _stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        // Reset all warnings
        this.timeWarnings = {
            '50_percent_time_passed': false,
            '5_minutes_remaining': false,
            '60_seconds_remaining': false,
        };
    }
}

export default GameStatusClient;