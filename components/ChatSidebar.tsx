"use client";

import { useState } from "react";

interface Chat {
  id: string;
  title: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  userName: string;
}

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  userName,
}: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChat = (id: string) => {
    onSelectChat(id);
    setIsOpen(false);
  };

  const handleNewChat = () => {
    onNewChat();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Ham */}
      <button
      onClick={() => setIsOpen(true)}
      aria-label="Open chats"
      className="
        md:hidden fixed top-6 left-4 z-40
        w-11 h-11 rounded-xl
        border-[3px] border-black
        bg-[#FADF6F]
        flex flex-col items-center justify-center gap-1.25
        shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5
        transition-all duration-100">
      <span className="block w-5 h-[2.5px] bg-black rounded-full" />
      <span className="block w-5 h-[2.5px] bg-black rounded-full" />
      <span className="block w-5 h-[2.5px] bg-black rounded-full" />
    </button>

      {isOpen && (
        <button
          aria-label="Close chats"
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 md:z-auto

          w-[75vw] md:w-64 h-screen shrink-0

          bg-white/20 backdrop-blur-sm border-r-[3px] border-black

          flex flex-col transition-transform duration-200 ease-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="p-4 border-b-[3px] border-black">
          <div className="flex items-center justify-between">
            <p className="font-black text-black text-lg">
              {userName}'s Chats
            </p>

            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chats"
              className="md:hidden w-8 h-8 flex items-center justify-center text-black hover:scale-110 transition-transform">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 5L19 19"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M19 5L5 19"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="
              w-full py-3 rounded-xl
              border-[3px] border-black
              bg-[#FADF6F]
              font-black text-black text-sm
              shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-0.5 hover:translate-y-0.5
              transition-all duration-100
            "
          >
            + New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
          {chats.length === 0 && (
            <p className="text-black/40 text-sm text-center mt-4">
              No chats yet
            </p>
          )}

          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`
                w-full text-left px-4 py-3 rounded-xl
                border-[3px] border-black
                text-sm font-semibold
                transition-all duration-100
                truncate

                ${
                  activeChatId === chat.id
                    ? "bg-[#4CAF72] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white/30 hover:bg-white/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                }
              `}
            >
              📒 {chat.title}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}