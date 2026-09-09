const fs = require('fs');

const files = ['about.html', 'market.html', 'medicine.html', 'services.html', 'store.html', 'weather.html', 'organic.html'];

const chatHtml = fs.readFileSync('chat_html.txt', 'utf-8');
const chatJs = fs.readFileSync('chat_js.txt', 'utf-8');

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    
    // 1. Replace Chat HTML
    // Replace from <div id="chat-widget" down to the next <script>, <footer>, or <div id="
    content = content.replace(/<div id="chat-widget"[\s\S]*?(?=<script>|<footer>|<div id="pitch-modal"|<div id="organic-modal"|<\/body>)/, chatHtml + '\n\n    ');

    // 2. Replace Chat JS
    // In these files, the old JS starts around:
    // "const chatWidget = document.getElementById('chat-widget');" OR "function toggleChat()"
    // and ends after "sendChatMessage() { ... }" which ends with "}, 1200);\n        }\n" 
    
    // Let's use a robust regex to find the start and end.
    // Start pattern: const chatWidget = document.getElementById('chat-widget'); or function toggleChat()
    // End pattern: The end of sendChatMessage function. In all these files, it ends with "}, 1200);\n        }"
    
    const jsStartRegex = /(?:const chatWidget = document\.getElementById\('chat-widget'\);[\s\S]*?|function toggleChat\(\)[\s\S]*?)/;
    
    // Actually, let's just do an exact indexOf replacement.
    let startIdx = content.indexOf("const chatWidget = document.getElementById('chat-widget');");
    if (startIdx === -1) startIdx = content.indexOf("function toggleChat()");
    
    if (startIdx !== -1) {
        // Find the end of sendChatMessage
        let endIdx = content.indexOf('}, 1200);', startIdx);
        if (endIdx !== -1) {
            endIdx = content.indexOf('}', endIdx + 9) + 1; // get the closing brace of sendChatMessage
            
            content = content.substring(0, startIdx) + chatJs + '\n' + content.substring(endIdx);
        } else {
             // maybe it doesn't have the 1200 timeout
             let scriptEnd = content.indexOf('</script>', startIdx);
             content = content.substring(0, startIdx) + chatJs + '\n' + content.substring(scriptEnd);
        }
    } else {
        // If chat logic isn't found at all (e.g. organic.html maybe?)
        let scriptEnd = content.lastIndexOf('</script>');
        if (scriptEnd !== -1) {
            content = content.substring(0, scriptEnd) + '\n' + chatJs + '\n' + content.substring(scriptEnd);
        }
    }
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Successfully updated " + file);
});
