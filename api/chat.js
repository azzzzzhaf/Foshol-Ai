export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ reply: "দুঃখিত, Vercel-এ API Key সেট করা নেই। দয়া করে ডেভেলপারকে জানান!" });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: "You are Foshol AI, a highly intelligent and friendly agriculture assistant for farmers in Bangladesh. Answer strictly in Bengali. Keep answers short, helpful, and easy to understand. User says: " + message 
                    }] 
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return res.status(500).json({ reply: "এআই সার্ভারে সমস্যা হচ্ছে। একটু পর আবার চেষ্টা করুন।" });
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ reply: "ইন্টারনেট বা সার্ভার সমস্যা! আবার চেষ্টা করুন।" });
    }
}
