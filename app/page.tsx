"use client"

import Link from "next/link"
import Image from "next/image"
import { AlertTriangle, Check, Shield, MapPin, Award, Phone, Calendar, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { StormCalculator } from "@/components/storm-calculator"
import { WarrantyBadge } from "@/components/warranty-badge"
import { InstallationSlots } from "@/components/installation-slots"
import { ServiceAreasAccordion } from "@/components/service-areas-accordion"
import { TransformingHeader } from "@/components/transforming-header"
import SimpleGoogleMap from "@/components/simple-google-map"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hero image URL
  const heroImageSrc =
    "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2818%29-YwxBKU3ofwOHUn4tQ9Rad50SRu8gZC.jpg"

  // Google Maps API Key - Temporary direct usage for demonstration

  return (
    <div className="flex min-h-screen flex-col">
      {/* Emergency Alert Bar - Visible only when not scrolled */}
      <div
        className={`bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "opacity-0 -translate-y-full" : "opacity-100"
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 animate-pulse text-yellow-300" />
            <span className="font-medium text-base">
              <strong className="text-yellow-300">STORM WATCH:</strong> Free Southwest Volusia fence inspections through
              June 15th
            </span>
          </div>
          <Link
            href="/storm-watch"
            className="bg-white text-red-600 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            Claim Offer →
          </Link>
        </div>
      </div>

      {/* Unified Header */}
      <TransformingHeader />

      {/* Enhanced Hero Section with Background Image */}
      <section className="relative">
        {/* Background Image - Using direct Next.js Image */}
        <div className="absolute inset-0 z-0 bg-gray-200">
          <Image
            src={heroImageSrc || "/placeholder.svg"}
            alt="Premium fence installation background"
            fill
            priority
            quality={90}
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-0 pb-20 md:pt-0 md:pb-28">
          <div className="container">
            <div className="max-w-3xl">
              <div className="inline-block bg-yellow-500 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-md animate-subtle-pulse">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  HURRICANE SEASON SPECIAL OFFER
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Storm-Proof Your Property <span className="text-yellow-400">Before It's Too Late</span>
              </h1>

              <p className="text-xl text-white mb-6 max-w-2xl drop-shadow-md">
                <span className="bg-black/30 px-2 py-1 rounded">
                  Don't wait for disaster to strike. Our hurricane-resistant fences are{" "}
                  <span className="font-bold text-yellow-300">40% stronger</span> than standard installations.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all flex items-center border-2 border-yellow-400 animate-subtle-pulse"
                  asChild
                >
                  <Link href="/free-estimate">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>
                      Get Your <span className="underline">FREE</span> Estimate Today
                    </span>
                  </Link>
                </Button>
                <Button
                  className="bg-white text-royal-blue hover:bg-gray-100 py-6 text-lg border-2 border-white hover:border-royal-gold transition-all shadow-lg flex items-center"
                  asChild
                >
                  <Link href="tel:3864798379">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now: (386) 479-8379
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 border border-white/30 shadow-md">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-white drop-shadow-md">
                    25-Year Limited Lifetime Warranty*
                  </span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 border border-white/30 shadow-md">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-white drop-shadow-md">400+ Volusia Installs</span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 border border-white/30 shadow-md">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-white drop-shadow-md">Local Since 2010</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600/90 to-green-700/90 p-3 rounded-lg shadow-lg max-w-md">
                <div className="flex items-center">
                  <div className="mr-3 bg-white rounded-full p-1.5">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-white text-sm">
                    <span className="font-bold">FREE Storm Assessment</span> with every estimate
                    <span className="block text-xs text-white/80 mt-0.5">($250 value - No obligation)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section - NEW */}
      <section className="py-2 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 shadow-sm">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-20 py-2">
            {/* BBB Logo - Using direct Next.js Image */}
            <div className="flex items-center justify-center bg-white px-6 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Image
                src="https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/AB-seal-horz.svg%20%281%29-BRlgnZwQyRtkTJplaJIcAZOMCJYNBF.svg"
                alt="BBB Accredited"
                width={130}
                height={104}
                className="w-[130px] h-auto sm:w-[150px] md:w-[170px]"
                priority
              />
            </div>

            {/* Licensed & Insured - Using direct Next.js Image */}
            <div className="flex items-center justify-center bg-white px-6 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Image
                src="https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/licensed%26insuredlogo-ARgdwcquYzlEbcwLURZ1eDQVdQmq7W.jpg"
                alt="Licensed and Insured"
                width={120}
                height={120}
                className="w-[120px] h-auto sm:w-[140px] md:w-[160px]"
                priority
              />
            </div>

            {/* Home Advisor - Using direct Next.js Image */}
            <div className="flex items-center justify-center bg-white px-6 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Image
                src="https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/homeadvisorapproved-XBGDtrtyPFNvZS2D3EFrhZPw65Mv8d.webp"
                alt="Home Advisor Screened & Approved"
                width={120}
                height={120}
                className="w-[120px] h-auto sm:w-[140px] md:w-[160px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Storm Calculator Section */}
      <section
        id="calculator"
        className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white border-y-4 border-royal-gold relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-block bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-md">
              STORM READINESS ASSESSMENT
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Will Your Fence <span className="text-yellow-400">Survive</span> This Hurricane Season?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Use our interactive calculator to assess your fence's risk level and get personalized recommendations
            </p>
          </div>

          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-royal-blue/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl"></div>

            {/* Calculator Component */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
              <StormCalculator className="max-h-[400px] overflow-auto" />
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <div className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-3 mr-4">
                    <Shield className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Expert Assessment</h3>
                    <p className="text-white/80">
                      Based on data from 500+ fence inspections across Southweset Volusia County & Sanford
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <div className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-3 mr-4">
                    <AlertTriangle className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Risk Analysis</h3>
                    <p className="text-white/80">
                      Identifies specific vulnerabilities before they become costly problems
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <div className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Free Inspection</h3>
                    <p className="text-white/80">Get a professional on-site assessment at no cost to you</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-6 px-8 text-xl shadow-xl hover:shadow-2xl transition-all flex items-center mx-auto rounded-lg transform hover:scale-105 border-2 border-yellow-400"
                asChild
              >
                <Link href="/free-estimate">
                  <Calendar className="mr-2 h-6 w-6" />
                  Get Your Free Fence Inspection
                </Link>
              </Button>
              <p className="mt-4 text-white/80">No obligation • Available 7 days a week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Accordion */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white border-t border-gray-200 diagonal-pattern">
        <div className="container">
          <ServiceAreasAccordion />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 subtle-grid">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-sm">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from homeowners who've experienced the Royalty Fence difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Michael R.",
                location: "Orange City",
                text: "Our fence withstood Hurricane Ian without a scratch when our neighbors' fences were destroyed. Best investment we've made for our property!",
              },
              {
                name: "Sarah T.",
                location: "DeLand",
                text: "The installation team was professional and finished ahead of schedule. Our fence looks amazing and has already survived two major storms!",
              },
              {
                name: "David K.",
                location: "Deltona",
                text: "After my neighbor's fence was destroyed in the last storm, I upgraded to Royalty Fence. The quality difference is night and day. Couldn't be happier!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-[1.02] transition-transform"
              >
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="font-bold text-royal-blue">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Badge Section */}
      <section
        id="warranty"
        className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 wave-pattern"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <WarrantyBadge />
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-3xl md:text-4xl font-bold text-royal-blue">
                The{" "}
                <span className="text-yellow-500 underline decoration-2 decoration-yellow-500">Strongest Fences</span>{" "}
                in Central Florida
              </h2>
              <p className="text-gray-700">Our exclusive 25-year warranty covers everything other companies won't:</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-green-700">Wind damage</strong> up to{" "}
                    <span className="text-red-600 font-bold">125 mph</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-green-700">Fading/discoloration</strong> - stays beautiful year after year
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-green-700">Material defects</strong> - premium materials that last
                  </span>
                </li>
              </ul>
              <Button
                className="bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white mt-4 shadow-lg transform hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/warranty">
                  Ask about our limited lifetime warranty on vinyl fencing!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent CTA Section */}
      <section
        id="inspection"
        className="py-16 md:py-20 bg-gradient-to-r from-royal-blue to-blue-900 text-white border-y-4 border-royal-gold"
      >
        <div className="container text-center">
          <div className="inline-block bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-bold mb-6 shadow-md">
            LIMITED TIME OFFER
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Beat Storm Season Rush!</h2>
          <div className="mb-8 bg-blue-800/50 p-6 rounded-xl border border-blue-700/50 shadow-inner max-w-3xl mx-auto">
            <InstallationSlots />
          </div>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-6 px-8 text-xl shadow-xl hover:shadow-2xl transition-all flex items-center mx-auto rounded-lg transform hover:scale-105 border-2 border-yellow-400"
            asChild
          >
            <Link href="/get-quote">
              <Calendar className="mr-2 h-6 w-6" />
              Get On Priority List
            </Link>
          </Button>
          <p className="mt-6 text-white/90 bg-blue-800/30 p-3 rounded-lg inline-block">
            <span className="text-yellow-300 font-bold">FREE</span> same-day estimates •{" "}
            <span className="text-yellow-300 font-bold">$250 OFF</span> new installations before June 15th
          </p>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Serving Southwest Volusia County</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-6">
                We proudly serve the following areas with expert fence installation and repair services:
              </p>

              <ul className="grid grid-cols-2 gap-4">
                {["DeLand", "Orange City", "Deltona", "DeBary", "Lake Helen", "Cassadaga", "Enterprise", "Osteen"].map(
                  (city, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      {city}
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-8">
                <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                  <Link href="/locations">View All Service Areas</Link>
                </Button>
              </div>
            </div>

            <SimpleGoogleMap height="400px" className="rounded-xl" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white animated-weather">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-white to-gray-50 p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-royal-blue mb-6">Ready to Protect Your Property?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Don't wait until it's too late. Contact us today for a free consultation and estimate on your fencing
                  project.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Free, no-obligation estimates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Professional installation by certified experts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Financing options available</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center rounded-lg border-2 border-yellow-400"
                  asChild
                >
                  <Link href="/free-estimate">
                    Get a Free Estimate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center rounded-lg"
                  asChild
                >
                  <Link href="tel:3864798379">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (386) 479-8379
                  </Link>
                </Button>
                <Button
                  className="w-full bg-white text-royal-blue border-2 border-royal-blue hover:bg-royal-blue hover:text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center rounded-lg"
                  asChild
                >
                  <Link href="/free-inspection">Schedule Free Inspection</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-royal-blue text-white py-16 border-t-4 border-royal-gold">
        <div className="container grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Royalty Fence</h3>
            <p className="opacity-90">Orange County's storm-proof fence experts since 2012</p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/storm-proof-fences" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Storm-Proof Fences
                </Link>
              </li>
              <li>
                <Link href="/emergency-repairs" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Emergency Repairs
                </Link>
              </li>
              <li>
                <Link href="/free-inspections" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Free Inspections
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-yellow-400" />
                <Link href="tel:3864798379" className="hover:text-yellow-300 transition-colors">
                  (386) 479-8379
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span>Orange City, FL 32763</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-yellow-300 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Warranty
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-6 border-t border-white/20 text-center text-sm opacity-80">
          © {new Date().getFullYear()} Royalty Fence. All rights reserved. | License #14040901
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-royal-gold shadow-lg py-3 px-4 z-50 md:hidden">
        <div className="container flex justify-between items-center gap-3">
          <Link
            href="tel:3864798379"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-royal-blue to-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all animate-subtle-bounce"
          >
            <Phone className="h-4 w-4 animate-pulse" />
            Call Now
          </Link>
          <Link
            href="sms:3864798379?body=I'm%20interested%20in%20a%20fence%20quote"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all animate-subtle-pulse"
          >
            <MessageSquare className="h-4 w-4 animate-pulse" />
            Text Now
          </Link>
        </div>
      </div>
    </div>
  )
}
