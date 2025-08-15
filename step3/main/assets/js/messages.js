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
;
    }

    // Function to add a new message
    addMessage(content, type = 'received', sender = 'UNKNOWN') {
        if (!content || content.trim() === '') return;

        const message = {
            id: Date.now() + Math.random(),
            content: content.trim(),
            type: type, // 'sent' or 'received'
            sender: sender,
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

        this.addMessage(content, 'sent', 'AGENT_9');
        this.messageInput.value = '';
    }

    // Render a single message
    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.setAttribute('data-id', message.id);

        messageDiv.innerHTML = `
            <p class="message-content">${this.escapeHtml(message.content)}</p>
            <div class="message-meta">
                <span class="message-status">${message.status}</span>
            </div>
        `;

        this.messagesThread.appendChild(messageDiv);
    }

    // Load initial hardcoded messages
    loadMockMessages() {
        // You can customize these initial messages
        const initialMessages = [
            {
                content: "Greetings agent 9, has the job been completed",
                type: 'received',
                sender: 'Emperor JC'
            },
            {
                content: "Copy. I have the laptop and nobody suspects a thing",
                type: 'sent',
                sender: 'AGENT_9'
            },
            {
                content: "Excellent. Continue to go about your daily tasks to not arouse suspicion",
                type: 'received',
                sender: 'Emperor JC'
            },
            {
                content: "Roger that. We are currently going out for lunch, will keep you updated",
                type: 'sent',
                sender: 'AGENT_9'
            },
            {
                content: "Copy. When you are in a secure location contact agent tpjohls jolu. They have a message for you",
                type: 'received',
                sender: 'Emperor JC'
            }
        ];

        // Add initial messages with slight delays for effect
        initialMessages.forEach((msg, index) => {
            setTimeout(() => {
                this.addMessage(msg.content, msg.type, msg.sender);
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
    window.addMessage = (content, type, sender) => {
        window.messagesSystem.addMessage(content, type, sender);
    };
    
    window.clearMessages = () => {
        window.messagesSystem.clearMessages();
    };

    // Function to reload initial messages
    window.loadInitialMessages = () => {
        window.messagesSystem.clearMessages();
        window.messagesSystem.loadMockMessages();
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
• loadInitialMessages() - Reload the hardcoded initial messages

Example Usage:
addMessage('The eagle has landed', 'sent');
addMessage('Roger that, Agent. Proceed to Phase 2', 'received');
`);
