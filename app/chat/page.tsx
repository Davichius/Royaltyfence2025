import Link from "next/link"
import { ArrowLeft, Shield, Lock } from "lucide-react"

export default function ChatPage() {
  return (
    <div className="container py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">Chat with Our Fence Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant answers about our storm-proof fences, installation process, and warranty information.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-[#1e3a8a]" />
              <h3 className="font-bold text-lg">AI-Powered Assistance</h3>
            </div>
            <p className="text-gray-600">
              Our AI assistant is trained on our specific fence products and services to provide you with accurate
              information about storm-proof fencing solutions.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-[#1e3a8a]" />
              <h3 className="font-bold text-lg">Your Privacy</h3>
            </div>
            <p className="text-gray-600">
              Your conversation is stored securely to help us improve our service. We never share your personal
              information with third parties.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            Prefer to speak with a human? Call us at{" "}
            <Link href="tel:3864798379" className="text-[#1e3a8a] font-bold hover:underline">
              (386) 479-8379
            </Link>{" "}
            for immediate assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
