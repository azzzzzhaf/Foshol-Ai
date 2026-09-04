const fs = require('fs');
const path = require('path');

const filePath = path.join('g:/1. Clude/03. Mine/2. Krishi Ai', 'services.html');
let content = fs.readFileSync(filePath, 'utf8');

const cards = [
    { text: "openServiceChat('I want to detect a crop disease.', 'আমি ফসলের রোগ শনাক্ত করতে চাই।')", type: "live" },
    { text: "openServiceChat('What is the weather forecast for my crop?', 'আমার এলাকার আজকের আবহাওয়া ও কৃষি পরামর্শ জানতে চাই।')", type: "live" },
    { text: "openServiceChat('I need medicine dosage for my crop disease.', 'আমার ফসলের রোগের জন্য সঠিক ঔষধ ও মাত্রা জানতে চাই।')", type: "live" },
    { text: "openServiceChat('How do I use voice commands?', 'আমি কীভাবে ভয়েস কমান্ড দিয়ে কথা বলব?')", type: "live" },
    { text: "openServiceChat('What are the daily market prices?', 'আজকের ফসলের বাজার দর জানতে চাই।')", type: "live" },
    { text: "openServiceChat('I want to calculate fertilizer for my land.', 'আমি আমার জমির জন্য সারের পরিমাণ হিসাব করতে চাই।')", type: "live" },
    { text: "openServiceChat('I want to talk to an agricultural expert.', 'আমি একজন কৃষি বিশেষজ্ঞের সাথে কথা বলতে চাই।')", type: "live" },
    { text: "openServiceChat('I want to join the waitlist for the E-Commerce store.', 'আমি আসল সার-বীজ কেনার ই-কমার্স স্টোরের ওয়েটলিস্টে যুক্ত হতে চাই।')", type: "waitlist" },
    { text: "openServiceChat('I want to join the waitlist for Micro-Financing loans.', 'আমি কৃষি ঋণের ওয়েটলিস্টে যুক্ত হতে চাই।')", type: "waitlist" },
    { text: "openServiceChat('I want to sell my harvest in advance.', 'আমি আমার ফসল অগ্রিম বিক্রি করার ওয়েটলিস্টে যুক্ত হতে চাই।')", type: "waitlist" },
    { text: "openServiceChat('I want to rent a tractor or drone.', 'আমি ট্রাক্টর বা ড্রোন ভাড়া নেওয়ার ওয়েটলিস্টে যুক্ত হতে চাই।')", type: "waitlist" },
    { text: "openServiceChat('I want satellite monitoring for my farm.', 'আমি স্যাটেলাইট মনিটরিং সার্ভিসের ওয়েটলিস্টে যুক্ত হতে চাই।')", type: "waitlist" }
];

const tryNowBtn = '\n                <div class="mt-6 text-f-dark font-bold flex items-center justify-center gap-2 group-hover:text-green-600 transition opacity-80 group-hover:opacity-100">\n                    <span class="lang-en">Try Now</span><span class="lang-bn hidden">ব্যবহার করুন</span> <i class="fa-solid fa-arrow-right"></i>\n                </div>\n            </div>';
const waitlistBtn = '\n                <div class="mt-6 text-f-gold font-bold flex items-center justify-center gap-2 group-hover:text-yellow-600 transition opacity-80 group-hover:opacity-100">\n                    <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span> <i class="fa-solid fa-clock"></i>\n                </div>\n            </div>';

let parts = content.split('<!-- Service ');
if (parts.length === 13) {
    let newContent = parts[0];
    
    for (let i = 1; i <= 12; i++) {
        let cardBlock = '<!-- Service ' + parts[i];
        
        // Replace group with cursor-pointer and onclick
        let cardData = cards[i-1];
        cardBlock = cardBlock.replace(' group"', ' group cursor-pointer" onclick="' + cardData.text + '"');
        
        // Append action button
        let actionBtn = cardData.type === 'live' ? tryNowBtn : waitlistBtn;
        cardBlock = cardBlock.replace('</p>\n            </div>', '</p>' + actionBtn);
        
        newContent += cardBlock;
    }

    if (!newContent.includes('function openServiceChat')) {
        const jsFunc = '\n        function openServiceChat(enPrompt, bnPrompt) {\n            const chatWidget = document.getElementById("chat-widget");\n            if (chatWidget.classList.contains("chat-hidden")) {\n                toggleChat();\n            }\n            const msg = currentLang === "en" ? enPrompt : bnPrompt;\n            document.getElementById("chat-input").value = msg;\n            sendChatMessage();\n        }\n        ';
        newContent = newContent.replace('function sendSuggested(', jsFunc + '\n        function sendSuggested(');
    }
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Success");
} else {
    console.log("Failed to parse " + parts.length);
}
