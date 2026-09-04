# FosholAI (ফসল AI) 🌾
**বাংলাদেশের কৃষকদের প্রথম এআই (AI) স্মার্ট সহকারী**

FosholAI is a digital agriculture assistant designed for the 35 million farmers in Bangladesh. By leveraging Artificial Intelligence (AI) through low-friction messaging apps like Telegram, WhatsApp, and Facebook Messenger, FosholAI instantly diagnoses crop diseases from photos and provides localized, actionable remedies in Bengali.

## Features 🚀
* **📸 Image-to-Diagnosis:** Take a photo of a diseased leaf, and AI identifies the problem in seconds.
* **🗣️ Localized Advice:** Provides specific pesticide and organic fertilizer recommendations in simple Bengali.
* **🌦️ Weather Alerts:** Actionable farming advice based on current local weather.
* **📱 Zero App Install:** Works completely on Facebook Messenger and Telegram.

## Tech Stack 🛠️
* **Frontend Landing Page:** HTML5, Tailwind CSS
* **Bot Engine:** Python (python-telegram-bot)
* **AI Model:** Google Gemini 1.5 Pro / Flash (Vision capabilities)

## How to run the Telegram Bot locally 💻
1. Clone the repository.
2. Install requirements:
   ```bash
   pip install python-telegram-bot google-generativeai pillow python-dotenv
   ```
3. Create a `.env` file and add your API keys:
   ```env
   TELEGRAM_BOT_TOKEN=your_telegram_token
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the bot:
   ```bash
   python bot.py
   ```

## Website 🌐
The landing page (`index.html`) is built using Tailwind CSS via CDN. Simply open `index.html` in your browser to view the design!

---
*Designed with ❤️ for the farmers of Bangladesh.*
