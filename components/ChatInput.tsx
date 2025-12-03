import { RefreshCw, Send } from "lucide-react";

export function ChatInput({ input, setInput, handleSend, handleKeyDown, textareaRef, isLoading }: any) {
  return (
    <div className="relative flex items-end gap-2 bg-white border border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 p-2 rounded-3xl shadow-sm transition-all">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu consulta..."
        rows={1}
        className="w-full bg-transparent text-gray-800 placeholder-gray-400 px-4 py-3 focus:outline-none resize-none max-h-32 text-sm"
      />

      <button
        onClick={() => handleSend()}
        disabled={!input.trim() || isLoading}
        className={`p-3 rounded-full flex-shrink-0 transition-all duration-200 ${
          !input.trim() || isLoading
            ? "bg-gray-100 text-gray-400"
            : "bg-green-600 text-white hover:bg-green-700 shadow-md"
        }`}
      >
        {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      </button>
    </div>
  );
}