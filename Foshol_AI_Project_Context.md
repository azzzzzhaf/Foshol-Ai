# Foshol AI - Project Context & Documentation

## 1. Project Overview
**Name:** Foshol AI (ফসল এআই)
**Target Audience:** Smallholder rural farmers in Bangladesh.
**Core Concept:** An AI-powered agricultural assistant that instantly diagnoses crop diseases from photos, suggests precise fertilizer/pesticide dosages, and provides farming advice in clear Bengali. 

## 2. Mission & Vision
**Mission:** To empower farmers with instant, accessible, and free AI-driven agricultural expertise, directly reducing crop loss and increasing harvest yield.
**Vision:** To completely eliminate the technology barrier for rural farmers by bringing high-end AI capabilities to the messaging apps they already use daily (Messenger, WhatsApp) without requiring heavy app downloads.

## 3. The Problem
1. **Lack of Experts:** Farmers often cannot reach agronomists in time when a crop disease strikes, leading to massive harvest losses.
2. **Heavy Apps:** Existing Agritech apps require high-end smartphones, good internet, and storage space—which rural farmers often lack.
3. **Language & Literacy:** Many farmers struggle with typing complex queries or reading English instructions.

## 4. The Solution
Foshol AI solves these problems through a multimodal, zero-install approach:
1. **Multimodal Input:** Farmers can simply take a photo of the infected leaf and send it. They can also use Voice Notes instead of typing.
2. **Messaging App Integration:** Instead of downloading an app, farmers interact with the AI directly via Facebook Messenger (and in the future, WhatsApp/Telegram).
3. **Native Language (Bengali):** The AI (powered by Gemini) is prompted to respond strictly in simple, respectful, and practical Bengali, providing exact medicine names and dosages (e.g., grams per liter).

## 5. Technical Stack
- **Frontend:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.
- **Backend Infrastructure:** Vercel Serverless Functions (`/api/`).
- **AI Engine:** Google Gemini 1.5 Flash (for both Text and Vision/Image processing).
- **Integrations:** Meta Graph API (Facebook Messenger Webhook).

## 6. Architecture & File Structure
The project is a static frontend with serverless API routes designed to be hosted on Vercel.

### Key Files:
*   `index.html`: The main landing page. It includes the frontend web-chat widget which captures microphone audio (Web Speech API) and image uploads (Base64), sending them to `/api/chat`.
*   `api/chat.js`: Vercel serverless function for the Web Chat.
    *   Accepts POST requests with `message` (text) and `image` (base64).
    *   Calls Gemini 1.5 Flash API.
    *   Returns the AI response to the frontend.
*   `api/messenger.js`: Vercel serverless function for the Facebook Messenger Bot.
    *   Handles GET requests for Meta Webhook verification (`hub.verify_token`).
    *   Handles POST requests from Facebook when a user sends a message.
    *   Downloads image attachments from Facebook, sends them to Gemini Vision, and posts the reply back to the user via Meta Graph API.
*   Other Pages: `about.html`, `services.html`, `store.html`, `blog.html`, `articles.html`, `market.html`, `medicine.html`.

## 7. Current Project Status & Known Issues
**What is Working:**
*   The entire frontend UI is complete and responsive.
*   The logic for the serverless functions (`chat.js` and `messenger.js`) is fully written to integrate with Gemini.

**Current Issues (Why the user is seeking help):**
*   **Vercel Deployment:** The API routes are currently failing on the live URL because the Environment Variables (`GEMINI_API_KEY`, `FB_PAGE_ACCESS_TOKEN`, `FB_VERIFY_TOKEN`) in Vercel are either missing or have not been applied via a new Vercel **Redeploy**.
*   Because the Vercel API is failing, the web chat is currently returning local hardcoded fallback messages (e.g., "✅ এআই রোগ নির্ণয়...").
*   Facebook Messenger is not responding because the Webhook either hasn't been verified successfully or the `FB_PAGE_ACCESS_TOKEN` is not properly linked to a Facebook Page in the Meta Developer Dashboard.

## 8. Prompt Engineering (System Instructions)
The AI is instructed with the following persona (summarized):
*   "You are Foshol AI, a world-class plant pathologist and agricultural consultant for farmers in Bangladesh."
*   "Answer strictly in Bengali. Use simple, respectful, and farmer-friendly language."
*   "For images: 1. Identify crop/disease. 2. Explain symptoms. 3. Provide recommended treatment protocol with exact dosages. 4. Give organic advice."

---
*Note for ChatGPT/AI Assistant: You are now fully caught up on the Foshol AI project. Please assist the user in debugging their Vercel environment variables, Meta Webhook setup, or extending new features.*
