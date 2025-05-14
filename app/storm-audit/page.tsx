import { StormAuditForm } from "@/components/storm-audit-form"
import Link from "next/link"
import { ArrowLeft, Shield, Wind, AlertTriangle } from "lucide-react"

export default function StormAuditPage() {
  return (
    <div className="container py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-10 text-lg">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-6">Free Storm Readiness Audit</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our certified storm readiness experts will assess your property and provide recommendations to protect your
            home during hurricane season.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-orange-500" />
                What's Included in Your Free Audit
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Complete fence structural assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Wind resistance evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Material durability inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Code compliance verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Personalized storm-readiness report</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center">
                <Wind className="mr-2 h-5 w-5 text-orange-500" />
                Hurricane Season Is Coming
              </h2>

              <p className="mb-4">
                The Atlantic hurricane season officially begins on June 1st and ends on November 30th. Forecasters are
                predicting an above-average season with:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>18-22 named storms (average is 14)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>8-11 hurricanes (average is 7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>4-6 major hurricanes (average is 3)</span>
                </li>
              </ul>

              <p className="text-sm">
                <strong>Don't wait until it's too late.</strong> Schedule your free storm audit today and ensure your
                property is protected before the first storm hits.
              </p>
            </div>
          </div>

          <StormAuditForm />
        </div>
      </div>
    </div>
  )
}
