import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Step 1: Check key exists
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing from .env" },
        { status: 500 }
      );
    }

    const { messages, userName } = await req.json();

    // Step 2: Check messages exist
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: `You are HappyChat, a warm, friendly, and supportive advice companion. 
      The user's name is ${userName}. Use their name naturally and occasionally — not every message, just when it feels warm and personal. 
      Give thoughtful, concise advice. Be kind. Be uplifting but real. Never be preachy.`,
    });

    // Step 3: Convert message history (everything except the last message)
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    console.log("Gemini replied:", text.slice(0, 80));

    if (!text || text.trim() === "") {
      return NextResponse.json({
        message: "Sorry, I couldn't generate a response. Try rephrasing!",
      });
    }

    return NextResponse.json({ message: text });

  } catch (error) {
    // Step 4: Log the REAL error in terminal
    console.error("API route error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
