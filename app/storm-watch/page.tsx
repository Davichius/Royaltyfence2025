import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, Calendar, CheckCircle, Clock, DollarSign, ArrowRight, Phone } from "lucide-react"

export default function StormWatchPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50 to-white py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-md animate-pulse">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                <span>LIMITED TIME OFFER</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Storm Watch: <span className="text-red-600">Protect</span> Your Property Before Hurricane Season
              </h1>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-md">
                <p className="text-xl text-gray-800 font-medium">
                  Get a <span className="text-green-600 font-bold">FREE</span> fence inspection and
                  <span className="text-red-600 font-bold"> $250 OFF</span> new fence installations before June 15th.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-red-600 font-semibold bg-red-50 p-3 rounded-lg border border-red-100 shadow-inner">
                <Clock className="h-5 w-5" />
                <span>Offer expires June 15th, 2023</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/free-inspection"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-lg font-bold text-center transition-all shadow-lg transform hover:scale-105 flex-1 flex items-center justify-center"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Schedule Free Inspection
                </Link>
                <Link
                  href="tel:3864798379"
                  className="bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white px-6 py-4 rounded-lg font-bold text-center transition-all shadow-lg transform hover:scale-105 flex-1 flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call (386) 479-8379
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <Image src="/damaged-fence.jpg" alt="Storm damaged fence" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  Limited Time
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="bg-white/90 text-red-600 px-4 py-2 rounded-lg font-bold inline-block shadow-lg">
                    Don't wait until it's too late!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-100 text-royal-blue px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
                SPECIAL OFFER
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Storm Watch Special Offer</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take advantage of our limited-time offer to prepare your property for hurricane season
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 md:p-8 mb-12 shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-3 rounded-full shadow-md">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-700">Free Fence Inspection</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Comprehensive structural assessment</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Post and panel integrity check</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Hardware and fastener inspection</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Code compliance verification</span>
                    </li>
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-full shadow-md">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">$250 OFF New Installations</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Valid on all new fence installations</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Storm-rated materials available</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Professional installation by certified experts</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">Must schedule before June 15th</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-md mt-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800">
                    <strong className="text-red-600">Limited Time Offer:</strong> Both the free inspection and $250
                    discount are only available until June 15th. Don't wait until hurricane season is in full swing -
                    protect your property now!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-royal-blue mb-6">Ready to Prepare for Storm Season?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/free-inspection"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 flex items-center justify-center"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Schedule Free Inspection
                </Link>
                <Link
                  href="/get-quote"
                  className="bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white px-6 py-4 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 flex items-center justify-center"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Quote with $250 Discount
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Act Now Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-royal-blue px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
              WHY ACT NOW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Why Act Before Hurricane Season?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't wait until it's too late - there are significant benefits to preparing early
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                <Clock className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-royal-blue text-center">Beat the Rush</h3>
              <p className="text-gray-700 text-center">
                Once hurricane season begins, our schedule fills up quickly with emergency repairs. Get ahead of the
                crowd by scheduling now.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-700 text-center">Save Money</h3>
              <p className="text-gray-700 text-center">
                Take advantage of our <span className="text-red-600 font-bold">$250 discount</span> on new
                installations. Plus, prevent costly damage that could occur during storm season.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-700 text-center">Ensure Safety</h3>
              <p className="text-gray-700 text-center">
                A compromised fence can become dangerous debris during a storm. Protect your family and property with a
                secure, code-compliant fence.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/free-inspection"
              className="inline-flex items-center justify-center bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg transform hover:scale-105"
            >
              Schedule Your Free Inspection Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
