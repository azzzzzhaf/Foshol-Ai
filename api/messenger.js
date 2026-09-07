export default async function handler(req, res) {
    const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'foshol_ai_secret_token';
    const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // 1. Meta Webhook Verification (GET)
    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Messenger Webhook Verified successfully!');
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send('Verification token mismatch');
        }
    }

    // 2. Incoming Messenger Events (POST)
    if (req.method === 'POST') {
        const body = req.body;

        if (body.object === 'page') {
            for (const entry of body.entry || []) {
                for (const webhookEvent of entry.messaging || []) {
                    // Ignore echo messages from the page/bot itself
                    if (webhookEvent.message?.is_echo) continue;

                    const senderId = webhookEvent.sender?.id;
                    const message = webhookEvent.message;

                    if (!senderId || !message) continue;

                    try {
                        await handleMessage(senderId, message, PAGE_ACCESS_TOKEN, GEMINI_API_KEY);
                    } catch (err) {
                        console.error('Error handling messenger message:', err);
                    }
                }
            }

            // Respond 200 OK AFTER processing
            return res.status(200).send('EVENT_RECEIVED');
        }

        return res.status(404).send('Not Found');
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}

async function handleMessage(senderId, message, pageAccessToken, geminiApiKey) {
    if (!pageAccessToken || !geminiApiKey) {
        console.error('Missing FB_PAGE_ACCESS_TOKEN or GEMINI_API_KEY');
        return;
    }

    // Indicate typing to user in Messenger
    await sendSenderAction(senderId, 'typing_on', pageAccessToken);

    let replyText = '';

    // Check if user sent a photo (Crop Leaf / Plant Image)
    const imageAttachment = message.attachments?.find(att => att.type === 'image');

    if (imageAttachment && imageAttachment.payload?.url) {
        const imageUrl = imageAttachment.payload.url;
        console.log('Received image from user:', imageUrl);
        replyText = await analyzeImageWithGemini(imageUrl, message.text, geminiApiKey);
    } else if (message.text) {
        console.log('Received text from user:', message.text);
        replyText = await generateTextWithGemini(message.text, geminiApiKey);
    } else {
        replyText = 'নমস্কার/সালাম! ফসলের যেকোনো সমস্যা, সার-কীটনাশকের মাত্রা জানতে প্রশ্ন লিখুন অথবা আক্রান্ত ফসলের পাতার পরিষ্কার ছবি তুলে পাঠান। ফসল এআই সাথে সাথে সমাধান দেবে। 🌱';
    }

    // Send the reply back to Facebook Messenger
    await sendMessengerReply(senderId, replyText, pageAccessToken);
}

// Generate Text Reply using Gemini 2.0 Flash
async function generateTextWithGemini(userText, apiKey) {
    try {
        const prompt = `You are Foshol AI (ফসল এআই), an expert agronomist and crop doctor in Bangladesh.
Answer strictly in clear, farmer-friendly Bengali (Bangla). Keep instructions practical, safe, and helpful for rural farmers.
User asks: "${userText}"`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Gemini returned non-JSON:', responseText.substring(0, 300));
            return 'দুঃখিত, সাময়িক সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।';
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'দুঃখিত, বিষয়টি বুঝতে পারিনি। দয়া করে আবার স্পষ্ট করে লিখুন।';
    } catch (e) {
        console.error('Gemini Text Error:', e);
        return 'দুঃখিত, সাময়িক সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।';
    }
}

// Analyze Crop Leaf Photo using Gemini 2.0 Flash Multimodal Vision
async function analyzeImageWithGemini(imageUrl, userText, apiKey) {
    try {
        // Fetch the image from Facebook CDN and convert to base64
        const imgResponse = await fetch(imageUrl);
        const arrayBuffer = await imgResponse.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = imgResponse.headers.get('content-type') || 'image/jpeg';

        const prompt = `আপনি ফসল এআই (Foshol AI) - বাংলাদেশি কৃষকদের প্রধান প্ল্যান্ট প্যাথলজিস্ট ও কৃষি বিশেষজ্ঞ।
ব্যবহারকারী এই ফসলের/পাতার ছবিটি পাঠিয়েছেন ${userText ? `এবং লিখেছেন: "${userText}"` : ''}।
ছবিটি খুব মনোযোগ দিয়ে বিশ্লেষণ করুন এবং বাংলায় নিচের ফরমেটে উত্তর দিন:
🌱 ১. ফসলের নাম ও সম্ভাব্য রোগের নাম
🔍 ২. প্রধান লক্ষণ ও ক্ষয়ক্ষতির ঝুঁকি
💊 ৩. প্রেসক্রিপশন ও ঔষধের সঠিক ডোজ (১ লিটার পানিতে কত গ্রাম বা মিলি)
🌿 ৪. জৈব বা ঘরোয়া প্রতিরোধমূলক পরামর্শ

ভাষা খুব সহজ, সম্মানসূচক এবং সরাসরি বাংলাদেশি কৃষকদের উপযোগী রাখুন।`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: base64Data
                            }
                        }
                    ]
                }]
            })
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Gemini Vision returned non-JSON:', responseText.substring(0, 300));
            return 'ছবিটি প্রসেস করতে সাময়িক সমস্যা হয়েছে। দয়া করে পাতার আরেকটি ছবি পাঠান।';
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'ছবিটি স্পষ্ট নয়। দয়া করে আক্রান্ত পাতার ওপর থেকে কাছে নিয়ে আলোতে আরেকটি পরিষ্কার ছবি তুলুন।';
    } catch (e) {
        console.error('Gemini Vision Error:', e);
        return 'ছবিটি প্রসেস করতে সাময়িক সমস্যা হয়েছে। দয়া করে পাতার আরেকটি ছবি পাঠান।';
    }
}

// Send Message back to Messenger User
async function sendMessengerReply(recipientId, text, pageAccessToken) {
    // Messenger message length limit is 2000 characters
    const chunks = splitIntoChunks(text, 1900);

    for (const chunk of chunks) {
        const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: { id: recipientId },
                messaging_type: 'RESPONSE',
                message: { text: chunk }
            })
        });

        const resData = await response.json();
        if (!response.ok) {
            console.error('Failed to send Messenger message:', resData);
        } else {
            console.log('Messenger message delivered to:', recipientId);
        }
    }
}

// Send Typing Indicator
async function sendSenderAction(recipientId, action, pageAccessToken) {
    try {
        await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: { id: recipientId },
                sender_action: action
            })
        });
    } catch (err) {
        // ignore typing error
    }
}

function splitIntoChunks(str, size) {
    const chunks = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.substring(i, i + size));
    }
    return chunks;
}
