"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FooterWithInfo } from "@/components/footer-with-info"
import { Check, MapPin, Star, Phone, ArrowRight, Shield } from "lucide-react"

export default function OrangeCityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <div className="h-[70px] md:h-[90px] flex items-center relative bg-white rounded-lg px-3 py-1 shadow-sm">
              {"/logo.svg" && "/logo.svg".trim() !== "" ? (
                <Image
                  src="/logo.svg"
                  alt="Royalty Fence Logo"
                  width={200}
                  height={80}
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-[200px] h-[80px] flex items-center justify-center bg-gray-100 text-gray-500">
                  Royalty Fence
                </div>
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-royal-gold transition-colors duration-300">
              Home
            </Link>
            <Link href="/#calculator" className="text-gray-700 hover:text-royal-gold transition-colors duration-300">
              Storm Rating
            </Link>
            <Link
              href="/locations"
              className="text-royal-blue font-semibold hover:text-royal-gold transition-colors duration-300"
            >
              Service Areas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="tel:3864798379"
              className="hidden md:flex items-center gap-2 rounded-md bg-royal-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-all duration-300 shadow-md"
            >
              <Phone className="h-4 w-4" />
              (386) 479-8379
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-royal-blue to-blue-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm">
                <MapPin className="h-4 w-4 mr-1 text-royal-gold" />
                <span>Orange City, FL Vinyl Fencing Experts</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Premium Vinyl Fencing in{" "}
                <span className="bg-royal-gold text-white px-2 py-1 inline-block transform -rotate-1">
                  Orange City, Florida
                </span>
              </h1>

              <p className="text-xl">
                Royalty Fence delivers hurricane-resistant vinyl fencing solutions specifically designed for Orange City
                homes and businesses.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-royal-gold mt-1 flex-shrink-0" />
                  <span>Built to withstand Florida's hurricane season</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-royal-gold mt-1 flex-shrink-0" />
                  <span>Local Orange City installation team</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-royal-gold mt-1 flex-shrink-0" />
                  <span>25-year warranty on all vinyl fencing</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-royal-gold hover:bg-amber-600 text-white py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/free-estimate">Get a Free Estimate</Link>
                </Button>
                <Button
                  className="bg-white text-royal-blue hover:bg-gray-50 py-6 text-lg border-2 border-white hover:border-royal-gold transition-all duration-300 shadow-lg"
                  asChild
                >
                  <Link href="tel:3864798379">
                    <Phone className="mr-2 h-5 w-5" />
                    Call for Same-Day Quote
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                {(() => {
                  const imageSrc =
                    "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%281%29-QVkjDaFJKPmTpCdm6cuTdVdRn7vgwP.jpg"
                  return imageSrc && imageSrc.trim() !== "" ? (
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt="Vinyl fence installation in Orange City, FL"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      priority
                    />
                  ) : (
                    <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center text-gray-500">
                      Image not available
                    </div>
                  )
                })()}
                <div className="absolute bottom-0 left-0 right-0 bg-royal-blue/80 text-white text-center py-2 text-sm font-bold">
                  RECENT INSTALLATION • ORANGE CITY, FL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">
              Why Orange City Homeowners Choose Our Vinyl Fencing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Designed specifically for Orange City's climate and built to last through Florida's toughest weather
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-royal-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold text-royal-blue mb-3">Hurricane-Resistant</h3>
              <p className="text-gray-700">
                Our vinyl fences are engineered to withstand Orange City's hurricane season with wind ratings up to
                150mph.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-royal-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold text-royal-blue mb-3">Premium Quality</h3>
              <p className="text-gray-700">
                UV-resistant vinyl that won't fade, crack, or yellow in Orange City's intense Florida sun.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-royal-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold text-royal-blue mb-3">Local Expertise</h3>
              <p className="text-gray-700">
                Our team knows Orange City's soil conditions, permit requirements, and neighborhood regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">What Orange City Residents Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-royal-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "After Hurricane Ian destroyed our wooden fence, we upgraded to Royalty's vinyl fencing. It's been
                through two storms since and still looks brand new. Best investment for our Orange City home."
              </p>
              <div>
                <p className="font-bold">Michael T.</p>
                <p className="text-sm text-gray-500">Saxon Ridge, Orange City</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-royal-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The team at Royalty Fence was professional from start to finish. They knew exactly what type of fence
                would work best for our Orange City property. Installation was quick and the quality is outstanding."
              </p>
              <div>
                <p className="font-bold">Jennifer L.</p>
                <p className="text-sm text-gray-500">Summerhaven, Orange City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-royal-blue text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Premium Vinyl Fence in Orange City?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get a free, no-obligation estimate for your Orange City property. Our team will help you choose the perfect
            vinyl fence solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-royal-gold hover:bg-amber-600 text-white py-6 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/free-estimate">Get Your Free Estimate</Link>
            </Button>
            <Button
              className="bg-white text-royal-blue hover:bg-gray-50 py-6 px-8 text-lg border-2 border-white hover:border-royal-gold transition-all duration-300 shadow-lg"
              asChild
            >
              <Link href="/locations">
                <ArrowRight className="mr-2 h-5 w-5" />
                View All Service Areas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterWithInfo />
    </div>
  )
}
