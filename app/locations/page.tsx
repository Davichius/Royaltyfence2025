"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FooterWithInfo } from "@/components/footer-with-info"
import { MapPin, Phone } from "lucide-react"
import SimpleGoogleMap from "@/components/simple-google-map"

export default function LocationsPage() {
  const locations = [
    {
      name: "Orange City",
      slug: "orange-city",
      description:
        "Premium vinyl fencing solutions for Orange City homes and businesses, built to withstand Florida storms.",
      image:
        "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%281%29-QVkjDaFJKPmTpCdm6cuTdVdRn7vgwP.jpg",
    },
    {
      name: "DeLand",
      slug: "deland",
      description:
        "Custom vinyl fencing for DeLand's historic and modern neighborhoods with expert local installation.",
      image: "/before-storm-1.jpg",
    },
    {
      name: "Deltona",
      slug: "deltona",
      description:
        "Hurricane-resistant vinyl fencing for Deltona properties, including specialized solutions for lakefront homes.",
      image: "/after-storm-2.jpg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <div className="h-[70px] md:h-[90px] flex items-center relative bg-white rounded-lg px-3 py-1 shadow-sm">
              <Image
                src="/logo.svg"
                alt="Royalty Fence Logo"
                width={200}
                height={80}
                className="object-contain"
                priority
              />
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
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Serving Volusia County with Premium Vinyl Fencing</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Royalty Fence provides hurricane-resistant vinyl fencing solutions throughout Volusia County, with
            specialized service for each community we serve.
          </p>
          <Button
            className="bg-royal-gold hover:bg-amber-600 text-white py-6 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/free-estimate">Get a Free Estimate</Link>
          </Button>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Our Service Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on your city to learn more about our vinyl fencing solutions in your area
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.slug} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={`Vinyl fencing in ${location.name}, FL`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-2xl font-bold p-4">{location.name}, FL</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{location.description}</p>
                  <Button className="w-full bg-royal-blue hover:bg-blue-800 text-white" asChild>
                    <Link href={`/locations/${location.slug}`}>
                      <MapPin className="h-4 w-4 mr-2" />
                      View {location.name} Services
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Don't see your city? We serve all of Volusia County and surrounding areas.
            </p>
            <Button className="bg-royal-gold hover:bg-amber-600 text-white" asChild>
              <Link href="/free-estimate">
                <Phone className="h-4 w-4 mr-2" />
                Contact Us for Service in Your Area
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Our Service Area</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Serving Volusia County and beyond with premium vinyl fencing solutions
            </p>
          </div>

          <SimpleGoogleMap height="500px" className="rounded-xl mb-8" title="Royalty Fence - All Service Areas" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-royal-blue text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Premium Vinyl Fence?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get a free, no-obligation estimate for your property. Our team will help you choose the perfect vinyl fence
            solution.
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
              <Link href="tel:3864798379">
                <Phone className="mr-2 h-5 w-5" />
                Call for Same-Day Quote
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
