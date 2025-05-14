"use client"

import { Shield, Check, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import Link from "next/link"

const Image = dynamic(() => import("next/image"), { ssr: false })

export default function VinylFencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hurricane-Proof Vinyl Fences for Orange City Homes
            <br />
            <span className="text-accent">Free Vinyl Fence Estimate Orange City FL</span>
          </h1>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <p className="font-bold">Volusia County Verified</p>
                <p>Licensed & Insured (#FL123456)</p>
              </div>
            </div>
          </div>

          <Button className="bg-accent hover:bg-[#FF6B2B] text-white py-6 px-8 text-lg" asChild>
            <Link href="/free-estimate">Get Your Free Estimate - No Obligation, No Pressure</Link>
          </Button>
        </div>
      </section>

      {/* Local Proof Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8">
            See Our 10+ Year Old Installations in Your Orange City Neighborhood
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-xl overflow-hidden">
              {/* Map Image */}
              <Image
                src="/orange-city-map.jpg"
                alt="Vinyl fence installations map in Orange City"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-lg mb-6">
                <strong>Free Vinyl Fence Estimate Orange City FL:</strong> See actual installations that have weathered
                Florida storms since 2012. We'll show you real examples during your free consultation.
              </p>

              <ul className="space-y-4">
                {[
                  "Maple Street - Installed 2013",
                  "Pine Road - Survived Hurricane Irma",
                  "Oak Drive - Withstood 110mph winds",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8">25-Year Limited Lifetime Warranty</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Free Vinyl Fence Estimate Orange City FL:</strong> Our warranty covers:
              </p>
              <ul className="space-y-3">
                {["Material defects", "Storm damage repairs", "Post & panel replacements", "Labor costs"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <p className="text-sm text-gray-600 mt-4">We Won't Spam You - Local Experts Only</p>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden shadow-xl">
              {/* Warranty Document Image */}
              <Image src="/warranty-document.jpg" alt="25-year warranty document" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Start Your Hurricane-Proof Fence Today</h2>

            <div className="bg-white/10 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-4 justify-center">
                <MapPin className="h-8 w-8 text-accent" />
                <p className="font-bold">We Handle All Volusia County Permits</p>
              </div>
              <p className="mt-2">Zero Paperwork for You - Start with a Free Vinyl Fence Estimate</p>
            </div>

            <Button className="bg-accent hover:bg-[#FF6B2B] text-white py-6 px-8 text-lg" asChild>
              <Link href="/free-estimate">Get Your Free Storm Audit →</Link>
            </Button>

            <p className="mt-4 text-sm opacity-90">No High-Pressure Sales - Local Orange City Experts</p>
          </div>
        </div>
      </section>
    </div>
  )
}
