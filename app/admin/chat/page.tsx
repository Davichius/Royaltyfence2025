"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Send, Loader2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { analyticsService } from "@/lib/analytics-service"

type ChatSession = {
  sessionId: string
  name: string
  lastMessage?: string
  lastMessageTime?: number
  unreadCount: number
}

type Message = {
  content: string
  isStaff: boolean
  staffName?: string
  timestamp: number
}

export default function AdminChatPage() {
  const [staffId] = useState(() => localStorage.getItem("staffId") || uuidv4())
  const [staffName, setStaffName] = useState("Staff")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Socket functionality has been removed
  const isConnected = false
  const error = null
  const sendMessage = () => console.log("Socket functionality removed")
  const onEvent = () => () => {}

  // Store staff ID in localStorage
  useEffect(() => {
    localStorage.setItem("staffId", staffId)
  }, [staffId])

  // Handle staff login
  const handleLogin = () => {
    if (!staffName.trim()) return

    setIsLoggedIn(true)

    // Join as staff
    if (isConnected) {
      sendMessage("staff:join", { staffId, name: staffName })
    }
  }

  // Set up message listeners
  useEffect(() => {
    if (isConnected && isLoggedIn) {
      // Listen for new chats
      const unsubscribeNewChat = onEvent("chat:new", (data) => {
        setActiveSessions((prev) => {
          // Check if session already exists
          if (prev.some((session) => session.sessionId === data.sessionId)) {
            return prev
          }

          return [
            ...prev,
            {
              sessionId: data.sessionId,
              name: data.name || "Guest",
              lastMessageTime: Date.now(),
              unreadCount: 1,
            },
          ]
        })
      })

      // Listen for new messages
      const unsubscribeNewMessage = onEvent("message:receive", (data) => {
        // Update active sessions
        if (!data.isStaff) {
          setActiveSessions((prev) =>
            prev.map((session) =>
              session.sessionId === data.sessionId
                ? {
                    ...session,
                    lastMessage: data.content,
                    lastMessageTime: data.timestamp,
                    unreadCount: session.sessionId === selectedSession ? 0 : session.unreadCount + 1,
                  }
                : session,
            ),
          )
        }

        // Update messages if this is the selected session
        if (data.sessionId === selectedSession) {
          setMessages((prev) => [
            ...prev,
            {
              content: data.content,
              isStaff: data.isStaff,
              staffName: data.staffName,
              timestamp: data.timestamp,
            },
          ])
        }
      })

      return () => {
        unsubscribeNewChat()
        unsubscribeNewMessage()
      }
    }
  }, [isConnected, isLoggedIn, selectedSession, onEvent])

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load chat history when selecting a session
  const selectSession = async (sessionId: string) => {
    setSelectedSession(sessionId)

    // Reset unread count
    setActiveSessions((prev) =>
      prev.map((session) => (session.sessionId === sessionId ? { ...session, unreadCount: 0 } : session)),
    )

    // Clear previous messages
    setMessages([])

    // In a real implementation, we would load chat history from Redis
    // For now, we'll just add a placeholder message
    setMessages([
      {
        content: `Chat history with ${activeSessions.find((s) => s.sessionId === sessionId)?.name || "Guest"}`,
        isStaff: true,
        staffName: "System",
        timestamp: Date.now(),
      },
    ])

    // Notify that staff has accepted the chat
    sendMessage("staff:accept-chat", {
      staffId,
      staffName,
      sessionId,
    })

    // Track that staff has accepted the chat
    analyticsService.trackEvent("agent_connected", sessionId, {
      staffId,
      staffName,
      timestamp: Date.now(),
    })
  }

  // Send a message to the selected session
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !selectedSession || isLoading) return

    setIsLoading(true)

    // Add message to local state
    const newMessage = {
      content: inputValue,
      isStaff: true,
      staffName,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Send message via Socket.io
    sendMessage("message:send", {
      sessionId: selectedSession,
      message: inputValue,
      isStaff: true,
      staffId,
      staffName,
    })

    // Track response time if this is a reply to a user message
    const lastUserMessage = messages.findLast((msg) => !msg.isStaff)
    if (lastUserMessage) {
      const responseTime = Date.now() - lastUserMessage.timestamp
      analyticsService.trackResponseTime(selectedSession, responseTime)
    }

    // Clear input
    setInputValue("")
    setIsLoading(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Royalty Fence Staff Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login as Staff
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Royalty Fence Live Chat Admin</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Chats</CardTitle>
            </CardHeader>
            <CardContent>
              {activeSessions.length === 0 ? (
                <p className="text-center text-gray-500">No active chats</p>
              ) : (
                <ul className="space-y-2">
                  {activeSessions.map((session) => (
                    <li key={session.sessionId}>
                      <Button
                        variant={selectedSession === session.sessionId ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => selectSession(session.sessionId)}
                      >
                        <div className="flex w-full items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>{session.name}</span>
                          {session.unreadCount > 0 && (
                            <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                              {session.unreadCount}
                            </span>
                          )}
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedSession
                  ? `Chat with ${activeSessions.find((s) => s.sessionId === selectedSession)?.name || "Guest"}`
                  : "Select a chat to begin"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {!selectedSession ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-center text-gray-500">Select a chat from the sidebar to begin</p>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto mb-4 p-2">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-3 max-w-[85%] rounded-lg p-3 ${
                          msg.isStaff ? "ml-auto bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.isStaff && msg.staffName && (
                          <div className="text-xs font-semibold text-blue-100 mb-1">{msg.staffName}</div>
                        )}
                        {msg.content}
                        {msg.timestamp && (
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="mt-auto">
                    <div className="flex">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-l-lg"
                        disabled={isLoading}
                      />
                      <Button type="submit" className="rounded-l-none" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
