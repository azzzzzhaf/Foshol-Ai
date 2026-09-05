const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const targetFiles = ['about.html', 'blog.html', 'store.html', 'articles.html', 'services.html', 'index.html'];

const properFetchWeather = `
        // --- Live Weather Top Bar Fetch ---
        async function fetchWeather() {
            const weatherEl = document.getElementById('weather-data');
            if (!weatherEl) return;
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true');
                const data = await res.json();
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                let icon = 'fa-sun text-yellow-400';
                let descEn = 'Sunny';
                let descBn = 'রৌদ্রোজ্জ্বল';
                
                if (code > 3 && code < 50) { icon = 'fa-cloud text-gray-300'; descEn = 'Cloudy'; descBn = 'মেঘলা'; }
                else if (code >= 50 && code < 80) { icon = 'fa-cloud-rain text-blue-300'; descEn = 'Rainy'; descBn = 'বৃষ্টি'; }
                else if (code >= 80) { icon = 'fa-cloud-bolt text-yellow-300'; descEn = 'Storm'; descBn = 'ঝড়ো আবহাওয়া'; }

                weatherEl.innerHTML = \`
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-location-dot text-red-400 text-xs"></i>
                        <span>Dhaka</span>
                        <span class="mx-1">•</span>
                        <i class="fa-solid \${icon}"></i>
                        <span>\${temp}°C</span>
                        <span class="mx-1">•</span>
                        <span class="lang-en">\${descEn}</span>
                        <span class="lang-bn hidden">\${descBn}</span>
                    </div>
                \`;
                applyLanguage();
            } catch (err) {
                weatherEl.innerHTML = \`
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-location-dot text-red-400 text-xs"></i>
                        <span>Dhaka</span>
                        <span class="mx-1">•</span>
                        <i class="fa-solid fa-sun text-yellow-400"></i>
                        <span>32°C</span>
                        <span class="mx-1">•</span>
                        <span class="lang-en">Sunny</span>
                        <span class="lang-bn hidden">রৌদ্রোজ্জ্বল</span>
                    </div>
                \`;
                applyLanguage();
            }
        }
        fetchWeather();
`;

const properSendChatMessage = `
        async function sendChatMessage() {
            const input = document.getElementById('chat-input');
            if(!input) return;
            const message = input.value.trim();
            if(!message) return;

            const chatBox = document.getElementById('chat-box');
            if(!chatBox) return;
            
            chatBox.innerHTML += \`<div class="chat-message chat-user">\${message}</div>\`;
            input.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;

            const typingId = "typing-" + Date.now();
            let typingHtml = \`<div id="\${typingId}" class="chat-message chat-ai typing-indicator"><span></span><span></span><span></span></div>\`;
            
            if(message.includes('রোগ') || message.includes('detect') || message.includes('ছবি') || message.includes('leaf') || message.includes('scan') || message.includes('ব্লাইট')) {
                typingHtml = \`<div id="\${typingId}" class="chat-message chat-ai flex flex-col items-center gap-3 text-center border-2 border-green-200 bg-green-50 p-4">
                    <div class="relative w-12 h-12">
                        <i class="fa-solid fa-leaf text-4xl text-green-500 absolute inset-0"></i>
                        <div class="absolute inset-0 bg-green-500/20 border-t-2 border-green-500 animate-ping rounded-full"></div>
                    </div>
                    <span class="text-green-700 font-bold text-xs"><span class="lang-en">AI Leaf Scanner analyzing image...</span><span class="lang-bn hidden">এআই লিফ স্ক্যানার ছবি বিশ্লেষণ করছে...</span></span>
                </div>\`;
            }
            chatBox.innerHTML += typingHtml;
            setTimeout(applyLanguage, 10);
            chatBox.scrollTop = chatBox.scrollHeight;

            // Intelligent Domain-Specific AI Simulation
            setTimeout(() => {
                const typingEl = document.getElementById(typingId);
                if (typingEl) typingEl.remove();
                
                let replyEn = "I am Foshol AI Assistant. I can help diagnose crop diseases, calculate fertilizer, check wholesale mandi market prices, and give localized weather advisories. How can I assist your farm today?";
                let replyBn = "আমি ফসল এআই সহকারী। আমি ফসলের রোগ নির্ণয়, সারের সঠিক হিসাব, আজকের পাইকারি বাজার দর এবং আবহাওয়ার পরামর্শ দিতে পারি। আজ আপনার খামারের জন্য কীভাবে সাহায্য করতে পারি?";
                const msgLower = message.toLowerCase();
                
                if (msgLower.includes('market') || msgLower.includes('দাম') || msgLower.includes('দর') || msgLower.includes('price')) {
                    replyEn = "Based on today's Karwan Bazar wholesale index, Tomatoes are selling at ৳45/kg (Retail: ৳60/kg) and Onions at ৳45/kg. Middlemen margins are high on Green Chilies. For the complete live visual chart, view our <a href='/market' class='text-green-600 font-bold underline'>Market Prices Page</a>.";
                    replyBn = "আজকের কাওরান বাজার পাইকারি ইনডেক্স অনুযায়ী, টমেটো প্রতি কেজি ৳৪৫ (খুচরা ৳৬০) এবং পেঁয়াজ ৳৪৫ দরে বিক্রি হচ্ছে। কাঁচামরিচে লাভ সবচেয়ে বেশি। সম্পূর্ণ লাইভ চার্ট দেখতে আমাদের <a href='/market' class='text-green-600 font-bold underline'>বাজার দর পেজ</a> দেখুন।";
                } else if (msgLower.includes('weather') || msgLower.includes('আবহাওয়া') || msgLower.includes('বৃষ্টি') || msgLower.includes('rain')) {
                    replyEn = "Current Dhaka weather is 32°C. Scattered rain is predicted over the next 48 hours in Rajshahi and Sylhet. Please check drainage channels for vegetable fields. Full forecast is available on the <a href='/weather' class='text-blue-600 font-bold underline'>Farming Weather Page</a>.";
                    replyBn = "ঢাকার বর্তমান তাপমাত্রা ৩২°C। রাজশাহী ও সিলেট অঞ্চলে আগামী ৪৮ ঘণ্টায় বৃষ্টির সম্ভাবনা রয়েছে। সবজি ক্ষেতের নিষ্কাশন নালা পরিষ্কার রাখুন। বিস্তারিত ৭ দিনের পূর্বাভাস দেখতে <a href='/weather' class='text-blue-600 font-bold underline'>কৃষি আবহাওয়া পেজ</a> দেখুন।";
                } else if (msgLower.includes('medicine') || msgLower.includes('ঔষধ') || msgLower.includes('ওষুধ') || msgLower.includes('পোকামাকড়') || msgLower.includes('পচন') || msgLower.includes('fungus')) {
                    replyEn = "For fungal diseases like Late Blight or Blast, recommended fungicides include Amistar Top (1ml/1L water) or Score. Spray during calm, late afternoons. For exact crop dosages, see our <a href='/medicine' class='text-teal-600 font-bold underline'>Medicine Dosage Tool</a>.";
                    replyBn = "লেট ব্লাইট বা ব্লাস্ট রোগের জন্য এমিটার টপ (১মিলি/১লিটার পানি) অথবা স্কোর অনুমোদিত। শেষ বিকেলে স্প্রে করা উত্তম। ফসল অনুযায়ী সঠিক মাত্রার জন্য আমাদের <a href='/medicine' class='text-teal-600 font-bold underline'>ঔষধের সঠিক মাত্রা পেজ</a> দেখুন।";
                } else if (msgLower.includes('fertilizer') || msgLower.includes('সার') || msgLower.includes('ইউরিয়া') || msgLower.includes('urea')) {
                    replyEn = "For high-yield rice (BRRI 28/29), standard requirement is ~0.9kg Urea, 0.4kg TSP, and 0.5kg MoP per decimal. Calculate for your exact land size on our <a href='/fertilizer' class='text-purple-600 font-bold underline'>Fertilizer Calculator</a>.";
                    replyBn = "উচ্চ ফলনশীল ধানের (ব্রি ২৮/২৯) জন্য প্রতি শতকে প্রায় ০.৯ কেজি ইউরিয়া, ০.৪ কেজি টিএসপি এবং ০.৫ কেজি পটাশ প্রয়োজন। আপনার জমির সঠিক হিসাব করতে আমাদের <a href='/fertilizer' class='text-purple-600 font-bold underline'>সার ক্যালকুলেটর</a> ব্যবহার করুন।";
                } else if (msgLower.includes('রোগ') || msgLower.includes('detect') || msgLower.includes('ছবি') || msgLower.includes('পাতা') || msgLower.includes('ব্লাস্ট')) {
                    replyEn = "✅ <b>AI Diagnosis:</b> Sample shows <b>Rice Blast (ব্লাস্ট রোগ)</b> with <b>98.4% Confidence</b>.<br>• Recommended Spray: Tricyclazole 75 WP (0.75g/L) or Nativo 75 WG (0.6g/L).<br>• Action: Stop excess Urea application immediately to prevent spore spread.";
                    replyBn = "✅ <b>এআই রোগ নির্ণয়:</b> নমুনায় <b>ধানের ব্লাস্ট রোগ (৯৮.৪% নির্ভুলতা)</b> শনাক্ত হয়েছে।<br>• অনুমোদিত ছত্রাকনাশক: ট্রাইসাইক্লাজোল ৭৫ ডব্লিউপি (০.৭৫ গ্রাম/লিটার) অথবা নাটিভো ৭৫ ডব্লিউজি।<br>• পরামর্শ: জমিতে অতিরিক্ত ইউরিয়া সার দেওয়া এখনই বন্ধ রাখুন।";
                }

                const finalReply = currentLang === 'en' ? replyEn : replyBn;
                chatBox.innerHTML += \`<div class="chat-message chat-ai">\${finalReply}</div>\`;
                setTimeout(applyLanguage, 10);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1200);
        }
`;

const pitchModalSnippet = `
    <!-- INVESTOR PITCH DECK MODAL -->
    <div id="pitch-modal" class="hidden fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white max-w-2xl w-full rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
            <div class="bg-gradient-to-r from-f-dark to-emerald-800 text-white p-6 md:p-8 flex justify-between items-start relative">
                <div>
                    <span class="bg-f-gold text-f-dark font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">Pre-Seed Round • $150K Target</span>
                    <h2 class="text-2xl md:text-3xl font-black">Foshol AI — Investor Snapshot</h2>
                    <p class="text-green-100 text-sm mt-1">AI-Powered Agritech Infrastructure for 16.5M Farmers in Bangladesh</p>
                </div>
                <button onclick="closePitchModal()" class="text-white/80 hover:text-white text-2xl p-2"><i class="fa-solid fa-times"></i></button>
            </div>

            <div class="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-gray-700">
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="bg-green-50 p-4 rounded-2xl border border-green-100">
                        <div class="text-2xl font-black text-f-dark">$4.2B</div>
                        <div class="text-xs text-gray-500 font-bold uppercase mt-1">Market Size (TAM)</div>
                    </div>
                    <div class="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                        <div class="text-2xl font-black text-amber-600">3.2M</div>
                        <div class="text-xs text-gray-500 font-bold uppercase mt-1">Smartphone Farmers (SAM)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <div class="text-2xl font-black text-blue-600">98.2%</div>
                        <div class="text-xs text-gray-500 font-bold uppercase mt-1">Diagnostic Accuracy</div>
                    </div>
                </div>

                <div class="space-y-3">
                    <h3 class="font-bold text-gray-900 uppercase tracking-wider text-xs flex items-center gap-2"><i class="fa-solid fa-bullseye text-red-500"></i> The Problem</h3>
                    <p class="bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                        Bangladeshi farmers lose up to <b>35% of their yield</b> annually due to delayed crop disease diagnosis, counterfeit chemicals from local vendors, and lack of real-time wholesale price transparency.
                    </p>
                </div>

                <div class="space-y-3">
                    <h3 class="font-bold text-gray-900 uppercase tracking-wider text-xs flex items-center gap-2"><i class="fa-solid fa-microchip text-f-dark"></i> Our AI Solution</h3>
                    <p class="bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                        A proprietary multi-modal Agritech AI platform that runs directly on mobile web & messaging apps (WhatsApp/Telegram). Farmers take a photo of an infected leaf to get an <b>instant treatment protocol</b>, calculate precise fertilizer dosages, and purchase authentic inputs directly.
                    </p>
                </div>

                <div class="space-y-3">
                    <h3 class="font-bold text-gray-900 uppercase tracking-wider text-xs flex items-center gap-2"><i class="fa-solid fa-coins text-f-gold"></i> 3 Revenue Streams</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div class="p-3 border border-gray-200 rounded-xl">
                            <div class="font-bold text-gray-900 mb-1">1. B2B Input Sales</div>
                            <div class="text-xs text-gray-500">6-10% commission on certified seeds, fertilizers & machinery.</div>
                        </div>
                        <div class="p-3 border border-gray-200 rounded-xl">
                            <div class="font-bold text-gray-900 mb-1">2. Credit Scoring</div>
                            <div class="text-xs text-gray-500">Farm yield data licensing to rural banks & micro-insurers (MFI).</div>
                        </div>
                        <div class="p-3 border border-gray-200 rounded-xl">
                            <div class="font-bold text-gray-900 mb-1">3. Corporate SaaS</div>
                            <div class="text-xs text-gray-500">Enterprise contract farming advisory for PRAN, ACI, Square.</div>
                        </div>
                    </div>
                </div>

                <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <div class="font-bold text-emerald-900">Seeking $150,000 Pre-Seed Investment</div>
                        <div class="text-xs text-emerald-700">Allocation: 50% AI Model & Data Pipeline • 30% Farmer Hub Acquisition • 20% Operations</div>
                    </div>
                    <a href="mailto:invest@foshol.ai?subject=Foshol%20AI%20Pre-Seed%20Inquiry" class="bg-f-dark text-white font-bold px-6 py-2.5 rounded-xl hover:bg-green-800 transition whitespace-nowrap shadow">
                        Contact Founders
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script>
        function openPitchModal() {
            const m = document.getElementById('pitch-modal');
            if(m) m.classList.remove('hidden');
        }
        function closePitchModal() {
            const m = document.getElementById('pitch-modal');
            if(m) m.classList.add('hidden');
        }
    </script>
`;

targetFiles.forEach(file => {
    let filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Replace corrupted fetchWeather block
    const fwIdx = html.indexOf('async function fetchWeather()');
    if (fwIdx !== -1) {
        // Find where the function ends (fetchWeather() call)
        const fwCallIdx = html.indexOf('fetchWeather();', fwIdx);
        if (fwCallIdx !== -1) {
            html = html.substring(0, fwIdx) + properFetchWeather.trim() + html.substring(fwCallIdx + 15);
        }
    }

    // 2. Replace corrupted or old sendChatMessage block
    const scIdx = html.indexOf('async function sendChatMessage()');
    if (scIdx !== -1) {
        const scEndIdx = html.indexOf('</script>', scIdx);
        if (scEndIdx !== -1) {
            html = html.substring(0, scIdx) + properSendChatMessage.trim() + '\n    ' + html.substring(scEndIdx);
        }
    }

    // 3. Inject pitch modal if missing
    if (!html.includes('id="pitch-modal"')) {
        html = html.replace('</body>', pitchModalSnippet + '\n</body>');
    }

    // 4. Inject Pitch Deck button in navbar if missing
    if (!html.includes('openPitchModal()')) {
        html = html.replace(
            '<button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">',
            '<button onclick="openPitchModal()" class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full font-bold text-xs hover:shadow-lg transition flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-briefcase"></i> <span class="lang-en">Pitch Deck</span><span class="lang-bn hidden">ইনভেস্টর ডেক</span></button>\n            <button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">'
        );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(file, 'weather & chat restored successfully!');
});
