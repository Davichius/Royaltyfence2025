import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { FreeEstimateForm } from "@/components/free-estimate-form"

export default function FreeEstimatePage() {
  return (
    <div className="container py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-10 text-lg">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-6">Get Your Free Fence Estimate Today</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Fill out the form below and we'll contact you within 1 hour to discuss your fencing project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">Why Choose Royalty Fence?</h2>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <span>25-year warranty on vinyl fencing</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <span>Storm-resistant designs for Florida weather</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <span>Local experts serving Volusia County for 14+ years</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <span>Price match guarantee - we'll beat any written estimate</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-orange-50 rounded-md border border-orange-100">
              <p className="text-sm text-orange-800 font-medium">
                <strong>Our Guarantee:</strong> We'll call you within 1 hour or your estimate is 10% off!
              </p>
            </div>
          </div>

          <FreeEstimateForm />
        </div>
      </div>
    </div>
  )
}
