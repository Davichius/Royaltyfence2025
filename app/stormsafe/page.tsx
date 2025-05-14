import { StormSafeProgram } from "@/components/stormsafe-program"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, AlertTriangle, Users } from "lucide-react"

export default function StormSafePage() {
  return (
    <div className="container py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">The StormSafe Program</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Orange City's premier hurricane readiness network for fence owners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="StormSafe Program"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h2 className="text-xl font-bold">Community Protection Network</h2>
                  <p>Neighbors helping neighbors stay safe during storm season</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-orange-500" />
                About the StormSafe Program
              </h2>

              <p className="mb-4">
                The StormSafe Program was established in 2018 after Hurricane Irma caused significant damage to Orange
                City properties. Our mission is to ensure every fence in our community can withstand Florida's extreme
                weather.
              </p>

              <p>
                When you join the StormSafe Program, your property is added to our emergency response database. In the
                event of a hurricane warning, our team proactively checks on member properties and provides priority
                service for post-storm repairs.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                StormSafe By The Numbers
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#1e3a8a]">438</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#1e3a8a]">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Response</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#1e3a8a]">93%</div>
                  <div className="text-sm text-gray-600">Recommendation Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#1e3a8a]">0</div>
                  <div className="text-sm text-gray-600">Storm Failures in 2023</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <StormSafeProgram />

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h2 className="text-lg font-bold text-[#1e3a8a] mb-3 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                StormSafe Member Testimonial
              </h2>

              <blockquote className="italic text-gray-700 mb-4">
                "After joining the StormSafe Program, I received a call from Royalty Fence the day before Hurricane Ian
                hit. They came out and secured my loose fence panels at no charge. That fence is still standing today
                while my neighbor's was completely destroyed."
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Michael Rodriguez</p>
                  <p className="text-sm text-gray-600">StormSafe Member since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
