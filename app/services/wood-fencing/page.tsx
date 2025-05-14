import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Custom Wood Fencing Services | Royalty Fence",
  description:
    "Professional wood fence installation, repair, and replacement in Volusia County. Beautiful, natural solutions with expert craftsmanship.",
  keywords:
    "wood fencing, wood fence installation, wood fence repair, Volusia County fencing, Florida wood fencing, cedar fence, pressure treated fence",
}

export default function WoodFencingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <SchemaMarkup
        type="Service"
        name="Wood Fencing Services"
        description="Professional wood fence installation, repair, and replacement services in Volusia County."
        provider={{
          type: "LocalBusiness",
          name: "Royalty Fence",
          address: {
            streetAddress: "123 Fence Ave",
            addressLocality: "Orange City",
            addressRegion: "FL",
            postalCode: "32763",
            addressCountry: "US",
          },
          telephone: "(386) 555-1234",
          priceRange: "$$",
        }}
        areaServed={["Orange City", "DeLand", "Deltona", "DeBary", "Volusia County"]}
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative h-[500px] w-full">
          <Image
            src="/placeholder.svg?key=vwjju"
            alt="Custom wood fencing in Florida"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Custom Wood Fencing</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Beautiful, natural fencing solutions crafted with quality materials and expert workmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/free-estimate">Get a Free Estimate</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
            >
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Wood Fencing?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Natural Beauty</h3>
                <p className="text-gray-600 text-center">
                  Wood fencing offers timeless, natural beauty that enhances your property's aesthetic and complements
                  any landscape.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Customizable</h3>
                <p className="text-gray-600 text-center">
                  Wood fencing can be customized in countless ways with different styles, heights, and finishes to match
                  your vision.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Cost-Effective</h3>
                <p className="text-gray-600 text-center">
                  Wood fencing provides excellent value with lower initial costs compared to other fencing materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wood Fence Types Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Wood Fence Options</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We offer a variety of wood fence styles to meet your specific needs and preferences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image src="/placeholder.svg?key=wa47a" alt="Privacy Wood Fence" fill className="object-cover" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2">Privacy Wood Fence</h3>
                <p className="text-gray-600 mb-4">
                  Our most popular option, privacy wood fences provide security and seclusion with solid panels that
                  block visibility.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Available in 6' and 8' heights
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Optional lattice or decorative tops
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Pressure-treated pine or cedar options
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image src="/placeholder.svg?key=9w4rs" alt="Picket Wood Fence" fill className="object-cover" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2">Picket Wood Fence</h3>
                <p className="text-gray-600 mb-4">
                  Classic and charming, picket fences add character and curb appeal while defining property boundaries.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Traditional, French Gothic, or Spaced Picket styles
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Typically 3' to 4' in height
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Perfect for front yards and gardens
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storm Protection Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Storm-Resistant Wood Fencing Solutions</h2>
              <p className="text-xl mb-6">
                Our wood fences are engineered to withstand Florida's harsh weather conditions, including high winds and
                heavy rain.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-yellow-400 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <span className="font-bold text-yellow-400">Reinforced Posts</span>
                    <p className="text-white/80">
                      Our posts are set deeper and with more concrete than industry standards.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-yellow-400 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <span className="font-bold text-yellow-400">Hurricane Brackets</span>
                    <p className="text-white/80">Special metal brackets reinforce critical connection points.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-yellow-400 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <span className="font-bold text-yellow-400">Premium Fasteners</span>
                    <p className="text-white/80">
                      Stainless steel screws and nails resist corrosion and provide superior holding power.
                    </p>
                  </div>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                <Link href="/stormsafe">Learn About Our StormSafe™ Program</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?key=y9l5e"
                alt="Storm-resistant wood fencing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                <p className="text-white text-lg font-medium">
                  Our wood fences are built to last through Florida's toughest weather
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Wood Fence Maintenance</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Keep your wood fence looking beautiful for years to come with proper care
          </p>

          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Maintenance Recommendations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                      <span className="font-bold text-orange-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Seal or stain every 2-3 years</p>
                      <p className="text-gray-600">Protects against moisture and UV damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                      <span className="font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Clean annually with mild soap</p>
                      <p className="text-gray-600">Removes dirt, mildew, and mold</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                      <span className="font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Inspect for damage after storms</p>
                      <p className="text-gray-600">Address any issues promptly to prevent further damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                      <span className="font-bold text-orange-600">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Trim vegetation away from fence</p>
                      <p className="text-gray-600">Prevents moisture retention and physical damage</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                    <Link href="/free-inspection">Schedule a Maintenance Inspection</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-auto rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?key=0gmtg" alt="Wood fence maintenance" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your New Wood Fence?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today for a free consultation and estimate. Our experts will help you choose the perfect wood
            fence for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/free-estimate">Get a Free Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-orange-700">
              <Link href="/gallery">View Our Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
