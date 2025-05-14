import type { Metadata } from "next"
import LocalServicePage from "@/components/local-service-page"

export const metadata: Metadata = {
  title: "Vinyl Fencing in DeLand, FL | Storm-Resistant Fence Installation",
  description:
    "Professional vinyl fence installation in DeLand, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
  openGraph: {
    title: "Vinyl Fencing in DeLand, FL | Storm-Resistant Fence Installation",
    description:
      "Professional vinyl fence installation in DeLand, FL. Storm-resistant, durable, and beautiful fencing solutions by Royalty Fence. Free estimates!",
    url: "https://royaltyfence.com/services/vinyl-fencing/deland",
    siteName: "Royalty Fence",
    locale: "en_US",
    type: "website",
  },
}

export default function DeLandVinylFencingPage() {
  return (
    <LocalServicePage
      city="DeLand"
      service="Vinyl Fencing"
      serviceDescription="Royalty Fence provides premium vinyl fence installation in DeLand, FL. Our storm-resistant vinyl fences are designed to withstand Florida's harsh weather while maintaining their beauty and durability for years to come."
      cityDescription="DeLand's historic charm and unique architecture deserve fencing solutions that complement its character while providing modern durability. Our vinyl fencing options are designed to enhance DeLand properties while standing up to Florida's challenging weather conditions, from intense sun to hurricane-force winds."
      benefits={[
        {
          title: "Historic Home Compatible",
          description:
            "Our vinyl fencing options include styles that complement DeLand's historic homes and neighborhoods, maintaining the area's unique architectural character.",
        },
        {
          title: "Storm Resistant",
          description:
            "Engineered to withstand DeLand's storm seasons with reinforced posts and panels that meet or exceed Florida's stringent building codes.",
        },
        {
          title: "Lifetime Value",
          description:
            "With minimal maintenance requirements and exceptional durability, our vinyl fences provide excellent long-term value for DeLand homeowners.",
        },
        {
          title: "Heat and UV Protection",
          description:
            "Special UV inhibitors prevent fading and deterioration from DeLand's intense sun exposure, ensuring your fence maintains its appearance for decades.",
        },
        {
          title: "Privacy Options",
          description:
            "Choose from various height and style options to create the perfect privacy solution for your DeLand property, without sacrificing aesthetics.",
        },
        {
          title: "Quick Installation",
          description:
            "Our experienced DeLand installation teams work efficiently to minimize disruption to your property while ensuring proper installation techniques.",
        },
      ]}
      faqs={[
        {
          question: "Do I need special permits for fence installation in DeLand?",
          answer:
            "Yes, DeLand typically requires permits for new fence installations. As part of our service, Royalty Fence handles the entire permitting process for you, ensuring your new vinyl fence meets all local building codes and HOA requirements if applicable.",
        },
        {
          question: "Will a vinyl fence affect my historic DeLand home's character?",
          answer:
            "We offer vinyl fence styles specifically designed to complement historic homes in DeLand. These options mimic the appearance of traditional materials while providing modern durability and maintenance benefits. Our design consultants can help you select the perfect style to enhance your historic property.",
        },
        {
          question: "How do vinyl fences perform during DeLand's hurricane season?",
          answer:
            "Our vinyl fences are engineered with Florida's hurricane season in mind. We use deeper post installations, reinforced panels, and high-quality hardware to create a fence system that can withstand high winds. Many DeLand customers have reported their Royalty vinyl fences remaining intact through multiple storm seasons.",
        },
        {
          question: "What's the warranty on vinyl fencing in DeLand?",
          answer:
            "Our vinyl fencing comes with a comprehensive warranty that includes protection against manufacturing defects, color fading, and material failure. Most of our premium vinyl products carry a lifetime limited warranty, giving DeLand homeowners peace of mind with their investment.",
        },
        {
          question: "How long will it take to install my vinyl fence in DeLand?",
          answer:
            "Most residential vinyl fence installations in DeLand take 1-3 days, depending on the property size and installation complexity. Our team works efficiently while ensuring proper installation techniques that meet local building codes and our quality standards.",
        },
      ]}
      testimonial={{
        quote:
          "We wanted a fence that would complement our 1920s DeLand home without the maintenance headaches of wood. Royalty Fence suggested a vinyl picket style that looks absolutely authentic while being virtually maintenance-free. We couldn't be happier with the results!",
        author: "Sarah Johnson",
        location: "DeLand, FL",
        rating: 5,
      }}
      imageSrc="/pristine-fence.jpg"
      imageAlt="Beautiful white vinyl fence installation in DeLand, Florida"
      nearbyAreas={["Orange City", "Lake Helen", "Cassadaga", "DeBary"]}
      serviceArea="Volusia County"
    />
  )
}
