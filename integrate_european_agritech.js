const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// =========================================================================
// 1. SMART SPRAYING WINDOW (FOR WEATHER.HTML & MEDICINE.HTML)
// =========================================================================
const sprayWindowSnippet = `
            <!-- EUROPEAN PRECISION AGRONOMY: SMART SPRAYING WINDOW -->
            <div class="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 md:p-8 rounded-[2rem] border border-emerald-200/80 shadow-sm">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-emerald-200/60 pb-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="bg-emerald-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">xarvio-Inspired Precision</span>
                            <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Delta-T: 4.8 (Optimal)</span>
                        </div>
                        <h3 class="text-xl md:text-2xl font-black text-emerald-950 flex items-center gap-2">
                            <i class="fa-solid fa-spray-can-sparkles text-emerald-600"></i>
                            <span class="lang-en">Smart Spraying Window (24h Forecast)</span>
                            <span class="lang-bn hidden">স্মার্ট স্প্রে করার সেরা সময় (২৪ ঘণ্টার পূর্বাভাস)</span>
                        </h3>
                    </div>
                    <div class="bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                        <span class="text-xs font-black text-emerald-900 uppercase tracking-wide">
                            <span class="lang-en">🟢 Prime Window Active Now</span>
                            <span class="lang-bn hidden">🟢 এখন স্প্রে করার আদর্শ সময়</span>
                        </span>
                    </div>
                </div>

                <!-- Telemetry Indices -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-center">
                    <div class="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                        <div class="text-xs text-gray-400 font-bold uppercase">Wind Velocity</div>
                        <div class="text-lg font-black text-emerald-900 mt-0.5">4.2 km/h</div>
                        <div class="text-[11px] text-emerald-600 font-bold">Ideal (&lt; 10 km/h)</div>
                    </div>
                    <div class="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                        <div class="text-xs text-gray-400 font-bold uppercase">Rain Risk (6h)</div>
                        <div class="text-lg font-black text-emerald-900 mt-0.5">0%</div>
                        <div class="text-[11px] text-emerald-600 font-bold">No Washout Threat</div>
                    </div>
                    <div class="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                        <div class="text-xs text-gray-400 font-bold uppercase">Air Humidity</div>
                        <div class="text-lg font-black text-emerald-900 mt-0.5">64%</div>
                        <div class="text-[11px] text-emerald-600 font-bold">Optimal Absorption</div>
                    </div>
                    <div class="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                        <div class="text-xs text-gray-400 font-bold uppercase">Leaf Wetness</div>
                        <div class="text-lg font-black text-emerald-900 mt-0.5">Dry (12%)</div>
                        <div class="text-[11px] text-emerald-600 font-bold">Zero Droplet Dilution</div>
                    </div>
                </div>

                <!-- 24h Visual Timeline Bar -->
                <div class="space-y-2">
                    <div class="flex justify-between text-xs font-bold text-gray-500 px-1">
                        <span>06:00 (ভোর)</span>
                        <span>10:00 (সকাল)</span>
                        <span>14:00 (দুপুর)</span>
                        <span>18:00 (সন্ধ্যা)</span>
                        <span>22:00 (রাত)</span>
                    </div>
                    <div class="grid grid-cols-4 gap-1.5 h-11 rounded-2xl p-1 bg-white border border-emerald-200 shadow-inner">
                        <!-- Morning Window (Green) -->
                        <div class="bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-black transition cursor-pointer" title="06:00 - 09:30: Safe, calm wind, rapid canopy uptake">
                            <span>06:00 - 09:30 • 🟢 Optimal</span>
                        </div>
                        <!-- Midday Sun (Red) -->
                        <div class="bg-red-400 hover:bg-red-500 rounded-xl flex items-center justify-center text-white text-xs font-black transition cursor-pointer" title="10:00 - 15:30: High solar heat, chemical volatilization hazard">
                            <span>10:00 - 15:30 • 🔴 High Heat</span>
                        </div>
                        <!-- Afternoon Window (Green) -->
                        <div class="bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-black transition cursor-pointer" title="16:00 - 18:30: Prime spray window, minimal droplet drift">
                            <span>16:00 - 18:30 • 🟢 Prime</span>
                        </div>
                        <!-- Night Dew (Amber) -->
                        <div class="bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center text-amber-950 text-xs font-black transition cursor-pointer" title="19:00 - Dawn: Heavy dew condensation causes chemical runoff">
                            <span>19:00+ • 🟡 Dew Runoff</span>
                        </div>
                    </div>
                </div>

                <div class="mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-900 gap-2 font-medium">
                    <span><i class="fa-solid fa-circle-info text-emerald-600 mr-1"></i> <span class="lang-en">European precision rule: Never spray when temperature exceeds 32°C or wind &gt; 12 km/h.</span><span class="lang-bn hidden">ইউরোপীয় ফর্মুলা: ৩২ ডিগ্রি সেলসিয়াসের বেশি গরম বা ঝড়ো বাতাসে স্প্রে করলে ঔষধ নষ্ট হয় ও পাতা পুড়ে যায়।</span></span>
                    <button onclick="askAI()" class="font-black text-emerald-800 hover:underline flex items-center gap-1"><i class="fa-solid fa-calculator"></i> <span class="lang-en">Get Custom Spray Alert</span><span class="lang-bn hidden">স্প্রে অ্যালার্ট সেট করুন</span></button>
                </div>
            </div>
`;

// Update weather.html with Smart Spray Window
let weatherHtml = fs.readFileSync(path.join(dir, 'weather.html'), 'utf8');
if (!weatherHtml.includes('EUROPEAN PRECISION AGRONOMY: SMART SPRAYING WINDOW')) {
    weatherHtml = weatherHtml.replace('<!-- Agro Insight Card -->', sprayWindowSnippet + '\n            <!-- Agro Insight Card -->');
    fs.writeFileSync(path.join(dir, 'weather.html'), weatherHtml, 'utf8');
    console.log('weather.html updated with Smart Spraying Window!');
}

// Update medicine.html with Smart Spray Window
let medicineHtml = fs.readFileSync(path.join(dir, 'medicine.html'), 'utf8');
if (!medicineHtml.includes('EUROPEAN PRECISION AGRONOMY: SMART SPRAYING WINDOW')) {
    medicineHtml = medicineHtml.replace('<div id="med-results"', sprayWindowSnippet + '\n            <div id="med-results"');
    fs.writeFileSync(path.join(dir, 'medicine.html'), medicineHtml, 'utf8');
    console.log('medicine.html updated with Smart Spraying Window!');
}


// =========================================================================
// 2. SATELLITE NDVI FIELD HEALTH VISUALIZER (FOR SERVICES.HTML)
// =========================================================================
const satelliteSectionSnippet = `
        <!-- EUROPEAN SATELLITE NDVI FIELD MONITORING SIMULATOR -->
        <div class="my-20 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden relative">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-gray-100">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-indigo-100 text-indigo-800 font-black text-xs uppercase px-3 py-1 rounded-full">
                            <i class="fa-solid fa-satellite mr-1"></i> Sentinel-2 & Copernicus Satellite Data
                        </span>
                        <span class="bg-green-100 text-green-800 font-bold text-xs px-2.5 py-1 rounded-full">OneSoil & Atfarm Standard</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-black text-gray-900">
                        <span class="lang-en">Satellite NDVI Field Health Monitoring</span>
                        <span class="lang-bn hidden">স্যাটেলাইট ক্রপ হেলথ ও বায়োমাস মনিটরিং</span>
                    </h2>
                    <p class="text-gray-500 text-sm md:text-base mt-1">
                        <span class="lang-en">Monitor vegetative biomass, detect hidden disease patches, and prevent waterlogging from space at 10-meter resolution.</span>
                        <span class="lang-bn hidden">মহাকাশের স্যাটেলাইট ডাটা দিয়ে ফসলের পাতা, ক্লোরোফিল ও মাটির আর্দ্রতা পরীক্ষা করে জমির রোগগ্রস্ত অংশ ঘরে বসেই চিহ্নিত করুন।</span>
                    </p>
                </div>

                <!-- Plot Selector Dropdown -->
                <div class="w-full lg:w-72">
                    <label class="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Select Monitored Field Plot</label>
                    <select id="satellite-plot-select" onchange="updateSatelliteDemo()" class="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="plotA">Plot A: Boro Paddy (Rajshahi • 2.4 Acres)</option>
                        <option value="plotB">Plot B: Diamond Potato (Munshiganj • 1.8 Acres)</option>
                        <option value="plotC">Plot C: Mustard & Corn (Bogura • 3.1 Acres)</option>
                    </select>
                </div>
            </div>

            <!-- Interactive Visualizer Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-900 text-white rounded-[2.5rem] p-6 md:p-8 overflow-hidden relative">
                <!-- Left: Satellite Map Viewport -->
                <div class="lg:col-span-7 relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                    <img id="satellite-img" src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000" class="w-full h-full object-cover transition-all duration-700 brightness-95" alt="Field Satellite View">
                    
                    <!-- NDVI Heatmap Canvas Simulation Overlay -->
                    <div id="ndvi-overlay" class="absolute inset-0 bg-gradient-to-tr from-emerald-500/50 via-amber-400/40 to-red-500/50 mix-blend-multiply opacity-90 transition-opacity duration-500"></div>

                    <!-- Scan Coordinates Badge -->
                    <div class="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        <span id="satellite-coords">LAT: 24.3636° N • LON: 88.6241° E</span>
                    </div>

                    <!-- NDVI Legend Overlay -->
                    <div class="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-wrap justify-between items-center text-[11px] font-bold">
                        <span class="text-gray-300">NDVI Scale:</span>
                        <span class="flex items-center gap-1 text-emerald-400"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> High Biomass (&gt;0.75)</span>
                        <span class="flex items-center gap-1 text-amber-300"><span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Moisture Stress (0.50)</span>
                        <span class="flex items-center gap-1 text-red-400"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Disease Patch (&lt;0.35)</span>
                    </div>

                    <!-- Toggle View Mode Button -->
                    <button onclick="toggleNdviMode()" class="absolute top-4 right-4 bg-white text-gray-900 font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-gray-100 shadow transition flex items-center gap-1.5">
                        <i class="fa-solid fa-layer-group text-indigo-600"></i> <span id="ndvi-toggle-text">Toggle TrueColor View</span>
                    </button>
                </div>

                <!-- Right: Agronomic Telemetry Dashboard -->
                <div class="lg:col-span-5 space-y-5">
                    <div class="flex justify-between items-center border-b border-white/10 pb-3">
                        <div>
                            <div class="text-xs text-gray-400 font-bold uppercase tracking-wider">Vegetative Index (NDVI)</div>
                            <div class="text-3xl font-black text-emerald-400 flex items-center gap-2" id="sat-ndvi-score">
                                0.78 <span class="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full uppercase">Healthy Canopy</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="text-xs text-gray-400 font-bold block uppercase">Satellite Pass</span>
                            <span class="text-sm font-bold text-white">Sentinel-2 • 4h ago</span>
                        </div>
                    </div>

                    <!-- Health Indices -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                            <div class="text-xs text-gray-400 font-bold uppercase">Nitrogen Uptake</div>
                            <div class="text-lg font-black text-white mt-0.5" id="sat-nitrogen">84 kg N/ha</div>
                            <div class="text-[11px] text-emerald-400 font-bold">Optimal Range</div>
                        </div>
                        <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                            <div class="text-xs text-gray-400 font-bold uppercase">Soil Moisture</div>
                            <div class="text-lg font-black text-white mt-0.5" id="sat-moisture">68% Field Cap.</div>
                            <div class="text-[11px] text-amber-300 font-bold">Dry Patch (Zone B)</div>
                        </div>
                    </div>

                    <!-- AI Diagnostic Prescription from Satellite -->
                    <div class="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-2">
                        <div class="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                            <i class="fa-solid fa-triangle-exclamation text-amber-400"></i>
                            <span class="lang-en">Anomaly Detected in Northeast Quadrant</span>
                            <span class="lang-bn hidden">উত্তর-পূর্ব কোণে অসঙ্গতি শনাক্ত হয়েছে</span>
                        </div>
                        <p class="text-xs text-gray-300 leading-relaxed" id="sat-anomaly-desc">
                            NDVI drop of 18% detected over 0.4 acres in Sector B2. Likely early-stage fungal blight or irrigation blockage. High-resolution ground scouting recommended.
                        </p>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button onclick="openServiceChat('Show me the satellite NDVI analysis for my farm plot in detail', 'আমার জমিতে স্যাটেলাইট NDVI এনালাইসিস করে বিস্তারিত রিপোর্ট দিন')" class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-4 rounded-xl text-xs hover:shadow-lg transition flex items-center justify-center gap-2 shadow">
                            <i class="fa-solid fa-robot"></i> <span class="lang-en">Chat with Satellite AI</span><span class="lang-bn hidden">স্যাটেলাইট এআই রিপোর্ট</span>
                        </button>
                        <button onclick="openPitchModal()" class="border border-white/30 text-white font-bold py-3 px-4 rounded-xl text-xs hover:bg-white/10 transition">
                            <i class="fa-solid fa-chart-line mr-1"></i> Data API
                        </button>
                    </div>
                </div>
            </div>
        </div>
`;

// Add JS for Satellite Demo in services.html
const satelliteDemoScript = `
    <!-- Satellite NDVI Simulator Logic -->
    <script>
        const plotData = {
            'plotA': {
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000',
                coords: 'LAT: 24.3636° N • LON: 88.6241° E (Rajshahi)',
                ndvi: '0.78',
                ndviStatus: 'Healthy Canopy (গাছের ঘন বৃদ্ধি)',
                nitrogen: '84 kg N/ha',
                moisture: '68% Field Cap.',
                descEn: 'NDVI drop of 18% detected over 0.4 acres in Sector B2. Likely early-stage fungal blight or irrigation blockage. Ground scouting recommended.',
                descBn: 'সেক্টর বি২-এর ০.৪ একর অংশে ১৮% পাতার ঘনত্ব হ্রাস পেয়েছে। সম্ভাব্য ব্লাস্ট রোগ অথবা পানি স্বল্পতার কারণে এমন হতে পারে। মাঠ পরিদর্শনের পরামর্শ রইল।'
            },
            'plotB': {
                img: 'https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?w=1000',
                coords: 'LAT: 23.5422° N • LON: 90.5305° E (Munshiganj)',
                ndvi: '0.62',
                ndviStatus: 'Moisture Stressed (আর্দ্রতা ঘাটতি)',
                nitrogen: '65 kg N/ha',
                moisture: '42% Field Cap. (Low)',
                descEn: 'Low soil moisture detected across central ridge. Immediate shallow irrigation recommended within 24 hours to prevent tuber heat stress.',
                descBn: 'মাটির আর্দ্রতা ৪২%-এ নেমে গেছে। আলুর গঠন ঠিক রাখতে আগামী ২৪ ঘণ্টার মধ্যে হালকা সেচ দেওয়ার জন্য এআই জোরালো পরামর্শ দিচ্ছে।'
            },
            'plotC': {
                img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1000',
                coords: 'LAT: 24.8465° N • LON: 89.3777° E (Bogura)',
                ndvi: '0.85',
                ndviStatus: 'Peak Vegetative Stage (সর্বোচ্চ ফলন সম্ভাবনা)',
                nitrogen: '95 kg N/ha',
                moisture: '74% Field Cap.',
                descEn: 'Exceptional canopy density and chlorophyll index. Projected harvest yield +22% higher than regional average.',
                descBn: 'জমির পাতার ক্লোরোফিল ও ঘনত্ব চমৎকার অবস্থায় আছে। চলতি মৌসুমে আঞ্চলিক গড় ফলনের চেয়ে ২২% বেশি উৎপাদনের সম্ভাবনা দেখা যাচ্ছে।'
            }
        };

        let ndviVisible = true;

        function updateSatelliteDemo() {
            const plotKey = document.getElementById('satellite-plot-select').value;
            const p = plotData[plotKey];
            
            document.getElementById('satellite-img').src = p.img;
            document.getElementById('satellite-coords').innerText = p.coords;
            document.getElementById('sat-ndvi-score').innerHTML = p.ndvi + ' <span class="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full uppercase">' + p.ndviStatus + '</span>';
            document.getElementById('sat-nitrogen').innerText = p.nitrogen;
            document.getElementById('sat-moisture').innerText = p.moisture;
            document.getElementById('sat-anomaly-desc').innerHTML = currentLang === 'en' ? p.descEn : p.descBn;
        }

        function toggleNdviMode() {
            ndviVisible = !ndviVisible;
            const overlay = document.getElementById('ndvi-overlay');
            const text = document.getElementById('ndvi-toggle-text');
            if(ndviVisible) {
                overlay.style.opacity = '0.9';
                text.innerText = 'Toggle TrueColor View';
            } else {
                overlay.style.opacity = '0';
                text.innerText = 'Show NDVI Heatmap';
            }
        }
    </script>
`;

let servicesHtml = fs.readFileSync(path.join(dir, 'services.html'), 'utf8');
if (!servicesHtml.includes('EUROPEAN SATELLITE NDVI FIELD MONITORING SIMULATOR')) {
    servicesHtml = servicesHtml.replace('<!-- Category B: Ecosystem (Page-like) -->', satelliteSectionSnippet + '\n        <!-- Category B: Ecosystem (Page-like) -->');
    servicesHtml = servicesHtml.replace('</body>', satelliteDemoScript + '\n</body>');
    fs.writeFileSync(path.join(dir, 'services.html'), servicesHtml, 'utf8');
    console.log('services.html updated with Satellite NDVI Visualizer!');
}


// =========================================================================
// 3. ESG & CLIMATE RESILIENCE COUNTER (FOR INDEX.HTML & ABOUT.HTML)
// =========================================================================
const esgSnippet = `
    <!-- ESG & CLIMATE RESILIENCE IMPACT (INSTITUTIONAL INVESTOR METRICS) -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto my-12 bg-emerald-950 text-white rounded-[3rem] shadow-xl border border-emerald-800/80 relative overflow-hidden">
        <div class="relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-emerald-800 pb-6">
                <div>
                    <span class="bg-emerald-800 text-emerald-300 font-black text-xs uppercase px-3.5 py-1 rounded-full inline-block mb-3 tracking-wider">
                        <i class="fa-solid fa-earth-americas mr-1 text-emerald-400"></i> ESG Compliance & Climate-Smart Impact
                    </span>
                    <h2 class="text-3xl md:text-4xl font-black">
                        <span class="lang-en">Committed to UN Sustainable Goals (SDG 1, 2, 13)</span>
                        <span class="lang-bn hidden">জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG) অর্জন</span>
                    </h2>
                    <p class="text-emerald-200/80 text-sm mt-1 max-w-2xl">
                        <span class="lang-en">Driving regenerative agriculture in Bangladesh by reducing chemical overdosing, protecting groundwater tables, and measuring soil carbon.</span>
                        <span class="lang-bn hidden">অতিরিক্ত কীটনাশকের বিষাক্ততা রোধ, ভূগর্ভস্থ পানির অপচয় কমানো এবং মাটির স্বাস্থ্য রক্ষায় পরিবেশবান্ধব কৃষি বিপ্লব।</span>
                    </p>
                </div>
                <div class="flex items-center gap-2 bg-emerald-900/90 px-4 py-2 rounded-2xl border border-emerald-700">
                    <i class="fa-solid fa-leaf text-emerald-400 text-xl"></i>
                    <span class="text-xs font-black text-white uppercase tracking-wider">Audited Carbon Metrics</span>
                </div>
            </div>

            <!-- 4 Climate Metrics Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div class="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                    <div class="text-3xl md:text-4xl font-black text-emerald-400 mb-1">142 Tons</div>
                    <div class="text-xs font-bold uppercase text-emerald-200"><span class="lang-en">Pesticide Runoff Averted</span><span class="lang-bn hidden">কীটনাশক বিষাক্ততা রোধ</span></div>
                    <p class="text-[11px] text-emerald-300/60 mt-1">Through targeted disease spot-spraying</p>
                </div>
                <div class="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                    <div class="text-3xl md:text-4xl font-black text-amber-400 mb-1">28,000 KG</div>
                    <div class="text-xs font-bold uppercase text-emerald-200"><span class="lang-en">Soil Carbon Preserved</span><span class="lang-bn hidden">মাটির কার্বন সংরক্ষণ</span></div>
                    <p class="text-[11px] text-emerald-300/60 mt-1">Via balanced N-P-K nutrient schedules</p>
                </div>
                <div class="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                    <div class="text-3xl md:text-4xl font-black text-blue-400 mb-1">35% Less</div>
                    <div class="text-xs font-bold uppercase text-emerald-200"><span class="lang-en">Groundwater Waste</span><span class="lang-bn hidden">ভূগর্ভস্থ পানি সাশ্রয়</span></div>
                    <p class="text-[11px] text-emerald-300/60 mt-1">Using satellite evapotranspiration data</p>
                </div>
                <div class="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                    <div class="text-3xl md:text-4xl font-black text-f-gold mb-1">৳14,500</div>
                    <div class="text-xs font-bold uppercase text-emerald-200"><span class="lang-en">Net Savings / Acre</span><span class="lang-bn hidden">একর প্রতি খরচ সাশ্রয়</span></div>
                    <p class="text-[11px] text-emerald-300/60 mt-1">Direct increase in farmer household profit</p>
                </div>
            </div>
        </div>
    </section>
`;

// Insert ESG section into index.html
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if (!indexHtml.includes('ESG & CLIMATE RESILIENCE IMPACT')) {
    indexHtml = indexHtml.replace('<!-- Footer -->', esgSnippet + '\n    <!-- Footer -->');
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');
    console.log('index.html updated with ESG & Climate Resilience Section!');
}

// Insert ESG section into about.html
let aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');
if (!aboutHtml.includes('ESG & CLIMATE RESILIENCE IMPACT')) {
    aboutHtml = aboutHtml.replace('<!-- Footer -->', esgSnippet + '\n    <!-- Footer -->');
    fs.writeFileSync(path.join(dir, 'about.html'), aboutHtml, 'utf8');
    console.log('about.html updated with ESG & Climate Resilience Section!');
}

console.log('All European AgriTech Features Integrated Successfully!');
