const fs = require('fs');
const path = require('path');

const filePath = path.join('g:/1. Clude/03. Mine/2. Krishi Ai', 'services.html');
let content = fs.readFileSync(filePath, 'utf8');

const newSection = `
    <!-- Full Services Section Redesigned -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto" id="services-container">
        
        <!-- Category A: Action Tiles (Button-like) -->
        <div class="text-center mb-10">
            <span class="bg-green-100 text-green-800 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider inline-block mb-4">
                <span class="lang-en">Core Features</span><span class="lang-bn hidden">মূল ফিচারসমূহ</span>
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span class="lang-en">Instant AI Tools</span><span class="lang-bn hidden">তাৎক্ষণিক এআই টুলস</span>
            </h2>
            <p class="text-gray-500"><span class="lang-en">Click any button below to instantly talk to Foshol AI.</span><span class="lang-bn hidden">নিচের যেকোনো বাটনে ক্লিক করলেই এআই কাজ শুরু করবে।</span></p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            
            <!-- Tile 1 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-green-500 hover:shadow-[0_8px_30px_rgb(34,197,94,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('I want to detect a crop disease.', 'আমি ফসলের রোগ শনাক্ত করতে চাই।')">
                <div class="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-camera"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Disease Detection</span><span class="lang-bn hidden">রোগ শনাক্তকরণ</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Upload a photo of the infected crop leaf and get instant AI diagnosis.</span>
                    <span class="lang-bn hidden">আক্রান্ত পাতার ছবি দিলেই এআই সেকেন্ডের মধ্যে রোগ চিহ্নিত করে দিবে।</span>
                </p>
                <button class="w-full bg-gray-50 text-green-700 font-bold py-3.5 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300 border border-green-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-bolt text-yellow-500 group-hover:text-white"></i>
                    <span class="lang-en">Use AI Scanner</span><span class="lang-bn hidden">এআই স্ক্যানার ব্যবহার করুন</span>
                </button>
            </div>

            <!-- Tile 2 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-blue-500 hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('What is the weather forecast for my crop?', 'আমার এলাকার আজকের আবহাওয়া ও কৃষি পরামর্শ জানতে চাই।')">
                <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-cloud-sun-rain"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Weather Forecast</span><span class="lang-bn hidden">আবহাওয়া পূর্বাভাস</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Get accurate guidelines based on current local weather conditions in your area.</span>
                    <span class="lang-bn hidden">আপনার এলাকার বর্তমান আবহাওয়া অনুযায়ী চাষাবাদের সঠিক গাইডলাইন পান।</span>
                </p>
                <button class="w-full bg-gray-50 text-blue-700 font-bold py-3.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-message group-hover:text-white text-blue-400"></i>
                    <span class="lang-en">Ask Weather AI</span><span class="lang-bn hidden">আবহাওয়ার আপডেট নিন</span>
                </button>
            </div>

            <!-- Tile 3 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-teal-500 hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('I need medicine dosage for my crop disease.', 'আমার ফসলের রোগের জন্য সঠিক ঔষধ ও মাত্রা জানতে চাই।')">
                <div class="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-prescription-bottle-medical"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Medicine Dosage</span><span class="lang-bn hidden">সঠিক ঔষধের মাত্রা</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Find out exactly which medicine to use and the proper dosage for diseases.</span>
                    <span class="lang-bn hidden">রোগ অনুযায়ী কোন ঔষধ কতটুকু মাত্রায় ব্যবহার করতে হবে, তা পরিষ্কার বাংলায় জানুন।</span>
                </p>
                <button class="w-full bg-gray-50 text-teal-700 font-bold py-3.5 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 border border-teal-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-pills group-hover:text-white text-teal-400"></i>
                    <span class="lang-en">Find Medicine</span><span class="lang-bn hidden">ঔষধ খুঁজুন</span>
                </button>
            </div>

            <!-- Tile 4 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-purple-500 hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('How do I use voice commands?', 'আমি কীভাবে ভয়েস কমান্ড দিয়ে কথা বলব?')">
                <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-microphone"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Voice Command AI</span><span class="lang-bn hidden">ভয়েস কমান্ড (Voice AI)</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Use your voice to ask questions and get instant agricultural solutions.</span>
                    <span class="lang-bn hidden">টাইপ করতে সমস্যা হলে সরাসরি বাংলায় কথা বলে ফসলের সমস্যার সমাধান নিন।</span>
                </p>
                <button class="w-full bg-gray-50 text-purple-700 font-bold py-3.5 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 border border-purple-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-microphone-lines group-hover:text-white text-purple-400"></i>
                    <span class="lang-en">Speak Now</span><span class="lang-bn hidden">কথা বলুন</span>
                </button>
            </div>

            <!-- Tile 5 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-orange-500 hover:shadow-[0_8px_30px_rgb(249,115,22,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('What are the daily market prices?', 'আজকের ফসলের বাজার দর জানতে চাই।')">
                <div class="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Daily Market Prices</span><span class="lang-bn hidden">দৈনিক বাজার দর</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Stay updated with the exact wholesale prices of crops and vegetables.</span>
                    <span class="lang-bn hidden">প্রতারণা থেকে বাঁচতে প্রতিদিনের পাইকারি বাজারের চাল, ডাল ও সবজির সঠিক মূল্য জানুন।</span>
                </p>
                <button class="w-full bg-gray-50 text-orange-700 font-bold py-3.5 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 border border-orange-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-bangladeshi-taka-sign group-hover:text-white text-orange-400"></i>
                    <span class="lang-en">Check Prices</span><span class="lang-bn hidden">বাজার দর দেখুন</span>
                </button>
            </div>

            <!-- Tile 6 -->
            <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent hover:border-indigo-500 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] transition-all duration-300 flex flex-col h-full group" onclick="openServiceChat('I want to calculate fertilizer for my land.', 'আমি আমার জমির জন্য সারের পরিমাণ হিসাব করতে চাই।')">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 mx-auto sm:mx-0">
                    <i class="fa-solid fa-calculator"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                    <span class="lang-en">Fertilizer Calculator</span><span class="lang-bn hidden">সার ক্যালকুলেটর</span>
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow text-center sm:text-left leading-relaxed">
                    <span class="lang-en">Our smart calculator will tell you exactly how much fertilizer is needed.</span>
                    <span class="lang-bn hidden">জমি এবং ফসলের নাম সিলেক্ট করলেই এআই বলে দিবে ঠিক কতটুকু সার লাগবে।</span>
                </p>
                <button class="w-full bg-gray-50 text-indigo-700 font-bold py-3.5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 border border-indigo-100 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-leaf group-hover:text-white text-indigo-400"></i>
                    <span class="lang-en">Calculate Now</span><span class="lang-bn hidden">হিসাব করুন</span>
                </button>
            </div>

        </div>

        <!-- Category B: Ecosystem (Page-like) -->
        <div class="text-center mb-10 pt-10 border-t border-gray-200">
            <span class="bg-yellow-100 text-yellow-800 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider inline-block mb-4">
                <span class="lang-en">Future Ecosystem</span><span class="lang-bn hidden">আগামীর ইকোসিস্টেম</span>
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span class="lang-en">Upcoming Startup Features</span><span class="lang-bn hidden">আমাদের আসন্ন সেবাসমূহ</span>
            </h2>
            <p class="text-gray-500"><span class="lang-en">Join the waitlist for these powerful platforms currently under development.</span><span class="lang-bn hidden">এই দুর্দান্ত প্ল্যাটফর্মগুলো খুব শীঘ্রই আসছে। আজই ওয়েটলিস্টে যুক্ত হোন।</span></p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Horizontal Card 1 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-f-dark rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-user-doctor"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">Human Expert Connect</span><span class="lang-bn hidden">কৃষি বিশেষজ্ঞ সাপোর্ট</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">Connect directly to a certified agronomist for personalized advice if AI is unsure.</span>
                        <span class="lang-bn hidden">এআই কোনো রোগ ধরতে ব্যর্থ হলে সরাসরি কৃষি বিশেষজ্ঞের সাথে কানেক্ট করার সুবিধা।</span>
                    </p>
                    <button class="bg-f-dark text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-green-800 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want to talk to an agricultural expert.', 'আমি একজন কৃষি বিশেষজ্ঞের সাথে কথা বলতে চাই।')">
                        <i class="fa-solid fa-headset mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

            <!-- Horizontal Card 2 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-f-gold rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-store"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">Verified E-Commerce</span><span class="lang-bn hidden">আসল সার-বীজ স্টোর</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">Order 100% authentic seeds and fertilizers directly from our app and get doorstep delivery.</span>
                        <span class="lang-bn hidden">নকল সার/বীজের প্রতারণা থেকে বাঁচতে অ্যাপ থেকে ১০০% আসল পণ্য অর্ডার করুন হোম ডেলিভারিতে।</span>
                    </p>
                    <button class="bg-f-gold text-f-dark font-bold px-6 py-2.5 rounded-full text-sm hover:bg-yellow-500 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want to join the waitlist for the E-Commerce store.', 'আমি আসল সার-বীজ কেনার ই-কমার্স স্টোরের ওয়েটলিস্টে যুক্ত হতে চাই।')">
                        <i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

            <!-- Horizontal Card 3 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-green-500 rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">Micro-Financing</span><span class="lang-bn hidden">সহজ কৃষি ঋণ</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">Get micro-loans based on your farm data and pay after harvest.</span>
                        <span class="lang-bn hidden">ফসল বোনার সময় বাকিতে সার-বীজ কিনুন এবং ফসল কাটার পর বিক্রি করে টাকা পরিশোধ করুন।</span>
                    </p>
                    <button class="bg-green-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-green-700 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want to join the waitlist for Micro-Financing loans.', 'আমি কৃষি ঋণের ওয়েটলিস্টে যুক্ত হতে চাই।')">
                        <i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

            <!-- Horizontal Card 4 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-truck-fast"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">B2B Harvest Pre-Selling</span><span class="lang-bn hidden">ফসল কাটার আগেই বিক্রি</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">List your upcoming harvest on our platform to secure guaranteed off-take.</span>
                        <span class="lang-bn hidden">আপনার ফসল কাটার আগেই অ্যাপে জানিয়ে শহরের বড় ক্রেতাদের কাছে সরাসরি বিক্রি করুন।</span>
                    </p>
                    <button class="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-blue-700 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want to sell my harvest in advance.', 'আমি আমার ফসল অগ্রিম বিক্রি করার ওয়েটলিস্টে যুক্ত হতে চাই।')">
                        <i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

            <!-- Horizontal Card 5 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-orange-500 rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-tractor"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">Equipment Rental</span><span class="lang-bn hidden">ট্রাক্টর ও মেশিন ভাড়া</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">Rent tractors, drones, and harvesters on a daily or hourly basis from other farmers.</span>
                        <span class="lang-bn hidden">আপনার এলাকার অন্যান্য কৃষকদের কাছ থেকে ঘণ্টা বা দিন চুক্তিতে আধুনিক মেশিন ভাড়া করুন।</span>
                    </p>
                    <button class="bg-orange-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-orange-600 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want to rent a tractor or drone.', 'আমি ট্রাক্টর বা ড্রোন ভাড়া নেওয়ার ওয়েটলিস্টে যুক্ত হতে চাই।')">
                        <i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

            <!-- Horizontal Card 6 -->
            <div class="bg-gray-50 rounded-[2rem] p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-xl transition-all duration-300">
                <div class="w-24 h-24 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border-2 border-gray-100">
                    <i class="fa-solid fa-satellite"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        <span class="lang-en">Satellite Monitoring</span><span class="lang-bn hidden">স্যাটেলাইট মনিটরিং ও বীমা</span>
                    </h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        <span class="lang-en">Monitor your farm via satellite and get automatic payouts during severe weather.</span>
                        <span class="lang-bn hidden">স্যাটেলাইটে জমি মনিটর করুন এবং আবহাওয়া খারাপ হলে অটোমেটিক বীমার টাকা পেয়ে যান।</span>
                    </p>
                    <button class="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-indigo-700 transition shadow-md w-full sm:w-auto" onclick="openServiceChat('I want satellite monitoring for my farm.', 'আমি স্যাটেলাইট মনিটরিং সার্ভিসের ওয়েটলিস্টে যুক্ত হতে চাই।')">
                        <i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>
                    </button>
                </div>
            </div>

        </div>
    </section>
`;

const startIndex = content.indexOf('<!-- Full Services Grid -->');
const endIndex = content.indexOf('<!-- Footer -->');

if (startIndex !== -1 && endIndex !== -1) {
    const updatedContent = content.substring(0, startIndex) + newSection + '\n    ' + content.substring(endIndex);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log("Services layout completely overhauled!");
} else {
    console.error("Could not find section boundaries");
}
