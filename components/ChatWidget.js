"use client"
import { useState, useRef, useEffect } from "react"
import { PaperClipIcon, XMarkIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Initialize chat with saved messages or welcome
  useEffect(() => {
    const savedMessages = localStorage.getItem("royaltyChat")
    const welcomeMessage = {
      text: "Hi! I'm Roy from Royalty Fencing. Ask me about vinyl fences, storm repairs, or free estimates!",
      sender: "bot",
    }

    setMessages(savedMessages ? JSON.parse(savedMessages) : [welcomeMessage])

    if (!localStorage.getItem("royaltyUserId")) {
      localStorage.setItem("royaltyUserId", crypto.randomUUID())
    }
  }, [])

  // Auto-scroll and persist messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    localStorage.setItem("royaltyChat", JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !imagePreview) return

    // Add user message
    const newMessages = [
      ...messages,
      { text: inputValue, sender: "user" },
      ...(imagePreview ? [{ image: imagePreview, sender: "user" }] : []),
    ]
    setMessages(newMessages)
    setInputValue("")
    setImagePreview(null)
    setIsTyping(true)

    try {
      // Call Make.com webhook
      const response = await fetch("YOUR_MAKE_COM_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          imageUrl: imagePreview,
          userId: localStorage.getItem("royaltyUserId"),
        }),
      })

      const data = await response.json()

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          text: data.reply,
          sender: "bot",
          ...(data.appointmentPending && { appointment: data.appointmentPending }),
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting. Please call us at (555) 123-4567!",
          sender: "bot",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all z-50"
        aria-label="Open chat"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <ChatBubbleOvalLeftIcon className="w-6 h-6" />}
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-blue-800 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <h3 className="font-semibold">Roy - Royalty Fencing</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.image ? (
                    <img
                      src={msg.image || "/placeholder.svg"}
                      alt="Uploaded preview"
                      className="max-w-full h-auto rounded"
                    />
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.appointment && (
                  <div className="text-xs text-gray-500 mt-1">
                    Tentative: {new Date(msg.appointment).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-3">
                <div className="inline-block px-3 py-2 rounded-lg bg-gray-100 text-gray-800">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            {imagePreview && (
              <div className="relative mb-2">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="h-20 rounded border border-gray-300"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex">
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-gray-100 text-gray-600 p-2 rounded-l-lg hover:bg-gray-200"
                aria-label="Upload image"
              >
                <PaperClipIcon className="w-5 h-5" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() && !imagePreview}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Need an estimate?{" "}
              <a href="/book-now" className="text-blue-600 underline">
                Click here
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
