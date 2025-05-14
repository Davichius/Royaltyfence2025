import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VerifiedGallery } from "@/components/verified-gallery"
import Image from "next/image"

export default function GalleryPage() {
  return (
    <div className="container py-12 md:py-20 blueprint-bg">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">Our Project Gallery</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse through our portfolio of completed fence installations and repairs throughout Orange City and Volusia
            County. Each project showcases our commitment to quality and storm-resistant design.
          </p>
        </div>

        <VerifiedGallery />

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-5">Need a Custom Fence Solution?</h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Our team specializes in creating custom fence solutions for residential and commercial properties.
                Whether you need a decorative iron fence, a hurricane-resistant enclosure, or a security fence for your
                property, we have the expertise to deliver exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/get-quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1e3a8a] text-white font-medium text-lg rounded-md hover:bg-blue-800 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/fence-planner"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-medium text-lg rounded-md hover:bg-orange-600 transition-colors"
                >
                  Design Your Fence
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              {(() => {
                const imageSrc =
                  "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%281%29-QVkjDaFJKPmTpCdm6cuTdVdRn7vgwP.jpg"
                return imageSrc && imageSrc.trim() !== "" ? (
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt="Premium fence installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    onError={(e) => {
                      // @ts-ignore - TypeScript doesn't know about the src property on the target
                      e.currentTarget.src = "/placeholder.svg?height=600&width=800"
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    Image not available
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
