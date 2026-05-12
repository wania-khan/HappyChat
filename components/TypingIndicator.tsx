export default function TypingIndicator() {
  return (
    <div className="flex justify-start w-full">
      <div className="
        w-9 h-9 rounded-full border-[3px] border-black
        bg-[#4CAF72] flex items-center justify-center
        text-sm shrink-0 mr-2
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
      ">
        🤖
      </div>
      <div className="
        bg-white/60 backdrop-blur-sm
        border-[3px] border-black rounded-2xl rounded-bl-sm
        px-5 py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
        flex items-center gap-1
      ">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}