const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'articles.html', 'store.html', 'admin.html', 'market.html', 'weather.html', 'medicine.html', 'fertilizer.html'];

const desktopNavMenu = `
        <div class="hidden md:flex space-x-8 text-sm font-bold text-gray-600">
            <a href="/" class="desktop-link hover:text-f-dark transition" data-path="/">
                <span class="lang-en">Home</span><span class="lang-bn hidden">হোম</span>
            </a>
            <a href="/about" class="desktop-link hover:text-f-dark transition" data-path="/about">
                <span class="lang-en">About Us</span><span class="lang-bn hidden">আমাদের লক্ষ্য</span>
            </a>
            <a href="/services" class="desktop-link hover:text-f-dark transition" data-path="/services">
                <span class="lang-en">Services</span><span class="lang-bn hidden">সার্ভিসসমূহ</span>
            </a>
            <a href="/store" class="desktop-link hover:text-f-dark transition" data-path="/store">
                <span class="lang-en">Store</span><span class="lang-bn hidden">দোকান</span>
            </a>
            <a href="/blog" class="desktop-link hover:text-f-dark transition" data-path="/blog">
                <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>
            </a>
            <a href="/articles" class="desktop-link hover:text-f-dark transition" data-path="/articles">
                <span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span>
            </a>
        </div>
`;

const mobileNavMenu = `
    <!-- Mobile Menu Dropdown -->
    <div id="mobile-menu" class="hidden flex-col bg-white shadow-2xl fixed w-full top-[76px] left-0 z-40 px-6 py-6 md:hidden gap-5 border-t border-gray-100 transition-all duration-300">
        <a href="/" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-house"></i></div>
            <span class="lang-en">Home</span><span class="lang-bn hidden">হোম</span>
        </a>
        <a href="/about" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/about">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-seedling"></i></div>
            <span class="lang-en">About Us</span><span class="lang-bn hidden">আমাদের লক্ষ্য</span>
        </a>
        <a href="/services" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/services">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-star"></i></div>
            <span class="lang-en">Services</span><span class="lang-bn hidden">সার্ভিসসমূহ</span>
        </a>
        <a href="/store" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/store">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-store"></i></div>
            <span class="lang-en">Store</span><span class="lang-bn hidden">দোকান</span>
        </a>
        <a href="/blog" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/blog">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-newspaper"></i></div>
            <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>
        </a>
        <a href="/articles" class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="/articles">
            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-book-open"></i></div>
            <span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span>
        </a>
        
        <div class="flex items-center justify-between pt-4 gap-4">
            <button onclick="toggleLanguage()" class="border-2 border-gray-200 text-gray-700 bg-gray-50 px-6 py-3 rounded-xl font-bold text-sm w-1/2 flex items-center justify-center gap-2 active:bg-gray-200">
                <i class="fa-solid fa-language text-lg text-f-gold"></i>
                <span class="lang-btn-text">বাংলা</span>
            </button>
            <a href="#chat-widget" onclick="toggleChat(); toggleMobileMenu();" class="bg-f-dark text-white px-6 py-3 rounded-xl font-bold text-sm w-1/2 text-center shadow-lg active:bg-green-800">
                <span class="lang-en">Inbox Us</span><span class="lang-bn hidden">ইনবক্স করুন</span>
            </a>
        </div>
    </div>
`;

files.forEach(file => {
    let filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('<nav ')) return;

    // 1. Replace Desktop Menu Block
    const desktopStartMarker = '<div class="hidden md:flex space-x-8 text-sm font-bold text-gray-600">';
    const desktopStartIdx = html.indexOf(desktopStartMarker);
    if (desktopStartIdx !== -1) {
        const afterStart = html.substring(desktopStartIdx + desktopStartMarker.length);
        const desktopEndIdx = desktopStartIdx + desktopStartMarker.length + afterStart.indexOf('</div>') + 6;
        html = html.substring(0, desktopStartIdx) + desktopNavMenu + html.substring(desktopEndIdx);
    }
    
    // 2. Replace Mobile Menu Block
    const mobileStartMarker = '<!-- Mobile Menu Dropdown -->';
    const mobileStartIdx = html.indexOf(mobileStartMarker);
    if (mobileStartIdx !== -1) {
        const idMobileStart = html.indexOf('<div id="mobile-menu"', mobileStartIdx);
        if (idMobileStart !== -1) {
            let extractedEnd = html.indexOf('<!--', idMobileStart);
            if(extractedEnd === -1) {
                extractedEnd = html.indexOf('<script>', idMobileStart);
            }
            if (extractedEnd !== -1) {
                html = html.substring(0, mobileStartIdx) + mobileNavMenu + '\n    ' + html.substring(extractedEnd);
            }
        }
    }

    // 3. Apply active classes
    const currentPath = file === 'index.html' ? '/' : '/' + file.replace('.html', '');
    
    const activeDesktopTarget = 'class="desktop-link hover:text-f-dark transition" data-path="' + currentPath + '"';
    const activeDesktopReplacement = 'class="desktop-link text-f-dark transition border-b-2 border-f-dark pb-1" data-path="' + currentPath + '"';
    
    const activeMobileTarget = 'class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg" data-path="' + currentPath + '"';
    const activeMobileReplacement = 'class="mobile-link text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 rounded-lg bg-gray-50" data-path="' + currentPath + '"';
    
    html = html.replace(activeDesktopTarget, activeDesktopReplacement);
    html = html.replace(activeMobileTarget, activeMobileReplacement);

    fs.writeFileSync(filePath, html, 'utf8');
});

console.log("Ultimate navbar sync complete!");
