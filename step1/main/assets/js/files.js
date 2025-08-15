function openFile(fileName) {
    const fileContent = document.getElementById('file-content');

 const files = {
    'file1': `--- network-log.txt ---
[12:00:00] Connection established to 192.168.1.101 via port 443
[12:03:12] ICMP echo request from 10.0.0.22
[12:05:17] Unauthorized access attempt detected from 172.16.5.4
[12:06:45] Packet flood detected - threshold exceeded
[12:07:13] DNS query hijack attempt blocked
[12:08:55] VPN tunnel initialized to 203.0.113.76
[12:09:34] SSL handshake failed - unknown certificate authority
[12:10:10] Connection closed by remote host
Status: Monitoring service active (uptime: 5d 13h 22m)
`,

    'file2': `--- system-report.json ---
{
    "CPU": "75%",
    "Memory": "68%",
    "Disk": {
        "C:": "82% full",
        "D:": "41% full"
    },
    "Network": {
        "Status": "Active",
        "Throughput": "118 Mbps"
    },
    "Status": "Stable",
    "LastReboot": "2025-08-13T14:52:30Z",
    "ProcessesRunning": 147,
    "Security": {
        "Firewall": "Enabled",
        "AV": "Updated",
        "IntrusionDetection": "Passive Mode"
    }
}
`
,
'audio-file': 'assets/audio/intercepted-audio.mp3'
,
    };

    if (fileName === 'audio-file') {
        fileContent.innerHTML = `
            <div class="audio-player">
                <audio id="interceptedAudio" preload="none">
                    <source src="${files[fileName]}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <button id="playButtonIntercepted" class="play-btn">
                    <span class="play-icon">▶</span>
                    <span class="play-text">Play Intercepted Audio</span>
                </button>
                <div class="audio-controls" id="audioControlsIntercepted" style="display: none;">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFillIntercepted"></div>
                        </div>
                        <span class="time-display">
                            <span id="currentTimeIntercepted">0:00</span> / <span id="durationIntercepted">0:00</span>
                        </span>
                    </div>
                </div>
            </div>
        `
        ;

        // Audio player logic (copy of mission brief, but for intercepted audio)
        const audio = document.getElementById('interceptedAudio');
        const playButton = document.getElementById('playButtonIntercepted');
        const audioControls = document.getElementById('audioControlsIntercepted');
        const progressFill = document.getElementById('progressFillIntercepted');
        const currentTimeSpan = document.getElementById('currentTimeIntercepted');
        const durationSpan = document.getElementById('durationIntercepted');
        const playIcon = playButton.querySelector('.play-icon');
        const playText = playButton.querySelector('.play-text');

        let isPlaying = false;

        playButton.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                playIcon.textContent = '▶';
                playText.textContent = 'Play Intercepted Audio';
                playButton.classList.remove('playing');
                isPlaying = false;
            } else {
                audio.play().catch(e => {
                    console.error('Error playing audio:', e);
                    alert('Unable to play audio file. Please check if intercepted-audio.mp3 exists in assets/audio/');
                });
                playIcon.textContent = '⏸';
                playText.textContent = 'Pause Intercepted Audio';
                playButton.classList.add('playing');
                audioControls.style.display = 'block';
                isPlaying = true;
            }
        });

        audio.addEventListener('timeupdate', function() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = progress + '%';
                currentTimeSpan.textContent = formatTime(audio.currentTime);
                durationSpan.textContent = formatTime(audio.duration);
            }
        });

        audio.addEventListener('ended', function() {
            playIcon.textContent = '▶';
            playText.textContent = 'Play Intercepted Audio';
            playButton.classList.remove('playing');
            progressFill.style.width = '0%';
            isPlaying = false;
        });

        audioControls.querySelector('.progress-bar').addEventListener('click', function(e) {
            if (audio.duration) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const clickTime = (clickX / width) * audio.duration;
                audio.currentTime = clickTime;
            }
        });

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    } else {
        fileContent.textContent = files[fileName] || 'File not found.';
    }
}