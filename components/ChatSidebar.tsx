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
  return (
    <aside className="
      max-md:hidden w-64 shrink-0 bg-white/20 backdrop-blur-sm
      border-r-[3px] border-black
      flex flex-col h-full
    ">
      {/* Header */}
      <div className="p-4 border-b-[3px] border-black">
        <p className="font-black text-black text-lg">{userName}'s Chats</p>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="
            w-full py-3 rounded-xl
            border-[3px] border-black bg-[#FADF6F]
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
      <div className="flex-1 moverflow-y-auto px-4 flex flex-col gap-2 h-full">
        {chats.length === 0 && (
          <p className="text-black/40 text-sm text-center mt-4">No chats yet</p>
        )}
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`
              w-full text-left px-4 py-3 rounded-xl
              border-[3px] border-black text-sm font-semibold
              transition-all duration-100 truncate
              ${activeChatId === chat.id
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
  );
}