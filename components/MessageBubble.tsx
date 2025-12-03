import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { Message } from "@/hooks/useChatGPT";

export function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex-shrink-0 flex items-center justify-center mt-1">
          <Sparkles className="w-4 h-4 text-green-600" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-gray-900 text-white rounded-2xl rounded-tr-sm"
              : "bg-white border border-gray-200 text-gray-700 rounded-2xl rounded-tl-sm"
          }`}
        >
          {msg.content}
        </div>
        <span className="text-[10px] text-gray-400 mt-1 block px-1 text-right">
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center mt-1">
          <User className="w-4 h-4 text-gray-500" />
        </div>
      )}
    </motion.div>
  );
}



