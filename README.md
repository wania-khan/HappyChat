# HappyChat 🌟

HappyChat is a supportive AI conversation companion designed to provide
encouragement, motivation, and thoughtful advice when you need someone to talk to.

## Features

- 💬 AI-powered conversations
- 🌟 Personalized interactions using the user's name
- 📒 Multiple chat sessions
- 🤖 Typing indicator
- 🎨 Playful, responsive interface
- 🔐 Server-side Gemini API integration

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API

## Getting Started

### 1. Clone the repository

git clone https://github.com/wania-khan/HappyChat.git

### 2. Install dependencies

npm install

### 3. Add your environment variable

Create `.env.local`:

GEMINI_API_KEY=your_api_key_here

### 4. Run the development server

npm run dev

Open http://localhost:3000

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key |

Never commit `.env.local` or expose your API key publicly.
