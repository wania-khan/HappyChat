interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function InputBar({ value, onChange, onSend, disabled }: InputBarProps) {
  return (
    <input
      type="text"
      placeholder="Type your message here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && !disabled && onSend()}
      disabled={disabled}
      className="
        flex-1 bg-white/30 backdrop-blur-sm
        rounded-full border-[3px] border-black
        px-6 py-4 text-black placeholder:text-black/40
        text-base outline-none focus:ring-0
        disabled:opacity-50
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5
        transition-all duration-100
    "
    />
  );
}