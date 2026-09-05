const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const mockAiLogic = `
            setTimeout(() => {
                document.getElementById(typingId).remove();
                
                let replyEn = "I am currently in MVP mode. Please check our Krishi Blog for verified updates!";
                let replyBn = "আমি বর্তমানে পরীক্ষামূলক পর্যায়ে আছি। যেকোনো তথ্যের জন্য আমাদের কৃষি ব্লগ চেক করুন!";
                const msgLower = message.toLowerCase();
                
                if (msgLower.includes('market') || msgLower.includes('বাজার')) {
                    replyEn = "Based on current market updates, Tomatoes and Green Chilies are highly profitable today. For more verified updates, read our latest <a href='/articles' class='text-blue-500 underline'>market blogs</a>.";
                    replyBn = "আজকের বাজার দর অনুযায়ী, টমেটো এবং কাঁচামরিচে লাভ সবচেয়ে বেশি। আরও ভেরিফাইড আপডেটের জন্য আমাদের <a href='/articles' class='text-blue-500 underline'>কৃষি ব্লগ</a> পড়ুন।";
                } else if (msgLower.includes('weather') || msgLower.includes('আবহাওয়া')) {
                    replyEn = "Based on the forecast, prepare your land accordingly. If heavy rain is expected, ensure proper drainage. Check our <a href='/articles' class='text-blue-500 underline'>trusted blogs</a> for more tips.";
                    replyBn = "আবহাওয়ার পূর্বাভাস অনুযায়ী আপনার জমির যত্ন নিন। বৃষ্টির সম্ভাবনা থাকলে পানি নিষ্কাশনের ব্যবস্থা রাখুন। বিস্তারিত টিপস পেতে আমাদের <a href='/articles' class='text-blue-500 underline'>ব্লগ</a> পড়ুন।";
                } else if (msgLower.includes('medicine') || msgLower.includes('ওষুধ') || msgLower.includes('স্প্রে')) {
                    replyEn = "Always apply the exact dosage as listed on the chart. Spraying in the late afternoon yields the best results. Check our <a href='/articles' class='text-blue-500 underline'>trusted guides</a>.";
                    replyBn = "চার্টে দেওয়া একদম সঠিক মাত্রায় ওষুধ প্রয়োগ করুন। শেষ বিকেলে স্প্রে করলে সবচেয়ে ভালো ফল পাওয়া যায়। আরও জানতে আমাদের <a href='/articles' class='text-blue-500 underline'>গাইডলাইন</a> পড়ুন।";
                } else if (msgLower.includes('fertilizer') || msgLower.includes('সার')) {
                    replyEn = "Apply Urea in 3 equal installments for maximum yield. TSP and MoP should be applied during final land preparation.";
                    replyBn = "সবচেয়ে ভালো ফলনের জন্য ইউরিয়া সার ৩টি সমান কিস্তিতে প্রয়োগ করবেন। টিএসপি এবং পটাশ সার জমি তৈরির শেষ ধাপে দিয়ে দিবেন।";
                }

                const finalReply = currentLang === 'en' ? replyEn : replyBn;
                chatBox.innerHTML += \`<div class="chat-message chat-ai">\${finalReply}</div>\`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1500);
`;

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Replace the fetch block in sendChatMessage
    if (html.includes('const res = await fetch(\'/api/chat\'')) {
        const fetchStart = html.indexOf('try {');
        let fetchEnd = html.indexOf('} catch (error) {');
        fetchEnd = html.indexOf('}', fetchEnd + 17) + 1; // End of catch block
        
        if (fetchStart !== -1 && fetchEnd !== -1) {
            html = html.substring(0, fetchStart) + mockAiLogic + html.substring(fetchEnd);
        }
    }

    // 2. Hide global chat button on tool pages & adjust the custom button
    const isToolPage = ['weather.html', 'medicine.html', 'fertilizer.html', 'market.html'].includes(file);
    if (isToolPage) {
        const hideCss = `
    <style>
        /* Hide global AI chat button on tool pages */
        button[onclick="toggleChat()"].fixed.bottom-6.right-6 { display: none !important; }
    </style>`;
        if (!html.includes('/* Hide global AI chat button on tool pages */')) {
            html = html.replace('</head>', hideCss + '\n</head>');
        }

        // Adjust the position of the custom button from bottom-24 to bottom-6
        html = html.replace('fixed right-6 bottom-24', 'fixed right-6 bottom-6');

        // Add openServiceChat function if it doesn't exist
        const openServiceChatCode = `
    <script>
        if (typeof openServiceChat === 'undefined') {
            window.openServiceChat = function(enPrompt, bnPrompt) {
                const chatWidget = document.getElementById("chat-widget");
                if (chatWidget && chatWidget.classList.contains("chat-hidden")) {
                    toggleChat();
                }
                const msg = currentLang === "en" ? enPrompt : bnPrompt;
                document.getElementById('chat-input').value = msg;
                sendChatMessage();
            };
        }
    </script>`;
        if (!html.includes('window.openServiceChat = function')) {
            html = html.replace('</body>', openServiceChatCode + '\n</body>');
        }
    }

    fs.writeFileSync(path.join(dir, file), html, 'utf8');
});

console.log("Mock AI logic and tool page fixes applied successfully!");
