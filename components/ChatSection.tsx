import { Sparkles } from "lucide-react";
import { useChatGPT } from "@/hooks/useChatGPT";
import { MessageBubble } from "./MessageBubble";
import { SmartActions } from "./SmartActions";
import { ChatInput } from "./ChatInput";

export default function ChatSection() {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const {
    input,
    setInput,
    messages,
    isLoading,
    textareaRef,
    messagesEndRef,
    handleSend,
    handleSmartAction,
    handleKeyDown,
  } = useChatGPT(apiKey);

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full h-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">

          {/* HEADER */}
          <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">SmartPot AI</h3>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                En linea
              </p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-green-600" />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm flex gap-1.5 items-center h-12">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            {!isLoading && messages.length > 0 && (
              <SmartActions
                onDiagnose={() => handleSmartAction("diagnostico")}
                onTips={() => handleSmartAction("tips")}
              />
            )}

            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              textareaRef={textareaRef}
              isLoading={isLoading}
            />

            <p className="text-center text-[10px] text-gray-400 mt-2">
              SmartPot AI puede cometer errores. Verifica la informacion importante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}