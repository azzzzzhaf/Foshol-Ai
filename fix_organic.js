const fs = require('fs');

let content = fs.readFileSync('organic.html', 'utf-8');
const chatHtml = fs.readFileSync('chat_html.txt', 'utf-8');
const chatJs = fs.readFileSync('chat_js.txt', 'utf-8');

const floatButton = '<button onclick="toggleChat()" class="fixed bottom-6 right-6 bg-f-gold text-white rounded-full shadow-2xl flex items-center justify-center px-5 py-3 hover:scale-105 transition z-50 gap-2 font-bold animate-bounce">' +
        '<i class="fa-solid fa-robot text-xl"></i>' +
        '<span class="lang-en">AI Chat</span><span class="lang-bn hidden">??? ?????</span>' +
    '</button>';

if (!content.includes('id="chat-widget"')) {
    const scriptPos = content.indexOf('<script>');
    if (scriptPos !== -1) {
        content = content.substring(0, scriptPos) + floatButton + '\n\n' + chatHtml + '\n\n    ' + content.substring(scriptPos);
    }
}

// inject chatJs if not present
if (!content.includes('function toggleChat()')) {
    const endScript = content.lastIndexOf('</script>');
    if (endScript !== -1) {
        content = content.substring(0, endScript) + '\n\n' + chatJs + '\n' + content.substring(endScript);
    }
}

fs.writeFileSync('organic.html', content, 'utf-8');
console.log('Fixed organic.html HTML');
