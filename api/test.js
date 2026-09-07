export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const apiKey = process.env.GEMINI_API_KEY;
    const fbToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const fbVerify = process.env.FB_VERIFY_TOKEN;

    const status = {
        GEMINI_API_KEY: apiKey ? `SET (${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)})` : 'NOT SET ❌',
        FB_PAGE_ACCESS_TOKEN: fbToken ? `SET (${fbToken.substring(0, 8)}...)` : 'NOT SET ❌',
        FB_VERIFY_TOKEN: fbVerify ? `SET (${fbVerify})` : 'NOT SET ❌',
    };

    // Quick test: try calling Gemini with a simple prompt
    let geminiTest = 'NOT TESTED';
    if (apiKey) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Reply with just: OK' }] }]
                })
            });
            const text = await response.text();
            if (response.ok) {
                geminiTest = 'WORKING ✅';
            } else {
                geminiTest = `FAILED ❌ (HTTP ${response.status}): ${text.substring(0, 200)}`;
            }
        } catch (e) {
            geminiTest = `ERROR ❌: ${e.message}`;
        }
    }

    return res.status(200).json({
        message: 'Foshol AI API Health Check',
        env_vars: status,
        gemini_connection: geminiTest,
        timestamp: new Date().toISOString()
    });
}
