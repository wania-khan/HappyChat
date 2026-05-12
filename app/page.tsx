"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) return;
    localStorage.setItem("happychat_username", name.trim());
    router.push("/chat");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#FADF6F] via-[#F472B6] to-[#A8D5A2]">
      <div className="flex flex-col items-center gap-8 w-full max-w-3xl px-6">
        <div className="text-center pb-4">
          <h1 className="text-5xl font-black text-black mb-4">
            Welcome to HappyChat!
          </h1>
          <p className="text-black/60 text-lg">
            Before we start, what's your name?
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="
              flex-1 bg-white/30 backdrop-blur-sm
              rounded-full border-[3px] border-black
              px-6 py-4 text-black placeholder:text-black/40
              text-base outline-none focus:ring-0
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-0.5 hover:translate-y-0.5
              transition-all duration-100
            "
          />
          <button
            onClick={handleSubmit}
            className="
              flex items-center justify-center
              bg-[#4CAF72] border-[3px] border-black
              rounded-full w-24 h-16 shrink-0
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-0.5 hover:translate-y-0.5
              transition-all duration-100 cursor-pointer
            "
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}