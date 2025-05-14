"use client"

import { create } from "zustand"

type ChatState = {
  isOpen: boolean
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
}

export const useChat = create<ChatState>((set) => ({
  isOpen: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
}))
