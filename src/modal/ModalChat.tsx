import { useState, useEffect, useRef } from "react";
import { chatWithAI, CourseRecommendation } from "../services/aiService"; // Adjust the import path as necessary

interface ModalChatProps {
    open: boolean;
    onClose: () => void;
}

const ModalChat = ({ open, onClose }: ModalChatProps) => {
    const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!open) return null;

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage = { text: input, from: "user" as const };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        try {
            const res = await chatWithAI(input);
            let botText = "";
            if (res.courses && res.courses.length > 0) {
                botText = res.courses.map((c: CourseRecommendation, idx: number) =>
                    `${idx + 1}. ${c.title} - ${c.description}`
                ).join("\n");
            } else if (res.score !== undefined) {
                botText = `Score: ${res.score}`;
            } else {
                botText = "Sorry, I couldn't find any recommendations.";
            }
            setMessages(msgs => [...msgs, { text: botText, from: "bot" }]);
        } catch {
            setMessages(msgs => [...msgs, { text: "Sorry, something went wrong.", from: "bot" }]);
        }
        setLoading(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-30
                       sm:items-center sm:justify-center
                       md:items-end md:justify-end"
            onMouseDown={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg flex flex-col
                           w-full max-w-none h-3/4 m-0
                           sm:w-96 sm:max-w-sm sm:h-auto sm:max-h-[80vh] sm:m-4 sm:rounded-2xl
                           md:w-full md:max-w-sm md:h-auto md:max-h-[70vh] md:m-4 md:rounded-t-2xl"
                style={{ boxShadow: undefined, borderColor: '#ffc680', borderStyle: 'solid', borderWidth: 2 }}
                onMouseDown={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 
                               rounded-t-2xl
                               sm:rounded-t-2xl">
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">Chat</span>
                    <button
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 -m-2"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 6 6 18M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                
                {/* Chat Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-900 min-h-0">
                    {messages.length === 0 && (
                        <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                            <div className="text-sm">Start a conversation!</div>
                            <div className="text-xs mt-2">Ask me about courses or anything else.</div>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`px-3 py-2 rounded-2xl max-w-[85%] whitespace-pre-line text-sm
                                           sm:px-4 sm:text-base sm:max-w-[80%]`}
                                style={
                                    msg.from === "user"
                                        ? { background: "#ffc680", color: "#222" }
                                        : { border: "2px solid #ffc680" }
                                }
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-end">
                            <div className="px-3 py-2 rounded-2xl max-w-[85%] border-2 text-sm
                                           sm:px-4 sm:text-base sm:max-w-[80%]" 
                                 style={{ border: "2px solid #ffc680" }}>
                                <span className="text-gray-400 dark:text-gray-500">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Input */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800
                               sm:p-4">
                    <form className="flex gap-2" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                                     rounded-full px-3 py-2 text-sm
                                     sm:px-4 sm:text-base
                                     focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-500 
                                     text-gray-900 dark:text-white"
                            placeholder="Type your message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="text-white rounded-full px-3 py-2 text-sm transition-colors
                                     sm:px-4 sm:text-base"
                            style={{ background: "#ffc680", color: "#222" }}
                            disabled={loading}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalChat;
