"use client"

import type React from "react"
import Analytics from "@/components/analytics"
import ConversionTracker from "./conversion-tracker"
import ABTestProvider from "./ab-test-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ABTestProvider />
      {children}
      <Analytics />
      <ConversionTracker />
    </>
  )
}
