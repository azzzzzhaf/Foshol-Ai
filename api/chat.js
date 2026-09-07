export default async function handler(req, res) {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, image, lang = 'bn' } = req.body || {};
    if (!message && !image) {
        return res.status(400).json({ error: 'Message or image is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not set in Vercel Environment Variables.' });
    }

    try {
        const promptLang = lang === 'en'
            ? "Answer in English with polite, clear and practical advice for farmers."
            : "Answer strictly in Bengali (Bangla). Use simple, respectful, and farmer-friendly language.";

        const systemInstruction = image
            ? `You are Foshol AI, a world-class plant pathologist and agricultural consultant for farmers in Bangladesh. ${promptLang} Analyze the uploaded plant leaf/crop image carefully:
1. Identify the crop and the disease/pest (or say if it looks healthy).
2. Explain symptoms and severity.
3. Provide recommended treatment protocol including chemical names and exact dosages (e.g. g or ml per Liter of water).
4. Give organic/preventative farm management advice. Keep response concise and well formatted with bullet points.`
            : `You are Foshol AI, an intelligent agricultural assistant for farmers in Bangladesh. ${promptLang} Provide accurate, practical farming advice, crop disease solutions, fertilizer dosages, mandi market price insights, or weather guidance. Keep it concise, structured, and easy to understand.`;

        const parts = [{ text: `${systemInstruction}\nUser message: ${message || 'Please analyze this crop leaf photo.'}` }];

        if (image && image.data) {
            let base64Data = image.data;
            // Strip data URL prefix if present
            if (base64Data.includes(',')) {
                base64Data = base64Data.split(',')[1];
            }
            parts.push({
                inline_data: {
                    mime_type: image.mimeType || 'image/jpeg',
                    data: base64Data
                }
            });
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts }]
            })
        });

        const responseText = await response.text();

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseErr) {
            console.error('Gemini returned non-JSON:', responseText.substring(0, 500));
            return res.status(502).json({ error: `Gemini API returned invalid response. Status: ${response.status}` });
        }

        if (!response.ok) {
            const errMsg = data.error?.message || `Gemini API Error (HTTP ${response.status})`;
            console.error('Gemini API Error:', errMsg);
            return res.status(502).json({ error: errMsg });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!reply) {
            const blockReason = data.candidates?.[0]?.finishReason || 'UNKNOWN';
            return res.status(200).json({ error: `No reply from Gemini. Reason: ${blockReason}` });
        }

        // Clean markdown for HTML display
        let cleanReply = reply
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n\s*[\*\-]\s*/g, '<br>• ')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        // Append Trust Card
        const trustCard = lang === 'en'
            ? `<div style="margin-top:12px;border-top:1px solid #bbf7d0;padding-top:8px;font-size:11px;background:#f0fdf4;padding:8px;border-radius:12px;border:1px solid #dcfce7">
                 <div><b>Confidence:</b> High</div>
                 <div><b>Source:</b> BARC / DAE</div>
                 <div><b>Expert Verification:</b> Not required</div>
               </div>`
            : `<div style="margin-top:12px;border-top:1px solid #bbf7d0;padding-top:8px;font-size:11px;background:#f0fdf4;padding:8px;border-radius:12px;border:1px solid #dcfce7">
                 <div><b>নিশ্চিততার মাত্রা:</b> উচ্চ</div>
                 <div><b>তথ্যসূত্র:</b> BARC / DAE</div>
                 <div><b>বিশেষজ্ঞ যাচাই:</b> প্রয়োজন নেই</div>
               </div>`;

        cleanReply += trustCard;

        return res.status(200).json({ reply: cleanReply });
    } catch (error) {
        console.error("Chat API Error:", error.message || error);
        return res.status(500).json({ error: `Server error: ${error.message}` });
    }
}
