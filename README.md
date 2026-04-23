
Here's exactly how to fill the Devpost sections for SparkHeart.
Copy and paste them directly — they are written to feel emotional, authentic, and strong for judges. I kept the tone warm and Naija-inspired while staying professional.
Inspiration
In Nigeria, we love to celebrate people — birthdays, anniversaries, proposals, and “just because” moments. But too often, the messages are generic “Happy Birthday” texts or rushed cards that don’t truly show how much someone means to us. Many of us have beautiful memories and deep feelings in our hearts, but we struggle to express them in a special, creative way.
SparkHeart was born from the desire to solve this: What if you could share what’s in your heart in just 5 minutes, and an AI would turn it into something magical — a custom website that makes your loved one feel truly seen, loved, and celebrated? We wanted to combine AI with Naija emotion — Pidgin love lines, Yoruba praise poetry, Igbo proverbs — so celebrations feel personal and cultural. The inspiration is simple: everyone deserves to feel like the main character on their special day.

##What it does
SparkHeart is an AI-powered platform that helps anyone create a beautiful, personalized digital celebration in minutes.
You start a short, warm conversation (on website or WhatsApp bot). The AI asks smart questions about the person — their name, nickname, favorite memories, inside jokes, and what makes them special. It then collects your photos, short videos, voice notes, or handwritten signature.
In seconds, SparkHeart builds a stunning custom website just for them with:

“Our Story” written in your exact voice (with optional Naija cultural touches)
Animated photo and video timeline
Interactive memory game or quiz only they can ace
Countdown to the special day with surprise reveal
Private message wall for friends and family to add notes
Digital time capsule to open together later

The website is temporary by default (30 days for privacy) but can be extended. Users can also add AI-generated videos, custom playlists, proposal scripts, or printable cards. It works for birthdays, anniversaries, proposals, graduations — any celebration.

##How we built it
We built SparkHeart using modern AI tools and web technologies to make it fast and beautiful:

AI Conversation & Content: Grok and Claude handle the warm, adaptive chat and generate personalized stories, poems, and scripts.
Visuals & Media: Grok Imagine for generating beautiful images and elements; future integration with video tools for AI-generated celebration videos.
Website Generation: Next.js + Tailwind CSS + Framer Motion for instant, mobile-first custom websites with smooth animations. Sites are deployed automatically on Vercel.
WhatsApp Bot: WhatsApp Business API for the voice-first experience popular in Nigeria — the bot starts the conversation and directs users to the full website preview.
Backend: Supabase for user data, file uploads, and temporary storage.
Payments: Paystack ready for future premium features.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
