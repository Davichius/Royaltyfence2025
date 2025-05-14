type ABTestVariant = "A" | "B"

interface ABTest {
  id: string
  variants: {
    A: Record<string, string>
    B: Record<string, string>
  }
}

// Define your A/B tests
const abTests: ABTest[] = [
  {
    id: "cta-color",
    variants: {
      A: { "--cta-bg-color": "#f59e0b" }, // Yellow
      B: { "--cta-bg-color": "#1d4ed8" }, // Blue
    },
  },
  {
    id: "hero-headline",
    variants: {
      A: { "--hero-headline": '"Is Your Fence One Storm Away From Costly Repairs?"' },
      B: { "--hero-headline": '"Protect Your Property With Hurricane-Proof Fencing"' },
    },
  },
]

// Get or assign a variant for a test
export const getTestVariant = (testId: string): ABTestVariant => {
  if (typeof window === "undefined") return "A"

  const storageKey = `ab_test_${testId}`

  // Check if user already has an assigned variant
  let variant = localStorage.getItem(storageKey) as ABTestVariant

  // If not, assign one randomly
  if (!variant) {
    variant = Math.random() > 0.5 ? "A" : "B"
    localStorage.setItem(storageKey, variant)

    // Track the assignment in analytics
    if (window.gtag) {
      window.gtag("event", "ab_test_assignment", {
        event_category: "A/B Test",
        event_label: testId,
        value: variant,
      })
    }
  }

  return variant
}

// Apply all A/B test variants
export const applyABTestVariants = () => {
  if (typeof window === "undefined") return

  abTests.forEach((test) => {
    const variant = getTestVariant(test.id)
    const variantStyles = test.variants[variant]

    // Apply CSS variables
    Object.entries(variantStyles).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })
  })
}

export default applyABTestVariants
