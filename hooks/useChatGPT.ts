// === SmartPot Chat Refactor ===
// Este archivo contiene todos los componentes refactorizados + custom hook
// Crea cada archivo según los comentarios indicados si quieres separarlo.

// =============================
// useChatGPT.ts (custom hook)
// =============================
"use client";

import { useState, useRef, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_INSTRUCTION = `Eres un asistente virtual experto y empatico especializado en plantas, responde las preguntas del usuario de forma breve y consica, usa emojis. Si el usuario pregunta sobre otros temas, responde que solo puedes ayudar con plantas y SmartPot.`;

export function useChatGPT(apiKey: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de SmartPot. ¿Tienes dudas sobre tus plantas o el funcionamiento del dispositivo?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Scroll automático ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // --- Auto resize textarea ---
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // === Llamada a la API ===
  async function callChatGPT(history: Message[], extraPrompt?: string) {
    const openAIHistory = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];

    if (extraPrompt) openAIHistory.push({ role: "user", content: extraPrompt });

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: openAIHistory }),
      });

      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);
      const data = await response.json();

      return data.choices?.[0]?.message?.content || "Lo siento, no pude procesar eso.";
    } catch (error) {
      console.error(error);
      return "Lo siento, ocurrió un error al conectar con el servidor.";
    }
  }

  // === Enviar mensajes ===
  const handleSend = async (text: string = input, smart = false, hiddenPrompt = "") => {
    const clean = text.trim();
    if ((!clean && !smart) || isLoading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const newMessages = [...messages];

    if (!smart || clean) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: clean,
        timestamp: new Date(),
      };

      newMessages.push(userMsg);
      setMessages(newMessages);
    }

    setIsLoading(true);

    const reply = await callChatGPT(newMessages, smart ? hiddenPrompt : undefined);

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(false);
  };

  const handleSmartAction = (type: "diagnostico" | "tips") => {
    if (type === "diagnostico") {
      handleSend("", true, "Ayúdame a diagnosticar un problema con mi planta. Hazme preguntas breves.");
    } else {
      handleSend("", true, "Dame 3 tips rápidos para mejorar el uso de agua en SmartPot.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    input,
    setInput,
    messages,
    isLoading,
    textareaRef,
    messagesEndRef,
    handleSend,
    handleSmartAction,
    handleKeyDown,
  };
}

