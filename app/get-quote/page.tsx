import { QuoteForm } from "@/components/quote-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function QuotePage() {
  return (
    <div className="container py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-10 text-lg">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-6">
            Request Your Free Hurricane-Proof Fence Quote
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Fill out the form below to get started with your free, no-obligation quote. Our team will contact you within
            24 hours to discuss your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">Why Choose Royalty Fence?</h2>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Hurricane-proof designs with lifetime wind warranty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Free permitting assistance included with every project</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Most installations completed in just 1 day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Military-grade materials that resist Florida's harsh climate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>24/7 post-storm support for all customers</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>Limited Time Offer:</strong> Get $250 off full installations when you book before hurricane
                season. Only 12 slots remaining!
              </p>
            </div>
          </div>

          <QuoteForm replaceWoodWith="ornamental" />
        </div>
      </div>
    </div>
  )
}
