import os
import re

file_path = 'g:/1. Clude/03. Mine/2. Krishi Ai/services.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

cards = [
    ("openServiceChat('I want to detect a crop disease.', 'আমি ফসলের রোগ শনাক্ত করতে চাই।')", "live"),
    ("openServiceChat('What is the weather forecast for my crop?', 'আমার এলাকার আজকের আবহাওয়া ও কৃষি পরামর্শ জানতে চাই।')", "live"),
    ("openServiceChat('I need medicine dosage for my crop disease.', 'আমার ফসলের রোগের জন্য সঠিক ঔষধ ও মাত্রা জানতে চাই।')", "live"),
    ("openServiceChat('How do I use voice commands?', 'আমি কীভাবে ভয়েস কমান্ড দিয়ে কথা বলব?')", "live"),
    ("openServiceChat('What are the daily market prices?', 'আজকের ফসলের বাজার দর জানতে চাই।')", "live"),
    ("openServiceChat('I want to calculate fertilizer for my land.', 'আমি আমার জমির জন্য সারের পরিমাণ হিসাব করতে চাই।')", "live"),
    ("openServiceChat('I want to talk to an agricultural expert.', 'আমি একজন কৃষি বিশেষজ্ঞের সাথে কথা বলতে চাই।')", "live"),
    ("openServiceChat('I want to join the waitlist for the E-Commerce store.', 'আমি আসল সার-বীজ কেনার ই-কমার্স স্টোরের ওয়েটলিস্টে যুক্ত হতে চাই।')", "waitlist"),
    ("openServiceChat('I want to join the waitlist for Micro-Financing loans.', 'আমি কৃষি ঋণের ওয়েটলিস্টে যুক্ত হতে চাই।')", "waitlist"),
    ("openServiceChat('I want to sell my harvest in advance.', 'আমি আমার ফসল অগ্রিম বিক্রি করার ওয়েটলিস্টে যুক্ত হতে চাই।')", "waitlist"),
    ("openServiceChat('I want to rent a tractor or drone.', 'আমি ট্রাক্টর বা ড্রোন ভাড়া নেওয়ার ওয়েটলিস্টে যুক্ত হতে চাই।')", "waitlist"),
    ("openServiceChat('I want satellite monitoring for my farm.', 'আমি স্যাটেলাইট মনিটরিং সার্ভিসের ওয়েটলিস্টে যুক্ত হতে চাই।')", "waitlist")
]

try_now = '''
                <div class="mt-6 text-f-dark font-bold flex items-center justify-center gap-2 group-hover:text-green-600 transition opacity-80 group-hover:opacity-100">
                    <span class="lang-en">Try Now</span><span class="lang-bn hidden">ব্যবহার করুন</span> <i class="fa-solid fa-arrow-right"></i>
                </div>'''

waitlist = '''
                <div class="mt-6 text-f-gold font-bold flex items-center justify-center gap-2 group-hover:text-yellow-600 transition opacity-80 group-hover:opacity-100">
                    <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span> <i class="fa-solid fa-clock"></i>
                </div>'''

parts = re.split(r'<!-- Service \d+ -->', content)

if len(parts) == 13:
    for i in range(1, 13):
        card_data = cards[i-1]
        action_btn = try_now if card_data[1] == 'live' else waitlist
        
        # 1. Add cursor-pointer and onclick
        parts[i] = re.sub(
            r'<div class="([^"]+group[^"]*)"',
            f'<div class="\\1 cursor-pointer" onclick="{card_data[0]}"',
            parts[i],
            count=1
        )
        
        # 2. Add action button before closing div
        parts[i] = re.sub(
            r'(</p>\s*)(</div>)',
            f'\\1{action_btn}\n            \\2',
            parts[i]
        )

    new_content = parts[0]
    for i in range(1, 13):
        new_content += f'<!-- Service {i} -->' + parts[i]
        
    if 'function openServiceChat' not in new_content:
        js_func = '''
        function openServiceChat(enPrompt, bnPrompt) {
            const chatWidget = document.getElementById('chat-widget');
            if (chatWidget.classList.contains('chat-hidden')) {
                toggleChat();
            }
            const msg = currentLang === 'en' ? enPrompt : bnPrompt;
            document.getElementById('chat-input').value = msg;
            sendChatMessage();
        }
        '''
        new_content = new_content.replace('function sendSuggested(', js_func + '\n        function sendSuggested(')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Python script updated HTML successfully")
else:
    print(f"Failed. Parts length: {len(parts)}")
