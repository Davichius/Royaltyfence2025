import { Check, Shield, PenToolIcon as Tools, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      title: "New Fence Installation",
      description:
        "Custom hurricane-proof fence installation for residential and commercial properties in Orange City and Volusia County.",
      features: [
        "Aluminum fences with 150+ MPH wind rating",
        "Vinyl privacy fences with storm reinforcement",
        "Ornamental iron fences with reinforced posts",
        "Chain link with reinforced framework",
      ],
      icon: Shield,
    },
    {
      title: "Fence Repair & Maintenance",
      description: "Fast, reliable fence repair services for storm damage, wear and tear, or structural issues.",
      features: [
        "Emergency post-storm repairs",
        "Leaning fence correction",
        "Post replacement and reinforcement",
        "Gate repair and adjustment",
      ],
      icon: Tools,
    },
    {
      title: "Storm Readiness Upgrades",
      description: "Convert your existing fence into a hurricane-ready barrier with our reinforcement services.",
      features: [
        "Post depth and concrete foundation upgrades",
        "Hardware and fastener replacement",
        "Panel reinforcement installation",
        "Free storm readiness assessment",
      ],
      icon: Wrench,
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">Orange City's Premier Fence Services</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From new installations to emergency repairs, we provide complete fence solutions for Orange City, DeBary,
            Deltona, and all of Volusia County.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6 text-white">
                <service.icon className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">{service.description}</p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-1.5 text-green-600 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button className="bg-[#1e3a8a] hover:bg-blue-800 text-white text-lg py-6 px-8" asChild>
            <Link href="/get-quote">Get My Free Quote →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
