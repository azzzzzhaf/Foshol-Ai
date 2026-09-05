const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
function readFile(name) { return fs.readFileSync(path.join(dir, name), 'utf8'); }
function writeFile(name, content) { fs.writeFileSync(path.join(dir, name), content, 'utf8'); }

let baseHtml = readFile('about.html');
const navStart = baseHtml.indexOf('<nav class="bg-white');
let navEnd = baseHtml.indexOf('<script>', baseHtml.indexOf('<div id="mobile-menu"'));
if (navEnd === -1) navEnd = baseHtml.indexOf('<!-- Footer -->');
const navbarCode = baseHtml.substring(navStart, navEnd);

const footerStart = baseHtml.indexOf('<!-- Footer -->');
const footerCode = baseHtml.substring(footerStart);

const headCode = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>tailwind.config = { theme: { extend: { colors: { 'f-dark': '#155d35', 'f-light': '#e8f5e9', 'f-gold': '#ffb300' } } } }</script>
    <style>.chat-hidden { transform: translateY(150%); opacity: 0; pointer-events: none; } #chat-widget { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }</style>
`;

// ==========================================
// 1. WEATHER APP
// ==========================================
const weatherHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    \${HEAD}
    <title>Weather Forecast - Foshol AI</title>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">
    \${NAVBAR}
    
    <div class="bg-blue-600 py-12 text-center relative overflow-hidden">
        <h1 class="text-4xl font-bold text-white mb-4 relative z-10"><span class="lang-en">Farming Weather</span><span class="lang-bn hidden">কৃষি আবহাওয়া</span></h1>
        <p class="text-blue-100 max-w-2xl mx-auto relative z-10"><span class="lang-en">7-day weather forecast customized for agricultural planning.</span><span class="lang-bn hidden">কৃষিকাজের পরিকল্পনার জন্য ৭ দিনের আবহাওয়া পূর্বাভাস।</span></p>
    </div>

    <section class="py-12 px-6 md:px-12 max-w-5xl mx-auto mt-[-3rem] relative z-20">
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                <h2 class="text-2xl font-bold text-gray-900"><i class="fa-solid fa-cloud-sun-rain text-blue-500 mr-2"></i> <span class="lang-en">Forecast</span><span class="lang-bn hidden">পূর্বাভাস</span></h2>
                <select id="loc-select" onchange="updateWeather()" class="bg-gray-50 border border-gray-200 font-bold rounded-xl px-4 py-2 outline-none">
                    <option value="Dhaka">Dhaka</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Sylhet">Sylhet</option>
                </select>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4" id="weather-grid">
                <!-- populated by JS -->
            </div>
        </div>
    </section>

    <!-- FLOATING AI BUTTON -->
    <button onclick="askAI()" class="fixed right-6 bottom-24 bg-f-dark text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-3 group border-2 border-white">
        <i class="fa-solid fa-robot text-2xl group-hover:animate-bounce"></i>
        <span class="font-bold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap"><span class="lang-en">Chat with AI</span><span class="lang-bn hidden">এআই-কে প্রশ্ন করুন</span></span>
    </button>

    \${FOOTER}
    <script>
        const weatherData = {
            'Dhaka': [ {dayEn:'Today', dayBn:'আজ', icon:'fa-cloud-sun', temp:'32°C', descEn:'Partly Cloudy', descBn:'আংশিক মেঘলা'}, {dayEn:'Tomorrow', dayBn:'আগামীকাল', icon:'fa-sun', temp:'34°C', descEn:'Sunny', descBn:'রৌদ্রোজ্জ্বল'}, {dayEn:'Wed', dayBn:'বুধ', icon:'fa-cloud-rain', temp:'28°C', descEn:'Light Rain', descBn:'হালকা বৃষ্টি'}, {dayEn:'Thu', dayBn:'বৃহঃ', icon:'fa-cloud-showers-heavy', temp:'26°C', descEn:'Heavy Rain', descBn:'ভারী বৃষ্টি'}, {dayEn:'Fri', dayBn:'শুক্র', icon:'fa-cloud', temp:'29°C', descEn:'Cloudy', descBn:'মেঘলা'} ],
            'Rajshahi': [ {dayEn:'Today', dayBn:'আজ', icon:'fa-sun', temp:'36°C', descEn:'Very Hot', descBn:'তীব্র গরম'}, {dayEn:'Tomorrow', dayBn:'আগামীকাল', icon:'fa-sun', temp:'37°C', descEn:'Sunny', descBn:'রৌদ্রোজ্জ্বল'}, {dayEn:'Wed', dayBn:'বুধ', icon:'fa-cloud-sun', temp:'35°C', descEn:'Partly Cloudy', descBn:'আংশিক মেঘলা'}, {dayEn:'Thu', dayBn:'বৃহঃ', icon:'fa-cloud-sun', temp:'34°C', descEn:'Partly Cloudy', descBn:'আংশিক মেঘলা'}, {dayEn:'Fri', dayBn:'শুক্র', icon:'fa-sun', temp:'36°C', descEn:'Sunny', descBn:'রৌদ্রোজ্জ্বল'} ],
            'Sylhet': [ {dayEn:'Today', dayBn:'আজ', icon:'fa-cloud-showers-heavy', temp:'25°C', descEn:'Heavy Rain', descBn:'ভারী বৃষ্টি'}, {dayEn:'Tomorrow', dayBn:'আগামীকাল', icon:'fa-cloud-rain', temp:'26°C', descEn:'Rain', descBn:'বৃষ্টি'}, {dayEn:'Wed', dayBn:'বুধ', icon:'fa-cloud-rain', temp:'26°C', descEn:'Rain', descBn:'বৃষ্টি'}, {dayEn:'Thu', dayBn:'বৃহঃ', icon:'fa-cloud', temp:'28°C', descEn:'Cloudy', descBn:'মেঘলা'}, {dayEn:'Fri', dayBn:'শুক্র', icon:'fa-cloud-sun', temp:'29°C', descEn:'Partly Cloudy', descBn:'আংশিক মেঘলা'} ]
        };

        function updateWeather() {
            const loc = document.getElementById('loc-select').value;
            const data = weatherData[loc];
            let html = '';
            data.forEach((d, i) => {
                const isToday = i === 0;
                html += \`
                    <div class="\${isToday ? 'col-span-2 md:col-span-1 bg-blue-50 border-blue-200 shadow-sm' : 'bg-gray-50 border-gray-100'} border rounded-2xl p-4 text-center flex flex-col items-center justify-center transition hover:shadow-md">
                        <div class="font-bold text-gray-500 mb-2">\${currentLang === 'en' ? d.dayEn : d.dayBn}</div>
                        <i class="fa-solid \${d.icon} text-4xl \${d.icon.includes('rain') || d.icon.includes('showers') ? 'text-blue-400' : 'text-yellow-400'} mb-3"></i>
                        <div class="text-2xl font-black text-gray-900">\${d.temp}</div>
                        <div class="text-sm font-bold text-gray-500 mt-1">\${currentLang === 'en' ? d.descEn : d.descBn}</div>
                    </div>
                \`;
            });
            document.getElementById('weather-grid').innerHTML = html;
        }

        function askAI() {
            const loc = document.getElementById('loc-select').value;
            const msgEn = \`I am looking at the weather forecast for \${loc}. Based on this, what agricultural steps should I take today?\`;
            const msgBn = \`আমি \${loc}-এর আবহাওয়া দেখছি। এই আবহাওয়ার ওপর ভিত্তি করে আমার আজ কী কৃষি পদক্ষেপ নেওয়া উচিত?\`;
            openServiceChat(msgEn, msgBn);
        }

        window.addEventListener('DOMContentLoaded', updateWeather);
        const origToggleW = window.toggleLanguage;
        window.toggleLanguage = function() { origToggleW(); setTimeout(updateWeather, 50); };
    </script>
</body>
</html>`;

// ==========================================
// 2. MEDICINE APP
// ==========================================
const medicineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    \${HEAD}
    <title>Medicine Dosage - Foshol AI</title>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">
    \${NAVBAR}
    <div class="bg-teal-600 py-12 text-center relative overflow-hidden">
        <h1 class="text-4xl font-bold text-white mb-4"><span class="lang-en">Medicine Dosage</span><span class="lang-bn hidden">ওষুধের সঠিক মাত্রা</span></h1>
        <p class="text-teal-100 max-w-2xl mx-auto"><span class="lang-en">Find exactly which medicine to use and the proper dosage.</span><span class="lang-bn hidden">কোন রোগের জন্য কোন ওষুধ এবং সঠিক মাত্রা কত তা জেনে নিন।</span></p>
    </div>

    <section class="py-12 px-6 md:px-12 max-w-5xl mx-auto mt-[-3rem] relative z-20">
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
                <div>
                    <label class="block text-sm font-bold text-gray-500 mb-2 uppercase"><span class="lang-en">Select Crop</span><span class="lang-bn hidden">ফসল নির্বাচন করুন</span></label>
                    <select id="crop-select" onchange="updateMed()" class="w-full bg-gray-50 border border-gray-200 font-bold rounded-xl px-4 py-3 outline-none">
                        <option value="Rice" data-bn="ধান">Rice (ধান)</option>
                        <option value="Potato" data-bn="আলু">Potato (আলু)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-500 mb-2 uppercase"><span class="lang-en">Select Problem</span><span class="lang-bn hidden">সমস্যা নির্বাচন করুন</span></label>
                    <select id="prob-select" onchange="updateMed()" class="w-full bg-gray-50 border border-gray-200 font-bold rounded-xl px-4 py-3 outline-none">
                        <option value="Fungus" data-bn="ছত্রাক/পচন">Fungus / Blight (ছত্রাক/পচন)</option>
                        <option value="Insects" data-bn="পোকামাকড়">Insects / Pests (পোকামাকড়)</option>
                    </select>
                </div>
            </div>
            
            <div id="med-results" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </div>
    </section>

    <!-- FLOATING AI BUTTON -->
    <button onclick="askAI()" class="fixed right-6 bottom-24 bg-f-dark text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-3 group border-2 border-white">
        <i class="fa-solid fa-robot text-2xl group-hover:animate-bounce"></i>
        <span class="font-bold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap"><span class="lang-en">Chat with AI</span><span class="lang-bn hidden">এআই-কে প্রশ্ন করুন</span></span>
    </button>

    \${FOOTER}
    <script>
        const meds = {
            'Rice_Fungus': [{ name: 'Amistar Top', dose: '1 ml / 1 L water' }, { name: 'Score', dose: '0.5 ml / 1 L water' }],
            'Rice_Insects': [{ name: 'Virtako', dose: '1.5 g / 10 L water' }, { name: 'Voliam Flexi', dose: '1 ml / 1 L water' }],
            'Potato_Fungus': [{ name: 'Melody Duo', dose: '2 g / 1 L water' }, { name: 'Acrobat MZ', dose: '2 g / 1 L water' }],
            'Potato_Insects': [{ name: 'Confidor', dose: '0.5 ml / 1 L water' }, { name: 'Actara', dose: '1 g / 5 L water' }]
        };

        function updateMed() {
            const crop = document.getElementById('crop-select').value;
            const prob = document.getElementById('prob-select').value;
            const key = crop + '_' + prob;
            const data = meds[key] || [];
            
            let html = '';
            data.forEach(m => {
                html += \`
                    <div class="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex items-start gap-4">
                        <div class="w-12 h-12 bg-teal-200 text-teal-700 rounded-full flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-prescription-bottle-medical"></i></div>
                        <div>
                            <h3 class="text-xl font-black text-teal-900 mb-1">\${m.name}</h3>
                            <div class="text-teal-700 font-bold bg-white inline-block px-3 py-1 rounded-lg border border-teal-100 mt-2">Dose: \${m.dose}</div>
                        </div>
                    </div>
                \`;
            });
            document.getElementById('med-results').innerHTML = html;
        }

        function askAI() {
            const cropSel = document.getElementById('crop-select');
            const probSel = document.getElementById('prob-select');
            const crop = cropSel.options[cropSel.selectedIndex].text;
            const prob = probSel.options[probSel.selectedIndex].text;
            
            const msgEn = \`I am having \${prob} issues on my \${crop}. I checked the suggested medicines, but can you give me detailed application instructions?\`;
            const msgBn = \`আমার \${crop}-এ \${prob}-এর সমস্যা হয়েছে। আমি ওষুধের নাম দেখেছি, কিন্তু কীভাবে স্প্রে করব তার বিস্তারিত নিয়ম জানতে চাই।\`;
            openServiceChat(msgEn, msgBn);
        }

        window.addEventListener('DOMContentLoaded', updateMed);
    </script>
</body>
</html>`;

// ==========================================
// 3. FERTILIZER APP
// ==========================================
const fertilizerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    \${HEAD}
    <title>Fertilizer Calculator - Foshol AI</title>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">
    \${NAVBAR}
    <div class="bg-purple-600 py-12 text-center relative overflow-hidden">
        <h1 class="text-4xl font-bold text-white mb-4"><span class="lang-en">Fertilizer Calculator</span><span class="lang-bn hidden">সার ক্যালকুলেটর</span></h1>
        <p class="text-purple-100 max-w-2xl mx-auto"><span class="lang-en">Smart calculator for accurate fertilizer measurement.</span><span class="lang-bn hidden">জমির পরিমাণ অনুযায়ী সঠিক সারের হিসাব করুন নিমিষেই।</span></p>
    </div>

    <section class="py-12 px-6 md:px-12 max-w-5xl mx-auto mt-[-3rem] relative z-20">
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-8">
            <div class="md:col-span-2 space-y-6">
                <div>
                    <label class="block text-sm font-bold text-gray-500 mb-2 uppercase"><span class="lang-en">Select Crop</span><span class="lang-bn hidden">ফসল নির্বাচন করুন</span></label>
                    <select id="fert-crop" onchange="calcFert()" class="w-full bg-gray-50 border border-gray-200 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="Rice">BRRI Dhan 28/29 (ধান)</option>
                        <option value="Potato">Potato (আলু)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-500 mb-2 uppercase"><span class="lang-en">Land Size (Decimal/Shotok)</span><span class="lang-bn hidden">জমির পরিমাণ (শতক)</span></label>
                    <input type="number" id="fert-land" value="33" oninput="calcFert()" class="w-full bg-gray-50 border border-gray-200 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500">
                </div>
            </div>
            
            <div class="md:col-span-3 bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 class="text-lg font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2"><span class="lang-en">Required Fertilizer</span><span class="lang-bn hidden">প্রয়োজনীয় সারের পরিমাণ</span></h3>
                <div class="space-y-4" id="fert-results">
                    <!-- Populated via JS -->
                </div>
            </div>
        </div>
    </section>

    <!-- FLOATING AI BUTTON -->
    <button onclick="askAI()" class="fixed right-6 bottom-24 bg-f-dark text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-3 group border-2 border-white">
        <i class="fa-solid fa-robot text-2xl group-hover:animate-bounce"></i>
        <span class="font-bold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap"><span class="lang-en">Chat with AI</span><span class="lang-bn hidden">এআই-কে প্রশ্ন করুন</span></span>
    </button>

    \${FOOTER}
    <script>
        // Values per decimal (shotok) in KG
        const rates = {
            'Rice': { Urea: 0.9, TSP: 0.4, MoP: 0.5, Gypsum: 0.3 },
            'Potato': { Urea: 1.2, TSP: 0.8, MoP: 1.0, Gypsum: 0.5 }
        };

        function calcFert() {
            const crop = document.getElementById('fert-crop').value;
            const land = parseFloat(document.getElementById('fert-land').value) || 0;
            const r = rates[crop];
            
            const html = \`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"><div class="font-bold text-gray-700">Urea (ইউরিয়া)</div><div class="font-black text-purple-700 text-lg">\${(r.Urea * land).toFixed(1)} kg</div></div>
                <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"><div class="font-bold text-gray-700">TSP (টিএসপি)</div><div class="font-black text-purple-700 text-lg">\${(r.TSP * land).toFixed(1)} kg</div></div>
                <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"><div class="font-bold text-gray-700">MoP (এমওপি)</div><div class="font-black text-purple-700 text-lg">\${(r.MoP * land).toFixed(1)} kg</div></div>
                <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"><div class="font-bold text-gray-700">Gypsum (জিপসাম)</div><div class="font-black text-purple-700 text-lg">\${(r.Gypsum * land).toFixed(1)} kg</div></div>
            \`;
            document.getElementById('fert-results').innerHTML = html;
        }

        function askAI() {
            const cropSel = document.getElementById('fert-crop');
            const crop = cropSel.options[cropSel.selectedIndex].text;
            const land = document.getElementById('fert-land').value;
            
            const msgEn = \`I am preparing \${land} decimals of land for \${crop}. I calculated the fertilizer, but how many splits/installments should I apply it in?\`;
            const msgBn = \`আমি \${land} শতক জমিতে \${crop} চাষের জন্য সার হিসাব করেছি। এই সারগুলো কীভাবে এবং কত কিস্তিতে জমিতে প্রয়োগ করব?\`;
            openServiceChat(msgEn, msgBn);
        }

        window.addEventListener('DOMContentLoaded', calcFert);
    </script>
</body>
</html>`;


function generateFile(name, template) {
    const finalHtml = template
        .replace('\\${HEAD}', headCode)
        .replace('\\${NAVBAR}', navbarCode)
        .replace('\\${FOOTER}', footerCode);
    writeFile(name, finalHtml);
}

generateFile('weather.html', weatherHtml);
generateFile('medicine.html', medicineHtml);
generateFile('fertilizer.html', fertilizerHtml);

// 4. Update services.html buttons
let servicesHtml = readFile('services.html');

// Replace Weather
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('What is the weather like today\?', 'আজকের আবহাওয়া কেমন\?'\)"/g, 
    'onclick="window.location.href=\'/weather\'"'
);
// Replace Medicine
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('I need medicine dosage for my crops\.', 'আমার ফসলের জন্য সঠিক ওষুধের মাত্রা জানতে চাই।'\)"/g,
    'onclick="window.location.href=\'/medicine\'"'
);
// Replace Fertilizer
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('Help me calculate the fertilizer for my land\.', 'আমার জমির জন্য সারের হিসাব করে দিন।'\)"/g,
    'onclick="window.location.href=\'/fertilizer\'"'
);

writeFile('services.html', servicesHtml);

// 5. Update market.html to have the floating AI button
let marketHtml = readFile('market.html');
const floatingBtn = `
    <!-- FLOATING AI BUTTON -->
    <button onclick="askAI()" class="fixed right-6 bottom-24 bg-f-dark text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-3 group border-2 border-white">
        <i class="fa-solid fa-robot text-2xl group-hover:animate-bounce"></i>
        <span class="font-bold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap"><span class="lang-en">Chat with AI</span><span class="lang-bn hidden">এআই-কে প্রশ্ন করুন</span></span>
    </button>
`;
const askAIFunc = `
        function askAI() {
            const loc = document.getElementById('location-select').options[document.getElementById('location-select').selectedIndex].text;
            const msgEn = \`I am checking the crop market prices in \${loc}. What crops should I sell today for the highest profit?\`;
            const msgBn = \`আমি \${loc}-এর বাজারের ফসলের দাম দেখছি। আজ কোন ফসল বিক্রি করলে আমি সবচেয়ে বেশি লাভ পাবো?\`;
            openServiceChat(msgEn, msgBn);
        }
`;

if (!marketHtml.includes('askAI()')) {
    marketHtml = marketHtml.replace('<!-- FOOTER INJECTED HERE -->', floatingBtn + '\n    <!-- FOOTER INJECTED HERE -->');
    marketHtml = marketHtml.replace('function updateChart() {', askAIFunc + '\n        function updateChart() {');
    writeFile('market.html', marketHtml);
}

console.log('Tools generated and updated successfully!');
