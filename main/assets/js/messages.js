// Messages functionality
class MessagesSystem {
    constructor() {
        this.messages = [];
        this.messagesThread = document.getElementById('messagesThread');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.init();
        this.loadMockMessages();
    }

    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Console log for mission briefing
        console.log('🚀 SECURE MESSAGING SYSTEM INITIALIZED');
        console.log('📡 Available functions:');
        console.log('   - addMessage(content, type, sender, timestamp)');
        console.log('   - sendMessage()');
        console.log('   - clearMessages()');
    }

    // Function to add a new message
    addMessage(content, type = 'received', sender = 'UNKNOWN', timestamp = null) {
        if (!content || content.trim() === '') return;

        const message = {
            id: Date.now() + Math.random(),
            content: content.trim(),
            type: type, // 'sent' or 'received'
            sender: sender,
            timestamp: timestamp || new Date(),
            status: type === 'sent' ? 'TRANSMITTED' : 'RECEIVED'
        };

        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();

        console.log(`📨 Message ${type}: "${content}"`);
    }

    // Function to send a message from the input
    sendMessage() {
        const content = this.messageInput.value.trim();
        if (content === '') return;

        this.addMessage(content, 'sent', 'AGENT_007', new Date());
        this.messageInput.value = '';

        // Simulate a response after a short delay
        setTimeout(() => {
            this.simulateResponse(content);
        }, 1000 + Math.random() * 2000);
    }

    // Simulate incoming responses
    simulateResponse(originalMessage) {
        const responses = [
            "Message received. Standing by for further instructions.",
            "Roger that. Mission parameters updated.",
            "Acknowledged. Proceeding with infiltration protocol.",
            "Copy. Maintaining radio silence until next checkpoint.",
            "Understood. Switching to encrypted channel delta-7.",
            "Affirmative. Target acquired and under surveillance.",
            "Message confirmed. Awaiting extraction coordinates.",
            "Received. All systems green for operation nightfall."
        ];

        // Sometimes don't respond to make it more realistic
        if (Math.random() > 0.7) return;

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(randomResponse, 'received', 'HQ_CONTROL');
    }

    // Render a single message
    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.setAttribute('data-id', message.id);

        const timeString = message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        messageDiv.innerHTML = `
            <p class="message-content">${this.escapeHtml(message.content)}</p>
            <div class="message-meta">
                <span class="message-time">${timeString}</span>
                <span class="message-status">${message.status}</span>
            </div>
        `;

        this.messagesThread.appendChild(messageDiv);
    }

    // Load initial mock messages
    loadMockMessages() {
        const mockMessages = [
            {
                content: "Agent 007, this is HQ Control. Do you copy?",
                type: 'received',
                sender: 'HQ_CONTROL',
                timestamp: new Date(Date.now() - 300000) // 5 minutes ago
            },
            {
                content: "Copy HQ. I'm in position outside the target facility.",
                type: 'sent',
                sender: 'AGENT_007',
                timestamp: new Date(Date.now() - 240000) // 4 minutes ago
            },
            {
                content: "Excellent. Security cameras show two guards at the north entrance. Use the service tunnel as planned.",
                type: 'received',
                sender: 'HQ_CONTROL',
                timestamp: new Date(Date.now() - 180000) // 3 minutes ago
            },
            {
                content: "Roger that. Moving to tunnel access point now. Will report back in 10 minutes.",
                type: 'sent',
                sender: 'AGENT_007',
                timestamp: new Date(Date.now() - 120000) // 2 minutes ago
            },
            {
                content: "Copy. Remember, once you're inside, you'll have limited communication. Good luck, Agent.",
                type: 'received',
                sender: 'HQ_CONTROL',
                timestamp: new Date(Date.now() - 60000) // 1 minute ago
            }
        ];

        // Add mock messages with slight delays for effect
        mockMessages.forEach((msg, index) => {
            setTimeout(() => {
                this.addMessage(msg.content, msg.type, msg.sender, msg.timestamp);
            }, index * 200);
        });
    }

    // Clear all messages
    clearMessages() {
        this.messages = [];
        this.messagesThread.innerHTML = '<div class="messages-empty">Secure channel established. No messages.</div>';
        console.log('🗑️ All messages cleared');
    }

    // Scroll to bottom of messages
    scrollToBottom() {
        this.messagesThread.scrollTop = this.messagesThread.scrollHeight;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize messaging system when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.messagesSystem = new MessagesSystem();
    
    // Make functions globally available for testing
    window.addMessage = (content, type, sender, timestamp) => {
        window.messagesSystem.addMessage(content, type, sender, timestamp);
    };
    
    window.clearMessages = () => {
        window.messagesSystem.clearMessages();
    };
});

// Mission briefing in console
console.log(`
🎮 MI7 HEIST - SECURE MESSAGING MODULE
=====================================
Available Commands:
• addMessage('Your message', 'sent') - Add a sent message
• addMessage('Their message', 'received') - Add a received message
• clearMessages() - Clear all messages
• messagesSystem.simulateResponse() - Trigger a random response

Example Usage:
addMessage('The eagle has landed', 'sent');
addMessage('Roger that, Agent. Proceed to Phase 2', 'received');
`);
