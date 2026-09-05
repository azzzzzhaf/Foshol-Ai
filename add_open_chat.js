const fs = require('fs');

const code = `
        function openServiceChat(enPrompt, bnPrompt) {
            const chatWidget = document.getElementById('chat-widget');
            if (chatWidget && chatWidget.classList.contains('chat-hidden')) {
                toggleChat();
            }
            const msg = currentLang === 'en' ? enPrompt : bnPrompt;
            const input = document.getElementById('chat-input');
            if(input) { input.value = msg; sendChatMessage(); }
        }
`;

['about.html', 'blog.html', 'store.html'].forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    if (!html.includes('function openServiceChat')) {
        html = html.replace('function toggleChat() {', code + '\n        function toggleChat() {');
        fs.writeFileSync(f, html, 'utf8');
        console.log(f, 'openServiceChat added');
    }
});
