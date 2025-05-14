// This is a temporary replacement for Redis KV storage
// to be used until we have proper session management

const userSessions = new Map()
const staffSessions = new Map()
const chatMessages = new Map()

export const mockSessionsDB = {
  // User session management
  createUserSession: (sessionId, userData) => {
    userSessions.set(sessionId, {
      ...userData,
      createdAt: Date.now(),
    })
    return sessionId
  },

  getUserSession: (sessionId) => {
    return userSessions.get(sessionId) || null
  },

  // Staff session management
  createStaffSession: (staffId, staffData) => {
    staffSessions.set(staffId, {
      ...staffData,
      createdAt: Date.now(),
      activeChats: [],
    })
    return staffId
  },

  getStaffSession: (staffId) => {
    return staffSessions.get(staffId) || null
  },

  getAllStaff: () => {
    return Array.from(staffSessions.entries()).map(([id, data]) => ({
      staffId: id,
      ...data,
    }))
  },

  // Message management
  addMessage: (sessionId, message) => {
    if (!chatMessages.has(sessionId)) {
      chatMessages.set(sessionId, [])
    }

    chatMessages.get(sessionId).push({
      ...message,
      timestamp: message.timestamp || Date.now(),
    })

    return chatMessages.get(sessionId).length
  },

  getMessages: (sessionId) => {
    return chatMessages.get(sessionId) || []
  },

  // Active chats
  getActiveChats: () => {
    return Array.from(userSessions.entries())
      .map(([sessionId, userData]) => ({
        sessionId,
        userData,
        lastMessage: chatMessages.get(sessionId)?.slice(-1)[0] || null,
        messageCount: chatMessages.get(sessionId)?.length || 0,
      }))
      .filter((chat) => chat.messageCount > 0)
      .sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.userData.createdAt
        const bTime = b.lastMessage?.timestamp || b.userData.createdAt
        return bTime - aTime // Sort by most recent
      })
  },
}

// Initialize with some staff
mockSessionsDB.createStaffSession("staff-1", {
  name: "Sarah",
  role: "Customer Support",
  available: true,
})

mockSessionsDB.createStaffSession("staff-2", {
  name: "John",
  role: "Fence Specialist",
  available: true,
})
