const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// -------------------------------------------------------------
// 1. OVERWRITE admin.html WITH SEO, SLUG, & IMAGE COMPRESSION
// -------------------------------------------------------------
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foshol AI - Admin Pro V3</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: { colors: { 'f-dark': '#155d35', 'f-light': '#e8f5e9', 'f-gold': '#ffb300' } }
            }
        }
    </script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans h-screen overflow-hidden">

    <!-- LOGIN SCREEN -->
    <div id="login-screen" class="absolute inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center px-4">
        <div class="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100 text-center">
            <div class="w-16 h-16 bg-f-light text-f-dark rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h2>
            <p class="text-gray-500 mb-8">Manage Alerts & Blogs</p>
            <div id="error-msg" class="hidden bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4 font-bold">Invalid credentials!</div>
            <input type="email" id="email" placeholder="Email Address" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-4 outline-none focus:ring-2 focus:ring-f-dark" value="levi6t9@gmail.com">
            <input type="password" id="password" placeholder="Password" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-6 outline-none focus:ring-2 focus:ring-f-dark">
            <button onclick="checkLogin()" class="w-full bg-f-dark text-white font-bold rounded-xl px-5 py-3.5 hover:bg-green-800 transition shadow-lg">Login to Dashboard <i class="fa-solid fa-arrow-right ml-2"></i></button>
            <a href="/" class="block mt-6 text-sm text-gray-400 hover:text-f-dark transition">Return to website</a>
        </div>
    </div>

    <!-- ADMIN DASHBOARD -->
    <div id="dashboard-screen" class="hidden h-full flex flex-col md:flex-row">
        
        <!-- Sidebar -->
        <div class="w-full md:w-64 bg-f-dark text-white p-6 flex flex-col shadow-2xl z-10 overflow-y-auto">
            <div class="flex items-center gap-3 font-bold text-xl mb-10 mt-2">
                <i class="fa-solid fa-leaf text-f-gold"></i> Foshol Admin
            </div>
            <nav class="flex-grow space-y-2" id="sidebar-nav">
                <button onclick="switchTab('dashboard')" class="nav-btn w-full text-left px-4 py-3 rounded-xl font-bold transition bg-green-800 text-white" data-tab="dashboard"><i class="fa-solid fa-chart-pie w-6"></i> Dashboard</button>
                <button onclick="switchTab('alerts')" class="nav-btn w-full text-left px-4 py-3 rounded-xl font-bold transition text-green-100 hover:bg-green-800" data-tab="alerts"><i class="fa-solid fa-tower-broadcast w-6 text-red-400"></i> Manage Alerts</button>
                <button onclick="switchTab('blogs')" class="nav-btn w-full text-left px-4 py-3 rounded-xl font-bold transition text-green-100 hover:bg-green-800" data-tab="blogs"><i class="fa-solid fa-newspaper w-6 text-f-gold"></i> Manage Blogs</button>
            </nav>
            <button onclick="logout()" class="mt-auto text-left text-red-300 hover:text-red-100 px-4 py-3 font-bold"><i class="fa-solid fa-power-off mr-2"></i> Logout</button>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 overflow-y-auto bg-gray-50">
            <div class="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h1 class="text-2xl font-bold text-gray-800" id="page-title">Dashboard Overview</h1>
            </div>

            <div class="p-6 md:p-10 max-w-6xl mx-auto">
                <!-- DASHBOARD TAB -->
                <div id="tab-dashboard" class="tab-content">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div class="text-gray-500 text-sm font-bold uppercase mb-1">Active AI Alerts</div><div id="dash-alerts-count" class="text-3xl font-black text-red-500">0</div></div>
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div class="text-gray-500 text-sm font-bold uppercase mb-1">Published Blogs</div><div id="dash-blogs-count" class="text-3xl font-black text-f-gold">0</div></div>
                    </div>
                </div>

                <!-- ALERTS TAB -->
                <div id="tab-alerts" class="tab-content hidden">
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-plus-circle text-red-500 mr-2"></i> Add New Krishi Alert</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Title (Bangla)</label><input type="text" id="alert-title-bn" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Title (English)</label><input type="text" id="alert-title-en" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Severity</label><select id="alert-type" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"><option value="red">High Alert (Disease)</option><option value="orange">Warning (Weather)</option><option value="yellow">Caution (Pests)</option><option value="green">Guide (Advice)</option></select></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Location</label><input type="text" id="alert-loc" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                        </div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Message (Bangla)</label><textarea id="alert-msg-bn" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Message (English)</label><textarea id="alert-msg-en" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <button onclick="publishAlert()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition">Publish Alert</button>
                    </div>
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-list text-gray-400 mr-2"></i> Manage Alerts</h2>
                        <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><tbody id="alerts-table-body" class="divide-y divide-gray-100 text-gray-800"></tbody></table></div>
                    </div>
                </div>

                <!-- BLOGS TAB WITH SEO, SLUG & IMG UPLOAD -->
                <div id="tab-blogs" class="tab-content hidden">
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-pen-nib text-f-gold mr-2"></i> Write New Blog Article</h2>
                        
                        <!-- Core Details -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Blog Title (Bangla)</label><input type="text" id="blog-title-bn" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Blog Title (English)</label>
                                <input type="text" id="blog-title-en" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" onkeyup="generateSlug()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select id="blog-category" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                    <option value="Technology">Technology</option><option value="Farming">Farming</option><option value="Weather">Weather</option>
                                </select>
                            </div>
                            
                            <!-- Custom File Upload (Image) -->
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Upload Featured Image <span class="text-xs text-gray-400 font-normal">(Auto-compressed)</span></label>
                                <input type="file" id="blog-image-file" accept="image/*" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 file:bg-f-dark file:text-white file:border-0 file:px-4 file:py-1.5 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-green-800">
                                <input type="hidden" id="blog-image-base64">
                                <img id="image-preview" class="hidden mt-2 h-16 rounded-lg object-cover border border-gray-200">
                            </div>
                        </div>

                        <!-- Full Content -->
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Full Content (Bangla)</label><textarea id="blog-desc-bn" rows="5" placeholder="Write full article here..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Full Content (English)</label><textarea id="blog-desc-en" rows="5" placeholder="Write full article here..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>

                        <!-- SEO & Meta Information -->
                        <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
                            <h3 class="font-bold text-blue-900 mb-4"><i class="fa-solid fa-magnifying-glass mr-2"></i> SEO Settings</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">Slug URL</label>
                                <input type="text" id="blog-slug" placeholder="e.g. smart-farming-2026" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-blue-600"></div>
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">Meta Keywords (comma separated)</label>
                                <input type="text" id="blog-seo-keys" placeholder="Farming, AI, Tech" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm"></div>
                                <div class="md:col-span-2"><label class="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                <input type="text" id="blog-seo-desc" placeholder="Brief summary for Google search results..." class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm"></div>
                            </div>
                        </div>

                        <button onclick="publishBlog()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition">Publish Blog Live</button>
                    </div>

                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-list text-gray-400 mr-2"></i> Manage Published Blogs</h2>
                        <div class="overflow-x-auto"><table class="w-full text-left border-collapse">
                            <thead><tr class="bg-gray-50 text-gray-500 text-sm uppercase"><th class="p-4 rounded-tl-xl">Title & Slug</th><th class="p-4">Category</th><th class="p-4">Date</th><th class="p-4 rounded-tr-xl text-right">Action</th></tr></thead>
                            <tbody id="blogs-table-body" class="divide-y divide-gray-100 text-gray-800"></tbody>
                        </table></div>
                    </div>
                </div>
            </div>
            <div id="toast" class="hidden fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 z-50">
                <i class="fa-solid fa-check-circle text-green-400 text-xl"></i> <span id="toast-msg">Success!</span>
            </div>
        </div>
    </div>

    <script>
        // --- AUTH & TABS ---
        if (localStorage.getItem('foshol_admin') === 'true') {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('dashboard-screen').classList.remove('hidden');
            loadData();
        }
        function checkLogin() {
            if (document.getElementById('email').value === 'levi6t9@gmail.com' && document.getElementById('password').value === 'Foshol$$1') {
                localStorage.setItem('foshol_admin', 'true');
                document.getElementById('login-screen').classList.add('hidden');
                document.getElementById('dashboard-screen').classList.remove('hidden');
                loadData();
            } else { document.getElementById('error-msg').classList.remove('hidden'); }
        }
        function logout() { localStorage.removeItem('foshol_admin'); window.location.reload(); }
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById('tab-' + tabId).classList.remove('hidden');
            document.querySelectorAll('.nav-btn').forEach(btn => { btn.classList.remove('bg-green-800', 'text-white'); btn.classList.add('text-green-100'); });
            const activeBtn = document.querySelector(\`.nav-btn[data-tab="\${tabId}"]\`);
            activeBtn.classList.add('bg-green-800', 'text-white');
            activeBtn.classList.remove('text-green-100');
            document.getElementById('page-title').innerText = { 'dashboard': 'Dashboard Overview', 'alerts': 'Manage AI Alerts', 'blogs': 'Manage Krishi Blogs' }[tabId];
            loadData();
        }
        function showToast(msg) {
            document.getElementById('toast-msg').innerText = msg;
            const toast = document.getElementById('toast');
            toast.classList.remove('hidden'); toast.classList.add('animate-bounce');
            setTimeout(() => { toast.classList.add('hidden'); toast.classList.remove('animate-bounce'); }, 3000);
        }

        // --- IMAGE COMPRESSION & BASE64 UPLOAD ---
        document.getElementById('blog-image-file').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // Compress width
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    const base64Str = canvas.toDataURL('image/jpeg', 0.8); // 80% quality JPEG
                    document.getElementById('blog-image-base64').value = base64Str;
                    
                    const preview = document.getElementById('image-preview');
                    preview.src = base64Str;
                    preview.classList.remove('hidden');
                }
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        // --- SLUG GENERATION ---
        function generateSlug() {
            const title = document.getElementById('blog-title-en').value;
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            document.getElementById('blog-slug').value = slug;
        }

        // --- DATA LOAD ---
        function loadData() {
            const alerts = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            const blogs = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            document.getElementById('dash-alerts-count').innerText = alerts.length + 4;
            document.getElementById('dash-blogs-count').innerText = blogs.length + 3;
            
            // Alerts Table
            const alertBody = document.getElementById('alerts-table-body');
            alertBody.innerHTML = '';
            alerts.forEach((item, index) => {
                alertBody.innerHTML += \`<tr class="hover:bg-gray-50"><td class="p-4 font-bold">\${item.titleEn}</td><td class="p-4"><span class="bg-gray-100 px-2 py-1 rounded text-xs uppercase">\${item.type}</span></td><td class="p-4 text-sm">\${item.loc}</td><td class="p-4 text-right"><button onclick="deleteAlert(\${index})" class="text-red-500 hover:bg-red-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button></td></tr>\`;
            });

            // Blogs Table
            const blogBody = document.getElementById('blogs-table-body');
            blogBody.innerHTML = '';
            blogs.forEach((item, index) => {
                blogBody.innerHTML += \`<tr class="hover:bg-gray-50">
                    <td class="p-4">
                        <div class="font-bold">\${item.titleEn}</div>
                        <div class="text-xs text-blue-500">/\${item.slug}</div>
                    </td>
                    <td class="p-4"><span class="bg-gray-100 px-2 py-1 rounded text-xs uppercase">\${item.category}</span></td>
                    <td class="p-4 text-sm">\${item.date}</td>
                    <td class="p-4 text-right"><button onclick="deleteBlog(\${index})" class="text-red-500 hover:bg-red-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button></td>
                </tr>\`;
            });
        }

        // --- CRUD LOGIC ---
        function publishAlert() {
            const titleBn = document.getElementById('alert-title-bn').value;
            const titleEn = document.getElementById('alert-title-en').value;
            if(!titleBn) return alert('Title required!');
            const newAlert = { titleBn, titleEn, type: document.getElementById('alert-type').value, loc: document.getElementById('alert-loc').value, msgBn: document.getElementById('alert-msg-bn').value, msgEn: document.getElementById('alert-msg-en').value, time: 'Just Now' };
            const existing = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            existing.unshift(newAlert);
            localStorage.setItem('foshol_alerts', JSON.stringify(existing));
            showToast('Alert Published Successfully!');
            loadData();
        }
        function deleteAlert(index) {
            if(!confirm('Are you sure you want to delete this alert?')) return;
            const existing = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            existing.splice(index, 1); localStorage.setItem('foshol_alerts', JSON.stringify(existing)); showToast('Alert Deleted!'); loadData();
        }

        function publishBlog() {
            const titleBn = document.getElementById('blog-title-bn').value;
            const titleEn = document.getElementById('blog-title-en').value;
            const slug = document.getElementById('blog-slug').value || Date.now().toString();
            
            if(!titleBn) return alert('Title required!');
            
            const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            
            let img = document.getElementById('blog-image-base64').value;
            if(!img) img = 'https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Default if none uploaded

            const newBlog = {
                titleBn, titleEn, slug, category: document.getElementById('blog-category').value, img,
                descBn: document.getElementById('blog-desc-bn').value, descEn: document.getElementById('blog-desc-en').value,
                seoKeys: document.getElementById('blog-seo-keys').value, seoDesc: document.getElementById('blog-seo-desc').value,
                date: dateStr
            };
            
            const existing = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            existing.unshift(newBlog);
            localStorage.setItem('foshol_blogs', JSON.stringify(existing));
            showToast('Blog Published with SEO & Image!');
            loadData();
            
            // Clear forms
            document.getElementById('image-preview').classList.add('hidden');
            document.getElementById('blog-image-base64').value = '';
        }
        function deleteBlog(index) {
            if(!confirm('Are you sure you want to delete this blog?')) return;
            const existing = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            existing.splice(index, 1); localStorage.setItem('foshol_blogs', JSON.stringify(existing)); showToast('Blog Deleted!'); loadData();
        }
    </script>
</body>
</html>`;
fs.writeFileSync(path.join(dir, 'admin.html'), adminHtml, 'utf8');

// -------------------------------------------------------------
// 2. OVERWRITE articles.html (Dynamic SPA routing for Single Blog Post)
// -------------------------------------------------------------
let articlesHtml = fs.readFileSync(path.join(dir, 'articles.html'), 'utf8');

// Wrap the existing Blog section in a Grid Container and add a Single Post Container
articlesHtml = articlesHtml.replace('<section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">', 
    `<section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <!-- ALL BLOGS GRID -->
        <div id="blog-grid-container">`);
articlesHtml = articlesHtml.replace('<!-- Footer -->', 
        `</div>
        
        <!-- SINGLE POST VIEW (Hidden by default) -->
        <div id="single-post-container" class="hidden bg-white rounded-[3rem] p-8 md:p-16 shadow-lg border border-gray-100 mt-[-5rem] relative z-10 mx-auto max-w-4xl">
            <a href="/articles" class="inline-block mb-8 text-f-dark font-bold hover:text-green-800 transition bg-green-50 px-4 py-2 rounded-full">
                <i class="fa-solid fa-arrow-left mr-2"></i> <span class="lang-en">Back to Articles</span><span class="lang-bn hidden">ফিরে যান</span>
            </a>
            
            <span id="sp-category" class="bg-f-gold text-f-dark font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider inline-block mb-4">Category</span>
            
            <h1 id="sp-title-en" class="lang-en text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Title</h1>
            <h1 id="sp-title-bn" class="lang-bn hidden text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Title</h1>
            
            <div class="flex items-center text-gray-500 font-bold text-sm mb-10 border-b pb-6">
                <img src="https://ui-avatars.com/api/?name=Foshol+AI&background=155d35&color=fff" class="w-10 h-10 rounded-full mr-3">
                <span class="mr-6">Foshol Admin</span>
                <i class="fa-regular fa-calendar mr-2"></i> <span id="sp-date">Date</span>
            </div>
            
            <img id="sp-image" src="" class="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-md">
            
            <div class="prose prose-lg max-w-none text-gray-700 leading-loose">
                <p id="sp-content-en" class="lang-en whitespace-pre-wrap">Content</p>
                <p id="sp-content-bn" class="lang-bn hidden whitespace-pre-wrap">Content</p>
            </div>
        </div>
    <!-- Footer -->`);

// Overwrite the dynamic javascript at the bottom of articles.html to handle routing & links
const routingScript = `
    <!-- Dynamic SPA Routing Logic -->
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('post');
            const blogs = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');

            // Handle Single Post Routing
            if (slug) {
                const post = blogs.find(b => b.slug === slug);
                if (post) {
                    // Update SEO dynamically
                    document.title = post.titleEn + " - Foshol AI Blog";
                    if(post.seoDesc) {
                        let meta = document.createElement('meta'); meta.name = "description"; meta.content = post.seoDesc; document.head.appendChild(meta);
                    }
                    if(post.seoKeys) {
                        let meta = document.createElement('meta'); meta.name = "keywords"; meta.content = post.seoKeys; document.head.appendChild(meta);
                    }

                    // Render UI
                    document.getElementById('blog-grid-container').classList.add('hidden');
                    document.getElementById('single-post-container').classList.remove('hidden');
                    
                    document.getElementById('sp-category').innerText = post.category;
                    document.getElementById('sp-title-en').innerText = post.titleEn;
                    document.getElementById('sp-title-bn').innerText = post.titleBn;
                    document.getElementById('sp-date').innerText = post.date;
                    document.getElementById('sp-image').src = post.img;
                    document.getElementById('sp-content-en').innerText = post.descEn;
                    document.getElementById('sp-content-bn').innerText = post.descBn;
                    
                    setTimeout(applyLanguage, 50);
                    return; // Stop rendering grid
                }
            }

            // Normal Grid Rendering
            const container = document.querySelector('#blog-grid-container .grid');
            if (blogs.length > 0 && container) {
                let dynamicHtml = '';
                blogs.forEach(blog => {
                    let badgeColor = 'text-f-dark';
                    if(blog.category === 'Technology') badgeColor = 'text-f-dark';
                    else if(blog.category === 'Farming') badgeColor = 'text-f-gold';
                    else if(blog.category === 'Weather') badgeColor = 'text-orange-500';

                    dynamicHtml += \`
                    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href='/articles?post=\${blog.slug}'">
                        <div class="h-48 bg-gray-200 overflow-hidden relative">
                            <img src="\${blog.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold \${badgeColor}">\${blog.category}</div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                                <span class="lang-en">\${blog.titleEn}</span><span class="lang-bn hidden">\${blog.titleBn}</span>
                            </h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                                <span class="lang-en">\${blog.descEn}</span><span class="lang-bn hidden">\${blog.descBn}</span>
                            </p>
                            <div class="flex items-center justify-between text-xs font-bold text-gray-400">
                                <span><i class="fa-regular fa-calendar mr-1"></i> \${blog.date}</span>
                                <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>\`;
                });
                container.innerHTML = dynamicHtml + container.innerHTML;
                setTimeout(applyLanguage, 50);
            }
        });
    </script>
`;

// Remove the old dynamic script from articles.html and inject the new one
articlesHtml = articlesHtml.replace(/<!-- Dynamic Admin Blogs Logic -->.*?<\/script>/s, '');
articlesHtml = articlesHtml.replace('</body>', routingScript + '\n</body>');
fs.writeFileSync(path.join(dir, 'articles.html'), articlesHtml, 'utf8');

// 3. Update index.html dynamic script to make the cards clickable to ?post=slug
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
indexHtml = indexHtml.replace(/<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">/g, '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles?post=\${blog.slug}\'">');
fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');

console.log("Admin V3 with SEO, Slug, and Base64 Images implemented!");
