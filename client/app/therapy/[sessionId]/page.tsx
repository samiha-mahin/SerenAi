"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Send,
  Bot,
  User,
  Loader2,
  PlusCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  createChatSession,
  sendChatMessage,
  getChatHistory,
  getAllChatSessions,
  ChatMessage,
  ChatSession,
} from "@/lib/api/chat";

const SUGGESTED_QUESTIONS = [
  { text: "How can I manage my anxiety better?" },
  { text: "I've been feeling overwhelmed lately" },
  { text: "Can we talk about improving sleep?" },
  { text: "I need help with work-life balance" },
];

const glowAnimation = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function TherapyPage() {
  const params = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string | null>(
    params.sessionId as string
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ------------------ Utils ------------------
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // ------------------ Init ------------------
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      try {
        let id = sessionId;
        if (!id || id === "new") {
          id = await createChatSession();
          setSessionId(id);
          router.replace(`/therapy/${id}`);
        }

        const history = await getChatHistory(id);
        setMessages(
          history.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );

        const allSessions = await getAllChatSessions();
        setSessions(allSessions);
      } catch (err) {
        console.error("Error initializing therapy page:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!isTyping) scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => setMounted(true), []);

  // ------------------ Handlers ------------------
  const handleNewSession = async () => {
    setIsLoading(true);
    try {
      const id = await createChatSession();
      setSessions((prev) => [
        { sessionId: id, messages: [], createdAt: new Date(), updatedAt: new Date() },
        ...prev,
      ]);
      setMessages([]);
      setSessionId(id);
      router.push(`/therapy/${id}`);
    } catch (err) {
      console.error("Error creating new session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionSelect = async (id: string) => {
    if (id === sessionId) return;
    setIsLoading(true);
    try {
      const history = await getChatHistory(id);
      setMessages(history.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
      setSessionId(id);
      router.push(`/therapy/${id}`);
    } catch (err) {
      console.error("Error fetching session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping || !sessionId) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await sendChatMessage(sessionId, userMsg.content);
      const ai = typeof res === "string" ? JSON.parse(res) : res;

      const botMsg: ChatMessage = {
        role: "assistant",
        content: ai.response || ai.message || "I'm here with you. Tell me more.",
        timestamp: new Date(),
        metadata: {
          technique: ai.metadata?.technique || "supportive",
          goal: ai.metadata?.goal || "Provide support",
        },
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble responding right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ------------------ Loading ------------------
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#8BD3E6]" />
      </div>
    );
  }

  // ------------------ UI ------------------
  return (
    <div className="pt-20">
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="flex gap-6 mb-10" style={{ height: 'calc(80vh - 4rem)' }}>

        {/* Sidebar */}
        <div className="w-80 flex flex-col border-r bg-[#8BD3E6]/10">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-[#8BD3E6]">Chat Sessions</h2>
            <button onClick={handleNewSession}>
              <PlusCircle className="w-5 h-5 text-[#5bafc7]" />
            </button>
          </div>

          <ScrollArea className="flex-1 p-3 space-y-2">
            {sessions.map((s) => (
              <div
                key={s.sessionId}
                onClick={() => handleSessionSelect(s.sessionId)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer text-sm",
                  s.sessionId === sessionId
                    ? "bg-[#8BD3E6]/30"
                    : "hover:bg-[#8BD3E6]/20"
                )}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                {s.messages[0]?.content.slice(0, 25) || "New Chat"}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex gap-2 items-center">
            <Bot className="text-[#8BD3E6]" />
            <h2 className="font-semibold text-[#8BD3E6]">AI Therapist</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.timestamp.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "px-6 py-6",
                    msg.role === "assistant" ? "bg-[#8BD3E6]/10" : ""
                  )}
                >
                  <div className="flex gap-3">
                    {msg.role === "assistant" ? (
                      <Bot className="text-[#8BD3E6]" />
                    ) : (
                      <User className="text-[#5bafc7]" />
                    )}
                    <div>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      {msg.metadata?.goal && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Goal: {msg.metadata.goal}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="px-6 py-4 text-sm text-[#5bafc7] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl border p-3 resize-none"
              rows={1}
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !message.trim()}
              className="bg-[#5bafc7] text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}