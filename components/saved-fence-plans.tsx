"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, ExternalLink } from "lucide-react"
import { getAllFencePlans, deleteFencePlan, type FencePlan } from "@/app/actions/fence-plans"
import Link from "next/link"

export function SavedFencePlans() {
  const [plans, setPlans] = useState<FencePlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getAllFencePlans()
      if (result.success) {
        setPlans(result.plans)
      } else {
        setError("Failed to load fence plans")
      }
    } catch (err) {
      console.error("Error loading fence plans:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fence plan?")) return

    try {
      const result = await deleteFencePlan(id)
      if (result.success) {
        setPlans(plans.filter((plan) => plan.id !== id))
      } else {
        setError("Failed to delete fence plan")
      }
    } catch (err) {
      console.error("Error deleting fence plan:", err)
      setError("An unexpected error occurred")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={loadPlans} className="mt-2">
          Try Again
        </Button>
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium text-gray-700">No Saved Fence Plans</h3>
        <p className="text-gray-500 mt-2">You haven't created any fence plans yet.</p>
        <Button className="mt-4 bg-[#1e3a8a]" asChild>
          <Link href="/fence-planner">Create Your First Fence Plan</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>Created on {new Date(plan.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium">{plan.address || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fence Length:</span>
                <span className="font-medium">{plan.estimatedLength} ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fence Type:</span>
                <span className="font-medium capitalize">{plan.fenceType?.replace("-", " ") || "Not specified"}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleDelete(plan.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button size="sm" className="bg-[#1e3a8a]" asChild>
              <Link href={`/fence-planner?plan=${plan.id}`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
