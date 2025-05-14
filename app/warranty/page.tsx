import Link from "next/link"
import { ArrowLeft, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WarrantyBadge } from "@/components/warranty-badge"

export default function WarrantyPage() {
  return (
    <div className="container py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-royal-blue hover:underline mb-10 text-lg">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-royal-blue mb-6">Our 25-Year Storm Warranty</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The strongest fence warranty in Central Florida, backed by our commitment to storm-proof quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <WarrantyBadge />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-royal-blue">
              The <span className="underline decoration-royal-gold">Strongest Guarantee</span> in Central Florida
            </h2>
            <p className="text-xl">Our warranty covers what others won't:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">
                  <strong>Wind damage</strong> up to 150mph
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">
                  <strong>Fading/discoloration</strong> from sun exposure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">
                  <strong>Material defects</strong> of any kind
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold text-royal-blue mb-6 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-royal-gold" />
            Warranty Details
          </h2>

          <div className="space-y-6">
            <p>
              Our 25-year warranty is the most comprehensive fence protection available in Central Florida. Unlike
              standard warranties that only cover manufacturing defects, our warranty protects your investment against
              the harsh Florida elements.
            </p>

            <h3 className="text-xl font-bold text-royal-blue">What's Covered:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>Structural damage from winds up to 150mph</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>UV damage and color fading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>Material warping, cracking, or breaking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>Post movement or leaning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>Hardware failures (hinges, latches, etc.)</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-royal-blue">Warranty Terms:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>Fully transferable to new homeowners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>No pro-rating - full coverage for the entire 25 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>No hidden fees or service charges for warranty claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-gold font-bold">✓</span>
                <span>48-hour emergency response during named storms</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-royal-blue mb-6">Ready to Protect Your Property?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-royal-gold hover:bg-amber-600 text-white" size="lg" asChild>
              <Link href="/get-quote">Get a Free Quote</Link>
            </Button>
            <Button className="bg-royal-blue hover:bg-blue-800 text-white" size="lg" asChild>
              <Link href="/free-inspection">Schedule Free Inspection</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
