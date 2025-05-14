import { EnhancedFencePlanner } from "@/components/enhanced-fence-planner"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FencePlannerPage() {
  return (
    <div className="container py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">Plan Your Hurricane-Proof Fence</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Design your fence in minutes and get an instant estimate. Our interactive tool makes fence planning easy.
          </p>
        </div>

        <EnhancedFencePlanner />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#1e3a8a]">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hurricane-Rated Materials</h3>
            <p className="text-gray-600">
              All our fences are built with materials rated to withstand Category 5 hurricane winds up to 157+ MPH.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#1e3a8a]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Installation</h3>
            <p className="text-gray-600">
              Most installations are completed in just 1-2 days, with permits handled by our experienced team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#1e3a8a]">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Lifetime Warranty</h3>
            <p className="text-gray-600">
              Every fence comes with our exclusive lifetime wind warranty and 24/7 post-storm support.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Why Plan Your Fence Online?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 text-green-600 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Save Time</p>
                    <p className="text-sm text-gray-600">Get a quote faster without waiting for an in-person visit</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 text-green-600 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Visualize Your Project</p>
                    <p className="text-sm text-gray-600">See exactly how your fence will look on your property</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 text-green-600 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Accurate Estimates</p>
                    <p className="text-sm text-gray-600">Get a more precise quote based on your exact measurements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 text-green-600 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Save & Resume Later</p>
                    <p className="text-sm text-gray-600">Save your fence plans and come back to them anytime</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/get-quote">Limited Time: $500 Off Hurricane-Season Installation</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/placeholder.svg?key=5pmps" alt="Fence installation" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-bold">Most installations completed in just 1-2 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
