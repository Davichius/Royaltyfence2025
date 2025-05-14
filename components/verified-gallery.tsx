"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ZoomIn,
  X,
  Filter,
  Download,
  Play,
  Pause,
  Share2,
  Facebook,
  Twitter,
  Mail,
  LinkIcon,
  Check,
  MessageSquare,
  Search,
} from "lucide-react"

// These are all the verified images from the RoyaltyFence/Bestjobpics/ folder
// const verifiedImages = [
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%281%29-QVkjDaFJKPmTpCdm6cuTdVdRn7vgwP.jpg",
//     alt: "Premium vinyl fence installation",
//     caption: "Premium Vinyl Fence Installation",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "Orange City",
//     keywords: ["premium", "vinyl", "installation", "white fence", "privacy fence"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%282%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Residential fence with gate",
//     caption: "Residential Fence with Custom Gate",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "DeLand",
//     keywords: ["residential", "gate", "custom", "entrance", "home"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%283%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Corner fence installation",
//     caption: "Corner Property Fence Solution",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "Deltona",
//     keywords: ["corner", "property line", "boundary", "residential", "solution"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%284%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "White vinyl fence installation",
//     caption: "White Vinyl Privacy Fence",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "Orange City",
//     keywords: ["white", "vinyl", "privacy", "backyard", "residential"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%285%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence with landscaping",
//     caption: "Fence with Professional Landscaping",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "landscaping",
//     location: "DeLand",
//     keywords: ["landscaping", "garden", "plants", "professional", "design"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%286%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Backyard fence installation",
//     caption: "Backyard Security Fence",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "Deltona",
//     keywords: ["backyard", "security", "safety", "residential", "protection"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%287%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence along property line",
//     caption: "Property Line Demarcation Fence",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "DeBary",
//     keywords: ["property line", "boundary", "demarcation", "neighbor", "divider"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%288%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence with gate entrance",
//     caption: "Decorative Gate Entrance",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "gates",
//     location: "Orange City",
//     keywords: ["gate", "entrance", "decorative", "ornamental", "custom"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%289%29-PtS2WMePv1MAdvyvJKbcx2k2GJYCPZ.jpg",
//     alt: "Fence installation in progress",
//     caption: "Professional Installation Process",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "installation",
//     location: "DeLand",
//     keywords: ["installation", "process", "professional", "construction", "work"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2810%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Completed fence project",
//     caption: "Completed Residential Project",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "Deltona",
//     keywords: ["completed", "finished", "residential", "project", "home"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2811%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence with garden view",
//     caption: "Garden-Adjacent Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "landscaping",
//     location: "DeBary",
//     keywords: ["garden", "landscaping", "plants", "flowers", "adjacent"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2812%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence corner detail",
//     caption: "Precision Corner Installation",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "installation",
//     location: "Orange City",
//     keywords: ["corner", "precision", "detail", "installation", "craftsmanship"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2813%29-m6bkEiJymWrekkjFzr7Xzo12qcO3gS.jpg",
//     alt: "Fence with landscaping integration",
//     caption: "Landscape-Integrated Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "landscaping",
//     location: "DeLand",
//     keywords: ["landscape", "integrated", "design", "plants", "harmony"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2814%29-xR54Ka7YcObeb2hMyKd9Yo3UDe29J0.jpg",
//     alt: "Commercial fence installation",
//     caption: "Commercial Property Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "commercial",
//     location: "Sanford",
//     keywords: ["commercial", "business", "property", "security", "professional"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o%20%2815%29-AbVmq3HBwjQ1JtkJ9xnNNBKPHTDQE0.jpg",
//     alt: "Residential fence project",
//     caption: "Residential Privacy Solution",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "residential",
//     location: "Lake Mary",
//     keywords: ["residential", "privacy", "solution", "home", "backyard"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/Bestjobpics/o-uypxNnJlp27Ygzn2kkeOtStX495rDf.png",
//     alt: "Fence design diagram",
//     caption: "Custom Fence Design Blueprint",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "design",
//     location: "Orange City",
//     keywords: ["design", "blueprint", "custom", "planning", "diagram"],
//   },
//   // Additional images from previous update
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/fence-installation-1-YtGHJklMnBvCxZpQrStuVwXyZaAbCd.jpg",
//     alt: "New fence installation in progress",
//     caption: "New Installation in Progress",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "installation",
//     location: "DeLand",
//     keywords: ["installation", "new", "progress", "construction", "process"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/vinyl-fence-corner-DeFgHiJkLmNoPqRsTuVwXyZaBcDeFg.jpg",
//     alt: "Vinyl fence corner detail",
//     caption: "Precision Corner Detail",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "Deltona",
//     keywords: ["vinyl", "corner", "detail", "precision", "craftsmanship"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/aluminum-fence-pool-HiJkLmNoPqRsTuVwXyZaBcDeFgHiJk.jpg",
//     alt: "Aluminum fence around pool area",
//     caption: "Pool Safety Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "aluminum",
//     location: "Orange City",
//     keywords: ["aluminum", "pool", "safety", "security", "code compliant"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/ornamental-gate-LmNoPqRsTuVwXyZaBcDeFgHiJkLmNo.jpg",
//     alt: "Ornamental iron gate",
//     caption: "Custom Ornamental Gate",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "gates",
//     location: "DeBary",
//     keywords: ["ornamental", "iron", "gate", "custom", "decorative"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/fence-repair-PqRsTuVwXyZaBcDeFgHiJkLmNoPqRs.jpg",
//     alt: "Fence repair after storm damage",
//     caption: "Post-Storm Repair",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "repair",
//     location: "Deltona",
//     keywords: ["repair", "storm damage", "restoration", "fix", "hurricane"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/privacy-fence-TuVwXyZaBcDeFgHiJkLmNoPqRsTuVw.jpg",
//     alt: "Privacy fence installation",
//     caption: "Complete Privacy Solution",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "DeLand",
//     keywords: ["privacy", "solution", "complete", "vinyl", "backyard"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/commercial-fence-XyZaBcDeFgHiJkLmNoPqRsTuVwXyZa.jpg",
//     alt: "Commercial property fence",
//     caption: "Commercial Security Fence",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "commercial",
//     location: "Sanford",
//     keywords: ["commercial", "security", "business", "property", "protection"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/additional/fence-with-landscaping-BcDeFgHiJkLmNoPqRsTuVwXyZaBcDe.jpg",
//     alt: "Fence with professional landscaping",
//     caption: "Integrated Landscape Design",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "landscaping",
//     location: "Lake Mary",
//     keywords: ["landscaping", "integrated", "design", "professional", "garden"],
//   },
//   // New images from voicemaxim/RoyaltyFence/recent-projects/ folder
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/lakefront-vinyl-fence-01-AaBbCcDdEeFfGgHhIiJjKkLlMm.jpg",
//     alt: "Lakefront property vinyl fence installation",
//     caption: "Lakefront Property Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "Lake Helen",
//     keywords: ["lakefront", "waterfront", "vinyl", "property", "water view"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/ornamental-fence-estate-02-NnOoPpQqRrSsTtUuVvWwXxYyZz.jpg",
//     alt: "Ornamental fence for estate property",
//     caption: "Estate Ornamental Fencing",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "ornamental",
//     location: "DeLand",
//     keywords: ["ornamental", "estate", "luxury", "decorative", "high-end"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/hurricane-reinforced-fence-03-AaBbCcDdEeFfGgHhIiJjKkLlMm.jpg",
//     alt: "Hurricane-reinforced fence installation",
//     caption: "Hurricane-Reinforced Installation",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "storm-proof",
//     location: "Orange City",
//     keywords: ["hurricane", "reinforced", "storm-proof", "weather resistant", "durable"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/commercial-security-fence-04-NnOoPpQqRrSsTtUuVvWwXxYyZz.jpg",
//     alt: "Commercial security fence with access control",
//     caption: "Commercial Security Solution",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "commercial",
//     location: "Sanford",
//     keywords: ["commercial", "security", "access control", "business", "protection"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/pool-enclosure-05-AaBbCcDdEeFfGgHhIiJjKkLlMm.jpg",
//     alt: "Pool enclosure with safety features",
//     caption: "Safety-Compliant Pool Enclosure",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "pool",
//     location: "DeBary",
//     keywords: ["pool", "enclosure", "safety", "code compliant", "protection"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/custom-gate-installation-06-NnOoPpQqRrSsTtUuVvWwXxYyZz.jpg",
//     alt: "Custom gate installation with automation",
//     caption: "Custom Automated Gate",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "gates",
//     location: "Deltona",
//     keywords: ["custom", "gate", "automated", "electric", "remote control"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/vinyl-privacy-fence-07-AaBbCcDdEeFfGgHhIiJjKkLlMm.jpg",
//     alt: "Vinyl privacy fence for backyard",
//     caption: "Backyard Privacy Solution",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "vinyl",
//     location: "Orange City",
//     keywords: ["vinyl", "privacy", "backyard", "solution", "residential"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/aluminum-fence-08-NnOoPpQqRrSsTtUuVvWwXxYyZz.jpg",
//     alt: "Aluminum fence with decorative elements",
//     caption: "Decorative Aluminum Fence",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "aluminum",
//     location: "DeLand",
//     keywords: ["aluminum", "decorative", "ornamental", "durable", "low maintenance"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/post-storm-repair-09-AaBbCcDdEeFfGgHhIiJjKkLlMm.jpg",
//     alt: "Post-storm fence repair and reinforcement",
//     caption: "Storm Damage Restoration",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "repair",
//     location: "Deltona",
//     keywords: ["storm", "damage", "repair", "restoration", "hurricane"],
//   },
//   {
//     url: "https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/voicemaxim/RoyaltyFence/recent-projects/historic-property-fence-10-NnOoPpQqRrSsTtUuVvWwXxYyZz.jpg",
//     alt: "Historic property fence restoration",
//     caption: "Historic Property Restoration",
//     fallback: "/placeholder.svg?height=600&width=800",
//     category: "restoration",
//     location: "DeLand",
//     keywords: ["historic", "restoration", "property", "preservation", "heritage"],
//   },
// ]

// Define categories for filtering
const categories = [
  { id: "all", label: "All Projects" },
  { id: "vinyl", label: "Vinyl Fences" },
  { id: "aluminum", label: "Aluminum Fences" },
  { id: "ornamental", label: "Ornamental Fences" },
  { id: "commercial", label: "Commercial Projects" },
  { id: "residential", label: "Residential Projects" },
  { id: "gates", label: "Gates & Entrances" },
  { id: "pool", label: "Pool Enclosures" },
  { id: "landscaping", label: "Landscaping Integration" },
  { id: "repair", label: "Repairs & Restoration" },
  { id: "storm-proof", label: "Storm-Proof Solutions" },
  { id: "installation", label: "Installation Process" },
]

// Define locations for filtering
const locations = [
  { id: "all", label: "All Locations" },
  { id: "Orange City", label: "Orange City" },
  { id: "DeLand", label: "DeLand" },
  { id: "Deltona", label: "Deltona" },
  { id: "DeBary", label: "DeBary" },
  { id: "Sanford", label: "Sanford" },
  { id: "Lake Mary", label: "Lake Mary" },
  { id: "Lake Helen", label: "Lake Helen" },
]

// Define popular search terms
const popularSearchTerms = ["vinyl", "privacy", "pool", "gate", "commercial", "storm", "repair", "aluminum", "backyard"]

// Helper function to ensure image sources are valid
// const getValidImageSrc = (url: string | undefined | null): string | null => {
//   if (!url || url.trim() === "") {
//     return null
//   }
//   return url
// }

// Function to render image with proper fallback
// const renderImage = (
//   image: any,
//   index: number,
//   inModal = false,
//   fallbackSrc = "/placeholder.svg?height=600&width=800",
// ) => {
//   // Skip rendering if we don't have a valid image object
//   if (!image) {
//     return (
//       <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">Image data missing</div>
//     )
//   }

//   // Get a valid image source
//   const imageSrc = getValidImageSrc(image.url)

//   // If we don't have a valid source, show a fallback
//   if (!imageSrc) {
//     return (
//       <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
//         Image not available
//       </div>
//     )
//   }

//   // If we have a valid source, render the image
//   return (
//     <SafeNextImage
//       src={imageSrc}
//       alt={image.alt || "Fence installation image"}
//       fill
//       sizes={inModal ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
//       className={inModal ? "object-contain" : "object-cover transition-transform duration-300 group-hover:scale-105"}
//       priority={!inModal && index < 6}
//       quality={inModal ? 90 : 85}
//       fallbackSrc={fallbackSrc}
//     />
//   )
// }

import { getValidImageSrc } from "@/lib/image-utils"
import Image from "next/image"

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  location?: string
  category?: string
  keywords?: string[]
  fallback?: string
  url?: string
}

export function VerifiedGallery({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [verifiedImages, setVerifiedImages] = useState<GalleryImage[]>([])
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [errorStates, setErrorStates] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [slideshowSpeed, setSlideshowSpeed] = useState(3000) // 3 seconds default
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null)
  // Add a new state for clipboard copy feedback
  const [copied, setCopied] = useState(false)
  // Add search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<GalleryImage[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Filter out any images with empty src
    const validImages = images.filter((img) => img.src && img.src.trim() !== "")
    setVerifiedImages(validImages)
    // Initialize loading and error states for each image
    const initialLoadingStates: { [key: string]: boolean } = {}
    const initialErrorStates: { [key: string]: boolean } = {}
    validImages.forEach((img) => {
      initialLoadingStates[img.src] = true
      initialErrorStates[img.src] = false
    })
    setLoadingStates(initialLoadingStates)
    setErrorStates(initialErrorStates)
  }, [images])

  // Function to get the image source with fallback
  const getImageSrc = (image: GalleryImage) => {
    if (errorStates[image.src]) {
      // Return a reliable placeholder if the original image fails
      return image.fallback || `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(image.caption || "")}`
    }
    return image.src
  }

  const handleImageLoad = (url: string) => {
    setLoadingStates((prev) => ({ ...prev, [url]: false }))
  }

  const handleImageError = (url: string) => {
    console.error(`Failed to load image: ${url}`)
    setLoadingStates((prev) => ({ ...prev, [url]: false }))
    setErrorStates((prev) => ({ ...prev, [url]: true }))

    // Log additional information for debugging
    const img = verifiedImages.find((img) => img.src === url)
    if (img) {
      console.log(
        `Image details: ${JSON.stringify({
          caption: img.caption,
          location: img.location,
          category: img.category,
        })}`,
      )
    }
  }

  const retryLoadImage = (url: string) => {
    // Reset error state
    setErrorStates((prev) => ({ ...prev, [url]: false }))
    // Set loading state to true
    setLoadingStates((prev) => ({ ...prev, [url]: true }))

    // Create a new image object to attempt reloading
    const img = new Image()
    img.onload = () => handleImageLoad(url)
    img.onerror = () => handleImageError(url)
    img.src = url
  }

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const normalizedQuery = query.toLowerCase().trim()

    const results = verifiedImages.filter((image) => {
      // Check if query matches any of the image properties
      const matchesCaption = (image.caption || "").toLowerCase().includes(normalizedQuery)
      const matchesAlt = image.alt.toLowerCase().includes(normalizedQuery)
      const matchesCategory = (image.category || "").toLowerCase().includes(normalizedQuery)
      const matchesLocation = (image.location || "").toLowerCase().includes(normalizedQuery)

      // Check if query matches any of the keywords
      const matchesKeywords = image.keywords?.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))

      return matchesCaption || matchesAlt || matchesCategory || matchesLocation || matchesKeywords
    })

    setSearchResults(results)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim()) {
      setShowSearchSuggestions(true)
    } else {
      setShowSearchSuggestions(false)
      setIsSearching(false)
    }

    // Debounce search for better performance
    const debounceTimer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSearchSuggestions(false)
    performSearch(searchQuery)
    // Reset category and location filters when searching
    if (searchQuery.trim()) {
      setSelectedCategory("all")
      setSelectedLocation("all")
    }
  }

  const handleSearchSuggestion = (term: string) => {
    setSearchQuery(term)
    setShowSearchSuggestions(false)
    performSearch(term)
    // Reset category and location filters when searching
    setSelectedCategory("all")
    setSelectedLocation("all")
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setShowSearchSuggestions(false)
  }

  // Filter images by category, location, and search
  const filteredImages = isSearching
    ? searchResults.filter((img) => {
        const matchesCategory = selectedCategory === "all" || img.category === selectedCategory
        const matchesLocation = selectedLocation === "all" || img.location === selectedLocation
        return matchesCategory && matchesLocation
      })
    : verifiedImages.filter((img) => {
        const matchesCategory = selectedCategory === "all" || img.category === selectedCategory
        const matchesLocation = selectedLocation === "all" || img.location === selectedLocation
        return matchesCategory && matchesLocation
      })

  // Get filtered search suggestions
  const getFilteredSuggestions = () => {
    if (!searchQuery.trim()) return popularSearchTerms

    const normalizedQuery = searchQuery.toLowerCase().trim()

    // First, check if any popular terms match
    const matchingPopularTerms = popularSearchTerms.filter((term) => term.toLowerCase().includes(normalizedQuery))

    // Then, extract unique keywords from all images that match the query
    const allKeywords = new Set<string>()
    verifiedImages.forEach((img) => {
      if (img.keywords) {
        img.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(normalizedQuery)) {
            allKeywords.add(keyword)
          }
        })
      }
    })

    // Combine popular terms with matching keywords, limit to 5 suggestions
    const combinedSuggestions = [...matchingPopularTerms, ...Array.from(allKeywords)]
    return Array.from(new Set(combinedSuggestions)).slice(0, 5)
  }

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 12
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage)

  // Reset to page 1 when category, location, or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedLocation, searchQuery])

  const paginatedImages = filteredImages.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      // Use the fallback image if the original has an error
      const url = errorStates[imageUrl] ? "/placeholder.svg?height=600&width=800" : imageUrl

      // Fetch the image
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)

      // Set the download attribute with a clean filename
      const fileName = imageName.replace(/[^a-z0-9]/gi, "-").toLowerCase() + ".jpg"
      link.download = fileName

      // Append to the document, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the object URL
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Error downloading image:", error)
      alert("Sorry, there was an error downloading the image. Please try again.")
    }
  }

  // Slideshow functionality
  const startSlideshow = () => {
    if (!isSlideshow && selectedImage) {
      setIsSlideshow(true)
    }
  }

  const stopSlideshow = () => {
    if (isSlideshow) {
      setIsSlideshow(false)
    }
  }

  const goToNextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.src === selectedImage.src)
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(filteredImages[nextIndex])
    }
  }

  const goToPrevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.src === selectedImage.src)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      setSelectedImage(filteredImages[prevIndex])
    }
  }

  // Handle slideshow timer
  useEffect(() => {
    // Clear any existing timer when slideshow state changes
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current)
      slideshowTimerRef.current = null
    }

    // If slideshow is active and we have a selected image, start the timer
    if (isSlideshow && selectedImage) {
      slideshowTimerRef.current = setInterval(() => {
        goToNextImage()
      }, slideshowSpeed)
    }

    // Cleanup function to clear the timer when component unmounts or dependencies change
    return () => {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current)
      }
    }
  }, [isSlideshow, selectedImage, slideshowSpeed, filteredImages])

  // Stop slideshow when modal is closed
  useEffect(() => {
    if (!selectedImage && isSlideshow) {
      setIsSlideshow(false)
    }
  }, [selectedImage, isSlideshow])

  // Add keyboard navigation for the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      const currentIndex = filteredImages.findIndex((img) => img.src === selectedImage.src)

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        // Next image
        const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
        setSelectedImage(filteredImages[nextIndex])
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        // Previous image
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
        setSelectedImage(filteredImages[prevIndex])
      } else if (e.key === "Escape") {
        // Close modal
        setSelectedImage(null)
      } else if (e.key === " ") {
        // Space bar toggles slideshow
        e.preventDefault() // Prevent page scroll
        setIsSlideshow(!isSlideshow)
      }
    }

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, filteredImages, isSlideshow])

  // Add keyboard shortcut for search (Ctrl+F or Cmd+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Ctrl+F or Cmd+F is pressed
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault() // Prevent browser's default search
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Add touch swipe support for mobile devices
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)
  const minSwipeDistance = 50 // Minimum distance required for a swipe

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    touchEndXRef.current = null // Reset end position
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current || !selectedImage) return

    const currentIndex = filteredImages.findIndex((img) => img.src === selectedImage.src)
    const swipeDistance = touchEndXRef.current - touchStartXRef.current

    // If the swipe distance is greater than the minimum, navigate
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right, go to previous image
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
        setSelectedImage(filteredImages[prevIndex])
      } else {
        // Swiped left, go to next image
        const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
        setSelectedImage(filteredImages[nextIndex])
      }
    }

    // Reset touch positions
    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  // Add this function before the return statement to handle sharing
  const shareImage = (platform: string) => {
    if (!selectedImage) return

    const imageUrl = errorStates[selectedImage.src] ? selectedImage.fallback : selectedImage.src
    const shareTitle = `Royalty Fence: ${selectedImage.caption}`
    const shareText = `Check out this ${selectedImage.caption} by Royalty Fence in ${selectedImage.location}`
    const shareUrl = window.location.href.split("?")[0] + `?image=${encodeURIComponent(selectedImage.src)}`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
        )
        break
      case "pinterest":
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareText)}`,
          "_blank",
        )
        break
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank")
        break
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
          "_blank",
        )
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        break
    }
  }

  // Add this effect to handle URL parameters for direct image sharing
  useEffect(() => {
    // Check if there's an image parameter in the URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const imageParam = params.get("image")

      if (imageParam) {
        // Find the image in our array
        const sharedImage = verifiedImages.find((img) => img.src === decodeURIComponent(imageParam))
        if (sharedImage) {
          setSelectedImage(sharedImage)
        }
      }
    }
  }, [])

  // Handle click outside search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".search-suggestions")
      ) {
        setShowSearchSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add this useEffect after other useEffects
  useEffect(() => {
    // Preload the first 12 images to improve initial loading experience
    const imagesToPreload = verifiedImages.slice(0, 12)

    imagesToPreload.forEach((image) => {
      const img = new Image()
      img.onload = () => handleImageLoad(image.src)
      img.onerror = () => handleImageError(image.src)
      img.src = image.src
    })
  }, [])

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  // Function to render image with proper fallback
  const renderImageWrapper = (image: GalleryImage, index: number, inModal = false) => {
    // Skip rendering if we don't have a valid image object
    if (!image) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
          Image data missing
        </div>
      )
    }

    // Get a valid image source
    const imageSrc = getValidImageSrc(getImageSrc(image))

    // Always use a fallback if the source is empty
    const finalSrc = imageSrc && imageSrc.trim() !== "" ? imageSrc : "/placeholder.svg?height=600&width=800"

    return (
      <Image
        src={finalSrc || "/placeholder.svg"}
        alt={image.alt || "Fence installation image"}
        width={image.width || 300}
        height={image.height || 200}
        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
          loadingStates[image.src] ? "opacity-0" : "opacity-100"
        }`}
        priority={!inModal && index < 6}
        quality={inModal ? 90 : 85}
        onLoad={() => handleImageLoad(image.src)}
        onError={() => handleImageError(image.src)}
        fallbackSrc={image.fallback || "/placeholder.svg"}
        style={{ objectFit: inModal ? "contain" : "cover" }}
      />
    )
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex items-center w-full">
            <div className="relative flex-grow">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for fence types, locations, or features..."
                className="w-full px-4 py-3 pl-12 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                aria-label="Search gallery"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Search suggestions */}
              {showSearchSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 search-suggestions">
                  <ul className="py-1">
                    {getFilteredSuggestions().map((term, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSearchSuggestion(term)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          <Search className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{term}</span>
                        </button>
                      </li>
                    ))}
                    {getFilteredSuggestions().length === 0 && (
                      <li className="px-4 py-2 text-gray-500">No suggestions found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="ml-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search status */}
        {isSearching && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredImages.length === 0 ? "No results found for " : `Found ${filteredImages.length} results for `}
              <span className="font-medium">"{searchQuery}"</span>
            </p>
            <button onClick={clearSearch} className="text-sm text-[#1e3a8a] hover:underline">
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-[#1e3a8a]" />
          <h3 className="font-medium text-lg">Filter by Category:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-8 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#1e3a8a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="font-medium text-lg">Filter by Location:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedLocation === location.id
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {location.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {paginatedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md bg-white h-[350px] cursor-pointer group"
              onClick={() => openModal(image)}
            >
              <div className="relative h-[250px] w-full overflow-hidden">
                {loadingStates[image.src] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {errorStates[image.src] ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Image could not be loaded</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        retryLoadImage(image.src)
                      }}
                      className="px-2 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  image && image.src && image.src.trim() !== "" && renderImageWrapper(image, index)
                )}
                {!errorStates[image.src] && image && image.src && image.src.trim() !== "" && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/80 rounded-full p-2">
                      <ZoomIn className="h-6 w-6 text-[#1e3a8a]" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-[#1e3a8a] font-medium text-lg">{image?.caption || "Fence Installation"}</p>
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">{image?.location || "Volusia County"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">
            {isSearching ? `No images found matching "${searchQuery}"` : "No images found in this category."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all")
              setSelectedLocation("all")
              clearSearch()
            }}
            className="mt-4 px-4 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            View All Projects
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <div className="text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="relative max-w-4xl w-full h-[80vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Download button */}
            <button
              className="absolute top-4 right-16 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                if (selectedImage) {
                  downloadImage(selectedImage.src, selectedImage.caption || selectedImage.alt)
                }
              }}
              aria-label="Download image"
              title="Download image"
            >
              <Download className="h-6 w-6 text-[#1e3a8a]" />
            </button>

            {/* Share button and dropdown */}
            <div className="absolute top-4 right-40 z-10">
              <div className="relative">
                <button
                  className="bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    const dropdown = document.getElementById("share-dropdown")
                    if (dropdown) {
                      dropdown.classList.toggle("hidden")
                    }
                  }}
                  aria-label="Share image"
                  title="Share image"
                >
                  <Share2 className="h-6 w-6 text-[#1e3a8a]" />
                </button>

                <div
                  id="share-dropdown"
                  className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Share this image</h4>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage("facebook")
                        }}
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-5 w-5 text-[#1877F2]" />
                        <span className="text-xs mt-1">Facebook</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage("twitter")
                        }}
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                        <span className="text-xs mt-1">Twitter</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage("pinterest")
                        }}
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Share on Pinterest"
                      >
                        <svg className="h-5 w-5 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0a12 12 0 0 0-4.373 23.178c-.011-.937-.019-2.382.327-3.403.353-.999 2.24-6.236 2.24-6.236s-.571-1.147-.571-2.844c0-2.672 1.541-4.664 3.453-4.664 1.626 0 2.415 1.22 2.415 2.684 0 1.633-1.041 4.089-1.581 6.357-.449 1.9.95 3.45 2.818 3.45 3.382 0 5.986-3.566 5.986-8.701 0-4.543-3.252-7.744-7.874-7.744-5.355 0-8.5 4.007-8.5 8.129 0 1.595.606 3.306 1.356 4.238.149.18.172.336.128.519-.14.149-.458 1.47-.515 1.674-.08.304-.267.367-.493.223-1.847-.863-3.007-3.538-3.007-5.701 0-4.635 3.368-8.897 9.686-8.897 5.102 0 9.039 3.631 9.039 8.498 0 5.051-3.173 9.123-7.571 9.123-1.47 0-2.854-.788-3.329-1.715l-.906 3.458c-.322 1.242-1.208 2.783-1.8 3.728A12 12 0 1 0 12 0z" />
                        </svg>
                        <span className="text-xs mt-1">Pinterest</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage("whatsapp")
                        }}
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Share on WhatsApp"
                      >
                        <MessageSquare className="h-5 w-5 text-[#25D366]" />
                        <span className="text-xs mt-1">WhatsApp</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        shareImage("email")
                      }}
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md"
                      aria-label="Share via email"
                    >
                      <Mail className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm">Email</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        shareImage("copy")
                      }}
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md"
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm text-green-600">Link copied!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm">Copy link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slideshow button */}
            <button
              className="absolute top-4 right-28 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setIsSlideshow(!isSlideshow)
              }}
              aria-label={isSlideshow ? "Pause slideshow" : "Start slideshow"}
              title={isSlideshow ? "Pause slideshow" : "Start slideshow"}
            >
              {isSlideshow ? <Pause className="h-6 w-6 text-[#1e3a8a]" /> : <Play className="h-6 w-6 text-[#1e3a8a]" />}
            </button>

            {/* Slideshow speed controls */}
            <div className="absolute top-4 left-4 z-10 bg-white/80 rounded-lg p-2 flex items-center gap-2">
              <span className="text-xs text-gray-700">Speed:</span>
              <button
                className={`px-2 py-1 text-xs rounded ${
                  slideshowSpeed === 5000 ? "bg-[#1e3a8a] text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSlideshowSpeed(5000)
                }}
              >
                Slow
              </button>
              <button
                className={`px-2 py-1 text-xs rounded ${
                  slideshowSpeed === 3000 ? "bg-[#1e3a8a] text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSlideshowSpeed(3000)
                }}
              >
                Medium
              </button>
              <button
                className={`px-2 py-1 text-xs rounded ${
                  slideshowSpeed === 1500 ? "bg-[#1e3a8a] text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSlideshowSpeed(1500)
                }}
              >
                Fast
              </button>
            </div>

            {/* Previous button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevImage()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToNextImage()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className="relative w-full h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
              {errorStates[selectedImage.src] ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-500 mb-3">Image could not be loaded</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      retryLoadImage(selectedImage.src)
                    }}
                    className="px-3 py-1.5 bg-[#1e3a8a] text-white rounded hover:bg-blue-800 transition-colors"
                  >
                    Retry Loading
                  </button>
                </div>
              ) : (
                selectedImage &&
                selectedImage.src &&
                selectedImage.src.trim() !== "" &&
                renderImageWrapper(selectedImage, 0, true)
              )}

              {/* Slideshow indicator */}
              {isSlideshow && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/80 rounded-full px-3 py-1 text-sm text-[#1e3a8a] flex items-center gap-2">
                  <span className="animate-pulse">●</span> Slideshow Playing
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4">
              <h3 className="text-lg font-bold text-[#1e3a8a]">{selectedImage.caption}</h3>
              <div className="flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-sm text-gray-600">{selectedImage.location}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{selectedImage.alt}</p>
              <p className="text-xs text-gray-500 mt-1">
                Image {filteredImages.findIndex((img) => img.src === selectedImage.src) + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
