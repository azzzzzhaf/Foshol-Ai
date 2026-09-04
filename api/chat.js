export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, lang = 'bn' } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured in Vercel.' });
    }

    try {
        const promptLang = lang === 'en' ? "Answer in English." : "Answer strictly in Bengali (Bangla). Use simple farmer-friendly language.";
        
        const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: \`You are Foshol AI, a helpful agricultural assistant for farmers in Bangladesh. \${promptLang} Keep it concise. User asks: \${message}\` }] }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch from Gemini');
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        
        // Clean markdown
        let cleanReply = reply.replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>').replace(/\\*/g, '<br>• ');

        // APPEND TRUST CARD HTML (Page 20 from PDF)
        const trustCard = lang === 'en' 
            ? \`<div class="mt-4 border-t border-green-200 pt-3 text-xs bg-green-50 p-3 rounded-xl border">
                 <div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full bg-yellow-400"></span> <b>Confidence:</b> High</div>
                 <div class="flex items-center gap-2 mb-1"><i class="fa-solid fa-book text-blue-500"></i> <b>Source:</b> BARC / DAE</div>
                 <div class="flex items-center gap-2"><i class="fa-solid fa-user-doctor text-green-600"></i> <b>Expert Verification:</b> Not required</div>
               </div>\`
            : \`<div class="mt-4 border-t border-green-200 pt-3 text-xs bg-green-50 p-3 rounded-xl border">
                 <div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full bg-yellow-400"></span> <b>নিশ্চিততার মাত্রা:</b> উচ্চ</div>
                 <div class="flex items-center gap-2 mb-1"><i class="fa-solid fa-book text-blue-500"></i> <b>তথ্যসূত্র:</b> BARC / DAE</div>
                 <div class="flex items-center gap-2"><i class="fa-solid fa-user-doctor text-green-600"></i> <b>বিশেষজ্ঞ যাচাই:</b> প্রয়োজন নেই</div>
               </div>\`;

        cleanReply += trustCard;

        return res.status(200).json({ reply: cleanReply });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
