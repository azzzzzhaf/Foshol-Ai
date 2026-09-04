export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured in Vercel.' });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `You are Foshol AI, a helpful agricultural assistant for farmers. Answer in English. Keep it concise. User asks: ${message}` }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch from Gemini');
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        
        // Simple regex to replace markdown bold and asterisks to make UI look cleaner
        const cleanReply = reply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*/g, '<br>• ');

        return res.status(200).json({ reply: cleanReply });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
