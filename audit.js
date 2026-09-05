const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
console.log('=== HTML FILES AUDIT ===');
console.log('Files found:', files);

const report = {};

files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const hrefs = [...html.matchAll(/href=["']([^"'#]+)["']/g)].map(m => m[1]);
    const internalHrefs = hrefs.filter(h => !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('tel:') && !h.startsWith('javascript:'));
    
    // Check images
    const imgs = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
    const internalImgs = imgs.filter(s => !s.startsWith('http') && !s.startsWith('data:'));
    
    // Check missing images
    const missingImgs = internalImgs.filter(s => !fs.existsSync(path.join(dir, s)));

    // Check language tags count
    const langEnCount = (html.match(/class="[^"]*lang-en/g) || []).length;
    const langBnCount = (html.match(/class="[^"]*lang-bn/g) || []).length;

    // Check chat widget & buttons
    const hasChatWidget = html.includes('id="chat-widget"');
    const hasToggleChat = html.includes('toggleChat');
    const hasOpenServiceChat = html.includes('openServiceChat');

    report[file] = {
        internalHrefs: [...new Set(internalHrefs)],
        missingImgs,
        langEnCount,
        langBnCount,
        hasChatWidget,
        hasToggleChat,
        hasOpenServiceChat
    };
});

console.log(JSON.stringify(report, null, 2));
