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
[12:11:41] Outbound connection to 198.51.100.22:80 denied by firewall
[12:13:27] Suspicious TLS fingerprint detected from 10.0.1.15
[12:15:03] Anomalous traffic pattern detected - heuristic analysis score: 82%
[12:16:29] ARP spoofing attempt detected on subnet 10.0.0.0/24
[12:17:50] Proxy connection tunneled via port 8080 (destination obfuscated)
[12:19:11] DNS over HTTPS request intercepted - domain: unknown.update-check.io
[12:20:44] Lateral movement detected: smb session attempt from 192.168.1.22 to 192.168.1.45
[12:22:19] Brute force login attempt: SSH - 11 failed logins from 185.22.40.77
[12:24:32] NetFlow anomaly - unexplained outbound spike (340MB in 30s)
[12:25:18] IDS alert: Signature match "EternalBlue" on port 445
[12:27:06] Port scan detected from 37.221.89.15 - 1500 ports probed
[12:28:30] Temporary IP block issued for 37.221.89.15 (duration: 1h)
[12:30:00] Internal heartbeat received from node-alpha.local [OK]
Status: Monitoring service active (uptime: 5d 13h 22m)
`,

    'file2': `--- system-report.json ---
{
"CPU": "75%",
    "Memory": "68%",
    "Disk": {
        "C:": "82% full",
        "D:": "41% full",
        "E:": "12% full (Encrypted Volume)"
    },
    "Network": {
        "Status": "Active",
        "Throughput": "118 Mbps",
        "ExternalIP": "203.0.113.44",
        "VPN": {
            "Status": "Connected",
            "Endpoint": "vpn.secure-tunnel.net",
            "Protocol": "WireGuard"
        }
    },
    "Status": "Stable",
    "Uptime": "5 days, 13 hours, 47 minutes",
    "LastReboot": "2025-08-13T14:52:30Z",
    "ProcessesRunning": 147,
    "Services": {
        "Database": "Running",
        "WebServer": "Running",
        "Telemetry": "Inactive",
        "Scheduler": "Running"
    },
    "Security": {
        "Firewall": "Enabled",
        "AV": "Updated",
        "IntrusionDetection": "Passive Mode",
        "LoginAttempts": {
            "Successful": 42,
            "Failed": 7,
            "LastFailedIP": "172.16.5.4"
        },
        "LastAudit": {
            "Timestamp": "2025-08-14T09:23:11Z",
            "Result": "No Critical Issues"
        }
    },
    "System": {
        "OS": "NovaSecOS v3.4.2",
        "Kernel": "5.18.13-zen1",
        "Architecture": "x86_64",
        "SecureBoot": true,
        "Virtualized": true,
        "HostName": "node-alpha"
    },
    "Environmental": {
        "CPU_Temp": "67°C",
        "GPU_Temp": "54°C",
        "FanSpeed": "1100 RPM",
        "AmbientTemp": "22.1°C"
    }
}
`
,
'audio-file': 'assets/audio/intercepted-audio.mp3'
,
'file3': `--- system-core.log ---
[03:14:07] Kernel boot sequence initiated...
[03:14:08] Loading microcode patch level: v1.39-21a
[03:14:08] CPU topology: 8 cores, 16 threads, hyper-threading enabled
[03:14:09] Memory map: 32768MB total, 30720MB usable
[03:14:09] Enabling NX-bit, SMEP, and KASLR
[03:14:10] System entropy pool initialized (32-bit seeding complete)
[03:14:11] Mounting root filesystem: /dev/sda1 (ext4, rw)
[03:14:12] Running fsck... clean
[03:14:13] Initializing systemd services...
[03:14:14] [ OK ] Network Manager Daemon activated
[03:14:14] [ OK ] Load Balancer: round-robin routing engaged
[03:14:15] [WARN] Detected legacy driver: NVIDIA 390.116
[03:14:16] [INFO] Switching to fallback X.Org mode
[03:14:17] Starting container orchestration daemon (dockerd)...
[03:14:18] Docker API listening on /var/run/docker.sock
[03:14:18] Service mesh bridge established (envoy sidecar injected)
[03:14:20] SYSTEM SECURE BOOT ENABLED
[03:14:21] TPM handshake verified with firmware module v2.18
[03:14:22] Hostname assigned: node-alpha.local
[03:14:24] [CRON] Scheduled task loaded: /etc/cron.daily/snapshot_sync
[03:14:25] GitOps hook triggered: pulling latest infrastructure state...
[03:14:27] [INFO] Config drift detected: firewall.rules differs from baseline
[03:14:28] [ACTION] Rolling back to last known good configuration
[03:14:29] [SECURITY] SSH key exchange request from 185.99.11.203 - denied
[03:14:30] [ALERT] Repeated failed logins detected on port 2222 - IP blocked
[03:14:31] [INFO] Ingress traffic filtered through WAF Layer-7
[03:14:33] CPU thermal state nominal (43°C), fan RPM: 1100
[03:14:34] GPU driver handshake complete - compute mode activated
[03:14:36] Kubernetes node registered: k8s-node-02, role=worker
[03:14:37] Pod metrics scraping enabled via Prometheus sidecar
[03:14:38] [SYNC] NTP time synchronization complete (source: time.cloudflare.com)
[03:14:39] [OK] Local Redis cache cluster healthy (shards: 4, hits: 98.7%)
[03:14:40] [STATUS] Core system operations nominal. Monitoring enabled.

Uptime: 0d 0h 26m | Kernel: 5.18.13-zen1 | Platform: x86_64 (UEFI mode)
`
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