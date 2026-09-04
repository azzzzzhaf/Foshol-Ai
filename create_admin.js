const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// 1. CREATE admin.html
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foshol AI - Admin Panel</title>
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
<body class="bg-gray-50 text-gray-800 font-sans">

    <!-- LOGIN SCREEN -->
    <div id="login-screen" class="min-h-screen flex flex-col items-center justify-center px-4">
        <div class="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100 text-center">
            <div class="w-16 h-16 bg-f-light text-f-dark rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <i class="fa-solid fa-lock"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p class="text-gray-500 mb-8">Foshol AI Control Panel</p>
            
            <div id="error-msg" class="hidden bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4 font-bold">Invalid credentials!</div>
            
            <input type="email" id="email" placeholder="Email Address" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-4 outline-none focus:ring-2 focus:ring-f-dark" value="levi6t9@gmail.com">
            <input type="password" id="password" placeholder="Password" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-6 outline-none focus:ring-2 focus:ring-f-dark">
            
            <button onclick="checkLogin()" class="w-full bg-f-dark text-white font-bold rounded-xl px-5 py-3.5 hover:bg-green-800 transition shadow-lg">
                Access Dashboard <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
            <a href="/" class="block mt-6 text-sm text-gray-400 hover:text-f-dark transition">Return to website</a>
        </div>
    </div>

    <!-- ADMIN DASHBOARD (Hidden by default) -->
    <div id="dashboard-screen" class="hidden min-h-screen flex flex-col md:flex-row">
        <!-- Sidebar -->
        <div class="w-full md:w-64 bg-f-dark text-white p-6 flex flex-col">
            <div class="flex items-center gap-3 font-bold text-xl mb-12">
                <i class="fa-solid fa-leaf text-f-gold"></i> Foshol Admin
            </div>
            <nav class="flex-grow space-y-2">
                <a href="#" class="block bg-green-800/50 text-white px-4 py-3 rounded-xl font-bold"><i class="fa-solid fa-tower-broadcast mr-2 text-f-gold"></i> Manage Alerts</a>
                <a href="#" class="block text-green-100 hover:bg-green-800 px-4 py-3 rounded-xl transition"><i class="fa-solid fa-users mr-2"></i> Users Data</a>
                <a href="#" class="block text-green-100 hover:bg-green-800 px-4 py-3 rounded-xl transition"><i class="fa-solid fa-chart-line mr-2"></i> Analytics</a>
            </nav>
            <button onclick="logout()" class="mt-auto text-left text-red-300 hover:text-red-100 px-4 py-3 font-bold"><i class="fa-solid fa-power-off mr-2"></i> Logout</button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-6 md:p-10 h-screen overflow-y-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Alerts Dashboard</h1>
            
            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div class="text-gray-500 text-sm font-bold uppercase mb-1">Total Active Farmers</div>
                    <div class="text-3xl font-black text-f-dark">5,024</div>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div class="text-gray-500 text-sm font-bold uppercase mb-1">AI Chats Today</div>
                    <div class="text-3xl font-black text-blue-600">1,240</div>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div class="text-gray-500 text-sm font-bold uppercase mb-1">Live Alerts</div>
                    <div id="live-alerts-count" class="text-3xl font-black text-red-500">4</div>
                </div>
            </div>

            <!-- Publish Alert Form -->
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4"><i class="fa-solid fa-plus-circle text-f-gold mr-2"></i> Publish New Krishi Alert</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Alert Title (Bangla)</label>
                        <input type="text" id="alert-title-bn" placeholder="উদা: বোরো ধানে পোকার আক্রমণ" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Alert Title (English)</label>
                        <input type="text" id="alert-title-en" placeholder="Ex: Pest Attack in Boro Rice" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Alert Type (Severity)</label>
                        <select id="alert-type" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark">
                            <option value="red">High Alert (Red) - Diseases</option>
                            <option value="orange">Warning (Orange) - Weather</option>
                            <option value="yellow">Caution (Yellow) - Pests</option>
                            <option value="green">Guide (Green) - General Advice</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Affected Districts/Locations</label>
                        <input type="text" id="alert-location" placeholder="Ex: Bogura, Naogaon" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Detailed Message (Bangla)</label>
                    <textarea id="alert-msg-bn" rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark"></textarea>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Detailed Message (English)</label>
                    <textarea id="alert-msg-en" rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-f-dark"></textarea>
                </div>

                <button onclick="publishAlert()" class="bg-f-dark text-white font-bold rounded-xl px-8 py-3.5 hover:bg-green-800 transition shadow-md w-full md:w-auto">
                    <i class="fa-solid fa-paper-plane mr-2"></i> Publish to Public Website
                </button>
            </div>
            
            <!-- Success Toast -->
            <div id="toast" class="hidden fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-bounce">
                <i class="fa-solid fa-check-circle mr-2"></i> Alert Published Live!
            </div>
        </div>
    </div>

    <script>
        // Check if already logged in
        if (localStorage.getItem('foshol_admin') === 'true') {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('dashboard-screen').classList.remove('hidden');
            updateCount();
        }

        function checkLogin() {
            const em = document.getElementById('email').value;
            const pw = document.getElementById('password').value;
            
            if (em === 'levi6t9@gmail.com' && pw === 'Foshol$$1') {
                localStorage.setItem('foshol_admin', 'true');
                document.getElementById('login-screen').classList.add('hidden');
                document.getElementById('dashboard-screen').classList.remove('hidden');
                updateCount();
            } else {
                document.getElementById('error-msg').classList.remove('hidden');
            }
        }

        function logout() {
            localStorage.removeItem('foshol_admin');
            window.location.reload();
        }
        
        function updateCount() {
            const alerts = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            document.getElementById('live-alerts-count').innerText = 4 + alerts.length;
        }

        function publishAlert() {
            const titleBn = document.getElementById('alert-title-bn').value;
            const titleEn = document.getElementById('alert-title-en').value;
            const type = document.getElementById('alert-type').value;
            const loc = document.getElementById('alert-location').value;
            const msgBn = document.getElementById('alert-msg-bn').value;
            const msgEn = document.getElementById('alert-msg-en').value;
            
            if(!titleBn || !msgBn) { alert('Please fill in the details!'); return; }

            const newAlert = { titleBn, titleEn, type, loc, msgBn, msgEn, time: 'Just Now' };
            
            // Get existing alerts from localStorage DB
            const existingAlerts = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            existingAlerts.unshift(newAlert); // Add to top
            
            // Save back
            localStorage.setItem('foshol_alerts', JSON.stringify(existingAlerts));
            
            // Show toast & reset
            document.getElementById('toast').classList.remove('hidden');
            setTimeout(() => document.getElementById('toast').classList.add('hidden'), 3000);
            
            document.getElementById('alert-title-bn').value = '';
            document.getElementById('alert-title-en').value = '';
            document.getElementById('alert-msg-bn').value = '';
            document.getElementById('alert-msg-en').value = '';
            
            updateCount();
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'admin.html'), adminHtml, 'utf8');


// 2. UPDATE blog.html TO READ ALERTS FROM LOCAL STORAGE
let blogHtml = fs.readFileSync(path.join(dir, 'blog.html'), 'utf8');

const dynamicAlertsScript = `
    <!-- Dynamic Admin Alerts Logic -->
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const alerts = JSON.parse(localStorage.getItem('foshol_alerts') || '[]');
            const container = document.querySelector('.grid.grid-cols-1.md\\\\:grid-cols-2.gap-6');
            
            if (alerts.length > 0 && container) {
                let dynamicHtml = '';
                
                alerts.forEach(alert => {
                    let typeClass = 'border-green-500';
                    let bgBadge = 'bg-green-100 text-green-800';
                    let icon = '<i class="fa-solid fa-seedling"></i>';
                    let typeNameEn = 'General Update';
                    let typeNameBn = 'সাধারণ তথ্য';
                    let locIconColor = 'text-green-500';
                    
                    if(alert.type === 'red') {
                        typeClass = 'border-red-500'; bgBadge = 'bg-red-100 text-red-800'; icon = '<span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>'; typeNameEn = 'High Alert'; typeNameBn = 'মারাত্মক সতর্কতা'; locIconColor = 'text-red-400';
                    } else if(alert.type === 'orange') {
                        typeClass = 'border-orange-500'; bgBadge = 'bg-orange-100 text-orange-800'; icon = '<i class="fa-solid fa-cloud-showers-heavy"></i>'; typeNameEn = 'Weather Warning'; typeNameBn = 'আবহাওয়া সতর্কতা'; locIconColor = 'text-orange-400';
                    } else if(alert.type === 'yellow') {
                        typeClass = 'border-yellow-400'; bgBadge = 'bg-yellow-100 text-yellow-800'; icon = '<i class="fa-solid fa-bug"></i>'; typeNameEn = 'Pest Alert'; typeNameBn = 'পোকামাকড় সতর্কতা'; locIconColor = 'text-yellow-500';
                    }

                    dynamicHtml += \`
                    <div class="bg-white rounded-3xl p-6 shadow-md border-l-8 \${typeClass} hover:-translate-y-2 transition-transform duration-300">
                        <div class="flex justify-between items-start mb-4">
                            <span class="\${bgBadge} font-bold px-3 py-1 rounded-full text-xs uppercase flex items-center gap-2">
                                \${icon} <span class="lang-en">\${typeNameEn}</span><span class="lang-bn hidden">\${typeNameBn}</span>
                            </span>
                            <span class="text-gray-400 text-xs font-bold"><i class="fa-solid fa-clock"></i> \${alert.time}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">
                            <span class="lang-en">\${alert.titleEn}</span><span class="lang-bn hidden">\${alert.titleBn}</span>
                        </h3>
                        <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                            <span class="lang-en">\${alert.msgEn}</span><span class="lang-bn hidden">\${alert.msgBn}</span>
                        </p>
                        <div class="text-xs font-bold text-gray-500"><i class="fa-solid fa-location-dot \${locIconColor}"></i> \${alert.loc}</div>
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

if(!blogHtml.includes('Dynamic Admin Alerts Logic')) {
    blogHtml = blogHtml.replace('</body>', dynamicAlertsScript + '\n</body>');
    fs.writeFileSync(path.join(dir, 'blog.html'), blogHtml, 'utf8');
}


// 3. Add a hidden link to Admin Panel in the footer of index.html
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if(!indexHtml.includes('/admin')) {
    indexHtml = indexHtml.replace(
        '<p>&copy; 2026 FosholAI. All Rights Reserved.</p>', 
        '<p>&copy; 2026 FosholAI. All Rights Reserved. <a href="/admin" class="text-gray-600 hover:text-white transition ml-2"><i class="fa-solid fa-lock text-xs"></i></a></p>'
    );
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');
}

console.log("Admin Panel Created successfully!");
