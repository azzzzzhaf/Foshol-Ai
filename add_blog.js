const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'admin.html'];

// Helper to safely read and write
function readFile(name) { return fs.readFileSync(path.join(dir, name), 'utf8'); }
function writeFile(name, content) { fs.writeFileSync(path.join(dir, name), content, 'utf8'); }

// 1. ADD BLOG SECTION TO HOMEPAGE
let indexHtml = readFile('index.html');

const blogSection = `
    <!-- Krishi Blog Section -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto bg-gray-50 rounded-[3rem] my-16 border border-gray-100">
        <div class="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4">
            <div class="text-center md:text-left">
                <span class="bg-green-100 text-green-800 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider inline-block mb-4">
                    <span class="lang-en">Krishi Blog</span><span class="lang-bn hidden">কৃষি ব্লগ</span>
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
                    <span class="lang-en">Farming Tips & News</span>
                    <span class="lang-bn hidden">কৃষি পরামর্শ ও খবর</span>
                </h2>
            </div>
            <a href="/articles.html" class="hidden md:inline-block bg-f-dark text-white px-6 py-2.5 rounded-full font-bold hover:bg-green-800 transition shadow-md">
                <span class="lang-en">View All Articles</span><span class="lang-bn hidden">সব ব্লগ দেখুন</span> <i class="fa-solid fa-arrow-right ml-1"></i>
            </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Blog Card 1 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div class="h-48 bg-gray-200 overflow-hidden relative">
                    <img src="images/blog1.jpg" onerror="this.src='https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-f-dark">Technology</div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                        <span class="lang-en">How AI is Revolutionizing Agriculture in Bangladesh</span>
                        <span class="lang-bn hidden">বাংলাদেশে কৃষিখাতে এআই-এর বিপ্লব</span>
                    </h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                        <span class="lang-en">Artificial Intelligence is helping rural farmers detect diseases instantly and increase crop yield by up to 30%.</span>
                        <span class="lang-bn hidden">কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে প্রান্তিক কৃষকরা এখন মুহূর্তের মধ্যে ফসলের রোগ নির্ণয় করতে পারছেন।</span>
                    </p>
                    <div class="flex items-center justify-between text-xs font-bold text-gray-400">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 12 Sep 2026</span>
                        <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>

            <!-- Blog Card 2 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div class="h-48 bg-gray-200 overflow-hidden relative">
                    <img src="images/blog2.jpg" onerror="this.src='https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-f-gold">Farming</div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                        <span class="lang-en">Top 5 Organic Fertilizers for Rice Fields</span>
                        <span class="lang-bn hidden">ধানের জমিতে ৫টি সেরা জৈব সারের ব্যবহার</span>
                    </h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                        <span class="lang-en">Reduce costs and improve soil health by using these highly effective organic fertilizers this season.</span>
                        <span class="lang-bn hidden">রাসায়নিক সারের খরচ কমিয়ে কীভাবে জৈব সার ব্যবহার করে ধানের ফলন বাড়ানো যায়, তা নিয়ে বিস্তারিত গাইডলাইন।</span>
                    </p>
                    <div class="flex items-center justify-between text-xs font-bold text-gray-400">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 10 Sep 2026</span>
                        <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>

            <!-- Blog Card 3 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div class="h-48 bg-gray-200 overflow-hidden relative">
                    <img src="images/blog3.jpg" onerror="this.src='https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-500">Weather</div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                        <span class="lang-en">How to Protect Crops from Unseasonal Rains</span>
                        <span class="lang-bn hidden">অসময়ের বৃষ্টি থেকে ফসল রক্ষার উপায়</span>
                    </h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                        <span class="lang-en">Climate change brings unexpected rain. Learn how to construct proper drainage and save your vegetables.</span>
                        <span class="lang-bn hidden">জলবায়ু পরিবর্তনের ফলে হঠাৎ বৃষ্টিতে সবজি ক্ষেতের পচন রোধ করতে কী ধরনের ড্রেনেজ ব্যবস্থা নেওয়া উচিত।</span>
                    </p>
                    <div class="flex items-center justify-between text-xs font-bold text-gray-400">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 08 Sep 2026</span>
                        <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>
        </div>
        
        <a href="/articles.html" class="md:hidden block w-full text-center mt-8 bg-f-dark text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition shadow-md">
            <span class="lang-en">View All Articles</span><span class="lang-bn hidden">সব ব্লগ দেখুন</span>
        </a>
    </section>
`;

if (!indexHtml.includes('Krishi Blog Section')) {
    indexHtml = indexHtml.replace('<!-- B2B Partnership -->', blogSection + '\n    <!-- B2B Partnership -->');
    writeFile('index.html', indexHtml);
}

// 2. CREATE articles.html (Dedicated Blog Page)
// We will clone services.html and replace its main content
let baseHtml = readFile('services.html');

const blogPageHeader = `
    <!-- Page Header -->
    <div class="bg-f-dark py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            <span class="lang-en">Krishi Blog & Resources</span><span class="lang-bn hidden">কৃষি ব্লগ ও রিসোর্স</span>
        </h1>
        <p class="text-green-100 max-w-2xl mx-auto">
            <span class="lang-en">Read the latest articles, farming techniques, and technology updates to increase your agricultural knowledge.</span>
            <span class="lang-bn hidden">আধুনিক কৃষি প্রযুক্তি, চাষাবাদের নতুন পদ্ধতি এবং খামার পরিচালনার গুরুত্বপূর্ণ আর্টিকেল পড়ুন।</span>
        </p>
    </div>
    
    <!-- Blog Section -->
`;

const blogPageEnd = `
    <!-- Footer -->
`;

const startIndex = baseHtml.indexOf('<!-- Page Header -->');
const endIndex = baseHtml.indexOf('<!-- Footer -->');

if(startIndex !== -1 && endIndex !== -1) {
    // Re-use the blog section from index but remove the wrapper and "View All" button
    let fullBlogGrid = blogSection
        .replace('<section class="py-16 px-6 md:px-12 max-w-7xl mx-auto bg-gray-50 rounded-[3rem] my-16 border border-gray-100">', '<section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">')
        .replace(/<div class="flex flex-col md:flex-row justify-between(.*?)<\/div>\s*<\/div>/s, '') // Remove header row
        .replace(/<a href="\/articles\.html"(.*?)<\/a>/gs, ''); // Remove all "View All" links
        
    let articlesHtml = baseHtml.substring(0, startIndex) + blogPageHeader + fullBlogGrid + baseHtml.substring(endIndex);
    
    // Add title change
    articlesHtml = articlesHtml.replace('<title>Services - Foshol AI</title>', '<title>Blog - Foshol AI</title>');
    
    writeFile('articles.html', articlesHtml);
    files.push('articles.html'); // Add to list for navbar updates
}

// 3. UPDATE NAVIGATIONS IN ALL FILES
files.forEach(file => {
    if(fs.existsSync(path.join(dir, file))) {
        let html = readFile(file);
        
        // Find where "AI Alerts" is in the mobile and desktop menus and insert "Blog" right after it
        const desktopMenuTarget = '<a href="/blog" class="text-gray-700 hover:text-f-dark font-bold transition"><span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span></a>';
        const mobileMenuTarget = '<a href="/blog" class="block text-gray-700 hover:bg-green-50 px-4 py-2 rounded-lg font-bold"><span class="lang-en">AI Alerts</span><span class="lang-bn hidden">কৃষি অ্যালার্ট</span></a>';
        
        const desktopMenuNew = '<a href="/articles" class="text-gray-700 hover:text-f-dark font-bold transition"><span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span></a>';
        const mobileMenuNew = '<a href="/articles" class="block text-gray-700 hover:bg-green-50 px-4 py-2 rounded-lg font-bold"><span class="lang-en">Blog</span><span class="lang-bn hidden">ব্লগ</span></a>';
        
        if (html.includes(desktopMenuTarget) && !html.includes('href="/articles"')) {
            html = html.replace(desktopMenuTarget, desktopMenuTarget + '\n                    ' + desktopMenuNew);
        }
        
        if (html.includes(mobileMenuTarget) && !html.includes(mobileMenuNew)) {
            html = html.replace(mobileMenuTarget, mobileMenuTarget + '\n                ' + mobileMenuNew);
        }
        
        writeFile(file, html);
    }
});

console.log("Blog section added to homepage and articles.html created!");
