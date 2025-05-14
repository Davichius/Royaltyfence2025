import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { kv } from "@vercel/kv"

// Rate limiting constants
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5 // 5 requests per minute

export async function POST(req: Request) {
  try {
    // Get IP address for rate limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous"
    const rateKey = `rate_limit:${ip}`

    // Check if KV is available
    let requestCount = 0
    try {
      // Check rate limit
      requestCount = (await kv.get<number>(rateKey)) || 0

      if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            text: "Rate limit exceeded. Please wait a moment before sending another message.",
          },
          { status: 429 },
        )
      }

      // Increment request count and set expiry
      await kv.set(rateKey, requestCount + 1, { ex: RATE_LIMIT_WINDOW / 1000 })
    } catch (kvError) {
      console.warn("KV store not available, rate limiting disabled:", kvError)
      // Continue without rate limiting if KV is not available
    }

    const { messages, sessionId } = await req.json()

    // Ensure we have at least one user message
    if (!messages || messages.length === 0 || !messages.some((m) => m.role === "user")) {
      return NextResponse.json(
        { text: "Invalid message format. At least one user message is required." },
        { status: 400 },
      )
    }

    const userMessage = messages[messages.length - 1].content.toLowerCase()

    // Simple keyword-based response system instead of using an unreliable AI model
    let responseText = ""

    // Check for specific keywords and provide appropriate responses
    if (userMessage.includes("wood") || userMessage.includes("wooden")) {
      responseText =
        "Royalty Fence does NOT install or repair wood fences. We focus on materials like Vinyl, Aluminum, Chain Link, and Iron that provide superior longevity, low maintenance, and weather resistance in Florida's climate."
    } else if (userMessage.includes("vinyl")) {
      responseText =
        "Yes, we specialize in hurricane-resistant vinyl fencing! Our vinyl fences feature privacy styles and storm reinforcement, perfect for Florida's climate. Would you like to schedule a free consultation?"
    } else if (userMessage.includes("aluminum")) {
      responseText =
        "Our aluminum fences have wind ratings over 150 MPH and are rust-proof, making them perfect for Florida's climate. They're a great option for both security and aesthetics."
    } else if (userMessage.includes("chain link")) {
      responseText =
        "We offer high-quality chain link fences with reinforced framework options. They're durable, cost-effective, and can be customized to meet your specific needs."
    } else if (userMessage.includes("iron") || userMessage.includes("ornamental")) {
      responseText =
        "Our ornamental iron fences feature reinforced posts for added strength and provide an elegant, classic look while maintaining security and durability."
    } else if (
      userMessage.includes("price") ||
      userMessage.includes("cost") ||
      userMessage.includes("quote") ||
      userMessage.includes("estimate")
    ) {
      responseText =
        "We'd be happy to provide a free estimate for your fencing project! Please call us at (386) 479-8379 or use our online quote form. We'll need some basic information about your property and fencing needs to give you an accurate quote."
    } else if (
      userMessage.includes("financ") ||
      userMessage.includes("payment") ||
      userMessage.includes("loan") ||
      userMessage.includes("credit")
    ) {
      responseText =
        "Royalty Fence does NOT offer financing options or payment plans at this time. We accept standard forms of payment. We do offer periodic discounts, such as our Storm Prep Discount providing $250 off a full installation."
    } else if (
      userMessage.includes("area") ||
      userMessage.includes("location") ||
      userMessage.includes("serve") ||
      userMessage.includes("where")
    ) {
      responseText =
        "Royalty Fence serves Orange City, DeBary, Deltona, DeLand, Sanford, and all surrounding communities within Volusia County, Florida. We provide services to both residential and commercial customers throughout our service area."
    } else if (userMessage.includes("storm") || userMessage.includes("hurricane") || userMessage.includes("wind")) {
      responseText =
        "Our Storm Readiness Upgrades enhance your existing fence's ability to withstand hurricanes. This can involve deeper post setting, stronger concrete footings, upgraded hardware, and panel reinforcement. We offer a Free Storm Audit to assess your current fence's vulnerability and recommend potential upgrades."
    } else if (userMessage.includes("repair") || userMessage.includes("fix") || userMessage.includes("damage")) {
      responseText =
        "Royalty Fence offers fast and reliable fence repair services. This includes fixing storm damage, correcting leaning fences, replacing damaged posts, reinforcing existing structures, repairing gates (non-automated), and addressing general wear and tear. We also offer 24/7 emergency storm response."
    } else if (
      userMessage.includes("time") ||
      userMessage.includes("long") ||
      userMessage.includes("install") ||
      userMessage.includes("duration")
    ) {
      responseText =
        "Royalty Fence prides itself on efficiency. Our process typically takes about 7 days from consultation to completion. We handle all permitting (within 48hrs) and installation (often completed in 1 day). We call it 'Consultation to Cocktails in 7 Days!'"
    } else if (
      userMessage.includes("contact") ||
      userMessage.includes("call") ||
      userMessage.includes("phone") ||
      userMessage.includes("email")
    ) {
      responseText =
        "You can reach Royalty Fence at (386) 479-8379 or email royaltyfenceorangecity@gmail.com. Our regular business hours are Monday to Friday, 8:00 AM to 5:00 PM, and Saturday, 9:00 AM to 5:00 PM."
    } else if (
      userMessage.includes("hour") ||
      userMessage.includes("open") ||
      userMessage.includes("close") ||
      userMessage.includes("available")
    ) {
      responseText =
        "Royalty Fence's regular business hours are Monday to Friday, 8:00 AM to 5:00 PM, and Saturday, 9:00 AM to 5:00 PM. We are closed on Sundays. For urgent issues like significant storm damage, we offer 24/7 emergency storm response."
    } else if (userMessage.includes("warranty") || userMessage.includes("guarantee")) {
      responseText =
        "We offer a 25-year warranty on our fences, giving you peace of mind about your investment. Our warranty covers manufacturing defects and premature deterioration under normal use conditions."
    } else if (userMessage.includes("gate") || userMessage.includes("automat")) {
      responseText =
        "Royalty Fence repairs and adjusts standard, non-automated gates. However, we do NOT install or service automated security gates or gate automation systems."
    } else if (
      userMessage.includes("licens") ||
      userMessage.includes("insur") ||
      userMessage.includes("certif") ||
      userMessage.includes("qualif")
    ) {
      responseText =
        "Royalty Fence is fully licensed and insured. We are BBB Accredited with an A+ rating since 2008, NOAA StormReady Certified, and FBC (Florida Building Code) Approved. These credentials reflect our commitment to quality, customer satisfaction, and adherence to building standards."
    } else if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey") ||
      userMessage.includes("howdy")
    ) {
      responseText = "Hello! Welcome to Royalty Fence. How can I assist you with your fencing needs today?"
    } else if (userMessage.includes("thank")) {
      responseText =
        "You're welcome! If you have any other questions about our fencing services, feel free to ask. You can also reach us at (386) 479-8379 for more information or to schedule a consultation."
    } else if (userMessage.includes("bye") || userMessage.includes("goodbye")) {
      responseText =
        "Thank you for chatting with us! If you need anything else, don't hesitate to reach out. Have a great day!"
    }
    // NEW: Handle general fence inquiries
    else if (
      (userMessage.includes("need") && userMessage.includes("fence")) ||
      (userMessage.includes("want") && userMessage.includes("fence")) ||
      (userMessage.includes("looking for") && userMessage.includes("fence")) ||
      (userMessage.includes("get") && userMessage.includes("fence")) ||
      userMessage.includes("new fence") ||
      userMessage.includes("fence installation") ||
      userMessage.includes("install fence") ||
      userMessage.includes("build fence") ||
      userMessage.includes("fence options") ||
      userMessage.includes("fence company") ||
      userMessage.includes("fence contractor")
    ) {
      responseText =
        "Great! We'd be happy to help with your new fence. Royalty Fence specializes in hurricane-resistant vinyl, aluminum, chain link, and ornamental iron fencing. Our process typically takes about 7 days from consultation to completion. Would you like to schedule a free estimate? Please call us at (386) 479-8379 or use our online quote form to get started."
    }
    // NEW: Handle material questions
    else if (
      userMessage.includes("material") ||
      userMessage.includes("type of fence") ||
      userMessage.includes("fence type") ||
      userMessage.includes("best fence") ||
      userMessage.includes("recommend")
    ) {
      responseText =
        "Royalty Fence works exclusively with high-quality, durable materials suited for Florida's climate: Vinyl (PVC), Aluminum, Chain Link, and Ornamental Iron. We DO NOT offer wood fencing. The best material depends on your specific needs - vinyl is great for privacy, aluminum for durability and aesthetics, chain link for cost-effectiveness, and ornamental iron for elegance and security. Would you like to discuss which option might be best for your property?"
    }
    // NEW: Handle general questions about the company
    else if (
      userMessage.includes("about") ||
      userMessage.includes("company") ||
      userMessage.includes("business") ||
      userMessage.includes("who are you") ||
      userMessage.includes("tell me about")
    ) {
      responseText =
        "Royalty Fence is Orange City's premier fence company specializing in hurricane-resistant vinyl, aluminum, chain link, and ornamental iron fencing. We've been serving Volusia County since 2008 and are fully licensed and insured with an A+ BBB rating. We pride ourselves on quality workmanship, excellent customer service, and our 'Consultation to Cocktails in 7 Days' efficient installation process."
    } else {
      // Default response for unrecognized queries
      responseText =
        "Thank you for your message. For the most accurate information about our fencing services, please call us at (386) 479-8379 or email royaltyfenceorangecity@gmail.com. We'd be happy to discuss your specific fencing needs!"
    }

    // Store chat history in Vercel Blob if available
    if (sessionId) {
      try {
        const chatHistory = [...messages, { role: "model", content: responseText }]
        await put(`chat-history-${sessionId}.json`, JSON.stringify(chatHistory), { access: "public" })
      } catch (blobError) {
        console.warn("Blob storage not available, chat history not saved:", blobError)
      }
    }

    return NextResponse.json({
      text: responseText,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({
      text: "I'm sorry, I'm having trouble processing your request right now. Please call us directly at (386) 479-8379 for immediate assistance.",
    })
  }
}
