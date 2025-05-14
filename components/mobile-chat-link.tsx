"use client"

import { MessageSquare } from "lucide-react"
import { useChat } from "@/hooks/use-chat"

export function MobileChatLink() {
  const { toggleChat } = useChat()

  return (
    <button
      onClick={toggleChat}
      className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors"
      aria-label="Open chat"
    >
      <MessageSquare className="h-5 w-5 text-blue-600" />
      <span>Chat with us</span>
    </button>
  )
}
