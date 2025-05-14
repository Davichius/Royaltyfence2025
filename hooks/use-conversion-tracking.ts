"use client"

import { useEffect } from "react"

type ConversionEvent = {
  category: string
  action: string
  label?: string
  value?: number
}

export function useConversionTracking() {
  useEffect(() => {
    // Track clicks on elements with data-conversion attributes
    const trackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const conversionElement = target.closest("[data-conversion]") as HTMLElement

      if (conversionElement) {
        const conversionType = conversionElement.dataset.conversion
        const conversionCategory = conversionElement.dataset.category || "CTA"
        const conversionLabel = conversionElement.dataset.label || conversionElement.textContent?.trim()

        // Track in Google Analytics
        if (window.gtag) {
          window.gtag("event", conversionType, {
            event_category: conversionCategory,
            event_label: conversionLabel,
          })
        }

        // Track in Facebook Pixel
        if (window.fbq) {
          window.fbq("track", conversionType === "call" ? "Contact" : "Lead")
        }

        // Log for debugging
        console.log("Conversion tracked:", {
          type: conversionType,
          category: conversionCategory,
          label: conversionLabel,
        })
      }
    }

    // Track form submissions
    const trackFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement

      if (form.dataset.conversionForm) {
        const formType = form.dataset.conversionForm
        const formName = form.getAttribute("name") || form.id || "unknown-form"

        // Track in Google Analytics
        if (window.gtag) {
          window.gtag("event", "form_submit", {
            event_category: "Form",
            event_label: `${formType} - ${formName}`,
          })
        }

        // Track in Facebook Pixel
        if (window.fbq) {
          window.fbq("track", "Lead", {
            content_name: formName,
            content_category: formType,
          })
        }
      }
    }

    // Add event listeners
    document.addEventListener("click", trackClick)
    document.addEventListener("submit", trackFormSubmit as EventListener)

    // Cleanup
    return () => {
      document.removeEventListener("click", trackClick)
      document.removeEventListener("submit", trackFormSubmit as EventListener)
    }
  }, [])

  return null
}

export default useConversionTracking
