import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant";
  userName?: string;
}

export default function MessageBubble({
  content,
  role,
  userName,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="relative max-w-[70%]">
        {/* Tail */}
        {isUser ? (
          // User tail — points bottom-right
          <div
            className="
              absolute bottom-0 -right-3.5
              w-0 h-0
              border-t-3.5 border-t-transparent
              border-l-3.5 border-l-[#BAE6FD]
            "
          />
        ) : (
          // Bot tail — points bottom-left
          <div
            className="
              absolute bottom-0 -left-3.5
              w-0 h-0
              border-t-3.5 border-t-transparent
              border-r-3.5 border-r-gray-100
            "
          />
        )}

        {/* Bubble */}
        <div
          className={`
            px-5 py-3 rounded-2xl
            border-[3px] border-black text-black text-sm leading-relaxed
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:translate-x-0.5 hover:translate-y-0.5
            transition-all duration-100

            ${
              isUser
                ? "bg-[#BAE6FD] rounded-br-none"
                : "bg-gray-100 rounded-bl-none"
            }
          `}
        >
          {isUser ? (
            content
          ) : (
            <ReactMarkdown
              components={{
                /* Paragraphs */
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),

                /* Bold */
                strong: ({ children }) => (
                  <strong className="font-black">{children}</strong>
                ),

                /* Italic */
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),

                /* Unordered lists */
                ul: ({ children }) => (
                  <ul className="list-disc ml-5 mb-3 space-y-1">
                    {children}
                  </ul>
                ),

                /* Numbered lists */
                ol: ({ children }) => (
                  <ol className="list-decimal ml-5 mb-3 space-y-1">
                    {children}
                  </ol>
                ),

                /* List items */
                li: ({ children }) => <li>{children}</li>,

                /* Quotes */
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-black/30 pl-3 my-3 italic">
                    {children}
                  </blockquote>
                ),

                /* Headings */
                h1: ({ children }) => (
                  <h1 className="text-lg font-black mb-2">{children}</h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-base font-black mb-2">{children}</h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-sm font-black mb-2">{children}</h3>
                ),

                /* Links */
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}