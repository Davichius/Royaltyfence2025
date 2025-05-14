import type { Metadata } from "next"
import LocalServicePage from "@/components/local-service-page"

export const metadata: Metadata = {
  title: "Vinyl Fencing in Orange City, FL | Storm-Resistant Fence Installation",
  description:
    "Professional vinyl fence installation in Orange City, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
  openGraph: {
    title: "Vinyl Fencing in Orange City, FL | Storm-Resistant Fence Installation",
    description:
      "Professional vinyl fence installation in Orange City, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
    url: "https://royaltyfence.com/services/vinyl-fencing/orange-city",
    siteName: "Royalty Fence",
    locale: "en_US",
    type: "website",
  },
}

export default function OrangeCityVinylFencingPage() {
  return (
    <LocalServicePage
      city="Orange City"
      service="Vinyl Fencing"
      serviceDescription="Royalty Fence provides premium vinyl fence installation in Orange City, FL. Our storm-resistant vinyl fences are designed to withstand Florida's harsh weather while maintaining their beauty and durability for years to come."
      cityDescription="Orange City homeowners face unique challenges when it comes to fencing solutions. With frequent storms and high humidity, you need a fence that can withstand these conditions while enhancing your property's value and appearance. Our vinyl fencing solutions are specifically engineered for Orange City's climate and soil conditions."
      benefits={[
        {
          title: "Hurricane Resistant",
          description:
            "Our vinyl fences are engineered to withstand hurricane-force winds common in Orange City, with reinforced posts and panels that exceed Florida building codes.",
        },
        {
          title: "Low Maintenance",
          description:
            "Unlike wood fences, our vinyl fencing never needs painting, staining, or sealing - perfect for Orange City's humid climate that can cause wood to rot and metal to rust.",
        },
        {
          title: "Long-Term Value",
          description:
            "With a lifespan of 20-30 years, our vinyl fences provide excellent long-term value for Orange City homeowners, with minimal maintenance costs over time.",
        },
        {
          title: "UV Resistant",
          description:
            "Our vinyl fencing contains UV inhibitors that prevent fading and deterioration from Orange City's intense sun exposure, keeping your fence looking new for years.",
        },
        {
          title: "Customizable Designs",
          description:
            "Choose from a variety of styles, heights, and colors to complement your Orange City home's architecture and landscape design.",
        },
        {
          title: "Environmentally Friendly",
          description:
            "Our vinyl fencing is made from recyclable materials and doesn't require harmful chemicals for maintenance, making it an eco-friendly choice for Orange City residents.",
        },
      ]}
      faqs={[
        {
          question: "How long does vinyl fencing last in Orange City's climate?",
          answer:
            "Our premium vinyl fencing typically lasts 20-30 years in Orange City's climate. The materials we use are specifically selected to withstand Florida's heat, humidity, and storm conditions, with UV inhibitors to prevent sun damage and fading.",
        },
        {
          question: "Is vinyl fencing hurricane-resistant?",
          answer:
            "Yes, our vinyl fencing is engineered to be hurricane-resistant. We use reinforced posts, deeper-than-standard concrete footings, and high-quality brackets designed to withstand high winds common in Orange City during storm season.",
        },
        {
          question: "How does vinyl fencing compare to wood fencing in Orange City?",
          answer:
            "Vinyl fencing outperforms wood in Orange City's climate in several ways: it won't rot, warp, or attract termites; it never needs painting or staining; it's more resistant to storm damage; and it typically has a longer lifespan with lower lifetime maintenance costs.",
        },
        {
          question: "What maintenance does vinyl fencing require in Orange City?",
          answer:
            "Vinyl fencing requires minimal maintenance in Orange City. Occasional cleaning with water and mild soap is typically all that's needed to keep it looking new. Unlike wood, it never needs painting, staining, or sealing, making it ideal for busy homeowners.",
        },
        {
          question: "How long does it take to install a vinyl fence in Orange City?",
          answer:
            "Most residential vinyl fence installations in Orange City take 1-3 days, depending on the size of your property and complexity of the installation. Our team works efficiently while ensuring proper installation techniques that meet local building codes.",
        },
      ]}
      testimonial={{
        quote:
          "After Hurricane Ian damaged our wooden fence beyond repair, we decided to upgrade to vinyl with Royalty Fence. Their team was professional, efficient, and the new fence looks amazing. Most importantly, it held up perfectly during the last storm season!",
        author: "Michael Rodriguez",
        location: "Orange City, FL",
        rating: 5,
      }}
      imageSrc="/pristine-fence.jpg"
      imageAlt="Beautiful white vinyl fence installation in Orange City, Florida"
      nearbyAreas={["DeLand", "Deltona", "DeBary", "Lake Helen"]}
      serviceArea="Volusia County"
    />
  )
}
