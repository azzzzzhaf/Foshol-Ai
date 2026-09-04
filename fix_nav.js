const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'admin.html', 'articles.html'];

files.forEach(file => {
    let filePath = path.join(dir, file);
    if(fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // 1. Fix Desktop Menu
        // Find: <a href="/blog" class="hover:text-f-dark transition">\n                <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>\n            </a>
        const desktopTarget = '<a href="/blog" class="hover:text-f-dark transition">\n                <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>\n            </a>';
        const desktopNew = '<a href="/articles" class="hover:text-f-dark transition">\n                <span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span>\n            </a>';
        
        if (html.includes(desktopTarget) && !html.includes('href="/articles" class="hover:text-f-dark transition"')) {
            html = html.replace(desktopTarget, desktopTarget + '\n            ' + desktopNew);
        }

        // 2. Fix Mobile Menu
        // Find: <a href="/blog" class="text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 active:bg-gray-50 rounded-lg">\n            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-newspaper"></i></div>\n            <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>\n        </a>
        const mobileTarget = '<a href="/blog" class="text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 active:bg-gray-50 rounded-lg">\n            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-newspaper"></i></div>\n            <span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span>\n        </a>';
        const mobileNew = '<a href="/articles" class="text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 active:bg-gray-50 rounded-lg">\n            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-book-open"></i></div>\n            <span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span>\n        </a>';
        
        if (html.includes(mobileTarget) && !html.includes('href="/articles" class="text-gray-800 font-bold')) {
            html = html.replace(mobileTarget, mobileTarget + '\n        ' + mobileNew);
        }

        fs.writeFileSync(filePath, html, 'utf8');
    }
});
console.log("Navbars fixed successfully!");
