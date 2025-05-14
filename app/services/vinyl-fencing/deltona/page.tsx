import type { Metadata } from "next"
import LocalServicePage from "@/components/local-service-page"

export const metadata: Metadata = {
  title: "Vinyl Fencing in Deltona, FL | Storm-Resistant Fence Installation",
  description:
    "Professional vinyl fence installation in Deltona, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
  openGraph: {
    title: "Vinyl Fencing in Deltona, FL | Storm-Resistant Fence Installation",
    description:
      "Professional vinyl fence installation in Deltona, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
    url: "https://royaltyfence.com/services/vinyl-fencing/deltona",
    siteName: "Royalty Fence",
    locale: "en_US",
    type: "website",
  },
}

export default function DeltonaVinylFencingPage() {
  return (
    <LocalServicePage
      city="Deltona"
      service="Vinyl Fencing"
      serviceDescription="Royalty Fence provides premium vinyl fence installation in Deltona, FL. Our storm-resistant vinyl fences are designed to withstand Florida's harsh weather while maintaining their beauty and durability for years to come."
      cityDescription="Deltona's growing communities and family-friendly neighborhoods deserve fencing solutions that provide security, privacy, and curb appeal. Our vinyl fencing options are specifically designed for Deltona's suburban properties, offering durability against Florida's challenging climate while enhancing your home's value."
      benefits={[
        {
          title: "Pool Code Compliant",
          description:
            "Our vinyl fencing options include pool code compliant designs, perfect for Deltona's many backyard pools, ensuring safety while maintaining aesthetics.",
        },
        {
          title: "HOA Approved Styles",
          description:
            "We offer a wide range of HOA-friendly vinyl fence styles that meet the requirements of Deltona's many planned communities and neighborhoods.",
        },
        {
          title: "Weather Resistant",
          description:
            "Engineered specifically for Deltona's climate, our vinyl fences resist fading, warping, and damage from Florida's intense sun, rain, and storm conditions.",
        },
        {
          title: "Family-Friendly",
          description:
            "No splinters, no rusty nails, and no toxic chemicals make our vinyl fences the perfect choice for Deltona families with children and pets.",
        },
        {
          title: "Enhanced Property Value",
          description:
            "Quality vinyl fencing is an investment that can increase your Deltona home's curb appeal and market value, with returns often exceeding the initial cost.",
        },
        {
          title: "Noise Reduction",
          description:
            "Our privacy vinyl fence options provide sound dampening benefits, reducing road noise for Deltona homes located near busy streets or highways.",
        },
      ]}
      faqs={[
        {
          question: "Will my vinyl fence meet Deltona HOA requirements?",
          answer:
            "Yes, we're familiar with the requirements of most Deltona HOAs and can help you select a vinyl fence style that meets your community's guidelines. We can review your HOA documentation and recommend compliant options that still achieve your fencing goals.",
        },
        {
          question: "Is vinyl fencing a good option for Deltona pool areas?",
          answer:
            "Absolutely. We offer several vinyl fence styles that meet Florida pool safety codes while providing the durability needed in pool environments. Vinyl is an excellent choice for pool areas as it resists water damage, doesn't splinter, and requires minimal maintenance despite constant exposure to water and pool chemicals.",
        },
        {
          question: "How does vinyl fencing hold up to Deltona's summer heat?",
          answer:
            "Our vinyl fencing is specifically formulated with UV inhibitors to withstand Deltona's intense summer heat and sun exposure. Unlike wood that can warp and crack in high temperatures, quality vinyl maintains its shape and appearance even during the hottest Florida summers.",
        },
        {
          question: "Can vinyl fencing help with privacy in Deltona's newer neighborhoods?",
          answer:
            "Yes, our privacy vinyl fence options are perfect for Deltona's newer developments where homes may be closer together. We offer 6' and 8' height options with no gaps between pickets, creating a solid barrier for maximum privacy while maintaining an attractive appearance.",
        },
        {
          question: "What is the installation process like for Deltona properties?",
          answer:
            "Our installation process begins with a thorough property assessment and utility marking. For most Deltona homes, installation takes 1-3 days depending on the project scope. We handle all necessary permits and inspections, and our crews are experienced with Deltona's soil conditions and building requirements.",
        },
      ]}
      testimonial={{
        quote:
          "After getting quotes from several companies, we chose Royalty Fence for our Deltona home. Their knowledge of our HOA requirements saved us from making costly mistakes, and the installation was flawless. Two years and several storms later, our vinyl fence still looks brand new!",
        author: "Jennifer Martinez",
        location: "Deltona, FL",
        rating: 5,
      }}
      imageSrc="/pristine-fence.jpg"
      imageAlt="Beautiful white vinyl fence installation in Deltona, Florida"
      nearbyAreas={["Orange City", "DeBary", "Lake Helen", "Enterprise"]}
      serviceArea="Volusia County"
    />
  )
}
