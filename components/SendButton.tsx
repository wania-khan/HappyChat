interface SendButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function SendButton({ onClick, disabled }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        flex items-center justify-center
        bg-[#4CAF72] border-[3px] border-black
        rounded-full w-24 h-16 shrink-0
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5
        transition-all duration-100 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        disabled:hover:translate-x-0 disabled:hover:translate-y-0
      "
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 2L11 13" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}