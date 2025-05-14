import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Premium Aluminum Fencing Services | Royalty Fence",
  description:
    "Professional aluminum fence installation, repair, and replacement services in Volusia County. Durable, low-maintenance solutions with expert craftsmanship.",
  keywords:
    "aluminum fencing, aluminum fence installation, aluminum fence repair, aluminum fence replacement, Volusia County fencing, Florida aluminum fencing",
}

export default function AluminumFencingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <SchemaMarkup
        type="Service"
        name="Aluminum Fencing Services"
        description="Professional aluminum fence installation, repair, and replacement services in Volusia County."
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
            src="/placeholder.svg?key=7i0x5"
            alt="Premium aluminum fencing in Florida"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Premium Aluminum Fencing</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Elegant, durable, and low-maintenance aluminum fencing solutions for your property
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Aluminum Fencing?</h2>
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Long-Lasting Durability</h3>
                <p className="text-gray-600 text-center">
                  Aluminum fencing is resistant to rust, corrosion, and Florida's harsh weather conditions, providing
                  decades of service.
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Elegant Appearance</h3>
                <p className="text-gray-600 text-center">
                  Enhance your property's aesthetic with the sleek, sophisticated look of aluminum fencing in various
                  styles and colors.
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Low Maintenance</h3>
                <p className="text-gray-600 text-center">
                  Forget about painting, staining, or treating. Aluminum fencing requires minimal upkeep while
                  maintaining its beauty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Aluminum Fencing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?key=fistf"
                  alt="Aluminum fence installation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">Installation</h3>
                <p className="text-gray-600 mb-4">
                  Our expert team provides professional aluminum fence installation with precision and attention to
                  detail. We handle everything from property assessment to final inspection.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom designs to match your property</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proper foundation and post setting</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Precise alignment and secure assembly</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/placeholder.svg?key=b74ck" alt="Aluminum fence repair" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">Repair & Replacement</h3>
                <p className="text-gray-600 mb-4">
                  We restore damaged aluminum fencing to its original condition or replace sections that are beyond
                  repair, ensuring seamless integration with your existing fence.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Storm damage restoration</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Gate repair and alignment</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Post reinforcement and replacement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Aluminum Fence Styles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?key=t8ssq"
                  alt="Classic aluminum fence style"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Classic</h3>
                <p className="text-gray-600">
                  Traditional design with clean lines and spear-topped pickets, perfect for residential properties.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?key=ac9om"
                  alt="Modern aluminum fence style"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Modern</h3>
                <p className="text-gray-600">
                  Contemporary designs with horizontal rails and minimalist aesthetics for a sleek look.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?key=8a827"
                  alt="Ornamental aluminum fence style"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ornamental</h3>
                <p className="text-gray-600">
                  Decorative elements and intricate details for an elegant, upscale appearance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Royalty Fence installed an aluminum fence around our pool area, and we couldn't be happier with the
                  results. The fence looks amazing and has held up perfectly through several storms."
                </p>
                <div className="font-semibold">- Michael R., Orange City</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The team at Royalty Fence was professional from start to finish. They helped us choose the perfect
                  aluminum fence style for our property and installed it flawlessly."
                </p>
                <div className="font-semibold">- Jennifer T., DeLand</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "After Hurricane Ian damaged our fence, Royalty Fence came to the rescue. They replaced our damaged
                  sections with matching aluminum fencing that looks even better than the original."
                </p>
                <div className="font-semibold">- David L., Deltona</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">How long does aluminum fencing last?</h3>
              <p className="text-gray-600 mb-6">
                With proper installation and minimal maintenance, aluminum fencing can last 30+ years. It's resistant to
                rust, corrosion, and Florida's harsh weather conditions.
              </p>

              <h3 className="text-xl font-semibold mb-2">Is aluminum fencing good for pool areas?</h3>
              <p className="text-gray-600 mb-6">
                Yes, aluminum fencing is an excellent choice for pool areas. It's corrosion-resistant, meets pool safety
                codes, and provides visibility for monitoring swimmers.
              </p>

              <h3 className="text-xl font-semibold mb-2">Can aluminum fencing be installed on uneven terrain?</h3>
              <p className="text-gray-600">
                Absolutely. Aluminum fencing can be racked (adjusted) to follow the contours of your property, or
                installed in a stepped fashion for more significant slopes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How does aluminum fencing compare to vinyl?</h3>
              <p className="text-gray-600 mb-6">
                While both are low-maintenance, aluminum offers a more elegant, traditional appearance and is typically
                more durable against impacts. Vinyl provides more privacy options.
              </p>

              <h3 className="text-xl font-semibold mb-2">What colors are available for aluminum fencing?</h3>
              <p className="text-gray-600 mb-6">
                We offer aluminum fencing in a variety of powder-coated colors including black, bronze, white, and
                custom colors to match your property's aesthetic.
              </p>

              <h3 className="text-xl font-semibold mb-2">Do you provide warranties on aluminum fencing?</h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive warranties on all our aluminum fencing installations, covering both
                materials and workmanship for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Property with Aluminum Fencing?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact Royalty Fence today for a free consultation and estimate on your aluminum fencing project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/free-estimate">Get a Free Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
