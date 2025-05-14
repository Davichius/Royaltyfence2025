import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Vinyl Fencing Services | Storm-Resistant Fence Installation",
  description:
    "Professional vinyl fence installation and repair services in Volusia County. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence.",
  openGraph: {
    title: "Vinyl Fencing Services | Storm-Resistant Fence Installation",
    description:
      "Professional vinyl fence installation and repair services in Volusia County. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence.",
    url: "https://royaltyfence.com/services/vinyl-fencing",
    siteName: "Royalty Fence",
    locale: "en_US",
    type: "website",
  },
}

export default function VinylFencingPage() {
  const serviceAreas = [
    { name: "Orange City", href: "/services/vinyl-fencing/orange-city" },
    { name: "DeLand", href: "/services/vinyl-fencing/deland" },
    { name: "Deltona", href: "/services/vinyl-fencing/deltona" },
    { name: "DeBary", href: "/services/vinyl-fencing/debary" },
    { name: "Lake Helen", href: "/services/vinyl-fencing/lake-helen" },
    { name: "Enterprise", href: "/services/vinyl-fencing/enterprise" },
  ]

  const vinylFenceTypes = [
    {
      title: "Privacy Vinyl Fencing",
      description: "Solid panels that provide maximum privacy and security for your property.",
      image: "/pristine-fence.jpg",
    },
    {
      title: "Semi-Privacy Vinyl Fencing",
      description: "Partial visibility with some space between pickets for a balanced look.",
      image: "/pristine-fence.jpg",
    },
    {
      title: "Picket Vinyl Fencing",
      description: "Classic style with space between pickets, perfect for front yards.",
      image: "/pristine-fence.jpg",
    },
    {
      title: "Ranch Rail Vinyl Fencing",
      description: "Horizontal rails perfect for defining property lines while maintaining views.",
      image: "/pristine-fence.jpg",
    },
  ]

  const benefits = [
    {
      title: "Hurricane Resistant",
      description: "Engineered to withstand Florida's hurricane-force winds with reinforced posts and panels.",
    },
    {
      title: "Low Maintenance",
      description: "Never needs painting, staining, or sealing - just occasional cleaning with soap and water.",
    },
    {
      title: "Long Lifespan",
      description: "Lasts 20-30 years with minimal maintenance, outlasting wood fences by decades.",
    },
    {
      title: "UV Resistant",
      description: "Contains UV inhibitors that prevent fading and deterioration from intense sun exposure.",
    },
    {
      title: "No Rot or Pests",
      description: "Impervious to termites, rot, and fungus that commonly damage wood fences in Florida.",
    },
    {
      title: "Environmentally Friendly",
      description: "Made from recyclable materials and requires no harmful chemicals for maintenance.",
    },
  ]

  const faqs = [
    {
      question: "How long does vinyl fencing last in Florida's climate?",
      answer:
        "Our premium vinyl fencing typically lasts 20-30 years in Florida's climate. The materials we use are specifically selected to withstand Florida's heat, humidity, and storm conditions, with UV inhibitors to prevent sun damage and fading.",
    },
    {
      question: "Is vinyl fencing hurricane-resistant?",
      answer:
        "Yes, our vinyl fencing is engineered to be hurricane-resistant. We use reinforced posts, deeper-than-standard concrete footings, and high-quality brackets designed to withstand high winds common during Florida's storm seasons.",
    },
    {
      question: "How does vinyl fencing compare to wood fencing in Florida?",
      answer:
        "Vinyl fencing outperforms wood in Florida's climate in several ways: it won't rot, warp, or attract termites; it never needs painting or staining; it's more resistant to storm damage; and it typically has a longer lifespan with lower lifetime maintenance costs.",
    },
    {
      question: "What maintenance does vinyl fencing require?",
      answer:
        "Vinyl fencing requires minimal maintenance. Occasional cleaning with water and mild soap is typically all that's needed to keep it looking new. Unlike wood, it never needs painting, staining, or sealing, making it ideal for busy homeowners.",
    },
    {
      question: "How long does it take to install a vinyl fence?",
      answer:
        "Most residential vinyl fence installations take 1-3 days, depending on the size of your property and complexity of the installation. Our team works efficiently while ensuring proper installation techniques that meet local building codes.",
    },
    {
      question: "What warranty comes with your vinyl fencing?",
      answer:
        "Our vinyl fencing comes with a comprehensive warranty that includes protection against manufacturing defects, color fading, and material failure. Most of our premium vinyl products carry a lifetime limited warranty, giving homeowners peace of mind with their investment.",
    },
  ]

  return (
    <>
      <SchemaMarkup
        type="Service"
        name="Vinyl Fencing Services"
        description="Professional vinyl fence installation and repair services in Volusia County. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence."
        provider={{
          type: "LocalBusiness",
          name: "Royalty Fence",
          address: {
            streetAddress: "123 Main St",
            addressLocality: "Orange City",
            addressRegion: "FL",
            postalCode: "32763",
            addressCountry: "US",
          },
        }}
        areaServed="Volusia County"
        hasOfferCatalog={{
          type: "OfferCatalog",
          name: "Vinyl Fencing Services",
          itemListElement: [
            {
              type: "Offer",
              itemOffered: {
                type: "Service",
                name: "Vinyl Privacy Fence Installation",
              },
            },
            {
              type: "Offer",
              itemOffered: {
                type: "Service",
                name: "Vinyl Picket Fence Installation",
              },
            },
            {
              type: "Offer",
              itemOffered: {
                type: "Service",
                name: "Vinyl Fence Repair",
              },
            },
          ],
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Link href="/services" className="text-blue-600 hover:underline text-sm">
                Services
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-sm text-gray-600">Vinyl Fencing</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">Storm-Resistant Vinyl Fencing Solutions</h1>

            <p className="text-lg text-gray-700 mb-6">
              Royalty Fence provides premium vinyl fence installation and repair services throughout Volusia County. Our
              storm-resistant vinyl fences are designed to withstand Florida's harsh weather while maintaining their
              beauty and durability for years to come.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/free-estimate">Get a Free Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/storm-audit">Schedule a Storm Audit</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 based on 120+ reviews</span>
            </div>
          </div>

          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/pristine-fence.jpg"
              alt="Beautiful white vinyl fence installation in Florida"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Service Areas Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Vinyl Fencing Service Areas</h2>

          <p className="text-gray-700 mb-8">
            We provide professional vinyl fence installation and repair services throughout Volusia County. Click on
            your city below for location-specific information:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceAreas.map((area, index) => (
              <Link
                key={index}
                href={area.href}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 text-center transition duration-200"
              >
                <span className="font-medium">{area.name}, FL</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Vinyl Fence Types Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Vinyl Fence Styles We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vinylFenceTypes.map((type, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 items-center border border-gray-200 rounded-lg p-4"
              >
                <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden">
                  <Image
                    src={type.image || "/placeholder.svg"}
                    alt={type.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                  <p className="text-gray-700">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Benefits of Vinyl Fencing in Florida</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-t-4 border-t-blue-600">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Our Vinyl Fence Installation Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-700">Free on-site assessment and detailed quote with material options.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-gray-700">Custom design based on your property and specific requirements.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Installation</h3>
              <p className="text-gray-700">Professional installation with hurricane-resistant techniques.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Final Inspection</h3>
              <p className="text-gray-700">Quality check and walkthrough to ensure your complete satisfaction.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Install Your Storm-Resistant Vinyl Fence?</h2>

            <p className="text-lg text-gray-700 mb-8">
              Contact Royalty Fence today for a free consultation and estimate. Our team of experts will help you choose
              the perfect vinyl fence solution for your property.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/free-estimate">Get a Free Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/storm-audit">Schedule a Storm Audit</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+13865551234">Call (386) 555-1234</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
