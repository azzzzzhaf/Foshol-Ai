const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// -------------------------------------------------------------
// 1. OVERWRITE admin.html WITH FULL ADD/REMOVE FUNCTIONALITY
// -------------------------------------------------------------
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foshol AI - Admin Pro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { 'f-dark': '#155d35', 'f-light': '#e8f5e9', 'f-gold': '#ffb300' }
                }
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
            
            <button onclick="checkLogin()" class="w-full bg-f-dark text-white font-bold rounded-xl px-5 py-3.5 hover:bg-green-800 transition shadow-lg">
                Login to Dashboard <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
            <a href="/" class="block mt-6 text-sm text-gray-400 hover:text-f-dark transition">Return to website</a>
        </div>
    </div>

    <!-- ADMIN DASHBOARD -->
    <div id="dashboard-screen" class="hidden h-full flex flex-col md:flex-row">
        
        <!-- Sidebar -->
        <div class="w-full md:w-64 bg-f-dark text-white p-6 flex flex-col shadow-2xl z-10">
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
            
            <!-- Header -->
            <div class="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
                <h1 class="text-2xl font-bold text-gray-800" id="page-title">Dashboard Overview</h1>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">A</div>
                    <span class="font-bold text-gray-700 hidden sm:block">Admin</span>
                </div>
            </div>

            <div class="p-6 md:p-10 max-w-6xl mx-auto">
                
                <!-- TAB: DASHBOARD -->
                <div id="tab-dashboard" class="tab-content">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div class="text-gray-500 text-sm font-bold uppercase mb-1">Total Active Farmers</div>
                            <div class="text-3xl font-black text-f-dark">5,024</div>
                        </div>
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div class="text-gray-500 text-sm font-bold uppercase mb-1">Active AI Alerts</div>
                            <div id="dash-alerts-count" class="text-3xl font-black text-red-500">0</div>
                        </div>
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div class="text-gray-500 text-sm font-bold uppercase mb-1">Published Blogs</div>
                            <div id="dash-blogs-count" class="text-3xl font-black text-f-gold">0</div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                        <i class="fa-solid fa-robot text-6xl text-gray-200 mb-4"></i>
                        <h3 class="text-xl font-bold text-gray-700">Foshol AI System Active</h3>
                        <p>All AI chat services and weather monitoring are running optimally.</p>
                    </div>
                </div>

                <!-- TAB: ALERTS -->
                <div id="tab-alerts" class="tab-content hidden">
                    <!-- Add Alert Form -->
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-plus-circle text-red-500 mr-2"></i> Add New Krishi Alert</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Title (Bangla)</label><input type="text" id="alert-title-bn" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Title (English)</label><input type="text" id="alert-title-en" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Severity</label>
                                <select id="alert-type" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                    <option value="red">High Alert (Disease)</option><option value="orange">Warning (Weather)</option>
                                    <option value="yellow">Caution (Pests)</option><option value="green">Guide (Advice)</option>
                                </select>
                            </div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Location</label><input type="text" id="alert-loc" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                        </div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Message (Bangla)</label><textarea id="alert-msg-bn" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Message (English)</label><textarea id="alert-msg-en" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <button onclick="publishAlert()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition">Publish Alert</button>
                    </div>

                    <!-- Manage Alerts Table -->
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-list text-gray-400 mr-2"></i> Manage Existing Alerts</h2>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase"><th class="p-4 rounded-tl-xl">Title</th><th class="p-4">Type</th><th class="p-4">Location</th><th class="p-4 rounded-tr-xl text-right">Action</th></tr>
                                </thead>
                                <tbody id="alerts-table-body" class="divide-y divide-gray-100 text-gray-800">
                                    <!-- Dynamic Rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- TAB: BLOGS -->
                <div id="tab-blogs" class="tab-content hidden">
                    <!-- Add Blog Form -->
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-pen-nib text-f-gold mr-2"></i> Write New Blog Article</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Blog Title (Bangla)</label><input type="text" id="blog-title-bn" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Blog Title (English)</label><input type="text" id="blog-title-en" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select id="blog-category" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                    <option value="Technology">Technology (প্রযুক্তি)</option>
                                    <option value="Farming">Farming (চাষাবাদ)</option>
                                    <option value="Weather">Weather (আবহাওয়া)</option>
                                </select>
                            </div>
                            <div><label class="block text-sm font-bold text-gray-700 mb-2">Image URL (Optional)</label><input type="text" id="blog-img" placeholder="https://..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></div>
                        </div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Short Description (Bangla)</label><textarea id="blog-desc-bn" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <div class="mb-6"><label class="block text-sm font-bold text-gray-700 mb-2">Short Description (English)</label><textarea id="blog-desc-en" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea></div>
                        <button onclick="publishBlog()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition">Publish Blog</button>
                    </div>

                    <!-- Manage Blogs Table -->
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-list text-gray-400 mr-2"></i> Manage Published Blogs</h2>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase"><th class="p-4 rounded-tl-xl">Title</th><th class="p-4">Category</th><th class="p-4">Date</th><th class="p-4 rounded-tr-xl text-right">Action</th></tr>
                                </thead>
                                <tbody id="blogs-table-body" class="divide-y divide-gray-100 text-gray-800">
                                    <!-- Dynamic Rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            
            <!-- Toast Notification -->
            <div id="toast" class="hidden fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 z-50">
                <i class="fa-solid fa-check-circle text-green-400 text-xl"></i> <span id="toast-msg">Success!</span>
            </div>
            
        </div>
    </div>

    <script>
        // --- AUTH LOGIC ---
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
            } else {
                document.getElementById('error-msg').classList.remove('hidden');
            }
        }
        function logout() { localStorage.removeItem('foshol_admin'); window.location.reload(); }

        // --- TAB LOGIC ---
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById('tab-' + tabId).classList.remove('hidden');
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-green-800', 'text-white');
                btn.classList.add('text-green-100');
            });
            const activeBtn = document.querySelector(\`.nav-btn[data-tab="\${tabId}"]\`);
            activeBtn.classList.add('bg-green-800', 'text-white');
            activeBtn.classList.remove('text-green-100');
            
            const titles = { 'dashboard': 'Dashboard Overview', 'alerts': 'Manage AI Alerts', 'blogs': 'Manage Krishi Blogs' };
            document.getElementById('page-title').innerText = titles[tabId];
            loadData();
        }

        function showToast(msg) {
            document.getElementById('toast-msg').innerText = msg;
            const toast = document.getElementById('toast');
            toast.classList.remove('hidden');
            toast.classList.add('animate-bounce');
            setTimeout(() => { toast.classList.add('hidden'); toast.classList.remove('animate-bounce'); }, 3000);
        }

        // --- DATA LOGIC ---
        function loadData() {
            const alerts = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            const blogs = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            
            document.getElementById('dash-alerts-count').innerText = alerts.length + 4; // 4 static
            document.getElementById('dash-blogs-count').innerText = blogs.length + 3; // 3 static
            
            // Render Alerts Table
            const alertBody = document.getElementById('alerts-table-body');
            alertBody.innerHTML = '';
            if(alerts.length === 0) alertBody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-400">No custom alerts found.</td></tr>';
            alerts.forEach((item, index) => {
                alertBody.innerHTML += \`<tr class="hover:bg-gray-50">
                    <td class="p-4 font-bold">\${item.titleEn}</td>
                    <td class="p-4"><span class="bg-gray-100 px-2 py-1 rounded text-xs uppercase">\${item.type}</span></td>
                    <td class="p-4 text-sm">\${item.loc}</td>
                    <td class="p-4 text-right"><button onclick="deleteAlert(\${index})" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><i class="fa-solid fa-trash"></i></button></td>
                </tr>\`;
            });

            // Render Blogs Table
            const blogBody = document.getElementById('blogs-table-body');
            blogBody.innerHTML = '';
            if(blogs.length === 0) blogBody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-400">No custom blogs found.</td></tr>';
            blogs.forEach((item, index) => {
                blogBody.innerHTML += \`<tr class="hover:bg-gray-50">
                    <td class="p-4 font-bold">\${item.titleEn}</td>
                    <td class="p-4"><span class="bg-gray-100 px-2 py-1 rounded text-xs uppercase">\${item.category}</span></td>
                    <td class="p-4 text-sm">\${item.date}</td>
                    <td class="p-4 text-right"><button onclick="deleteBlog(\${index})" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><i class="fa-solid fa-trash"></i></button></td>
                </tr>\`;
            });
        }

        // ALERTS CRUD
        function publishAlert() {
            const titleBn = document.getElementById('alert-title-bn').value;
            const titleEn = document.getElementById('alert-title-en').value;
            if(!titleBn) { alert('Title required!'); return; }
            const newAlert = {
                titleBn, titleEn, type: document.getElementById('alert-type').value,
                loc: document.getElementById('alert-loc').value,
                msgBn: document.getElementById('alert-msg-bn').value, msgEn: document.getElementById('alert-msg-en').value,
                time: 'Just Now'
            };
            const existing = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            existing.unshift(newAlert);
            localStorage.setItem('foshol_alerts', JSON.stringify(existing));
            showToast('Alert Published Successfully!');
            ['alert-title-bn', 'alert-title-en', 'alert-loc', 'alert-msg-bn', 'alert-msg-en'].forEach(id => document.getElementById(id).value = '');
            loadData();
        }
        function deleteAlert(index) {
            if(!confirm('Are you sure you want to delete this alert?')) return;
            const existing = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            existing.splice(index, 1);
            localStorage.setItem('foshol_alerts', JSON.stringify(existing));
            showToast('Alert Deleted!');
            loadData();
        }

        // BLOGS CRUD
        function publishBlog() {
            const titleBn = document.getElementById('blog-title-bn').value;
            const titleEn = document.getElementById('blog-title-en').value;
            if(!titleBn) { alert('Title required!'); return; }
            
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            
            let img = document.getElementById('blog-img').value;
            if(!img) img = 'https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Default

            const newBlog = {
                titleBn, titleEn, category: document.getElementById('blog-category').value, img,
                descBn: document.getElementById('blog-desc-bn').value, descEn: document.getElementById('blog-desc-en').value,
                date: dateStr
            };
            const existing = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            existing.unshift(newBlog);
            localStorage.setItem('foshol_blogs', JSON.stringify(existing));
            showToast('Blog Published Successfully!');
            ['blog-title-bn', 'blog-title-en', 'blog-img', 'blog-desc-bn', 'blog-desc-en'].forEach(id => document.getElementById(id).value = '');
            loadData();
        }
        function deleteBlog(index) {
            if(!confirm('Are you sure you want to delete this blog?')) return;
            const existing = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            existing.splice(index, 1);
            localStorage.setItem('foshol_blogs', JSON.stringify(existing));
            showToast('Blog Deleted!');
            loadData();
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'admin.html'), adminHtml, 'utf8');

// -------------------------------------------------------------
// 2. INJECT BLOG DYNAMIC RENDERING SCRIPT TO articles.html & index.html
// -------------------------------------------------------------
const dynamicBlogsScript = `
    <!-- Dynamic Admin Blogs Logic -->
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const blogs = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');
            // Find the blog grid
            const container = document.querySelector('.grid.grid-cols-1.md\\\\:grid-cols-3.gap-8');
            
            if (blogs.length > 0 && container) {
                let dynamicHtml = '';
                
                blogs.forEach(blog => {
                    let badgeColor = 'text-f-dark';
                    if(blog.category === 'Technology') badgeColor = 'text-f-dark';
                    else if(blog.category === 'Farming') badgeColor = 'text-f-gold';
                    else if(blog.category === 'Weather') badgeColor = 'text-orange-500';

                    dynamicHtml += \`
                    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                        <div class="h-48 bg-gray-200 overflow-hidden relative">
                            <img src="\${blog.img}" onerror="this.src='https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
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
                
                // Inject at the top of the grid
                container.innerHTML = dynamicHtml + container.innerHTML;
                
                // Re-apply language states for dynamic content
                setTimeout(applyLanguage, 50);
            }
        });
    </script>
`;

['articles.html', 'index.html'].forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    if(!html.includes('Dynamic Admin Blogs Logic')) {
        html = html.replace('</body>', dynamicBlogsScript + '\n</body>');
        fs.writeFileSync(path.join(dir, file), html, 'utf8');
    }
});

console.log("Admin v2 with Blog CRUD and dynamic rendering implemented successfully!");
