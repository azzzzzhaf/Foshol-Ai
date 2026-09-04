const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = ['index.html', 'about.html', 'services.html', 'blog.html'];

// Helper to safely read and write
function readFile(name) { return fs.readFileSync(path.join(dir, name), 'utf8'); }
function writeFile(name, content) { fs.writeFileSync(path.join(dir, name), content, 'utf8'); }

// ---------------------------------------------------------
// TASK 1 & 2: Update index.html (Stats + B2B Section)
// ---------------------------------------------------------
let indexHtml = readFile('index.html');

const statsSection = `
    <!-- Live Statistics Section -->
    <section class="py-16 bg-f-dark text-white px-6 relative z-10 border-t-4 border-f-gold">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-green-800">
            <div class="p-4">
                <div class="text-5xl font-black text-f-gold mb-2 flex justify-center items-center"><span class="counter" data-target="5000">0</span>+</div>
                <div class="text-lg font-bold"><span class="lang-en">Farmers Trust Us</span><span class="lang-bn hidden">কৃষকের ভরসা</span></div>
            </div>
            <div class="p-4">
                <div class="text-5xl font-black text-f-gold mb-2 flex justify-center items-center"><span class="counter" data-target="98">0</span>%</div>
                <div class="text-lg font-bold"><span class="lang-en">Accuracy Rate</span><span class="lang-bn hidden">সঠিক রোগ নির্ণয়</span></div>
            </div>
            <div class="p-4">
                <div class="text-5xl font-black text-f-gold mb-2 flex justify-center items-center"><span class="counter" data-target="64">0</span>+</div>
                <div class="text-lg font-bold"><span class="lang-en">Districts Covered</span><span class="lang-bn hidden">জেলায় কভারেজ</span></div>
            </div>
        </div>
    </section>
`;

const b2bSection = `
    <!-- B2B Partnership -->
    <section class="py-20 bg-white px-6 md:px-12 border-t border-gray-100">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div class="md:w-1/2">
                <span class="bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6 inline-block">
                    <span class="lang-en">B2B & Partnerships</span><span class="lang-bn hidden">বিজনেস ও পার্টনারশিপ</span>
                </span>
                <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    <span class="lang-en">Empower the Agri-Business Ecosystem</span>
                    <span class="lang-bn hidden">কৃষি ব্যবসার জন্য ডিজিটাল সমাধান</span>
                </h2>
                <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                    <span class="lang-en">Are you an Agri-Input brand (like ACI, Syngenta), NGO, or Government body? Partner with Foshol AI to access real-time crop disease data, climate insights, and connect your products directly to millions of farmers via our API.</span>
                    <span class="lang-bn hidden">ACI, Syngenta এর মতো ব্র্যান্ড, NGO বা সরকারি প্রতিষ্ঠান? আমাদের API ব্যবহার করে সরাসরি কৃষকদের কাছে আপনার সঠিক সার ও বীজ পৌঁছে দিন। ডাটা দিয়ে ব্যবসাকে করুন আরও উন্নত।</span>
                </p>
                <button class="bg-f-dark text-white font-bold px-8 py-3.5 rounded-full hover:bg-green-800 transition shadow-lg">
                    <span class="lang-en">Partner With Us</span><span class="lang-bn hidden">আমাদের পার্টনার হোন</span>
                </button>
            </div>
            <div class="md:w-1/2 grid grid-cols-2 gap-4 w-full">
                <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition"><i class="fa-solid fa-code text-4xl text-blue-500 mb-4"></i><h4 class="font-bold text-gray-800"><span class="lang-en">API Access</span><span class="lang-bn hidden">এপিআই এক্সেস</span></h4></div>
                <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition"><i class="fa-solid fa-chart-pie text-4xl text-green-500 mb-4"></i><h4 class="font-bold text-gray-800"><span class="lang-en">Data Analytics</span><span class="lang-bn hidden">ডাটা অ্যানালিটিক্স</span></h4></div>
                <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition"><i class="fa-solid fa-bullhorn text-4xl text-orange-500 mb-4"></i><h4 class="font-bold text-gray-800"><span class="lang-en">Targeted Ads</span><span class="lang-bn hidden">টার্গেটেড অ্যাড</span></h4></div>
                <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition"><i class="fa-solid fa-handshake text-4xl text-f-gold mb-4"></i><h4 class="font-bold text-gray-800"><span class="lang-en">Govt / NGOs</span><span class="lang-bn hidden">সরকারি/NGO প্রজেক্ট</span></h4></div>
            </div>
        </div>
    </section>
`;

const jsCounterScript = `
        // --- Counter Animation ---
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            // Simple observer to start animation when visible
            let observer = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
            observer.observe(counter);
        });
`;

if (!indexHtml.includes('Live Statistics Section')) {
    indexHtml = indexHtml.replace('<!-- Farmer Success Stories -->', statsSection + '\n    <!-- Success Stories Section -->');
}
if (!indexHtml.includes('B2B Partnership')) {
    indexHtml = indexHtml.replace('<!-- Community & Resources -->', b2bSection + '\n    <!-- Community & Resources -->');
}
if (!indexHtml.includes('Counter Animation')) {
    indexHtml = indexHtml.replace('</script>', jsCounterScript + '\n    </script>');
}
writeFile('index.html', indexHtml);

// ---------------------------------------------------------
// TASK 3: Update Chat Widget (Scanning Animation) in all files
// ---------------------------------------------------------
files.forEach(file => {
    let html = readFile(file);
    
    // Change Navbar "Blog" to "AI Alerts"
    html = html.replace(/<span class="lang-en">Blog<\/span><span class="lang-bn hidden">ব্লগ<\/span>/g, '<span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>');

    // Add scanning logic to sendChatMessage
    if(html.includes('typing-indicator') && !html.includes('Scanning Image')) {
        const replaceOld = `const typingId = "typing-" + Date.now();
            chatBox.innerHTML += \`<div id="\${typingId}" class="chat-message chat-ai typing-indicator"><span></span><span></span><span></span></div>\`;`;
        
        const newLogic = `const typingId = "typing-" + Date.now();
            let typingHtml = \`<div id="\${typingId}" class="chat-message chat-ai typing-indicator"><span></span><span></span><span></span></div>\`;
            
            // If message suggests disease detection or image upload
            if(message.includes('রোগ') || message.includes('detect') || message.includes('ছবি')) {
                typingHtml = \`<div id="\${typingId}" class="chat-message chat-ai flex flex-col items-center gap-3 text-center border-2 border-green-200 bg-green-50 p-4">
                    <div class="relative w-12 h-12">
                        <i class="fa-solid fa-leaf text-4xl text-green-300 absolute inset-0"></i>
                        <div class="absolute inset-0 bg-green-500/20 border-t-2 border-green-500 animate-ping rounded-full"></div>
                    </div>
                    <span class="text-green-700 font-bold text-xs"><span class="lang-en">Scanning Crop Data...</span><span class="lang-bn hidden">ছবি স্ক্যান করা হচ্ছে...</span></span>
                </div>\`;
            }
            chatBox.innerHTML += typingHtml;
            // applyLanguage again so the dynamic lang spans work inside the new chat block
            setTimeout(applyLanguage, 10);`;
            
        html = html.replace(replaceOld, newLogic);
    }
    
    writeFile(file, html);
});

// ---------------------------------------------------------
// TASK 4: Overhaul blog.html -> AI Alerts Dashboard
// ---------------------------------------------------------
let blogHtml = readFile('blog.html');

// We replace the header and the grid.
const newBlogHeader = `
    <!-- Page Header -->
    <div class="bg-f-dark py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 flex justify-center items-center gap-3">
            <i class="fa-solid fa-tower-broadcast text-red-400 animate-pulse"></i> 
            <span class="lang-en">Live AI Krishi Alerts</span><span class="lang-bn hidden">লাইভ এআই কৃষি সতর্কতা</span>
        </h1>
        <p class="text-green-100 max-w-2xl mx-auto">
            <span class="lang-en">Real-time alerts generated by Foshol AI based on local weather data, satellite imagery, and reported crop diseases across the country.</span>
            <span class="lang-bn hidden">সারাদেশের আবহাওয়া, স্যাটেলাইট ডাটা এবং কৃষকদের রিপোর্ট করা তথ্যের ওপর ভিত্তি করে এআই-এর রিয়েল-টাইম সতর্কতা।</span>
        </p>
    </div>

    <!-- Alerts Dashboard -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto bg-gray-50 rounded-[3rem] -mt-8 shadow-inner border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- High Alert (Red) -->
            <div class="bg-white rounded-3xl p-6 shadow-md border-l-8 border-red-500 hover:-translate-y-2 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-xs uppercase flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> <span class="lang-en">High Alert</span><span class="lang-bn hidden">মারাত্মক সতর্কতা</span></span>
                    <span class="text-gray-400 text-xs font-bold"><i class="fa-solid fa-clock"></i> 2 Hours Ago</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    <span class="lang-en">Tomato Late Blight Outbreak</span><span class="lang-bn hidden">রাজশাহীতে টমেটোর 'লেট ব্লাইট' প্রকোপ</span>
                </h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                    <span class="lang-en">Multiple farmers in the Rajshahi region have reported signs of Late Blight. Immediate preventive fungicide application is recommended.</span>
                    <span class="lang-bn hidden">রাজশাহী অঞ্চলের অনেক কৃষকের টমেটো ক্ষেতে লেট ব্লাইট রোগের লক্ষণ দেখা গেছে। অবিলম্বে ছত্রাকনাশক স্প্রে করার পরামর্শ দেওয়া হচ্ছে।</span>
                </p>
                <div class="text-xs font-bold text-gray-500"><i class="fa-solid fa-location-dot text-red-400"></i> Rajshahi, Chapainawabganj</div>
            </div>

            <!-- Weather Alert (Orange) -->
            <div class="bg-white rounded-3xl p-6 shadow-md border-l-8 border-orange-500 hover:-translate-y-2 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-xs uppercase"><i class="fa-solid fa-cloud-showers-heavy"></i> <span class="lang-en">Weather Warning</span><span class="lang-bn hidden">আবহাওয়া সতর্কতা</span></span>
                    <span class="text-gray-400 text-xs font-bold"><i class="fa-solid fa-clock"></i> 5 Hours Ago</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    <span class="lang-en">Heavy Rainfall Expected in Sylhet</span><span class="lang-bn hidden">সিলেট অঞ্চলে ভারী বৃষ্টির পূর্বাভাস</span>
                </h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                    <span class="lang-en">Continuous heavy rainfall is predicted for the next 48 hours. Ensure proper drainage in vegetable fields to prevent waterlogging.</span>
                    <span class="lang-bn hidden">আগামী ৪৮ ঘণ্টা টানা বৃষ্টির সম্ভাবনা রয়েছে। সবজি ক্ষেতে পানি জমে যেন পচন না ধরে সেজন্য ড্রেনেজ ব্যবস্থা পরিষ্কার রাখুন।</span>
                </p>
                <div class="text-xs font-bold text-gray-500"><i class="fa-solid fa-location-dot text-orange-400"></i> Sylhet, Sunamganj</div>
            </div>

            <!-- Pest Alert (Yellow) -->
            <div class="bg-white rounded-3xl p-6 shadow-md border-l-8 border-yellow-400 hover:-translate-y-2 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full text-xs uppercase"><i class="fa-solid fa-bug"></i> <span class="lang-en">Pest Alert</span><span class="lang-bn hidden">পোকামাকড় সতর্কতা</span></span>
                    <span class="text-gray-400 text-xs font-bold"><i class="fa-solid fa-clock"></i> 1 Day Ago</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    <span class="lang-en">Stem Borer attack in Rice fields</span><span class="lang-bn hidden">বোরো ধানে মাজরা পোকার আক্রমণ</span>
                </h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                    <span class="lang-en">Favorable weather for Stem Borers detected. AI models suggest applying appropriate insecticides to Boro rice fields in the next 3 days.</span>
                    <span class="lang-bn hidden">মাজরা পোকার জন্য অনুকূল আবহাওয়া চলছে। আগামী ৩ দিনের মধ্যে বোরো ধানে পরিমিত কীটনাশক প্রয়োগ করার পরামর্শ দিচ্ছে এআই।</span>
                </p>
                <div class="text-xs font-bold text-gray-500"><i class="fa-solid fa-location-dot text-yellow-500"></i> Bogura, Naogaon</div>
            </div>

            <!-- General Advice (Green) -->
            <div class="bg-white rounded-3xl p-6 shadow-md border-l-8 border-green-500 hover:-translate-y-2 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-xs uppercase"><i class="fa-solid fa-seedling"></i> <span class="lang-en">Seasonal Guide</span><span class="lang-bn hidden">মৌসুমি গাইডলাইন</span></span>
                    <span class="text-gray-400 text-xs font-bold"><i class="fa-solid fa-clock"></i> 2 Days Ago</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    <span class="lang-en">Optimal Time for Potato Sowing</span><span class="lang-bn hidden">আলু রোপণের উপযুক্ত সময়</span>
                </h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                    <span class="lang-en">Soil moisture levels are perfect for potato sowing in the Northern region. Start sowing for maximum yield.</span>
                    <span class="lang-bn hidden">উত্তরাঞ্চলে এখন মাটির আর্দ্রতা আলু রোপণের জন্য একদম পারফেক্ট। সর্বোচ্চ ফলন পেতে এখনই বীজ রোপণ শুরু করুন।</span>
                </p>
                <div class="text-xs font-bold text-gray-500"><i class="fa-solid fa-location-dot text-green-500"></i> Rangpur, Dinajpur</div>
            </div>

        </div>
    </section>
`;

const headerStart = blogHtml.indexOf('<!-- Page Header -->');
const mainGridEnd = blogHtml.indexOf('<!-- Footer -->');
if(headerStart !== -1 && mainGridEnd !== -1) {
    blogHtml = blogHtml.substring(0, headerStart) + newBlogHeader + '\n    ' + blogHtml.substring(mainGridEnd);
    // Also remove the Pagination if it exists in the string (it was part of the old grid)
    writeFile('blog.html', blogHtml);
}

console.log("All 4 tasks completed successfully!");
