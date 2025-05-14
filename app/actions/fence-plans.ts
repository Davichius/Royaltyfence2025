"use server"

import { Redis } from "@upstash/redis"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Initialize Redis client from environment variables
const redis = Redis.fromEnv()

// Type definitions
export type FencePlan = {
  id: string
  name: string
  address: string
  lines: Array<{ points: { x: number; y: number }[] }>
  imageUrl?: string
  createdAt: string
  updatedAt: string
  userId?: string
  estimatedLength: number
  fenceType?: string
}

// Save a fence plan to Redis
export async function saveFencePlan(plan: Omit<FencePlan, "id" | "createdAt" | "updatedAt">) {
  try {
    const id = `fence_plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const timestamp = new Date().toISOString()

    const completePlan: FencePlan = {
      ...plan,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    // Save to Redis
    // We'll use a hash to store all plans and a set to keep track of all plan IDs
    await redis.hset("fence_plans", id, JSON.stringify(completePlan))
    await redis.sadd("fence_plan_ids", id)

    revalidatePath("/fence-planner")
    return { success: true, plan: completePlan }
  } catch (error) {
    console.error("Error saving fence plan:", error)
    return { success: false, error: "Failed to save fence plan" }
  }
}

// Get all fence plans
export async function getAllFencePlans() {
  try {
    // Get all plan IDs
    const planIds = await redis.smembers("fence_plan_ids")

    if (!planIds || planIds.length === 0) {
      return { success: true, plans: [] }
    }

    // Get all plans
    const plans = (await redis.hmget("fence_plans", ...planIds)) as string[]

    // Parse plans
    const parsedPlans = plans
      .filter(Boolean)
      .map((plan) => JSON.parse(plan) as FencePlan)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    return { success: true, plans: parsedPlans }
  } catch (error) {
    console.error("Error getting fence plans:", error)
    return { success: false, error: "Failed to get fence plans" }
  }
}

// Get a fence plan by ID
export async function getFencePlanById(id: string) {
  try {
    const plan = await redis.hget("fence_plans", id)

    if (!plan) {
      return { success: false, error: "Fence plan not found" }
    }

    return { success: true, plan: JSON.parse(plan) as FencePlan }
  } catch (error) {
    console.error("Error getting fence plan:", error)
    return { success: false, error: "Failed to get fence plan" }
  }
}

// Delete a fence plan
export async function deleteFencePlan(id: string) {
  try {
    await redis.hdel("fence_plans", id)
    await redis.srem("fence_plan_ids", id)

    revalidatePath("/fence-planner")
    return { success: true }
  } catch (error) {
    console.error("Error deleting fence plan:", error)
    return { success: false, error: "Failed to delete fence plan" }
  }
}

// Upload property image to Vercel Blob
export async function uploadPropertyImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Upload to Vercel Blob
    const blob = await put(`property-images/${Date.now()}_${file.name}`, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      size: blob.size,
      contentType: blob.contentType,
    }
  } catch (error) {
    console.error("Error uploading property image:", error)
    return { success: false, error: "Failed to upload property image" }
  }
}
