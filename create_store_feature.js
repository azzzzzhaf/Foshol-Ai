const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = ['index.html', 'about.html', 'services.html', 'articles.html', 'admin.html'];

function readFile(name) { return fs.readFileSync(path.join(dir, name), 'utf8'); }
function writeFile(name, content) { fs.writeFileSync(path.join(dir, name), content, 'utf8'); }

// 1. CREATE store.html
const storeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Store - Foshol AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = { theme: { extend: { colors: { 'f-dark': '#155d35', 'f-light': '#e8f5e9', 'f-gold': '#ffb300' } } } }
    </script>
    <style>
        .chat-hidden { transform: translateY(150%); opacity: 0; pointer-events: none; }
        #chat-widget { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">
    <!-- NAVBAR_PLACEHOLDER -->

    <!-- Page Header -->
    <div class="bg-f-dark py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            <span class="lang-en">Foshol Verified Store</span><span class="lang-bn hidden">ফসল ভেরিফাইড স্টোর</span>
        </h1>
        <p class="text-green-100 max-w-2xl mx-auto">
            <span class="lang-en">Buy 100% authentic seeds, fertilizers, and pesticides directly from trusted brands.</span>
            <span class="lang-bn hidden">১০০% আসল বীজ, সার এবং কীটনাশক সরাসরি বিশ্বস্ত ব্র্যান্ড থেকে কিনুন।</span>
        </p>
    </div>

    <!-- Store Section -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div id="store-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Products will be loaded here dynamically -->
        </div>
    </section>

    <!-- Checkout Modal -->
    <div id="checkout-modal" class="hidden fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center px-4">
        <div class="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900"><span class="lang-en">Confirm Order</span><span class="lang-bn hidden">অর্ডার নিশ্চিত করুন</span></h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-times text-xl"></i></button>
            </div>
            
            <div class="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <img id="modal-img" src="" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h3 id="modal-title" class="font-bold text-gray-900">Product Name</h3>
                    <div class="text-f-dark font-black text-lg">৳<span id="modal-price">0</span></div>
                </div>
            </div>

            <div class="space-y-4">
                <div><label class="block text-sm font-bold text-gray-700 mb-1"><span class="lang-en">Full Name</span><span class="lang-bn hidden">আপনার নাম</span></label><input type="text" id="order-name" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                <div><label class="block text-sm font-bold text-gray-700 mb-1"><span class="lang-en">Phone Number</span><span class="lang-bn hidden">মোবাইল নাম্বার</span></label><input type="text" id="order-phone" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                <div><label class="block text-sm font-bold text-gray-700 mb-1"><span class="lang-en">Delivery Address</span><span class="lang-bn hidden">ডেলিভারি ঠিকানা</span></label><textarea id="order-address" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
            </div>

            <button onclick="placeOrder()" class="w-full bg-f-dark text-white font-bold rounded-xl px-4 py-3.5 mt-6 hover:bg-green-800 transition">
                <span class="lang-en">Place Order (Cash on Delivery)</span><span class="lang-bn hidden">অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
            </button>
        </div>
    </div>
    
    <!-- Success Modal -->
    <div id="success-modal" class="hidden fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center px-4">
        <div class="bg-white max-w-sm w-full rounded-3xl p-10 shadow-2xl text-center">
            <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"><i class="fa-solid fa-check"></i></div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2"><span class="lang-en">Order Successful!</span><span class="lang-bn hidden">অর্ডার সফল হয়েছে!</span></h2>
            <p class="text-gray-500 mb-8"><span class="lang-en">Your product will be delivered within 3-5 days.</span><span class="lang-bn hidden">আপনার প্রোডাক্ট ৩-৫ দিনের মধ্যে ডেলিভারি করা হবে।</span></p>
            <button onclick="closeSuccessModal()" class="bg-gray-100 text-gray-800 font-bold rounded-xl px-8 py-3 hover:bg-gray-200">Close</button>
        </div>
    </div>

    <!-- Footer_Placeholder -->

    <script>
        if (!localStorage.getItem('foshol_products')) {
            const defaults = [
                { titleEn: 'Premium Urea Fertilizer (50kg)', titleBn: 'প্রিমিয়াম ইউরিয়া সার (৫০ কেজি)', price: '1200', img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500', category: 'Fertilizer' },
                { titleEn: 'High-Yield BRRI Dhan 28 Seeds', titleBn: 'উচ্চ ফলনশীল ব্রি ধান ২৮ বীজ', price: '850', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500', category: 'Seeds' },
                { titleEn: 'Organic Pesticide (500ml)', titleBn: 'জৈব কীটনাশক (৫০০ মিলি)', price: '450', img: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500', category: 'Pesticide' },
                { titleEn: 'Modern Farming Tractor Rent (Per Day)', titleBn: 'আধুনিক ট্রাক্টর ভাড়া (প্রতিদিন)', price: '3000', img: 'https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?w=500', category: 'Equipment' }
            ];
            localStorage.setItem('foshol_products', JSON.stringify(defaults));
        }

        function loadStore() {
            const products = JSON.parse(localStorage.getItem('foshol_products') || '[]');
            const grid = document.getElementById('store-grid');
            let html = '';
            
            if(products.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-500">No products available.</div>';
                return;
            }

            products.forEach((p, index) => {
                html += \`
                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div class="h-48 bg-gray-100 relative">
                        <img src="\${p.img}" class="w-full h-full object-cover">
                        <div class="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-f-dark uppercase">\${p.category}</div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            <span class="lang-en">\${p.titleEn}</span><span class="lang-bn hidden">\${p.titleBn}</span>
                        </h3>
                        <div class="text-2xl font-black text-f-dark mb-4 mt-auto">৳\${p.price}</div>
                        <button onclick="openModal(\${index})" class="w-full bg-f-gold text-f-dark font-bold py-2.5 rounded-xl hover:bg-yellow-500 transition shadow-sm">
                            <span class="lang-en">Buy Now</span><span class="lang-bn hidden">এখনই কিনুন</span>
                        </button>
                    </div>
                </div>\`;
            });
            grid.innerHTML = html;
            setTimeout(applyLanguage, 50);
        }

        let selectedProduct = null;
        function openModal(index) {
            const products = JSON.parse(localStorage.getItem('foshol_products'));
            selectedProduct = products[index];
            document.getElementById('modal-img').src = selectedProduct.img;
            document.getElementById('modal-title').innerText = currentLang === 'en' ? selectedProduct.titleEn : selectedProduct.titleBn;
            document.getElementById('modal-price').innerText = selectedProduct.price;
            document.getElementById('checkout-modal').classList.remove('hidden');
        }
        function closeModal() { document.getElementById('checkout-modal').classList.add('hidden'); }
        function placeOrder() {
            const name = document.getElementById('order-name').value;
            const phone = document.getElementById('order-phone').value;
            const addr = document.getElementById('order-address').value;
            if(!name || !phone || !addr) { alert(currentLang === 'en' ? "Please fill all fields!" : "সব তথ্য দিন!"); return; }
            closeModal();
            document.getElementById('success-modal').classList.remove('hidden');
        }
        function closeSuccessModal() {
            document.getElementById('success-modal').classList.add('hidden');
            document.getElementById('order-name').value = '';
            document.getElementById('order-phone').value = '';
            document.getElementById('order-address').value = '';
        }
        window.addEventListener('DOMContentLoaded', loadStore);
    </script>
</body>
</html>`;
writeFile('store.html', storeHtml);

let aboutHtml = readFile('about.html');
const navStart = aboutHtml.indexOf('<nav class="flex');
const navEnd = aboutHtml.indexOf('<!-- Mobile Menu Dropdown -->') + aboutHtml.substring(aboutHtml.indexOf('<!-- Mobile Menu Dropdown -->')).indexOf('</div>') + 6;
const footerStart = aboutHtml.indexOf('<!-- Footer -->');
const scriptStart = aboutHtml.indexOf('<script>', footerStart);

const navbarCode = aboutHtml.substring(navStart, navEnd);
const footerCode = aboutHtml.substring(footerStart, scriptStart);
const globalScriptCode = aboutHtml.substring(scriptStart, aboutHtml.indexOf('</body>'));

let storeContent = readFile('store.html');
storeContent = storeContent.replace('<!-- NAVBAR_PLACEHOLDER -->', navbarCode);
storeContent = storeContent.replace('<!-- Footer_Placeholder -->', footerCode + globalScriptCode);
writeFile('store.html', storeContent);
files.push('store.html');

// 3. UPDATE ADMIN PANEL
let adminHtml = readFile('admin.html');
const sidebarNavEnd = adminHtml.indexOf('</nav>');
const storeTabBtn = '<button onclick="switchTab(\\'store\\')" class="nav-btn w-full text-left px-4 py-3 rounded-xl font-bold transition text-green-100 hover:bg-green-800" data-tab="store"><i class="fa-solid fa-store w-6 text-blue-400"></i> Manage Store</button>\n            ';
if(!adminHtml.includes('data-tab="store"')) {
    adminHtml = adminHtml.substring(0, sidebarNavEnd) + storeTabBtn + adminHtml.substring(sidebarNavEnd);
}

const storeTabContent = `
                <!-- STORE TAB -->
                <div id="tab-store" class="tab-content hidden">
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-cart-plus text-blue-500 mr-2"></i> Add New Product</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Product Name (Bangla)</label><input type="text" id="prod-title-bn" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Product Name (English)</label><input type="text" id="prod-title-en" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Price (৳)</label><input type="number" id="prod-price" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select id="prod-category" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                    <option value="Seeds">Seeds</option><option value="Fertilizer">Fertilizer</option><option value="Pesticide">Pesticide</option><option value="Equipment">Equipment</option>
                                </select>
                            </div>
                            
                            <div class="md:col-span-2">
                                <label class="block text-sm font-bold text-gray-700 mb-2">Upload Product Image</label>
                                <input type="file" id="prod-image-file" accept="image/*" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 file:bg-f-dark file:text-white file:border-0 file:px-4 file:py-1.5 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-green-800">
                                <input type="hidden" id="prod-image-base64">
                                <img id="prod-image-preview" class="hidden mt-2 h-20 rounded-lg object-cover border border-gray-200">
                            </div>
                        </div>

                        <button onclick="publishProduct()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition">Publish Product Live</button>
                    </div>

                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-list text-gray-400 mr-2"></i> Manage Live Products</h2>
                        <div class="overflow-x-auto"><table class="w-full text-left border-collapse">
                            <thead><tr class="bg-gray-50 text-gray-500 text-sm uppercase"><th class="p-4 rounded-tl-xl">Product</th><th class="p-4">Category</th><th class="p-4">Price</th><th class="p-4 rounded-tr-xl text-right">Action</th></tr></thead>
                            <tbody id="store-table-body" class="divide-y divide-gray-100 text-gray-800"></tbody>
                        </table></div>
                    </div>
                </div>
`;
const endOfBlogsTab = adminHtml.indexOf('</div>\n            <div id="toast"');
if(endOfBlogsTab !== -1 && !adminHtml.includes('id="tab-store"')) {
    adminHtml = adminHtml.substring(0, endOfBlogsTab) + storeTabContent + adminHtml.substring(endOfBlogsTab);
}

const adminJsUpdates = `
        // --- ADD STORE LOGIC ---
        document.getElementById('prod-image-file').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX = 600;
                    const scale = MAX / img.width;
                    canvas.width = MAX; canvas.height = img.height * scale;
                    const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const b64 = canvas.toDataURL('image/jpeg', 0.8);
                    document.getElementById('prod-image-base64').value = b64;
                    document.getElementById('prod-image-preview').src = b64;
                    document.getElementById('prod-image-preview').classList.remove('hidden');
                }
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        function publishProduct() {
            const titleBn = document.getElementById('prod-title-bn').value;
            const titleEn = document.getElementById('prod-title-en').value;
            const price = document.getElementById('prod-price').value;
            if(!titleBn || !price) return alert('Name and Price required!');
            
            let img = document.getElementById('prod-image-base64').value;
            if(!img) img = 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500'; 

            const newProd = { titleBn, titleEn, price, category: document.getElementById('prod-category').value, img };
            const existing = JSON.parse(localStorage.getItem('foshol_products') || '[]');
            existing.unshift(newProd);
            localStorage.setItem('foshol_products', JSON.stringify(existing));
            showToast('Product Published to Store!');
            
            document.getElementById('prod-image-preview').classList.add('hidden');
            ['prod-title-bn', 'prod-title-en', 'prod-price', 'prod-image-base64'].forEach(id => document.getElementById(id).value = '');
            loadData();
        }
        function deleteProduct(index) {
            if(!confirm('Delete this product?')) return;
            const existing = JSON.parse(localStorage.getItem('foshol_products') || '[]');
            existing.splice(index, 1); localStorage.setItem('foshol_products', JSON.stringify(existing)); showToast('Product Deleted!'); loadData();
        }
`;
if(!adminHtml.includes('publishProduct()')) {
    adminHtml = adminHtml.replace('// --- CRUD LOGIC ---', adminJsUpdates + '\n        // --- CRUD LOGIC ---');
    adminHtml = adminHtml.replace("'blogs': 'Manage Krishi Blogs' }[tabId];", "'blogs': 'Manage Krishi Blogs', 'store': 'Manage Store' }[tabId];");
    
    const storeLoadData = `
            const products = JSON.parse(localStorage.getItem('foshol_products') || '[]');
            const storeBody = document.getElementById('store-table-body');
            storeBody.innerHTML = '';
            products.forEach((item, index) => {
                storeBody.innerHTML += \`<tr class="hover:bg-gray-50">
                    <td class="p-4 flex items-center gap-3"><img src="\${item.img}" class="w-10 h-10 rounded object-cover"> \${item.titleEn}</td>
                    <td class="p-4"><span class="bg-gray-100 px-2 py-1 rounded text-xs uppercase">\${item.category}</span></td>
                    <td class="p-4 font-bold text-f-dark">৳\${item.price}</td>
                    <td class="p-4 text-right"><button onclick="deleteProduct(\${index})" class="text-red-500 hover:bg-red-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button></td>
                </tr>\`;
            });
    `;
    adminHtml = adminHtml.replace('// Alerts Table', storeLoadData + '\n            // Alerts Table');
}
writeFile('admin.html', adminHtml);

// 4. UPDATE NAVBARS
files.forEach(file => {
    let html = readFile(file);
    const desktopTarget = '<a href="/services" class="hover:text-f-dark transition">\n                <span class="lang-en">Services</span><span class="lang-bn hidden">সার্ভিসসমূহ</span>\n            </a>';
    const desktopNew = '<a href="/store" class="hover:text-f-dark transition">\n                <span class="lang-en">Store</span><span class="lang-bn hidden">দোকান</span>\n            </a>';
    const mobileTarget = '<a href="/services" class="text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 active:bg-gray-50 rounded-lg">\n            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-star"></i></div>\n            <span class="lang-en">Services</span><span class="lang-bn hidden">সার্ভিসসমূহ</span>\n        </a>';
    const mobileNew = '<a href="/store" class="text-gray-800 font-bold text-lg border-b border-gray-100 pb-3 flex items-center gap-3 active:bg-gray-50 rounded-lg">\n            <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-f-dark"><i class="fa-solid fa-store"></i></div>\n            <span class="lang-en">Store</span><span class="lang-bn hidden">দোকান</span>\n        </a>';
    
    if (html.includes(desktopTarget) && !html.includes('href="/store" class="hover:text-f-dark transition"')) {
        html = html.replace(desktopTarget, desktopTarget + '\n            ' + desktopNew);
    }
    if (html.includes(mobileTarget) && !html.includes('href="/store" class="text-gray-800 font-bold text-lg')) {
        html = html.replace(mobileTarget, mobileTarget + '\n        ' + mobileNew);
    }

    if (file === 'index.html') {
        const oldStoreBtn = 'onclick="openServiceChat(\\'I want to join the waitlist for the E-Commerce store.\\', \\'আমি আসল সার-বীজ কেনার ই-কমার্স স্টোরের ওয়েটলিস্টে যুক্ত হতে চাই।\\')"';
        if(html.includes(oldStoreBtn)) {
            html = html.replace(oldStoreBtn, 'onclick="window.location.href=\'/store\'"');
            html = html.replace('<i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>', '<i class="fa-solid fa-store mr-2"></i> <span class="lang-en">Visit Store</span><span class="lang-bn hidden">স্টোরে যান</span>');
        }
    }
    
    if (file === 'services.html') {
        const oldStoreBtn = 'onclick="openServiceChat(\\'I want to join the waitlist for the E-Commerce store.\\', \\'আমি আসল সার-বীজ কেনার ই-কমার্স স্টোরের ওয়েটলিস্টে যুক্ত হতে চাই।\\')"';
        if(html.includes(oldStoreBtn)) {
            html = html.replace(oldStoreBtn, 'onclick="window.location.href=\'/store\'"');
            html = html.replace('<i class="fa-solid fa-clock mr-2"></i> <span class="lang-en">Join Waitlist</span><span class="lang-bn hidden">ওয়েটলিস্টে যুক্ত হোন</span>', '<i class="fa-solid fa-store mr-2"></i> <span class="lang-en">Visit Store</span><span class="lang-bn hidden">স্টোরে যান</span>');
        }
    }

    writeFile(file, html);
});

console.log("Store created successfully!");
