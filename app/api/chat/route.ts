import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { messages, userName } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",  
    messages: [
      {
        role: "system",
        content: `You are HappyChat, a warm, friendly, and supportive advice companion. The user's name is ${userName}. Use their name naturally and occasionally in conversation — not every message, just when it feels warm and personal. Give thoughtful, concise advice. Be kind. Be uplifting but real. Never be preachy.`,
      },
      ...messages,
    ],
  });

  return NextResponse.json({
    message: completion.choices[0].message.content,
  });
}
