"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Shield, Check } from "lucide-react"

const formSchema = z.object({
  address: z.string().min(5, {
    message: "Please enter your full address.",
  }),
})

export function StormSafeProgram() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          formType: "stormSafe",
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Track conversion in Google Analytics
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            event_category: "form",
            event_action: "submit",
            event_label: "stormsafe_program",
            address: values.address,
          })
        }

        setIsSuccess(true)
        form.reset()
      } else {
        setError(data.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Failed to submit form. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-[#1e3a8a]" />
        <h3 className="text-2xl font-bold text-[#1e3a8a]">StormSafe Program</h3>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
          <h4 className="font-bold">Welcome to the StormSafe Program!</h4>
          <p>
            Your address has been added to our StormSafe database. You'll receive priority service during storm season
            and exclusive updates on hurricane preparedness.
          </p>
          <Button className="mt-4 bg-[#1e3a8a]" onClick={() => setIsSuccess(false)}>
            Add Another Address
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p>Join your neighbors in Orange City's premier storm readiness program. StormSafe members receive:</p>

            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>Priority scheduling during hurricane season</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>24/7 emergency response team access</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>Bi-annual fence inspections</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>Exclusive discounts on repairs and upgrades</span>
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Orange City, FL 32763" {...field} />
                    </FormControl>
                    <FormDescription>Enter your full address to join the StormSafe Program</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-800" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add My Address"
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
