const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';

// 1. UPDATE articles.html
let articlesHtml = fs.readFileSync(path.join(dir, 'articles.html'), 'utf8');

// Replace everything from <!-- Krishi Blog Section --> to <!-- Footer -->
const startMarker = '<!-- Krishi Blog Section -->';
const endMarker = '<!-- Footer -->';

const startIdx = articlesHtml.indexOf(startMarker);
const endIdx = articlesHtml.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
    const newSection = `<!-- Krishi Blog Section -->
    <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <!-- ALL BLOGS GRID -->
        <div id="blog-grid-container">
            <div id="blogs-grid-inner" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Static Fallback Cards (will be replaced or enriched by JS) -->
                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full" onclick="window.location.href='/articles?post=how-ai-is-revolutionizing-agriculture'">
                    <div class="h-48 bg-gray-200 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-f-dark">Technology</div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                                <span class="lang-en">How AI is Revolutionizing Agriculture in Bangladesh</span>
                                <span class="lang-bn hidden">বাংলাদেশে কৃষিখাতে এআই-এর বিপ্লব</span>
                            </h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                                <span class="lang-en">Artificial Intelligence is helping rural farmers detect diseases instantly and increase crop yield by up to 30%.</span>
                                <span class="lang-bn hidden">কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে প্রান্তিক কৃষকরা এখন মুহূর্তের মধ্যে ফসলের রোগ নির্ণয় করতে পারছেন।</span>
                            </p>
                        </div>
                        <div class="flex items-center justify-between text-xs font-bold text-gray-400 mt-auto pt-2">
                            <span><i class="fa-regular fa-calendar mr-1"></i> 12 Sep 2026</span>
                            <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full" onclick="window.location.href='/articles?post=top-5-organic-fertilizers'">
                    <div class="h-48 bg-gray-200 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-f-gold">Farming</div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                                <span class="lang-en">Top 5 Organic Fertilizers for Rice Fields</span>
                                <span class="lang-bn hidden">ধানের জমিতে ৫টি সেরা জৈব সারের ব্যবহার</span>
                            </h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                                <span class="lang-en">Reduce costs and improve soil health by using these highly effective organic fertilizers this season.</span>
                                <span class="lang-bn hidden">রাসায়নিক সারের খরচ কমিয়ে কীভাবে জৈব সার ব্যবহার করে ধানের ফলন বাড়ানো যায়, তা নিয়ে বিস্তারিত গাইডলাইন।</span>
                            </p>
                        </div>
                        <div class="flex items-center justify-between text-xs font-bold text-gray-400 mt-auto pt-2">
                            <span><i class="fa-regular fa-calendar mr-1"></i> 10 Sep 2026</span>
                            <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full" onclick="window.location.href='/articles?post=protect-crops-unseasonal-rains'">
                    <div class="h-48 bg-gray-200 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-500">Weather</div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                                <span class="lang-en">How to Protect Crops from Unseasonal Rains</span>
                                <span class="lang-bn hidden">অসময়ের বৃষ্টি থেকে ফসল রক্ষার উপায়</span>
                            </h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                                <span class="lang-en">Climate change brings unexpected rain. Learn how to construct proper drainage and save your vegetables.</span>
                                <span class="lang-bn hidden">জলবায়ু পরিবর্তনের ফলে হঠাৎ বৃষ্টিতে সবজি ক্ষেতের পচন রোধ করতে কী ধরনের ড্রেনেজ ব্যবস্থা নেওয়া উচিত।</span>
                            </p>
                        </div>
                        <div class="flex items-center justify-between text-xs font-bold text-gray-400 mt-auto pt-2">
                            <span><i class="fa-regular fa-calendar mr-1"></i> 08 Sep 2026</span>
                            <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SINGLE POST VIEW (Hidden by default) -->
        <div id="single-post-container" class="hidden bg-white rounded-[3rem] p-8 md:p-16 shadow-lg border border-gray-100 relative z-10 mx-auto max-w-4xl">
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
    </section>
    
    `;
    articlesHtml = articlesHtml.substring(0, startIdx) + newSection + articlesHtml.substring(endIdx);
}

// 2. REPLACE THE SCRIPT LOGIC AT THE END OF articles.html
const scriptMarker = '<!-- Dynamic SPA Routing Logic -->';
const scriptStartIdx = articlesHtml.indexOf(scriptMarker);
if (scriptStartIdx !== -1) {
    const newScript = `<!-- Dynamic SPA Routing Logic -->
    <script>
        const defaultBlogs = [
            {
                slug: 'how-ai-is-revolutionizing-agriculture',
                titleEn: 'How AI is Revolutionizing Agriculture in Bangladesh',
                titleBn: 'বাংলাদেশে কৃষিখাতে এআই-এর বিপ্লব',
                descEn: 'Artificial Intelligence is helping rural farmers detect diseases instantly and increase crop yield by up to 30%.',
                descBn: 'কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে প্রান্তিক কৃষকরা এখন মুহূর্তের মধ্যে ফসলের রোগ নির্ণয় করতে পারছেন এবং ফলন ৩০% পর্যন্ত বৃদ্ধি পাচ্ছে।',
                category: 'Technology',
                date: '12 Sep 2026',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                seoDesc: 'AI agriculture revolution in Bangladesh',
                seoKeys: 'AI, Farming, Bangladesh'
            },
            {
                slug: 'top-5-organic-fertilizers',
                titleEn: 'Top 5 Organic Fertilizers for Rice Fields',
                titleBn: 'ধানের জমিতে ৫টি সেরা জৈব সারের ব্যবহার',
                descEn: 'Reduce costs and improve soil health by using these highly effective organic fertilizers this season.',
                descBn: 'রাসায়নিক সারের খরচ কমিয়ে কীভাবে জৈব সার ব্যবহার করে ধানের ফলন বাড়ানো যায়, তা নিয়ে বিস্তারিত গাইডলাইন।',
                category: 'Farming',
                date: '10 Sep 2026',
                img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                seoDesc: 'Organic fertilizers guide for rice',
                seoKeys: 'fertilizer, rice, organic'
            },
            {
                slug: 'protect-crops-unseasonal-rains',
                titleEn: 'How to Protect Crops from Unseasonal Rains',
                titleBn: 'অসময়ের বৃষ্টি থেকে ফসল রক্ষার উপায়',
                descEn: 'Climate change brings unexpected rain. Learn how to construct proper drainage and save your vegetables.',
                descBn: 'জলবায়ু পরিবর্তনের ফলে হঠাৎ বৃষ্টিতে সবজি ক্ষেতের পচন রোধ করতে কী ধরনের ড্রেনেজ ব্যবস্থা নেওয়া উচিত।',
                category: 'Weather',
                date: '08 Sep 2026',
                img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                seoDesc: 'Protect crops from rain',
                seoKeys: 'weather, crop protection'
            }
        ];

        if (!localStorage.getItem('foshol_blogs')) {
            localStorage.setItem('foshol_blogs', JSON.stringify(defaultBlogs));
        }

        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('post');
            const blogs = JSON.parse(localStorage.getItem('foshol_blogs') || '[]');

            // Handle Single Post Routing
            if (slug) {
                const post = blogs.find(b => b.slug === slug);
                if (post) {
                    document.title = (currentLang === 'en' ? post.titleEn : post.titleBn) + " - Foshol AI";
                    if(post.seoDesc) {
                        let meta = document.createElement('meta'); meta.name = "description"; meta.content = post.seoDesc; document.head.appendChild(meta);
                    }
                    if(post.seoKeys) {
                        let meta = document.createElement('meta'); meta.name = "keywords"; meta.content = post.seoKeys; document.head.appendChild(meta);
                    }

                    document.getElementById('blog-grid-container').classList.add('hidden');
                    document.getElementById('single-post-container').classList.remove('hidden');
                    
                    document.getElementById('sp-category').innerText = post.category;
                    document.getElementById('sp-title-en').innerText = post.titleEn;
                    document.getElementById('sp-title-bn').innerText = post.titleBn;
                    document.getElementById('sp-date').innerText = post.date || '12 Sep 2026';
                    document.getElementById('sp-image').src = post.img;
                    document.getElementById('sp-content-en').innerText = post.descEn;
                    document.getElementById('sp-content-bn').innerText = post.descBn;
                    
                    setTimeout(applyLanguage, 50);
                    return;
                }
            }

            // Render all blogs dynamically from localStorage
            const container = document.getElementById('blogs-grid-inner');
            if (container && blogs.length > 0) {
                let html = '';
                blogs.forEach(blog => {
                    let badgeColor = 'text-f-dark';
                    if(blog.category === 'Technology') badgeColor = 'text-f-dark';
                    else if(blog.category === 'Farming') badgeColor = 'text-f-gold';
                    else if(blog.category === 'Weather') badgeColor = 'text-orange-500';

                    html += \`
                    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full" onclick="window.location.href='/articles?post=\${blog.slug}'">
                        <div class="h-48 bg-gray-200 overflow-hidden relative">
                            <img src="\${blog.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold \${badgeColor}">\${blog.category}</div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-f-dark transition">
                                    <span class="lang-en">\${blog.titleEn}</span><span class="lang-bn hidden">\${blog.titleBn}</span>
                                </h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                                    <span class="lang-en">\${blog.descEn}</span><span class="lang-bn hidden">\${blog.descBn}</span>
                                </p>
                            </div>
                            <div class="flex items-center justify-between text-xs font-bold text-gray-400 mt-auto pt-2">
                                <span><i class="fa-regular fa-calendar mr-1"></i> \${blog.date || '12 Sep 2026'}</span>
                                <span class="text-f-dark group-hover:translate-x-2 transition"><span class="lang-en">Read More</span><span class="lang-bn hidden">পড়ুন</span> <i class="fa-solid fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>\`;
                });
                container.innerHTML = html;
                setTimeout(applyLanguage, 50);
            }
        });
    </script>
</body>
</html>`;
    articlesHtml = articlesHtml.substring(0, scriptStartIdx) + newScript;
}

fs.writeFileSync(path.join(dir, 'articles.html'), articlesHtml, 'utf8');

// 3. UPDATE index.html blog card links
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
indexHtml = indexHtml.replace(
    /onclick="window\.location\.href='\/articles\?post=\$\{blog\.slug\}'"/g,
    'onclick="window.location.href=\'/articles\'"'
);
// Make sure the 3 cards have specific slugs
indexHtml = indexHtml.replace(
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles?post=how-ai-is-revolutionizing-agriculture\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
);
indexHtml = indexHtml.replace(
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles?post=top-5-organic-fertilizers\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae'
);
indexHtml = indexHtml.replace(
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4',
    '<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer" onclick="window.location.href=\'/articles?post=protect-crops-unseasonal-rains\'">\n                <div class="h-48 bg-gray-200 overflow-hidden relative">\n                    <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4'
);

fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');

console.log('articles.html and index.html fixed successfully!');
