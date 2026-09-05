const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// -------------------------------------------------------------
// 1. UPDATE SERVICES.HTML TILE ONCLICKS & MODAL
// -------------------------------------------------------------
let servicesHtml = fs.readFileSync(path.join(dir, 'services.html'), 'utf8');

// Replace Weather Tile onclick
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('What is the weather forecast for my crop\?', 'আমার এলাকার আজকের আবহাওয়া ও কৃষি পরামর্শ জানতে চাই।'\)"/g,
    'onclick="window.location.href=\'/weather\'"'
);
// Replace Medicine Tile onclick
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('I need medicine dosage for my crop disease\.', 'আমার ফসলের রোগের জন্য সঠিক ঔষধ ও মাত্রা জানতে চাই।'\)"/g,
    'onclick="window.location.href=\'/medicine\'"'
);
// Replace Fertilizer Tile onclick
servicesHtml = servicesHtml.replace(
    /onclick="openServiceChat\('I want to calculate fertilizer for my land\.', 'আমি আমার জমির জন্য সারের পরিমাণ হিসাব করতে চাই।'\)"/g,
    'onclick="window.location.href=\'/fertilizer\'"'
);

// Ensure Pitch Deck button is in navbar if not already
if (!servicesHtml.includes('openPitchModal()')) {
    servicesHtml = servicesHtml.replace(
        '<button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">',
        '<button onclick="openPitchModal()" class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full font-bold text-xs hover:shadow-lg transition flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-briefcase"></i> <span class="lang-en">Pitch Deck</span><span class="lang-bn hidden">ইনভেস্টর ডেক</span></button>\n            <button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">'
    );
}

fs.writeFileSync(path.join(dir, 'services.html'), servicesHtml, 'utf8');
console.log('services.html updated!');

// -------------------------------------------------------------
// 2. ENHANCE INDEX.HTML (IMAGES, AI SIMULATOR, BUSINESS MODEL, DECK)
// -------------------------------------------------------------
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Fix step images
indexHtml = indexHtml.replace(
    'src="images/step1-camera.jpg" onerror="this.src=\'images/slide2.jpg\'"',
    'src="https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);
indexHtml = indexHtml.replace(
    'src="images/step2-upload.jpg" onerror="this.src=\'images/service1.jpg\'"',
    'src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);
indexHtml = indexHtml.replace(
    'src="images/step3-solution.jpg" onerror="this.src=\'images/service3.jpg\'"',
    'src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);

// Add Live AI Leaf Scanner Simulator right after How It Works section
const aiScannerSection = `
    <!-- INTERACTIVE AI LEAF SCANNER SIMULATOR (INVESTOR SHOWCASE) -->
    <section class="py-20 px-6 md:px-12 max-w-7xl mx-auto my-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="bg-emerald-100 text-emerald-900 font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block mb-4 tracking-wider">
                <i class="fa-solid fa-microchip mr-1.5"></i> <span class="lang-en">Proprietary Computer Vision</span><span class="lang-bn hidden">এআই কম্পিউটার ভিশন প্রযুক্তি</span>
            </span>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                <span class="lang-en">Experience Live AI Diagnosis</span>
                <span class="lang-bn hidden">লাইভ এআই রোগ নির্ণয় পরীক্ষা করুন</span>
            </h2>
            <p class="text-gray-600 text-base md:text-lg">
                <span class="lang-en">Test our instant leaf diagnosis model with 1 click. See how Foshol AI pinpoints plant pathology and generates treatment protocols.</span>
                <span class="lang-bn hidden">নিচের যেকোনো আক্রান্ত পাতায় ক্লিক করে দেখুন কীভাবে ফসল এআই ২ সেকেন্ডের মধ্যে রোগ চিহ্নিত ও প্রেসক্রিপশন তৈরি করে।</span>
            </p>
        </div>

        <!-- Sample Selector Tabs -->
        <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            <button onclick="runAiDemo('rice')" id="demo-tab-rice" class="demo-tab-btn bg-f-dark text-white font-bold px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 text-sm border-2 border-transparent">
                <i class="fa-solid fa-wheat-awn"></i>
                <span class="lang-en">Sample 1: Rice Blast</span><span class="lang-bn hidden">নমুনা ১: ধানের ব্লাস্ট রোগ</span>
            </button>
            <button onclick="runAiDemo('potato')" id="demo-tab-potato" class="demo-tab-btn bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold px-5 py-3 rounded-2xl transition flex items-center gap-2 text-sm border-2 border-transparent">
                <i class="fa-solid fa-seedling"></i>
                <span class="lang-en">Sample 2: Potato Late Blight</span><span class="lang-bn hidden">নমুনা ২: আলুর নাবি ধসা রোগ</span>
            </button>
            <button onclick="runAiDemo('tomato')" id="demo-tab-tomato" class="demo-tab-btn bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold px-5 py-3 rounded-2xl transition flex items-center gap-2 text-sm border-2 border-transparent">
                <i class="fa-solid fa-apple-whole"></i>
                <span class="lang-en">Sample 3: Tomato Leaf Curl</span><span class="lang-bn hidden">নমুনা ৩: টমেটোর পাতা কোঁকড়ানো</span>
            </button>
        </div>

        <!-- Interactive Scanner Stage -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 p-6 md:p-10 rounded-[2.5rem] border border-gray-200/80">
            <!-- Left: Viewport with Animated Laser Line -->
            <div class="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl h-[340px] md:h-[400px] border-4 border-white bg-black">
                <img id="demo-leaf-img" src="https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=800" class="w-full h-full object-cover opacity-90 transition-all duration-700" alt="Crop Leaf">
                
                <!-- Animated Laser Grid Scan Line -->
                <div id="demo-scan-line" class="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-[scanLaser_2.5s_infinite_ease-in-out]"></div>
                
                <!-- Bounding Box Targeting Overlay -->
                <div class="absolute inset-8 border-2 border-dashed border-emerald-400/70 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                    <div class="flex justify-between text-[11px] font-black text-emerald-400 tracking-wider">
                        <span>[ FOSHOL_VISION_AI v2.4 ]</span>
                        <span id="demo-res-indicator" class="bg-emerald-500 text-black px-2 py-0.5 rounded font-black">SCANNING...</span>
                    </div>
                    <div class="text-[11px] font-bold text-white/80 bg-black/60 px-3 py-1.5 rounded-lg w-max backdrop-blur">
                        Model: Multi-Modal EfficientNet-Agri • Latency: 140ms
                    </div>
                </div>
            </div>

            <!-- Right: Dynamic Diagnostic Card -->
            <div class="lg:col-span-6 space-y-6">
                <div class="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider"><span class="lang-en">Diagnosis Confidence</span><span class="lang-bn hidden">রোগ নির্ণয়ের নির্ভুলতা</span></div>
                        <div class="text-3xl font-black text-f-dark flex items-center gap-2" id="demo-confidence">
                            98.4% <span class="text-xs bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full uppercase">High Confidence</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-gray-400 font-bold block uppercase"><span class="lang-en">Inference Speed</span><span class="lang-bn hidden">গতি</span></span>
                        <span class="text-lg font-black text-gray-800">1.2 Seconds</span>
                    </div>
                </div>

                <div>
                    <span class="bg-red-100 text-red-700 text-xs font-black uppercase px-2.5 py-1 rounded-md" id="demo-severity">High Severity (তীব্র ক্ষতি)</span>
                    <h3 class="text-2xl md:text-3xl font-black text-gray-900 mt-2" id="demo-disease-name">
                        <span class="lang-en">Rice Blast (Magnaporthe oryzae)</span>
                        <span class="lang-bn hidden">ধানের ব্লাস্ট রোগ (ছত্রাকজনিত)</span>
                    </h3>
                    <p class="text-gray-600 text-sm mt-2 leading-relaxed" id="demo-desc">
                        <span class="lang-en">Spindle-shaped lesions with gray centers observed on leaf blades. Can cause up to 45% grain yield reduction if untreated within 72 hours.</span>
                        <span class="lang-bn hidden">পাতার ওপর চোখের মতো ডিম্বাকৃতির দাগ সৃষ্টি হয়েছে। ৭২ ঘণ্টার মধ্যে ছত্রাকনাশক স্প্রে না করলে ধানের ফলন ৪০-৪৫% কমে যাওয়ার ঝুঁকি রয়েছে।</span>
                    </p>
                </div>

                <!-- Prescription Box -->
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                    <div class="text-xs font-black text-f-dark uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fa-solid fa-prescription"></i> <span class="lang-en">Recommended Treatment Protocol</span><span class="lang-bn hidden">অনুমোদিত প্রেসক্রিপশন ও চিকিৎসা</span>
                    </div>
                    <div class="text-sm font-bold text-gray-800" id="demo-med-name">Tricyclazole 75 WP (Trooper / Nativo)</div>
                    <div class="text-xs text-gray-500" id="demo-dose">Dosage: 0.75g per 1 Liter of water. Spray twice at 7-day intervals during late afternoon.</div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                    <a href="/store" class="bg-f-gold text-f-dark font-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition text-center shadow text-sm flex-1 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-shopping"></i> <span class="lang-en">Buy Authentic Cure</span><span class="lang-bn hidden">আসল ঔষধ অর্ডার করুন</span>
                    </a>
                    <button onclick="openServiceChat('Explain treatment for Rice Blast in detail', 'ধানের ব্লাস্ট রোগের পূর্ণাঙ্গ চিকিৎসা পদ্ধতি বুঝিয়ে বলুন')" class="border-2 border-f-dark text-f-dark font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition text-sm flex-1 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-robot"></i> <span class="lang-en">Consult Agronomist AI</span><span class="lang-bn hidden">এআই পরামর্শকের সাথে কথা বলুন</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <style>
        @keyframes scanLaser {
            0% { top: 5%; }
            50% { top: 90%; }
            100% { top: 5%; }
        }
    </style>
`;

if (!indexHtml.includes('INTERACTIVE AI LEAF SCANNER SIMULATOR')) {
    indexHtml = indexHtml.replace('<!-- No App Install Section -->', aiScannerSection + '\n    <!-- No App Install Section -->');
}

// Add Monetization & Market Size Section (TAM/SAM/SOM + Revenue Model)
const businessModelSection = `
    <!-- BUSINESS MODEL & MARKET OPPORTUNITY (INVESTOR TRACTION SECTION) -->
    <section class="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-gradient-to-br from-f-dark to-green-950 text-white rounded-[3rem] shadow-2xl my-16 relative overflow-hidden">
        <div class="absolute -right-20 -bottom-20 opacity-10 text-[20rem] text-f-gold pointer-events-none">
            <i class="fa-solid fa-chart-pie"></i>
        </div>

        <div class="relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="bg-f-gold text-f-dark font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block mb-4 tracking-wider">
                    <span class="lang-en">Market Opportunity & Monetization</span><span class="lang-bn hidden">মার্কেট সাইজ ও আয় করার মডেল</span>
                </span>
                <h2 class="text-3xl md:text-5xl font-black mb-4 leading-tight">
                    <span class="lang-en">Capturing a $4.2B Agritech Economy</span>
                    <span class="lang-bn hidden">বাংলাদেশের ৪.২ বিলিয়ন ডলারের কৃষি বাজার</span>
                </h2>
                <p class="text-green-100 text-base md:text-lg leading-relaxed">
                    <span class="lang-en">Bangladesh has 16.5 million farming households. Foshol AI monetizes high-intent farmers through a scalable multi-sided revenue engine.</span>
                    <span class="lang-bn hidden">১ কোটি ৬৫ লাখ কৃষকের আস্থা অর্জন করে ফসল এআই ৩টি শক্তিশালী আয়ের উৎস তৈরি করছে।</span>
                </p>
            </div>

            <!-- TAM SAM SOM Counters -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center hover:bg-white/15 transition">
                    <div class="text-4xl md:text-5xl font-black text-f-gold mb-2">$4.2 Billion</div>
                    <div class="text-sm font-bold uppercase tracking-wider text-green-200"><span class="lang-en">Total Addressable Market (TAM)</span><span class="lang-bn hidden">মোট বাজার আকার (TAM)</span></div>
                    <p class="text-xs text-green-100/70 mt-2">Annual agri-input, seed, fertilizer & advisory spending in Bangladesh.</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center hover:bg-white/15 transition">
                    <div class="text-4xl md:text-5xl font-black text-emerald-400 mb-2">3.2 Million</div>
                    <div class="text-sm font-bold uppercase tracking-wider text-green-200"><span class="lang-en">Serviceable Market (SAM)</span><span class="lang-bn hidden">স্মার্টফোন ব্যবহারকারী কৃষক (SAM)</span></div>
                    <p class="text-xs text-green-100/70 mt-2">Commercial smallholders actively using 4G smartphones & messaging apps.</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center hover:bg-white/15 transition">
                    <div class="text-4xl md:text-5xl font-black text-amber-300 mb-2">50,000+</div>
                    <div class="text-sm font-bold uppercase tracking-wider text-green-200"><span class="lang-en">Year 1 Target (SOM)</span><span class="lang-bn hidden">১ম বছরের লক্ষ্যমাত্রা (SOM)</span></div>
                    <p class="text-xs text-green-100/70 mt-2">Active paid transactions across 8 high-density agricultural districts.</p>
                </div>
            </div>

            <!-- 3 Revenue Engines -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-900">
                <div class="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div>
                        <div class="w-14 h-14 rounded-2xl bg-green-100 text-f-dark flex items-center justify-center text-2xl font-black mb-6"><i class="fa-solid fa-cart-flatbed"></i></div>
                        <h3 class="text-xl font-black mb-2"><span class="lang-en">1. Input Marketplace Take Rate</span><span class="lang-bn hidden">১. আসল সার-বীজ বিক্রি কমিশন</span></h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4">
                            <span class="lang-en">Charging <b>6% to 10% commission</b> on certified seeds, micronutrients, and bio-fertilizers fulfilled directly from multinational brands (Bayer, Syngenta, ACI).</span>
                            <span class="lang-bn hidden">সরাসরি বিশ্বস্ত ব্র্যান্ড থেকে সার-বীজ হোম ডেলিভারি দিয়ে প্রতি অর্ডারে ৬% থেকে ১০% কমিশন আয়।</span>
                        </p>
                    </div>
                    <div class="text-xs font-bold text-f-dark bg-green-50 p-2.5 rounded-xl border border-green-200">
                        Projected ARPU: ৳1,200 / farmer / year
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div>
                        <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black mb-6"><i class="fa-solid fa-shield-halved"></i></div>
                        <h3 class="text-xl font-black mb-2"><span class="lang-en">2. Agrifinance Credit Scoring</span><span class="lang-bn hidden">২. ব্যাংক ও লোন ক্রেডিট স্কোরিং</span></h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4">
                            <span class="lang-en">Licensing farm health telemetry and yield prediction data to rural commercial banks (BRAC Bank, Bank Asia) and micro-insurance providers for risk underwriting.</span>
                            <span class="lang-bn hidden">কৃষকের ফসলের স্বাস্থ্য ও ফলনের ডাটা ব্যাংককে দিয়ে কৃষক লোন সহজ করা এবং পার-লোন ভেরিফিকেশন ফি নেওয়া।</span>
                        </p>
                    </div>
                    <div class="text-xs font-bold text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                        B2B API Fee: ৳150 - ৳300 per score
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div>
                        <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-black mb-6"><i class="fa-solid fa-building-wheat"></i></div>
                        <h3 class="text-xl font-black mb-2"><span class="lang-en">3. Corporate Contract Farming SaaS</span><span class="lang-bn hidden">৩. করপোরেট কন্ট্রাক্ট ফার্মিং SaaS</span></h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4">
                            <span class="lang-en">Enterprise dashboard for agro-processors (PRAN, Square, ACI) to monitor hundreds of contract farmers, tracking disease outbreaks and harvest timelines in real-time.</span>
                            <span class="lang-bn hidden">বড় এগ্রো প্রসেসরদের জন্য কন্ট্রাক্ট ফার্মিং ট্র্যাকিং ড্যাশবোর্ড থেকে মাসিক সাবস্ক্রিপশন ফি।</span>
                        </p>
                    </div>
                    <div class="text-xs font-bold text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                        SaaS Model: $500 - $2,000 / month / enterprise
                    </div>
                </div>
            </div>

            <!-- Pitch Call CTA -->
            <div class="mt-16 text-center">
                <button onclick="openPitchModal()" class="bg-f-gold text-f-dark font-black text-base px-8 py-4 rounded-full hover:bg-yellow-400 transition shadow-2xl inline-flex items-center gap-2 transform hover:scale-105">
                    <i class="fa-solid fa-file-powerpoint"></i>
                    <span class="lang-en">View Investor Presentation & Pre-Seed Deck</span>
                    <span class="lang-bn hidden">ইনভেস্টর প্রেজেন্টেশন ও পিচ ডেক দেখুন</span>
                </button>
            </div>
        </div>
    </section>
`;

if (!indexHtml.includes('BUSINESS MODEL & MARKET OPPORTUNITY')) {
    indexHtml = indexHtml.replace('<!-- B2B Partnership -->', businessModelSection + '\n    <!-- B2B Partnership -->');
}

// Add the Demo Switcher JS code to index.html before </body>
const aiDemoJs = `
    <!-- AI Leaf Scanner Simulator Logic -->
    <script>
        const demoData = {
            'rice': {
                img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=800',
                conf: '98.4%',
                nameEn: 'Rice Blast (Magnaporthe oryzae)',
                nameBn: 'ধানের ব্লাস্ট রোগ (ছত্রাকজনিত)',
                descEn: 'Spindle-shaped lesions with gray centers observed on leaf blades. Can cause up to 45% grain yield reduction if untreated within 72 hours.',
                descBn: 'পাতার ওপর চোখের মতো ডিম্বাকৃতির দাগ সৃষ্টি হয়েছে। ৭২ ঘণ্টার মধ্যে ছত্রাকনাশক স্প্রে না করলে ধানের ফলন ৪০-৪৫% কমে যাওয়ার ঝুঁকি রয়েছে।',
                severity: 'High Severity (তীব্র ক্ষতি)',
                severityClass: 'bg-red-100 text-red-700',
                med: 'Tricyclazole 75 WP (Trooper / Nativo)',
                dose: 'Dosage: 0.75g per 1 Liter of water. Spray twice at 7-day intervals during late afternoon.'
            },
            'potato': {
                img: 'https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?w=800',
                conf: '97.8%',
                nameEn: 'Potato Late Blight (Phytophthora infestans)',
                nameBn: 'আলুর লেট ব্লাইট / নাবি ধসা রোগ',
                descEn: 'Water-soaked dark lesions appearing rapidly on leaf margins due to cold fog and humidity. Spreads violently across acres in damp conditions.',
                descBn: 'কুয়াশা ও অতিরিক্ত আর্দ্রতার কারণে পাতায় ভেজা কালো দাগ দেখা যাচ্ছে। দ্রুত স্প্রে না করলে পুরো ক্ষেতের আলু পচে নষ্ট হয়ে যাবে।',
                severity: 'Critical Threat (চরম ঝুঁকিপূর্ণ)',
                severityClass: 'bg-red-100 text-red-800',
                med: 'Melody Duo or Acrobat MZ (Bayer/BASF)',
                dose: 'Dosage: 2g per 1 Liter of water. Ensure uniform coverage on both upper and lower leaf surfaces.'
            },
            'tomato': {
                img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=800',
                conf: '99.1%',
                nameEn: 'Tomato Leaf Curl Virus (transmitted by Whiteflies)',
                nameBn: 'টমেটোর পাতা কোঁকড়ানো ভাইরাস রোগ',
                descEn: 'Stunted plant growth and upward curling of leaves. Vector whiteflies must be neutralized to prevent spread to adjacent crops.',
                descBn: 'টমেটো গাছের বৃদ্ধি থমকে গেছে এবং পাতা ওপরের দিকে কোঁকড়া হয়ে গেছে। সাদা মাছি পোকা দমন করাই এর একমাত্র উপায়।',
                severity: 'Moderate to High (মাঝারি থেকে তীব্র)',
                severityClass: 'bg-amber-100 text-amber-800',
                med: 'Confidor 70 WG (Imidacloprid) + Yellow Sticky Traps',
                dose: 'Dosage: 0.5ml per 1 Liter of water. Install 5 yellow sticky traps per bigha to catch adult whiteflies.'
            }
        };

        function runAiDemo(type) {
            // Update Tab Button styles
            document.querySelectorAll('.demo-tab-btn').forEach(b => {
                b.classList.remove('bg-f-dark', 'text-white', 'shadow-md');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            const activeBtn = document.getElementById('demo-tab-' + type);
            if(activeBtn) {
                activeBtn.classList.remove('bg-gray-100', 'text-gray-700');
                activeBtn.classList.add('bg-f-dark', 'text-white', 'shadow-md');
            }

            const data = demoData[type];
            const leafImg = document.getElementById('demo-leaf-img');
            const resIndicator = document.getElementById('demo-res-indicator');

            // Visual scanning trigger
            resIndicator.innerText = 'ANALYZING...';
            resIndicator.className = 'bg-amber-400 text-black px-2 py-0.5 rounded font-black animate-pulse';
            leafImg.style.filter = 'brightness(0.6) blur(2px)';

            setTimeout(() => {
                leafImg.src = data.img;
                leafImg.style.filter = 'none';
                resIndicator.innerText = 'MATCH FOUND';
                resIndicator.className = 'bg-emerald-400 text-black px-2 py-0.5 rounded font-black';

                document.getElementById('demo-confidence').innerHTML = data.conf + ' <span class="text-xs bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full uppercase">Verified Match</span>';
                document.getElementById('demo-severity').innerText = data.severity;
                document.getElementById('demo-disease-name').innerHTML = '<span class="lang-en">' + data.nameEn + '</span><span class="lang-bn hidden">' + data.nameBn + '</span>';
                document.getElementById('demo-desc').innerHTML = '<span class="lang-en">' + data.descEn + '</span><span class="lang-bn hidden">' + data.descBn + '</span>';
                document.getElementById('demo-med-name').innerText = data.med;
                document.getElementById('demo-dose').innerText = data.dose;

                applyLanguage();
            }, 600);
        }
    </script>
`;

if (!indexHtml.includes('demoData = {')) {
    indexHtml = indexHtml.replace('</body>', aiDemoJs + '\n</body>');
}

// Add Pitch Modal to index.html if not already present
const pitchModalHtml = `
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
`;

if (!indexHtml.includes('id="pitch-modal"')) {
    indexHtml = indexHtml.replace('</body>', pitchModalHtml + '\n</body>');
}

// Add Pitch Deck Button in navbar of index.html
if (!indexHtml.includes('openPitchModal()')) {
    indexHtml = indexHtml.replace(
        '<button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">',
        '<button onclick="openPitchModal()" class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full font-bold text-xs hover:shadow-lg transition flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-briefcase"></i> <span class="lang-en">Pitch Deck</span><span class="lang-bn hidden">ইনভেস্টর ডেক</span></button>\n            <button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-bold text-sm hover:border-f-dark hover:text-f-dark transition flex items-center gap-2">'
    );
}

fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated with Investor Features!');
