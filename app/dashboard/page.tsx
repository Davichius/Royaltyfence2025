import { SavedFencePlans } from "@/components/saved-fence-plans"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <Link href="/" className="inline-flex items-center text-[#1e3a8a] hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">Your Dashboard</h1>
        <p className="text-gray-600 mb-8">View and manage your saved fence plans</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Saved Fence Plans</h2>
          <SavedFencePlans />
        </div>
      </div>
    </div>
  )
}
