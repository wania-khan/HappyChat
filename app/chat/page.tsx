"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import InputBar from "@/components/InputBar";
import SendButton from "@/components/SendButton";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import ChatSidebar from "@/components/ChatSidebar";

import Bot from "@/assets/bot.svg";
import { error } from "console";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  useEffect(() => {
    const stored = localStorage.getItem("happychat_username");
    if (!stored) { router.push("/"); return; }
    setUserName(stored);
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isLoading]);

  const createNewChat = (firstMessage?: Message): Chat => {
    const id = crypto.randomUUID();
    const title = firstMessage
      ? firstMessage.content.slice(0, 40) + (firstMessage.content.length > 40 ? "…" : "")
      : "New Chat";
    return { id, title, messages: firstMessage ? [firstMessage] : [] };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setInput("");

    let currentChat: Chat;

    if (!activeChatId) {
      // Brand new chat — title it after the first message
      currentChat = createNewChat(userMessage);
      setChats((prev) => [currentChat, ...prev]);
      setActiveChatId(currentChat.id);
    } else {
      // Add to existing chat
      currentChat = activeChat!;
      const updated = { ...currentChat, messages: [...currentChat.messages, userMessage] };
      setChats((prev) => prev.map((c) => (c.id === activeChatId ? updated : c)));
      currentChat = updated;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentChat.messages,
          userName,
        }),
      });

      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.message };

      setChats((prev) =>
        prev.map((c) =>
          c.id === currentChat.id
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c
        )
      );
    } catch (error){
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-linear-to-br from-[#FADF6F] via-[#F472B6] to-[#A8D5A2]">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={() => setActiveChatId(null)}
        userName={userName}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="px-8 py-5 border-b-[3px] border-black bg-white/10 backdrop-blur-sm">
          <h1 className="text-2xl font-black text-black">
            Welcome to HappyChat, {userName}! 🌟
          </h1>
          <p className="text-black/80 text-sm mt-1">
            {activeChat ? activeChat.title : "What would you like to talk about?"}
          </p>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
          {!activeChat || activeChat.messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Image src={Bot} alt="Bot" width={100} height={100} className="mx-auto" />
                <p className="text-black font-semibold text-lg">
                  Ask me anything, {userName}!
                </p>
              </div>
            </div>
          ) : (
            activeChat.messages.map((msg, i) => (
              <MessageBubble
                key={i}
                role={msg.role}
                content={msg.content}
                userName={userName}
              />
            ))
          )}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="px-8 py-5 border-t-[3px] border-black bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <InputBar
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={isLoading}
            />
            <SendButton onClick={handleSend} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

